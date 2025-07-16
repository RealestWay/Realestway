/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faWhatsapp,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { faLink as faSolidLink } from "@fortawesome/free-solid-svg-icons";

const ShareButtons = ({ house }) => {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    const url = `https://realestway.com/item/${house?.id}`;
    setShareUrl(url);
  }, [house]);

  const title = `Check out this ${house?.propertyType} at ${house?.location?.address} on Realestway`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex flex-wrap gap-3 mt-6 w-full justify-start items-center">
      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(
          `${title} ${shareUrl}`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
      >
        <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareUrl
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 text-sm"
      >
        <FontAwesomeIcon icon={faFacebookF} /> Facebook
      </a>

      {/* Twitter */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
          shareUrl
        )}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 text-sm"
      >
        <FontAwesomeIcon icon={faTwitter} /> Twitter
      </a>

      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        className="flex items-center gap-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 text-sm"
      >
        <FontAwesomeIcon icon={faSolidLink} /> Copy Link
      </button>
    </div>
  );
};

export default ShareButtons;
