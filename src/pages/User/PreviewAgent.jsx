import { useState, useEffect } from "react";

const ProfilePreview = () => {
  // State for agent data and theming
  const [agentData, setAgentData] = useState({
    name: "Sarah Johnson",
    title: "Senior Real Estate Agent",
    bio: "With over 10 years of experience in the real estate industry, I specialize in luxury properties and first-time home buying. My clients appreciate my attention to detail, market knowledge, and dedication to finding the perfect home for their needs.",
    contact: {
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@realestway.com",
      office: "RealEstWay Downtown Office",
    },
    stats: {
      propertiesSold: 127,
      yearsExperience: 10,
      clientSatisfaction: 98,
    },
    socialMedia: {
      facebook: "sarahjohnsonrealestate",
      instagram: "sarahjohnson_homes",
      linkedin: "sarah-johnson-realestate",
    },
  });

  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Luxury Waterfront Villa",
      price: "$1,250,000",
      location: "Miami Beach, FL",
      beds: 4,
      baths: 3,
      sqft: 3200,
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      featured: true,
    },
    {
      id: 2,
      title: "Modern Downtown Loft",
      price: "$675,000",
      location: "Downtown, Chicago",
      beds: 2,
      baths: 2,
      sqft: 1800,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=853&q=80",
      featured: false,
    },
    {
      id: 3,
      title: "Suburban Family Home",
      price: "$850,000",
      location: "Westfield, NJ",
      beds: 5,
      baths: 3,
      sqft: 3800,
      image:
        "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=784&q=80",
      featured: true,
    },
  ]);

  const [activeTab, setActiveTab] = useState("properties");
  const [colorTheme, setColorTheme] = useState("blue");

  // Available themes
  const themes = {
    blue: {
      primary: "bg-blue-600",
      secondary: "bg-blue-100",
      text: "text-blue-900",
      accent: "text-blue-600",
      border: "border-blue-300",
      button: "bg-blue-600 hover:bg-blue-700",
    },
    green: {
      primary: "bg-green-600",
      secondary: "bg-green-100",
      text: "text-green-900",
      accent: "text-green-600",
      border: "border-green-300",
      button: "bg-green-600 hover:bg-green-700",
    },
    purple: {
      primary: "bg-purple-600",
      secondary: "bg-purple-100",
      text: "text-purple-900",
      accent: "text-purple-600",
      border: "border-purple-300",
      button: "bg-purple-600 hover:bg-purple-700",
    },
    teal: {
      primary: "bg-teal-600",
      secondary: "bg-teal-100",
      text: "text-teal-900",
      accent: "text-teal-600",
      border: "border-teal-300",
      button: "bg-teal-600 hover:bg-teal-700",
    },
  };

  const currentTheme = themes[colorTheme];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={`${currentTheme.primary} text-white`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="fas fa-home text-2xl text-white"></i>
            <span className="text-xl font-bold">RealEstWay</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Properties
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Agents
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Banner Section */}
      <div className="relative h-80 bg-gradient-to-r from-blue-800 to-purple-700">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Dream Home
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              With the most trusted real estate professionals at RealEstWay
            </p>
          </div>
        </div>
      </div>

      {/* Agent Profile Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Agent Info Sidebar */}
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <div className="flex flex-col items-center text-center">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                    alt="Agent Photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {agentData.name}
                </h2>
                <p className="text-blue-600 font-medium">{agentData.title}</p>

                <div className="flex items-center mt-2 text-yellow-400">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                  <span className="text-gray-600 ml-2">4.8 (128 reviews)</span>
                </div>

                <div className="mt-6 w-full">
                  <button
                    className={`w-full py-3 rounded-lg text-white font-medium ${currentTheme.button} transition-colors`}
                  >
                    <i className="fas fa-phone-alt mr-2"></i> Contact Agent
                  </button>

                  <button className="w-full py-3 rounded-lg border border-gray-300 text-gray-700 font-medium mt-3 hover:bg-gray-50 transition-colors">
                    <i className="fas fa-envelope mr-2"></i> Send Message
                  </button>
                </div>

                <div className="mt-6 w-full">
                  <h3 className="font-semibold text-gray-700 mb-3">
                    Contact Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <i className="fas fa-phone-alt text-blue-500 w-6"></i>
                      <span>{agentData.contact.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-envelope text-blue-500 w-6"></i>
                      <span>{agentData.contact.email}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-building text-blue-500 w-6"></i>
                      <span>{agentData.contact.office}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 w-full">
                  <h3 className="font-semibold text-gray-700 mb-3">
                    Connect With Me
                  </h3>
                  <div className="flex justify-center space-x-4">
                    <a href="#" className="text-blue-800 hover:text-blue-600">
                      <i className="fab fa-facebook-f text-lg"></i>
                    </a>
                    <a href="#" className="text-pink-600 hover:text-pink-400">
                      <i className="fab fa-instagram text-lg"></i>
                    </a>
                    <a href="#" className="text-blue-500 hover:text-blue-400">
                      <i className="fab fa-linkedin-in text-lg"></i>
                    </a>
                    <a href="#" className="text-red-600 hover:text-red-400">
                      <i className="fab fa-youtube text-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="w-full md:w-2/3">
            {/* Stats Bar */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">
                    {agentData.stats.propertiesSold}+
                  </p>
                  <p className="text-gray-600">Properties Sold</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">
                    {agentData.stats.yearsExperience}+
                  </p>
                  <p className="text-gray-600">Years Experience</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-3xl font-bold text-purple-600">
                    {agentData.stats.clientSatisfaction}%
                  </p>
                  <p className="text-gray-600">Client Satisfaction</p>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                About Me
              </h2>
              <p className="text-gray-600 leading-relaxed">{agentData.bio}</p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Specialties
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Luxury Homes</li>
                    <li>First-time Home Buyers</li>
                    <li>Investment Properties</li>
                    <li>Relocation Services</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Areas Served
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Miami Metro Area</li>
                    <li>Fort Lauderdale</li>
                    <li>West Palm Beach</li>
                    <li>Boca Raton</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                <button
                  className={`py-4 px-1 font-medium text-sm ${
                    activeTab === "properties"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("properties")}
                >
                  My Listings
                </button>
                <button
                  className={`py-4 px-1 font-medium text-sm ${
                    activeTab === "reviews"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews
                </button>
                <button
                  className={`py-4 px-1 font-medium text-sm ${
                    activeTab === "contact"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("contact")}
                >
                  Contact
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === "properties" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  My Current Listings
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {properties.map((property) => (
                    <div
                      key={property.id}
                      className="property-card bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                      <div className="relative">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-48 object-cover"
                        />
                        {property.featured && (
                          <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            FEATURED
                          </span>
                        )}
                        <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {property.price}
                        </span>
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-800 mb-1">
                          {property.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 flex items-center">
                          <i className="fas fa-map-marker-alt text-red-500 mr-1"></i>
                          {property.location}
                        </p>

                        <div className="flex justify-between text-sm text-gray-500 border-t border-gray-100 pt-3">
                          <span>
                            <i className="fas fa-bed text-blue-500 mr-1"></i>{" "}
                            {property.beds} Beds
                          </span>
                          <span>
                            <i className="fas fa-bath text-blue-500 mr-1"></i>{" "}
                            {property.baths} Baths
                          </span>
                          <span>
                            <i className="fas fa-ruler-combined text-blue-500 mr-1"></i>{" "}
                            {property.sqft} sqft
                          </span>
                        </div>

                        <button
                          className={`w-full mt-4 py-2 rounded-lg text-white font-medium ${currentTheme.button} transition-colors`}
                        >
                          View Property Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <button className="px-6 py-3 border border-blue-500 text-blue-500 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                    View All Listings
                  </button>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Client Reviews
                </h2>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                        alt="Client"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">Michael Thompson</h4>
                      <div className="flex items-center text-yellow-400">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    Sarah helped us find our dream home in record time. Her
                    knowledge of the market and negotiation skills saved us
                    thousands. We couldn't be happier with our experience!
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Posted on June 12, 2023
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80"
                        alt="Client"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">Jessica Williams</h4>
                      <div className="flex items-center text-yellow-400">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    As first-time home buyers, we were nervous about the
                    process. Sarah guided us through every step and made us feel
                    confident in our decisions. She's truly exceptional at what
                    she does.
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Posted on May 28, 2023
                  </p>
                </div>

                <div className="text-center">
                  <button className="px-6 py-3 border border-blue-500 text-blue-500 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                    Load More Reviews
                  </button>
                </div>
              </div>
            )}

            {activeTab === "contact" && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Contact {agentData.name}
                </h2>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="How can I help you?"
                    ></textarea>
                  </div>

                  <div>
                    <label
                      htmlFor="interestedIn"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      I'm interested in
                    </label>
                    <select
                      id="interestedIn"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select an option</option>
                      <option value="buying">Buying a home</option>
                      <option value="selling">Selling a home</option>
                      <option value="renting">Renting a property</option>
                      <option value="investment">Investment properties</option>
                      <option value="consultation">Market consultation</option>
                    </select>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className={`w-full py-3 rounded-lg text-white font-medium ${currentTheme.button} transition-colors`}
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">RealEstWay</h3>
              <p className="text-gray-400">
                Finding your dream home has never been easier with our premium
                real estate services.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Properties
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Agents
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  <span>123 Main Street, Miami, FL 33101</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-phone-alt mr-2"></i>
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-2"></i>
                  <span>info@realestway.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for market updates
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-lg focus:outline-none text-gray-800"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r-lg transition-colors">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2023 RealEstWay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePreview;
