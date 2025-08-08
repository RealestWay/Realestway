import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const WhatsAppContactButton = ({ property }) => {
  // Get current page URL
  const propertyUrl = window.location.href;

  // Format Nigerian phone number (remove first 0, add +234)
  const formatNigerianPhone = (phone) => {
    if (!phone) return "";
    const cleaned = phone.replace(/\D/g, ""); // Remove all non-digits
    // If number starts with 0, replace with +234
    if (cleaned.startsWith("0")) {
      return `+234${cleaned.substring(1)}`;
    }
    // If already starts with 234, add +
    if (cleaned.startsWith("234")) {
      return `+${cleaned}`;
    }
    // For any other format, just return as is with +
    return `+${cleaned}`;
  };

  // Create WhatsApp message
  const createMessage = () => {
    return `Hi ${property.user?.fullName || "Agent"},

I came across your ${property.propertyType || "property"} located at ${
      property.location?.address || "the listed location"
    } on Realestway and I’m interested in learning more.

Here are the details I saw:
• Type: ${property.propertyType || "N/A"}
• Price: ${
      property.totalPrice
        ? `₦${property.totalPrice.toLocaleString()}`
        : "Price on request"
    }
• Bedrooms: ${property.bedrooms || "N/A"}
• Bathrooms: ${property.bathrooms || "N/A"}

Listing link: ${propertyUrl}

Could you please share more information about availability, payment terms, and viewing arrangements?

Thank you.`;
  };
  if (!property.user?.phone) return null;

  return (
    <div className="mt-4 w-full">
      <a
        href={`https://wa.me/${formatNigerianPhone(
          property.user.phone
        )}?text=${encodeURIComponent(createMessage())}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#00a256] w-full gap-1 p-4 items-center justify-center flex hover:bg-[#7ff3bd] text-lg text-white rounded-lg"
      >
        <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
        Contact Agent
      </a>
    </div>
  );
};

WhatsAppContactButton.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.string.isRequired,
    propertyType: PropTypes.string,
    price: PropTypes.number,
    bedrooms: PropTypes.number,
    bathrooms: PropTypes.number,
    location: PropTypes.shape({
      address: PropTypes.string,
    }),
    user: PropTypes.shape({
      fullName: PropTypes.string,
      phone: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default WhatsAppContactButton;
