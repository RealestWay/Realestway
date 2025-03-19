// netlify/functions/api.js
exports.handler = async function (event, context) {
  // Example: serve some data
  const data = {
    houses: [
      {
        id: "H001",
        title: "Luxury 2-Bedroom Apartment",
        description:
          "A modern, fully furnished 2-bedroom apartment with great city views.",
        price: 1200,
        price_type: "per month",
        location: {
          address: "123 Main St, Downtown, New York",
          city: "New York",
          state: "NY",
          zipcode: "10001",
          lat: 40.7128,
          lng: -74.006,
        },
        images: [
          "/img1f1.jpg",
          "/img1f2.jpg",
          "/img2f1.jpg",
          "/img1f3.jpg",
          "/img3n1.jpg",
          "/img2f1.jpg",
        ],
        details: {
          bedrooms: 2,
          bathrooms: 2,
          square_feet: 960,
          year_built: 2018,
          property_type: "Apartment",
          furnishing: "Fully Furnished",
          available_from: "2024-06-01",
        },
        amenities: [
          "WiFi",
          "Air Conditioning",
          "Gym",
          "Swimming Pool",
          "24/7 Security",
          "Parking",
        ],
        agent_id: "A001",
        status: "available",
        date_listed: "2024-05-15",
      },
      {
        id: "H002",
        title: "Cozy Studio Apartment",
        description:
          "Perfect for singles or couples, close to shopping centers and public transport.",
        price: 800,
        price_type: "per month",
        location: {
          address: "456 Elm St, Brooklyn, NY",
          city: "Brooklyn",
          state: "NY",
          zipcode: "11201",
          lat: 40.6782,
          lng: -73.9442,
        },
        images: [
          "/img2n1.jpg",
          "/img1n2.jpg",
          "/img1n3.jpg",
          "/img1n3.jpg",
          "/img1n5.jpg",
          "/img1n4.jpg",
        ],
        details: {
          bedrooms: 1,
          bathrooms: 1,
          square_feet: 450,
          year_built: 2015,
          property_type: "Studio",
          furnishing: "Semi-Furnished",
          available_from: "2024-07-01",
        },
        amenities: ["High-Speed Internet", "24/7 Security", "Laundry Service"],
        agent_id: "A001",
        status: "available",
        date_listed: "2024-05-20",
      },
      {
        id: "H003",
        title: "2-Bedroom Apartment",
        description:
          "fully furnished 2-bedroom apartment with great city views.",
        price: 1200,
        price_type: "per month",
        location: {
          address: "123 Main St, Downtown, New York",
          city: "New York",
          state: "NY",
          zipcode: "10001",
          lat: 40.7128,
          lng: -74.006,
        },
        images: [
          "/img2f1.jpg",
          "/img1n2.jpg",
          "/img2n1.jpg",
          "/img1n3.jpg",
          "/img3n1.jpg",
          "/img2n1.jpg",
        ],
        details: {
          bedrooms: 2,
          bathrooms: 2,
          square_feet: 560,
          year_built: 2018,
          property_type: "Apartment",
          furnishing: "Fully Furnished",
          available_from: "2024-06-01",
        },
        amenities: ["Air Conditioning", "Gym", "24/7 Security", "Parking"],
        agent_id: "A001",
        status: "available",
        date_listed: "2024-05-15",
      },
      {
        id: "H004",
        title: "Luxury 2-Bedroom Apartment",
        description:
          "A modern, fully furnished 2-bedroom apartment with great city views.",
        price: 1200,
        price_type: "per month",
        location: {
          address: "123 Main St, Downtown, New York",
          city: "New York",
          state: "NY",
          zipcode: "10001",
          lat: 40.7128,
          lng: -74.006,
        },
        images: [
          "/img2f1.jpg",
          "/img1n2.jpg",
          "/img2n1.jpg",
          "/img1n3.jpg",
          "/img3n1.jpg",
          "/img2n1.jpg",
        ],
        details: {
          bedrooms: 2,
          bathrooms: 2,
          square_feet: 960,
          year_built: 2018,
          property_type: "Apartment",
          furnishing: "Fully Furnished",
          available_from: "2024-06-01",
        },
        amenities: [
          "WiFi",
          "Air Conditioning",
          "Gym",
          "Swimming Pool",
          "24/7 Security",
          "Parking",
        ],
        agent_id: "A001",
        status: "available",
        date_listed: "2024-05-15",
      },
      {
        id: "H005",
        title: "Luxury 2-Bedroom Apartment",
        description:
          "A modern, fully furnished 2-bedroom apartment with great city views.",
        price: 1200,
        price_type: "per month",
        location: {
          address: "123 Main St, Downtown, New York",
          city: "New York",
          state: "NY",
          zipcode: "10001",
          lat: 40.7128,
          lng: -74.006,
        },
        images: [
          "/img2f1.jpg",
          "/img1n2.jpg",
          "/img2n1.jpg",
          "/img1n3.jpg",
          "/img3n1.jpg",
          "/img2n1.jpg",
        ],
        details: {
          bedrooms: 2,
          bathrooms: 2,
          square_feet: 960,
          year_built: 2018,
          property_type: "Apartment",
          furnishing: "Fully Furnished",
          available_from: "2024-06-01",
        },
        amenities: [
          "WiFi",
          "Air Conditioning",
          "Gym",
          "Swimming Pool",
          "24/7 Security",
          "Parking",
        ],
        agent_id: "A001",
        status: "available",
        date_listed: "2024-05-15",
      },
      {
        id: "H006",
        title: "Luxury 2-Bedroom Apartment",
        description:
          "A modern, fully furnished 2-bedroom apartment with great city views.",
        price: 1200,
        price_type: "per month",
        location: {
          address: "123 Main St, Downtown, New York",
          city: "New York",
          state: "NY",
          zipcode: "10001",
          lat: 40.7128,
          lng: -74.006,
        },
        images: [
          "/img2f1.jpg",
          "/img1n2.jpg",
          "/img2n1.jpg",
          "/img1n3.jpg",
          "/img3n1.jpg",
          "/img2n1.jpg",
        ],
        details: {
          bedrooms: 2,
          bathrooms: 2,
          square_feet: 960,
          year_built: 2018,
          property_type: "Apartment",
          furnishing: "Fully Furnished",
          available_from: "2024-06-01",
        },
        amenities: [
          "WiFi",
          "Air Conditioning",
          "Gym",
          "Swimming Pool",
          "24/7 Security",
          "Parking",
        ],
        agent_id: "A001",
        status: "available",
        date_listed: "2024-05-15",
      },
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
        images: [{}, {}, {}, {}, {}, {}],
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

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
