import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";
import PageNav from "../components/PageNav";

const faqs = [
  // Renters
  {
    question: "How do I search for a rental property?",
    answer:
      "Use the filter on the search page to find properties by location, price, and property type.",
    category: "Renters",
  },
  {
    question: "Do I need to pay to use the platform as a tenant?",
    answer:
      "No. Browsing listings and contacting landlords is free for tenants.",
    category: "Renters",
  },
  {
    question: "Can I save properties I like?",
    answer:
      "Yes. Create an account to save favorites and get notified of updates.",
    category: "Renters",
  },
  {
    question: "How do I contact the property owner?",
    answer: "Each listing has a 'Contact Agent' button you can use.",
    category: "Renters",
  },
  {
    question: "What should I do if I face issues with the property?",
    answer:
      "Reach out to the property owner or use our support channel to report urgent issues.",
    category: "Renters",
  },
  {
    question: "How are rental payments handled?",
    answer:
      "Tenants pay securely through our platform. Funds are transferred to respective accounts of caretaker, agent or landlord after processing.",
    category: "Rentals",
  },
  {
    question:
      "How long does it take to process my payments and secure the apartment?",
    answer:
      "Payment processing doesn't exceeds 30 minutes if there is no complications. However, all payments are secured with us.",
    category: "Rentals",
  },

  // agents
  {
    question: "What does it cost to list a property?",
    answer:
      "Listing is free for now. Premium plans may be introduced in the future.",
    category: "agents",
  },
  {
    question: "Can I list multiple properties?",
    answer:
      "Absolutely. There’s no limit on how many properties you can manage.",
    category: "agents",
  },
  {
    question: "How do I edit or remove a listing?",
    answer: "Go to your profile > My Listings > Edit or Delete.",
    category: "agents",
  },
  {
    question: "Are my listings public immediately?",
    answer:
      "Yes, but all listings go through a short verification instanteneously and can be removed.",
    category: "agents",
  },
  {
    question: "Can I track tenant interest or views on my listing?",
    answer:
      "Yes. Your profile page provides insights like views, saves, and inquiries.",
    category: "agents",
  },

  // Payments & Security
  {
    question: "Is payment handled through the platform?",
    answer:
      "Yes. We provide a secure gateway for rental payments (more features coming).",
    category: "Payments",
  },
  {
    question: "How safe is my data on your platform?",
    answer:
      "Your information is encrypted and never shared with third parties without consent.",
    category: "Payments",
  },
  {
    question: "Can I pay rent in installments?",
    answer: "We currently don't support such option.",
    category: "Payments",
  },
  {
    question: "What if I suspect a fake listing?",
    answer:
      "Please report it immediately using the our floating 'support chat' or contact support through mail support@realestway.com.",
    category: "Payments",
  },

  // Sales & Investment
  {
    question: "Will you support property sales?",
    answer:
      "Yes! We're expanding to include property buying and selling. Stay tuned or sign up for early access.",
    category: "Coming Soon",
  },
  {
    question: "When will property sales be available?",
    answer:
      "We're launching sales features soon. Join our newsletter to get early access.",
    category: "Sales",
  },
  {
    question: "Will you support home loans or mortgage info?",
    answer:
      "Yes, in the near future we plan to working on partnerships with lenders to offer mortgage tools and calculators.",
    category: "Sales",
  },
  {
    question: "Can I list a property for sale and for rent?",
    answer:
      "Yes. In the future, you'll be able to choose multiple listing types.",
    category: "Sales",
  },

  // Platform
  {
    question: "Is there a mobile app?",
    answer:
      "Not yet, but it's in development. Use our mobile-friendly site for now.",
    category: "Platform",
  },
  {
    question: "How can I change my password?",
    answer:
      "Kindly visit your profile and click the setting icon, there you can fill in the appropriate details to change your password.",
    category: "Platform",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Go to the login page and click 'Forgot Password' to reset via email.",
    category: "Platform",
  },
  {
    question: "How do I verify my identity as an agent, caretaker or landlord?",
    answer:
      "During onboarding process, we'll prompt you to upload a valid ID and other essential details.",
    category: "Platform",
  },
];

const FaqPage = () => {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageNav />
      <div className="min-h-screen bg-[#f9f9f9] px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center text-[#100073] mb-8">
            Frequently Asked Questions
          </h1>

          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Type keywords in your question..."
              className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#00A256] text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-2.5 text-gray-400"
            />
          </div>

          {/* FAQ Items */}
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 py-4 transition-all duration-200"
              >
                <button
                  className="w-full flex justify-between items-center text-left"
                  onClick={() => toggle(index)}
                >
                  <span className="text-base font-medium text-[#100073]">
                    {faq.question}
                  </span>
                  <FontAwesomeIcon
                    icon={openIndex === index ? faChevronUp : faChevronDown}
                    className="text-[#00A256] transition duration-200"
                  />
                </button>
                {openIndex === index && (
                  <p className="mt-2 text-gray-600 animate-fade-in">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-8">
              No questions matched your search.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FaqPage;
