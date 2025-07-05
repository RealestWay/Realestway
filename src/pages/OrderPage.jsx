import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UseHouses } from "../contexts/HouseContext";
import { useAuth } from "../contexts/AuthContext";
import { ArrowLeft } from "iconsax-reactjs";

const OrderPage = () => {
  const [paymentStage, setPaymentStage] = useState(1); // 1: Initiated, 2: Processing, 3: Completed
  const [countdown, setCountdown] = useState(300); // 5 minutes countdown
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const landlordContact = "+1234567890"; // Replace this dynamically after verification if needed
  const { house } = UseHouses();
  const { token } = useAuth();
  const navigate = useNavigate();

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
        alert("Unable to initialize payment.");
      }
    } catch (err) {
      console.error(err);
      alert("Error starting payment.");
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
      if (
        result?.data?.status === true ||
        result?.data?.status?.toLowerCase() === "success"
      ) {
        setPaymentStage(3);
        setIsPaid(true);
      } else {
        alert("Payment verification failed. Please contact support.");
      }
    } catch (err) {
      console.error(err);
      alert("Error verifying payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[88%] max-w-2xl mx-auto my-24 p-6 bg-white shadow-lg rounded-lg">
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
          <p className="mb-4">Choose a payment method:</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handlePayment("Card")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mx-2"
              disabled={loading}
            >
              {loading ? "Redirecting..." : "With Card"}
            </button>
            <button
              onClick={() => handlePayment("Bank Transfer")}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg mx-2"
              disabled={loading}
            >
              {loading ? "Redirecting..." : "Bank Transfer"}
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
        <div className="text-center mt-6">
          <h3 className="text-green-600 text-lg font-bold">
            Payment Successful! 🎉
          </h3>
          <p className="mt-2 text-gray-700">
            You can now contact the landlord/caretaker.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
