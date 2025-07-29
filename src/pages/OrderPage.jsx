import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseHouses } from "../contexts/HouseContext";
import { useAuth } from "../contexts/AuthContext";
import { ArrowLeft } from "iconsax-reactjs";
import AgentReview from "../components/Review";
import { toast } from "react-toastify";
import Receipt from "../components/Receipt";

const OrderPage = () => {
  const [paymentStage, setPaymentStage] = useState(1); // 1: Initiated, 2: Processing, 3: Completed
  const [countdown, setCountdown] = useState(300); // 5 minutes countdown
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { house } = UseHouses();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [paymentdata, setPaymentData] = useState({});
  // Countdown for optional UX timer
  useEffect(() => {
    if (paymentStage === 2 && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, paymentStage]);

  // Auto verify if Paystack redirects back with reference
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get("trxref");

    if (ref && token) {
      verifyPayment(ref);
    }
  }, [token]);

  // 🧠 Step 1: Start payment (calls your backend, gets Paystack URL)
  const handlePayment = async (method) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://backend.realestway.com/api/payments/listings/${house.id}/initialize`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data?.data?.authorization_url) {
        setPaymentMethod(method);
        setPaymentStage(2);

        window.location.href = data.data.authorization_url;
      } else {
        toast.error("Unable to initialize payment.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error starting payment.");
    } finally {
      setLoading(false);
    }
  };

  //  Step 2: Verify after redirect from Paystack
  const verifyPayment = async (reference) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://backend.realestway.com/api/payments/verify/${reference}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      console.log(result);
      setPaymentData(result);
      if (
        result?.data?.paystack_data?.status === true ||
        result?.data?.paystack_data?.status.toLowerCase() === "success"
      ) {
        setPaymentStage(3);
        setIsPaid(true);
      } else {
        toast.error("Payment verification failed. Please contact support.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error verifying payment.");
    } finally {
      setLoading(false);
    }
  };

  const receiptData = {
    fullName: paymentdata.data?.paystack_data?.authorization?.sender_name,
    currency: paymentdata.data?.paystack_data?.currency,
    email: paymentdata.data?.paystack_data?.customer?.email,
    amount: paymentdata.data?.paystack_data?.amount,
    date: paymentdata.data?.paystack_data?.paidAt,
    transactionId: paymentdata.data?.payment_id,
    propertyTitle: paymentdata.listing?.title,
    propertyType: paymentdata.listing?.property_type,
    reference: paymentdata.data?.paystack_data?.reference,
    paymentMethod: paymentdata.data?.paystack_data?.channel,
  };

  return (
    <div className="md:w-[88%] w-[98%] max-w-2xl mx-auto my-24 p-6 bg-white shadow-lg rounded-lg">
      {/* Top Bar */}

      <div className="w-full px-6 md:px-10 flex justify-between items-center text-[#00a256] ">
        <button
          className="flex items-center gap-3 px-4 py-2 transition-all"
          onClick={() => (paymentStage === 3 ? navigate("/") : navigate(-1))}
        >
          <ArrowLeft color="#00a256" size={24} /> <span>Back</span>
        </button>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 text-center mt-6">
        Payment Processing
      </h2>

      {/* Progress Tracker */}
      <div className="flex items-center justify-between my-6">
        {["Initiated", "Processing", "Completed"].map((stage, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full text-white flex items-center justify-center font-semibold 
              ${paymentStage > index ? "bg-green-500" : "bg-gray-400"}`}
            >
              {index + 1}
            </div>
            <p className="text-sm mt-2">{stage}</p>
          </div>
        ))}
      </div>

      {/* Step 1: Choose Payment Method */}
      {paymentStage === 1 && (
        <div className="text-center">
          <p className="text-justify text-sm text-[#100073] my-3">
            We recommend that you proceed with payment promptly, as the
            property's availability cannot be guaranteed later.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handlePayment("Card")}
              className="bg-[#00a256] text-white px-4 py-2 rounded-lg mx-2"
              disabled={loading}
            >
              {loading ? "Redirecting..." : "Pay Now"}
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Processing */}
      {paymentStage === 2 && (
        <div className="text-center">
          <p className="text-gray-600">
            Redirecting for your {paymentMethod} payment...
          </p>
          <p className="text-red-500 font-semibold mt-2">
            Time left: {Math.floor(countdown / 60)}:
            {String(countdown % 60).padStart(2, "0")}
          </p>
          {countdown === 0 && (
            <p className="text-red-600 font-bold mt-4">
              If payment isn't completed, please contact support.
            </p>
          )}
        </div>
      )}

      {/* Step 3: Success */}
      {isPaid && (
        <div className="flex flex-col gap-10">
          <div className="text-center mt-6 mb-3">
            <h3 className="text-green-600 text-lg font-bold">
              Payment Successful! 🎉
            </h3>
            <p className="mt-2 text-gray-700">
              You can now contact the landlord/caretaker for access.
              <br /> {paymentdata.listing?.caretaker_contact}
            </p>
          </div>{" "}
          <AgentReview paymentLogId={receiptData.transactionId} />
          <Receipt receiptData={receiptData} />
        </div>
      )}
    </div>
  );
};

export default OrderPage;
