import React from "react";
import PageNav from "../components/PageNav";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div>
      <PageNav />
      <div className="min-h-screen bg-[#f9f9f9] px-4 animate-fade-in">
        <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-lg p-10 md:p-14 text-gray-800">
          <h1 className="text-4xl font-bold text-[#100073] text-center mb-10">
            Privacy Policy
          </h1>
          <div className="space-y-8 text-sm leading-7 md:text-base md:leading-8">
            <p>
              <strong>Effective Date:</strong> 26/05/2025
            </p>

            <p>
              This Privacy Policy explains how <strong>Realestway LTD</strong>
              ("Realestway", "we", "our", or "us") collects, uses, and protects
              your personal information when you use our website, mobile
              application, and services (collectively, the "Platform").
            </p>

            <h2 className="text-[#00A256] font-semibold text-xl">
              1. Information We Collect
            </h2>
            <ul className="list-disc ml-6">
              <li>
                <strong>Account Information:</strong> Name, email address, phone
                number, password.
              </li>
              <li>
                <strong>Property Data:</strong> Details and images of properties
                you list or interact with.
              </li>
              <li>
                <strong>Payment Information:</strong> Transaction details,
                though sensitive data (like card numbers) are processed by
                secure third-party gateways.
              </li>
              <li>
                <strong>Usage Data:</strong> Device info, browser type, IP
                address, referring URLs, and user behavior on the Platform.
              </li>
              <li>
                <strong>Location Data:</strong> If enabled, we may collect
                geo-location for improved user experience.
              </li>
            </ul>

            <h2 className="text-[#00A256] font-semibold text-xl">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc ml-6">
              <li>To create and manage your account.</li>
              <li>
                To enable property listings and facilitate rentals or sales.
              </li>
              <li>
                To communicate with you via email, SMS, or app notifications.
              </li>
              <li>
                To process payments securely through third-party gateways.
              </li>
              <li>To improve our services, features, and customer support.</li>
              <li>
                To prevent fraud, enforce our Terms of Use, and comply with
                legal obligations.
              </li>
            </ul>

            <h2 className="text-[#00A256] font-semibold text-xl">
              3. Sharing of Information
            </h2>
            <p>
              We do not sell your personal data. We may share your information
              with:
            </p>
            <ul className="list-disc ml-6">
              <li>Payment processors and financial service providers.</li>
              <li>Service providers who help us maintain the Platform.</li>
              <li>Legal authorities, when required by law or court order.</li>
              <li>
                Other users during the rental, booking, or transaction process.
              </li>
            </ul>

            <h2 className="text-[#00A256] font-semibold text-xl">
              4. Your Rights & Choices
            </h2>
            <ul className="list-disc ml-6">
              <li>
                <strong>Access & Update:</strong> You can view and update your
                account information at any time.
              </li>
              <li>
                <strong>Delete Account:</strong> You may request account
                deletion by contacting support.
              </li>
              <li>
                <strong>Marketing Preferences:</strong> You can opt out of
                promotional communications at any time.
              </li>
              <li>
                <strong>Cookies:</strong> You can disable cookies in your
                browser settings, though some features may not work properly.
              </li>
            </ul>

            <h2 className="text-[#00A256] font-semibold text-xl">
              5. Data Security
            </h2>
            <p>
              We implement reasonable technical and organizational measures to
              protect your data from unauthorized access, loss, or misuse. All
              transactions are encrypted using industry-standard SSL.
            </p>

            <h2 className="text-[#00A256] font-semibold text-xl">
              6. Data Retention
            </h2>
            <p>
              We retain personal data only for as long as necessary to provide
              services, comply with legal obligations, resolve disputes, and
              enforce our agreements.
            </p>

            <h2 className="text-[#00A256] font-semibold text-xl">
              7. Children's Privacy
            </h2>
            <p>
              Realestway is not intended for children under 18. We do not
              knowingly collect data from minors. If you believe a child has
              provided us with personal data, please contact us for removal.
            </p>

            <h2 className="text-[#00A256] font-semibold text-xl">
              8. Third-Party Links
            </h2>
            <p>
              Our Platform may contain links to third-party websites or
              services. We are not responsible for their privacy practices. We
              encourage you to read their privacy policies before engaging.
            </p>

            <h2 className="text-[#00A256] font-semibold text-xl">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy occasionally. Changes will be
              posted on this page with a new effective date. Continued use
              implies acceptance.
            </p>

            <h2 className="text-[#00A256] font-semibold text-xl">
              10. Contact
            </h2>
            <p>
              For questions, requests, or complaints, contact us at:
              <br />
              📧{" "}
              <a
                href="mailto:support@realestway.com"
                className="text-[#100073] underline"
              >
                support@realestway.com
              </a>
              <br />
              📍 36 Olusesi Street, Eputu, Ibeju-Lekki, Lagos, Nigeria
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
