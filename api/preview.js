export default async function handler(req, res) {
  const id = req.query.id;
  const userAgent = req.headers["user-agent"] || "";
  const isBot = /facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp/i.test(
    userAgent
  );

  // Normal users: redirect to actual property page
  if (!isBot) {
    res.writeHead(302, { Location: `/property/${id}` });
    res.end();
    return;
  }

  try {
    const response = await fetch(`https://your-backend.com/api/listings/${id}`);
    const data = await response.json();
    const listing = data?.data;

    const title = listing?.title || "Realestway Property";
    const description =
      listing?.description || "Explore amazing properties on Realestway";
    const image = listing?.medias?.[0]?.path
      ? `https://your-backend.com/storage/${listing.medias[0].path}`
      : "https://realestway.com/Realestway_horizontal.svg";

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title}</title>
        <meta property="og:title" content="${title}" />
        <meta property="og:image" content="${image}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:url" content="https://realestway.vercel.app/property/${id}" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:image" content="${image}" />
        <meta name="twitter:description" content="${description}" />
      </head>
      <body></body>
      </html>
    `;

    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  } catch (err) {
    console.error("Preview error:", err);
    res.status(500).send("Preview error");
  }
}
