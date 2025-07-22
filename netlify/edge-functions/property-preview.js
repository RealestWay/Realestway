import { parse } from "url";

export default async (request, context) => {
  const userAgent = request.headers.get("user-agent") || "";
  const isCrawler = /facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp/i.test(
    userAgent
  );

  const url = new URL(request.url);
  const matches = url.pathname.match(/\/property\/([a-f0-9]{24})$/);
  const listingId = matches?.[1];

  if (!isCrawler || !listingId) {
    return context.next(); // Let the frontend handle it normally
  }

  try {
    const res = await fetch(
      `https://backend.realestway.com/api/listings/${listingId}`
    );
    const json = await res.json();
    const listing = json?.data;

    const title = listing?.title || "Property Listing";
    const description = listing?.description || "";
    const price =
      listing?.priceBreakdown?.basicRent || listing?.totalPrice || "";
    const pricingType = listing?.priceType || "";

    const imageMedia = listing?.medias?.find((m) => m.type === "image");
    const imageUrl = imageMedia
      ? `https://backend.realestway.com/storage/${imageMedia.path[0]}`
      : "https://realestway.com/Realestway_horizontal.svg";

    const meta = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${title}</title>
          <meta property="og:title" content="${title}" />
          <meta property="og:description" content="${description}" />
          <meta property="og:image" content="${imageUrl}" />
          <meta property="og:url" content="https://realestway.com/property/${listingId}" />
          <meta name="twitter:card" content="summary_large_image" />
        </head>
        <body>
          <p>Redirecting...</p>
          <script>
            window.location.href = "https://realestway.com/property/${listingId}";
          </script>
        </body>
      </html>
    `;

    return new Response(meta, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error(error);
    return new Response("Preview unavailable", {
      status: 500,
    });
  }
};
