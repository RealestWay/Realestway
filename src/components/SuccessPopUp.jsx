import { useEffect } from "react";

const SuccessPopup = ({ message = "Success!", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // auto-close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-3 rounded shadow-lg z-[9999] animate-slide-in">
      {message}
    </div>
  );
};

export default SuccessPopup;
