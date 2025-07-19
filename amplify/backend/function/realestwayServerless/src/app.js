const express = require("express");
const axios = require("axios");
const NodeCache = require("node-cache");
const rateLimit = require("express-rate-limit");

// Initialize cache (1 hour TTL)
const cache = new NodeCache({ stdTTL: 3600 });

// Rate limiting (100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const app = express();
app.use(limiter);

// Helper function to format price
const formatPrice = (price, type) => {
  if (!price) return "";
  const num = Number(price);
  return isNaN(num) ? price : `₦${num.toLocaleString("en-NG")}/${type}`;
};

// Main handler
app.get("/property/:id", async (req, res) => {
  try {
    const listingId = req.params.id;

    // Validate ID format (example for MongoDB-like IDs)
    if (!/^[a-f0-9]{24}$/.test(listingId)) {
      return res.status(400).send("Invalid listing ID format");
    }

    const userAgent = req.headers["user-agent"] || "";
    const isCrawler =
      /facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp/i.test(userAgent);

    if (!isCrawler) {
      return res.redirect(`https://realestway.com/property/${listingId}`);
    }

    // Check cache first
    const cachedHtml = cache.get(listingId);
    if (cachedHtml) {
      return res.set(cachedHtml.headers).status(200).send(cachedHtml.body);
    }

    // Fetch listing data
    const response = await axios.get(
      `https://backend.realestway.com/api/listings/${listingId}`
    );
    const listing = response.data?.data;

    // Prepare meta data
    const title = listing?.title || "Property Listing";
    const description = listing?.description || "";
    const bedrooms = listing?.bedrooms || "";
    const bathrooms = listing?.bathrooms || "";
    const location =
      listing?.location?.address || listing?.location?.city || "";
    const price =
      listing?.priceBreakdown?.basicRent || listing?.totalPrice || "";
    const pricingType = listing?.priceType || "";

    // Generate description
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

    // Get image or video thumbnail
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

    // Generate HTML
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

    // Cache response
    const responseObj = {
      headers: {
        "Content-Type": "text/html",
        "Cache-Control": "public, max-age=3600",
      },
      body: html,
    };
    cache.set(listingId, responseObj);

    return res.set(responseObj.headers).status(200).send(responseObj.body);
  } catch (error) {
    console.error("Error:", error.message);

    // Fallback response
    const fallbackHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta property="og:title" content="Property Listing - Realestway">
        <meta property="og:description" content="Find your perfect home">
        <meta property="og:image" content="https://realestway.com/Realestway_horizontal.svg">
        <meta property="og:url" content="https://realestway.com/property/${req.params.id}">
      </head>
      <body>
        <h1>Property Listing</h1>
        <p>Discover amazing properties on Realestway</p>
      </body>
      </html>
    `;

    return res.status(200).set("Content-Type", "text/html").send(fallbackHtml);
  }
});

module.exports = app;
