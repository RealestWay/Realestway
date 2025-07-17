const axios = require("axios");

exports.handler = async (event) => {
  const listingId =
    event.queryStringParameters?.id || event.queryStringParameters?.listing_id;

  if (!listingId) {
    return {
      statusCode: 400,
      body: "Listing ID is required",
    };
  }

  const userAgent = event.headers["user-agent"] || "";
  const isCrawler =
    /facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Slackbot|TelegramBot/i.test(
      userAgent
    );

  if (isCrawler) {
    try {
      const response = await axios.get(
        `https://backend.realestway.com/api/listings/${listingId}`
      );
      const listing = response.data?.data;

      const title = listing?.title || "Property Listing";
      const description = listing?.description || "";
      const bedrooms = listing?.bedrooms || "";
      const bathrooms = listing?.bathrooms || "";
      const location =
        listing?.location?.address || listing?.location?.city || "";
      const price =
        listing?.priceBreakdown?.basicRent || listing?.totalPrice || "";
      const pricingType = listing?.priceType || "";

      // Format price
      const formatPrice = (price, type) => {
        if (!price) return "";
        const num = Number(price);
        return isNaN(num)
          ? price
          : `₦${num.toLocaleString("en-NG")}${type ? `/${type}` : ""}`;
      };

      // Create description for meta
      const metaDescription = [
        description,
        bedrooms ? `${bedrooms} bedrooms` : "",
        bathrooms ? `${bathrooms} bathrooms` : "",
        location,
        price ? formatPrice(price, pricingType) : "",
      ]
        .filter(Boolean)
        .join(" • ")
        .slice(0, 160);

      // Determine image or video preview
      let imageUrl = "https://realestway.com/Realestway horizontal.svg"; // fallback logo

      if (Array.isArray(listing?.medias)) {
        const imageMedia = listing.medias.find(
          (media) => media.type === "image"
        );
        const videoMedia = listing.medias.find(
          (media) => media.type === "video"
        );

        if (imageMedia) {
          imageUrl = `https://backend.realestway.com/storage/${imageMedia.path}`;
        } else if (videoMedia) {
          imageUrl = `https://img.youtube.com/vi/${videoMedia.path}/maxresdefault.jpg`; // or a placeholder
        }
      }

      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta property="og:type" content="website">
          <meta property="og:title" content="${title}">
          <meta property="og:description" content="${metaDescription}">
          <meta property="og:image" content="${imageUrl}">
          <meta property="og:url" content="https://realestway.com/property/${listingId}">
          <meta property="og:site_name" content="Realestway">
          <meta name="twitter:card" content="summary_large_image">
          <meta name="twitter:title" content="${title}">
          <meta name="twitter:description" content="${metaDescription}">
          <meta name="twitter:image" content="${imageUrl}">
          <title>${title}</title>
        </head>
        <body>
          <div style="text-align:center;padding:50px;font-family:Arial,sans-serif;">
            <h1>${title}</h1>
            <p>This content is optimized for social media sharing.</p>
            <a href="https://realestway.com/property/${listingId}">View Full Property Details</a>
          </div>
        </body>
        </html>
      `;

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "text/html",
        },
        body: html,
      };
    } catch (err) {
      console.error("API Fetch Error:", err.message);

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "text/html",
        },
        body: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta property="og:title" content="Property Listing - Realestway">
            <meta property="og:description" content="Find your perfect home on Realestway.">
            <meta property="og:image" content="https://realestway.com/full-logo.png">
            <meta property="og:url" content="https://realestway.com/property/${listingId}">
            <title>Property Listing</title>
          </head>
          <body>
            <h1>Error Loading Property</h1>
            <p>We couldn’t load the listing preview.</p>
          </body>
          </html>
        `,
      };
    }
  }

  // Non-crawler users: redirect to React app
  return {
    statusCode: 302,
    headers: {
      Location: `https://realestway.com/property/${listingId}`,
    },
    body: "",
  };
};
