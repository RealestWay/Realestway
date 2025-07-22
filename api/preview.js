export default async function handler(req, res) {
  // Get listing ID from query parameter
  const listingId = req.query.id || req.query.listing_id;

  if (!listingId) {
    return res.status(404).json({ error: "Listing ID required" });
  }

  const userAgent = req.headers["user-agent"] || "";

  // Check if visitor is a social media crawler
  const isCrawler =
    /facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Slackbot|TelegramBot/i.test(
      userAgent
    );

  if (isCrawler) {
    try {
      // Import axios dynamically for serverless
      const axios = (await import("axios")).default;

      // Fetch listing data from your Laravel API
      console.log(`Fetching listing: ${listingId}`);
      const response = await axios.get(
        `https://backend.realestway.com/api/listings/${listingId}`
      );
      const apiData = response.data;
      const listing = apiData.data;

      console.log(
        `Listing fetched: ${listing.title}, Media count: ${
          listing.medias?.length || 0
        }`
      );

      // Extract data with better error handling
      const title = listing.title || "Property Listing";
      const description = listing.description || "";
      const bedrooms = listing.bedrooms || "";
      const bathrooms = listing.bathrooms || "";
      const location =
        listing.location?.address ||
        listing.location?.locationAddress ||
        listing.location?.city ||
        "";
      const price =
        listing.priceBreakdown?.basicRent || listing.totalPrice || "";
      const pricingType = listing.priceType || "";

      // Get image URL - prioritize images, fallback to PNG logo for videos
      let imageUrl = "https://realestway.com/apple-touch-icon.png"; // Changed to PNG

      if (listing.medias && listing.medias.length > 0) {
        // Look for any image type media
        const imageMedia = listing.medias.find(
          (media) => media.type === "image"
        );

        if (imageMedia) {
          imageUrl = `https://backend.realestway.com/storage/${imageMedia.path[0]}`;
        }
        // If no images found (video-only), keep PNG logo
      }

      // Format price with better error handling
      const formatPrice = (price, type) => {
        if (!price) return "";
        try {
          const numPrice = Number(price);
          if (isNaN(numPrice)) return "";

          return `₦${numPrice.toLocaleString("en-NG")}${
            type ? `/${type}` : ""
          }`;
        } catch (error) {
          return `₦${price}${type ? `/${type}` : ""}`;
        }
      };

      // Create description
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

      console.log(
        `Final: Title="${title}", Description="${metaDescription}", Image="${imageUrl}"`
      );

      // Generate HTML with meta tags
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${metaDescription}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:url" content="https://realestway.vercel.app/property/${listingId}">
  <meta property="og:site_name" content="RealEstWay">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${metaDescription}">
  <meta name="twitter:image" content="${imageUrl}">
  
  <title>${title} - RealEstWay</title>
</head>
<body>
  <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
    <h1>${title}</h1>
    <p>This content is optimized for social media sharing.</p>
    <a href="https://realestway.vercel.app/#/property/${listingId}" style="color: #007bff; text-decoration: none;">View Full Property Details</a>
  </div>
</body>
</html>`;

      console.log("Returning HTML response for crawler");
      res.setHeader("Content-Type", "text/html");
      res.status(200).send(html);
    } catch (error) {
      console.error("Error fetching listing:", error.message);
      console.error("Error details:", error.response?.data || error);

      // Return fallback HTML with more details
      const fallbackHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta property="og:title" content="Property Listing - RealEstWay">
  <meta property="og:description" content="Find your perfect home on RealEstWay - Nigeria's trusted real estate marketplace">
  <meta property="og:image" content="https://realestway.com/full-logo.png">
  <meta property="og:url" content="https://realestway.vercel.app/property/${listingId}">
  <meta property="og:site_name" content="RealEstWay">
  <title>Property Listing - RealEstWay</title>
</head>
<body>
  <h1>Property Listing</h1>
  <p>Loading property details... (Error: ${error.message})</p>
</body>
</html>`;

      res.setHeader("Content-Type", "text/html");
      res.status(200).send(fallbackHtml);
    }
  } else {
    // For regular users, serve the React app with proper routing
    const fs = await import("fs");
    const path = await import("path");

    try {
      // Serve the index.html file directly
      const indexPath = path.join(process.cwd(), "dist", "index.html");
      const indexHtml = fs.readFileSync(indexPath, "utf8");

      res.setHeader("Content-Type", "text/html");
      res.status(200).send(indexHtml);
    } catch (error) {
      // Fallback redirect
      res.writeHead(302, {
        Location: `https://realestway.vercel.app/#/property/${listingId}`,
      });
      res.end();
    }
  }
}
