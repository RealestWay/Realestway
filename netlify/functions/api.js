// netlify/functions/api.js
exports.handler = async function (event, context) {
  const path = event.path.split("/").pop();
  // Example: serve some data
  const data = {
    houses: [
      {
        id: "h1742375816900",
        title: "Conducive Selfcon for singles",
        address: "Obia/Akpor, Rumuodomaya , Nigeria",
        description:
          "It's a complete self contain with all necessary facilities, that is conducive and comfortable for singles. Kitchen and person restroom.",
        bedrooms: "1",
        bathrooms: "1",
        dimension: "20 by 60 ft",
        propertyType: "Self Contain",
        year_built: "2021-02-03",
        furnishing: "Not Furnished",
        caretaker_contact: "+2348120606547",
        price_type: "yearly",
        date_listed: "2025-03-19T09:16:56.900Z",
        agent_id: "A002",
        minTenancyPeriod: "1 year",
        amenities: ["Security", "Running Water", "Electricity"],
        location: {
          latitude: 6.5568768,
          longitude: 3.3325056,
          address: "Nigeria",
          city: "Lagos",
          state: "Lagos",
          zipCode: "N/A",
          error: "",
        },
        priceBreakdown: {
          basicRent: 400000,
          cautionFee: 50000,
          agentFee: 50000,
          otherFees: "",
          agreementFee: 50000,
        },
        totalPrice: 550000,
        images: [
          { src: "/img1f1.jpg" },
          { src: "/img1f2.jpg" },
          { src: "/img2f1.jpg" },
          { src: "/img1f3.jpg" },
          { src: "/img3n1.jpg" },
          { src: "/img2f1.jpg" },
        ],
        video: null,
      },

      {
        id: "h1742375816901",
        title: "Affordable Studio in Downtown",
        address: "123 Downtown St, Cityville, USA",
        description:
          "A cozy and affordable studio apartment in the heart of the city, close to shops and public transport.",
        bedrooms: "1",
        bathrooms: "1",
        dimension: "15 by 40 ft",
        propertyType: "Studio",
        year_built: "2023-11-15",
        furnishing: "Fully Furnished",
        caretaker_contact: "+12345678901",
        price_type: "monthly",
        date_listed: "2025-03-20T10:00:00.000Z",
        agent_id: "A003",
        minTenancyPeriod: "6 months",
        amenities: ["WiFi", "Air Conditioning", "Parking"],
        location: {
          latitude: 40.7128,
          longitude: -74.006,
          address: "USA",
          city: "Cityville",
          state: "NY",
          zipCode: "10001",
          error: "",
        },
        priceBreakdown: {
          basicRent: 900,
          cautionFee: 100,
          agentFee: 100,
          otherFees: "",
          agreementFee: 50,
        },
        totalPrice: 1150,
        images: [
          { src: "/img1a.jpg" },
          { src: "/img2a.jpg" },
          { src: "/img3a.jpg" },
          { src: "/img4a.jpg" },
          { src: "/img5a.jpg" },
          { src: "/img6a.jpg" },
        ],
        video: null,
      },
      {
        id: "h1742375816902",
        title: "Spacious 3-Bedroom House in Suburbia",
        address: "456 Suburbia Ave, Suburbia Town, USA",
        description:
          "A spacious 3-bedroom house located in a peaceful neighborhood, perfect for families.",
        bedrooms: "3",
        bathrooms: "2",
        dimension: "35 by 70 ft",
        propertyType: "House",
        year_built: "2020-07-10",
        furnishing: "Partially Furnished",
        caretaker_contact: "+12345678902",
        price_type: "yearly",
        date_listed: "2025-03-20T11:00:00.000Z",
        agent_id: "A004",
        minTenancyPeriod: "1 year",
        amenities: ["Garden", "Garage", "Fireplace", "Dishwasher"],
        location: {
          latitude: 40.7129,
          longitude: -74.0059,
          address: "USA",
          city: "Suburbia Town",
          state: "NY",
          zipCode: "10002",
          error: "",
        },
        priceBreakdown: {
          basicRent: 2500,
          cautionFee: 250,
          agentFee: 250,
          otherFees: "",
          agreementFee: 150,
        },
        totalPrice: 3150,
        images: [
          { src: "/img1b.jpg" },
          { src: "/img2b.jpg" },
          { src: "/img3b.jpg" },
          { src: "/img4b.jpg" },
          { src: "/img5b.jpg" },
          { src: "/img6b.jpg" },
        ],
        video: null,
      },
    ],
    agents: [
      {
        id: "A001",
        name: "John Doe",
        email: "johndoe@example.com",
        password: "Realest",
        phone: "+1 555 123 4567",
        company: "NYC Realty",
        profile_picture: "/images/agent1.jpg",
        listings: ["H001"],
      },
      {
        id: "A002",
        name: "Sarah Johnson",
        email: "sarahj@example.com",
        password: "Realest",
        phone: "+1 555 987 6543",
        company: "Brooklyn Homes",
        profile_picture: "/images/agent2.jpg",
        listings: ["H002"],
      },
    ],
    users: [
      {
        id: "U001",
        name: "Alice Smith",
        email: "alice@example.com",
        password: "Realest",
        phone: "+1 555 123 9876",
        saved_houses: ["H001"],
        rented_houses: [],
        role: "renter",
      },
      {
        id: "U002",
        name: "Bob Wilson",
        email: "bob@example.com",
        password: "Realest",
        phone: "+1 555 321 4567",
        saved_houses: ["H002"],
        rented_houses: ["H002"],
        role: "renter",
      },
      {
        id: "614b",
        name: "Adebayo Michael",
        email: "adebayomichaelo01@gmail.com",
        phone: "08120606547",
        password: "ademilk",
      },
      {
        id: "a740",
        name: "Ademilk",
        email: "adebayo@gmail.com",
        phone: "08120606547",
        password: "passme",
      },
      {
        id: "6b96",
        name: "Adebayo Michael",
        email: "adebayomichaelo01@gmail.com",
        phone: "08120606547",
        password: "milky",
      },
      {
        id: "24a4",
        name: "Adebayo Michael",
        email: "adebayomichaelo01@gmail.com",
        phone: "08120606547",
        password: "Milkyink2!",
      },
    ],
    transactions: [
      {
        id: "T001",
        user_id: "U002",
        house_id: "H002",
        amount: 800,
        payment_method: "Credit Card",
        status: "completed",
        date: "2024-06-01",
      },
    ],
    reviews: [
      {
        id: "R001",
        user_id: "U002",
        house_id: "H002",
        rating: 4.5,
        comment: "Great location and clean apartment.",
        date: "2024-06-02",
      },
      {
        id: "R002",
        user_id: "U001",
        agent_id: "A001",
        rating: 5,
        comment: "Very professional and responsive agent!",
        date: "2024-06-05",
      },
    ],
  };

  if (data[path]) {
    return {
      statusCode: 200,
      body: JSON.stringify(data[path]),
    };
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Data not found" }),
    };
  }
};
