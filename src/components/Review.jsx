import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const AgentReview = ({ agentId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [resRating, setResRating] = useState(0);
  const [resHovered, setResHovered] = useState(0);
  const [hhRating, sethhRating] = useState(0);
  const [hhHovered, sethhHovered] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!rating || !comment.trim()) return alert("Please fill all fields.");
    onSubmit({ agentId, rating, comment, resRating, hhRating });
    setRating(0);
    setComment("");
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Rate Agent Service</h2>
      <label>Professionalism</label>
      <div className="flex space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            icon={faStar}
            key={star}
            size={28}
            className={`cursor-pointer ${
              (hovered || rating) >= star ? "text-yellow-500" : "text-gray-300"
            }`}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
      <label>Responsiveness</label>
      <div className="flex space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            icon={faStar}
            key={star}
            size={28}
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
      <label>Honesty and Helpfulness</label>
      <div className="flex space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            icon={faStar}
            key={star}
            size={28}
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
        className="w-full bg-[#100073] text-white py-2 px-4 rounded-md hover:bg-[#1a008f]"
        onClick={handleSubmit}
      >
        Submit Review
      </button>
    </div>
  );
};

export default AgentReview;
