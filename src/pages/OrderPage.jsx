import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const [paymentStage, setPaymentStage] = useState(1); // 1: Initiated, 2: Processing, 3: Completed
  const [countdown, setCountdown] = useState(300); // 5 minutes countdown
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const landlordContact = "+1234567890"; // Example contact (will be revealed after payment)
  const navigate = useNavigate();
  // Countdown Timer
  useEffect(() => {
    if (paymentStage === 2 && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, paymentStage]);

  // Simulate Payment Completion after 10 seconds
  useEffect(() => {
    if (paymentStage === 2) {
      setTimeout(() => {
        setPaymentStage(3);
        setIsPaid(true);
      }, 10000);
    }
  }, [paymentStage]);

  // Handle Payment Selection
  const handlePayment = (method) => {
    setPaymentMethod(method);
    setPaymentStage(2);
  };

  return (
    <div className="max-w-2xl mx-auto my-24  p-6 bg-white shadow-lg rounded-lg">
      <div className="w-full px-6sm:px-10 flex justify-between items-center text-white bg-blue-700">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-700  hover:bg-blue-300 transition-all"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faArrowAltCircleLeft} size="lg" />
          <span>Back</span>
        </button>
      </div>
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Payment Processing
      </h2>

      {/* Progress Tracker */}
      <div className="flex items-center justify-between my-6">
        {["Initiated", "Processing", "Completed"].map((stage, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full text-white flex items-center justify-center font-semibold 
                ${paymentStage > index ? "bg-green-500" : "bg-gray-400"}
              `}
            >
              {index + 1}
            </div>
            <p className="text-sm mt-2">{stage}</p>
          </div>
        ))}
      </div>

      {/* Payment Method Selection */}
      {paymentStage === 1 && (
        <div className="text-center">
          <p className="mb-4">Choose a payment method:</p>
          <button
            onClick={() => handlePayment("Card")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mx-2"
          >
            Pay with Card
          </button>
          <button
            onClick={() => handlePayment("Bank Transfer")}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg mx-2"
          >
            Pay via Bank Transfer
          </button>
        </div>
      )}

      {/* Payment Processing */}
      {paymentStage === 2 && (
        <div className="text-center">
          <p className="text-gray-600">
            Processing your {paymentMethod} payment...
          </p>
          <p className="text-red-500 font-semibold mt-2">
            Time left: {Math.floor(countdown / 60)}:
            {String(countdown % 60).padStart(2, "0")}
          </p>
          {countdown === 0 && (
            <p className="text-red-600 font-bold mt-4">
              If payment isnt completed, contact support.
            </p>
          )}
        </div>
      )}

      {/* Payment Success */}
      {isPaid && (
        <div className="text-center mt-6">
          <h3 className="text-green-600 text-lg font-bold">
            Payment Successful! 🎉
          </h3>
          <p className="mt-2 text-gray-700">
            You can now contact the landlord/caretaker.
          </p>
          <p className="text-blue-600 font-bold text-lg mt-4">
            {landlordContact}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
