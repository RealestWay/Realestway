export default async function handler(req, res) {
  const listingId = req.query.id || req.query.listing_id;

  if (!listingId) {
    return res.status(404).json({ error: "Listing ID required" });
  }

  const userAgent = req.headers["user-agent"] || "";
  const isCrawler =
    /facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Slackbot|TelegramBot/i.test(
      userAgent
    );

  if (isCrawler) {
    try {
      const axios = (await import("axios")).default;
      const response = await axios.get(
        `https://backend.realestway.com/api/listings/${listingId}`
      );
      const listing = response.data?.data;

      const title = listing?.title || "Property Listing";
      const description =
        listing?.description?.slice(0, 200) ||
        "View this amazing property on RealEstWay.";
      const bedrooms = listing?.bedrooms || "";
      const bathrooms = listing?.bathrooms || "";
      const location =
        listing?.location?.address || listing?.location?.city || "";
      const price =
        listing?.priceBreakdown?.basicRent || listing?.totalPrice || "";
      const pricingType = listing?.priceType || "";

      const formatPrice = (price, type) => {
        const num = Number(price);
        if (isNaN(num)) return "";
        return `₦${num.toLocaleString("en-NG")}${type ? `/${type}` : ""}`;
      };

      const shortInfo = [
        formatPrice(price, pricingType),
        bedrooms ? `${bedrooms} Bedrooms` : "",
        bathrooms ? `${bathrooms} Bathrooms` : "",
        location,
      ]
        .filter(Boolean)
        .join(" • ");

      // Detect media
      let mediaUrl = "https://realestway.com/apple-touch-icon.png";
      let isVideo = false;

      if (listing.medias?.length) {
        const image = listing.medias.find((m) => m.type === "image");
        const video = listing.medias.find((m) => m.type === "video");

        if (image) {
          mediaUrl = `https://backend.realestway.com/storage/${image.path}`;
        } else if (video) {
          mediaUrl = `https://backend.realestway.com/storage/${video.path}`;
          isVideo = true;
        }
      }

      const url = `https://realestway.com/property/${listingId}`;

      // Build HTML
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${shortInfo}">
  <meta property="og:url" content="${url}">
  <meta property="og:site_name" content="RealEstWay">
  <meta property="og:image" content="${mediaUrl}">
  ${
    isVideo
      ? `<meta property="og:video" content="${mediaUrl}">
  <meta property="og:video:type" content="video/mp4">`
      : ""
  }

  <!-- Twitter -->
  <meta name="twitter:card" content="${
    isVideo ? "player" : "summary_large_image"
  }">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${shortInfo}">
  <meta name="twitter:image" content="${mediaUrl}">

  <title>${title} - RealEstWay</title>
</head>
<body>
  <div style="font-family: sans-serif; padding: 2rem; text-align: center;">
    <h1>${title}</h1>
    <p><strong>${shortInfo}</strong></p>
    <p>${description}</p>
    <p><a href="${url}">View this property on RealEstWay</a></p>
    ${
      isVideo
        ? `<video src="${mediaUrl}" controls width="100%" style="max-width: 500px; margin-top: 1rem;"></video>`
        : `<img src="${mediaUrl}" alt="Listing Image" style="max-width: 500px; margin-top: 1rem;">`
    }
  </div>
</body>
</html>`;

      res.setHeader("Content-Type", "text/html");
      res.status(200).send(html);
    } catch (error) {
      console.error("Preview error:", error.message);
      return res
        .status(200)
        .send(`<h1>Preview Error</h1><p>${error.message}</p>`);
    }
  } else {
    // Fallback: redirect to frontend SPA
    res.writeHead(302, {
      Location: `https://realestway.com/property/${listingId}`,
    });
    res.end();
  }
}
