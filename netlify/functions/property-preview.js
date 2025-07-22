const axios = require("axios");
const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 3600 }); // 1 hour cache

// Helper function to format price
const formatPrice = (price, type) => {
  if (!price) return "";
  const num = Number(price);
  return isNaN(num) ? price : `₦${num.toLocaleString("en-NG")}/${type}`;
};

exports.handler = async function (event, context) {
  const path = event.path || "";
  const matches = path.match(/\/property\/([a-f0-9]{24})$/);

  if (!matches || matches.length < 2) {
    return {
      statusCode: 400,
      body: "Invalid listing ID format",
    };
  }

  const listingId = matches[1];

  const userAgent = event.headers["user-agent"] || "";
  const isCrawler = /facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp/i.test(
    userAgent
  );

  if (!isCrawler) {
    return {
      statusCode: 302,
      headers: {
        Location: `https://realestway.com/property/${listingId}`,
      },
    };
  }

  // Serve from cache if available
  const cachedHtml = cache.get(listingId);
  if (cachedHtml) {
    return {
      statusCode: 200,
      headers: cachedHtml.headers,
      body: cachedHtml.body,
    };
  }

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

    let imageUrl = "https://realestway.com/Realestway_horizontal.svg";

    if (Array.isArray(listing?.medias)) {
      const imageMedia = listing.medias.find((m) => m.type === "image");
      const videoMedia = listing.medias.find((m) => m.type === "video");

      if (imageMedia) {
        imageUrl = `https://backend.realestway.com/storage/${imageMedia.path}`;
      } else if (videoMedia) {
        imageUrl = `https://img.youtube.com/vi/${videoMedia.path}/maxresdefault.jpg`;
      }
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${metaDescription}">
        <meta property="og:image" content="${imageUrl}">
        <meta property="og:url" content="https://realestway.com/property/${listingId}">
        <meta property="og:type" content="website">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${title}">
        <meta name="twitter:description" content="${metaDescription}">
        <meta name="twitter:image" content="${imageUrl}">
      </head>
      <body>
        <div style="text-align:center;padding:20px;font-family:Arial,sans-serif;">
          <img src="${imageUrl}" alt="${title}" style="max-width:100%;height:auto;">
          <h1>${title}</h1>
          <p>${metaDescription}</p>
          <a href="https://realestway.com/property/${listingId}">View Full Details</a>
        </div>
      </body>
      </html>
    `;

    const responseObj = {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "public, max-age=3600",
      },
      body: html,
    };

    cache.set(listingId, responseObj);

    return {
      statusCode: 200,
      headers: responseObj.headers,
      body: responseObj.body,
    };
  } catch (error) {
    console.error("Error:", error.message);

    const fallbackHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta property="og:title" content="Property Listing - Realestway">
        <meta property="og:description" content="Find your perfect home">
        <meta property="og:image" content="https://realestway.com/Realestway_horizontal.svg">
        <meta property="og:url" content="https://realestway.com/property/${listingId}">
      </head>
      <body>
        <h1>Property Listing</h1>
        <p>Discover amazing properties on Realestway</p>
      </body>
      </html>
    `;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: fallbackHtml,
    };
  }
};
