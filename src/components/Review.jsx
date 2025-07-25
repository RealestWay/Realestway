import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const AgentReview = ({ paymentLogId }) => {
  const { token } = useAuth();
  const [rating, setRating] = useState(0); // Professionalism
  const [hovered, setHovered] = useState(0);
  const [resRating, setResRating] = useState(0); // Responsiveness
  const [resHovered, setResHovered] = useState(0);
  const [hhRating, sethhRating] = useState(0); // Honesty
  const [hhHovered, sethhHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!rating || !resRating || !hhRating || !comment.trim()) {
      return alert("Please rate all fields and add a comment.");
    }

    const payload = {
      payment_log_id: paymentLogId,
      professionalism_rating: rating,
      responsiveness_rating: resRating,
      honesty_rating: hhRating,
      comment,
    };

    try {
      setLoading(true);
      await axios.post("https://backend.realestway.com/api/reviews", payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setSubmitted(true);
      toast.success("Review submitted successfully.");
    } catch (error) {
      console.error("Failed to submit review:", error);
      toast.error("Error submitting review.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto text-center text-[#00a256] font-semibold">
        ✅ Thanks for your feedback!
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-[#100073]">
        Rate Agent Service
      </h2>

      <label className="font-medium">Professionalism</label>
      <div className="flex space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            icon={faStar}
            key={`p-${star}`}
            size="lg"
            className={`cursor-pointer ${
              (hovered || rating) >= star ? "text-yellow-500" : "text-gray-300"
            }`}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(star)}
          />
        ))}
      </div>

      <label className="font-medium">Responsiveness</label>
      <div className="flex space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            icon={faStar}
            key={`r-${star}`}
            size="lg"
            className={`cursor-pointer ${
              (resHovered || resRating) >= star
                ? "text-yellow-500"
                : "text-gray-300"
            }`}
            onMouseEnter={() => setResHovered(star)}
            onMouseLeave={() => setResHovered(0)}
            onClick={() => setResRating(star)}
          />
        ))}
      </div>

      <label className="font-medium">Honesty and Helpfulness</label>
      <div className="flex space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            icon={faStar}
            key={`h-${star}`}
            size="lg"
            className={`cursor-pointer ${
              (hhHovered || hhRating) >= star
                ? "text-yellow-500"
                : "text-gray-300"
            }`}
            onMouseEnter={() => sethhHovered(star)}
            onMouseLeave={() => sethhHovered(0)}
            onClick={() => sethhRating(star)}
          />
        ))}
      </div>

      <textarea
        className="w-full p-2 border border-gray-300 rounded-md mb-4 resize-none"
        rows={3}
        placeholder="Tell us about your experience..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        className="w-full bg-[#100073] text-white py-2 px-4 rounded-md hover:bg-[#1a008f] disabled:opacity-50"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
};

export default AgentReview;
