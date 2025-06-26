import PageNav from "../components/PageNav";
import Footer from "../components/Footer";

const TermsOfUse = () => {
  return (
    <div>
      <PageNav />
      <div className="min-h-screen bg-[#f9f9f9] px-4 animate-fade-in">
        <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-lg p-10 md:p-14 text-gray-800">
          <h1 className="text-4xl font-bold text-[#100073] text-center mb-10">
            Terms of Use
          </h1>
          <div className="space-y-8 text-sm leading-7 md:text-base md:leading-8">
            <p>
              <strong>Last Updated:</strong> 26/05/2025
            </p>

            <p>
              Welcome to <strong>Realestway</strong>, operated by{" "}
              <strong>Realestway LTD</strong> (“Company”, “we”, “our”, or “us”).
              These Terms of Use (“Terms”) govern your access to and use of our
              website, mobile application, and related services (collectively,
              the “Platform”). By using the Platform, you agree to comply with
              and be bound by these Terms. If you do not agree, please do not
              use the Platform.
            </p>

            <h2 className="text-[#00A256] font-semibold text-xl">
              1. Eligibility
            </h2>
            <ul className="list-disc ml-6">
              <li>
                You must be at least 18 years of age to use this Platform.
              </li>
              <li>
                You must have the legal capacity to enter into a binding
                contract.
              </li>
              <li>
                You must not be barred from using the Platform under any
                applicable laws.
              </li>
            </ul>

            <h2 className="text-[#00A256] font-semibold text-xl">
              2. User Accounts
            </h2>
            <ul className="list-disc ml-6">
              <li>
                To access certain features, you must register for an account.
              </li>
              <li>
                You agree to provide truthful, accurate, and updated
                information.
              </li>
              <li>
                You are solely responsible for maintaining the confidentiality
                of your credentials and all activity under your account.
              </li>
              <li>
                We reserve the right to suspend or terminate accounts found in
                violation of these Terms.
              </li>
            </ul>

            <h2 className="text-[#00A256] font-semibold text-xl">
              3. Property Listings
            </h2>
            <p>
              <strong>For Landlords and Property Managers:</strong>
            </p>
            <ul className="list-disc ml-6">
              <li>
                You must own or have legal authority to list any property you
                submit.
              </li>
              <li>
                Listings must be accurate, lawful, and not misleading or
                fraudulent.
              </li>
              <li>
                You must promptly update or remove listings that are no longer
                available.
              </li>
              <li>
                We may verify, approve, reject, or remove listings at our
                discretion and without notice.
              </li>
              <li>
                You are responsible for compliance with all local laws,
                regulations, and taxes related to your property.
              </li>
            </ul>

            <h2 className="text-[#00A256] font-semibold text-xl">
              4. Booking, Payments & Fees
            </h2>
            <p>
              Our Platform may facilitate bookings and rent payments. Payments
              are processed through trusted third-party payment gateways. You
              agree to:
            </p>
            <ul className="list-disc ml-6">
              <li>
                Pay all applicable fees, including service charges or
                commissions.
              </li>
              <li>Only use payment methods you are authorized to use.</li>
              <li>
                Understand that payments may be subject to verification, delays,
                or rejection by our payment processor.
              </li>
            </ul>
            <p>
              We are not a financial institution. We are not responsible for
              errors, fraud, or unauthorized use during payment transactions.
            </p>

            <h2 className="text-[#00A256] font-semibold text-xl">
              5. Future Real Estate Services
            </h2>
            <p>
              Realestway will soon offer additional services such as property
              sales, real estate investment tools, mortgage integrations, and
              financing solutions. These services may be subject to separate
              terms and conditions upon release.
            </p>

            <h2 className="text-[#00A256] font-semibold text-xl">
              6. User Conduct
            </h2>
            <ul className="list-disc ml-6">
              <li>
                You agree not to use the Platform for illegal or fraudulent
                purposes.
              </li>
              <li>
                You may not impersonate another individual or provide false
                information.
              </li>
              <li>
                You may not upload or transmit viruses, spam, or any harmful
                code.
              </li>
              <li>
                We reserve the right to report any criminal or unauthorized
                behavior to the appropriate authorities.
              </li>
            </ul>

            <h2 className="text-[#00A256] font-semibold text-xl">
              7. Intellectual Property
            </h2>
            <p>
              All content, branding, features, and functionality on the Platform
              (including code, designs, graphics, and logos) are the property of
              Realestway or its licensors and are protected by intellectual
              property laws. You may not reproduce, modify, or exploit any part
              of the Platform without prior written consent.
            </p>

            <h2 className="text-[#00A256] font-semibold text-xl">8. Privacy</h2>
            <p>
              Your use of the Platform is also governed by our{" "}
              <a href="/privacy" className="text-[#100073] underline">
                Privacy Policy
              </a>
              , which explains how we collect, use, and protect your personal
              data.
            </p>

            <h2 className="text-[#00A256] font-semibold text-xl">
              9. Termination
            </h2>
            <p>
              We reserve the right to suspend, deactivate, or permanently delete
              any user account for violations of these Terms or any applicable
              laws. You may also close your account by contacting our support
              team.
            </p>

            <h2 className="text-[#00A256] font-semibold text-xl">
              10. Disclaimers
            </h2>
            <p>
              Realestway is provided "as is" and "as available". We do not
              guarantee continuous, error-free access or that listed properties
              are accurate, available, or safe. We do not become a party to any
              rental, lease, or sale agreement. Users transact at their own
              risk.
            </p>

            <h2 className="text-[#00A256] font-semibold text-xl">
              11. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Realestway shall not be
              liable for indirect, incidental, special, or consequential damages
              arising from your use of the Platform. Our maximum liability is
              limited to the amount you have paid us (if any) in the past 12
              months.
            </p>

            <h2 className="text-[#00A256] font-semibold text-xl">
              12. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold harmless Realestway, its
              directors, officers, employees, and agents from any claims,
              damages, or legal actions arising from your use of the Platform,
              violation of these Terms, or infringement of third-party rights.
            </p>

            <h2 className="text-[#00A256] font-semibold text-xl">
              13. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by the laws of the Federal Republic
              of Nigeria. All disputes shall be subject to the exclusive
              jurisdiction of the courts in Lagos State, Nigeria.
            </p>

            <h2 className="text-[#00A256] font-semibold text-xl">
              14. Changes to These Terms
            </h2>
            <p>
              We reserve the right to amend or update these Terms at any time.
              Material changes will be communicated via the Platform or email.
              Continued use after changes implies acceptance of the revised
              Terms.
            </p>

            <h2 className="text-[#00A256] font-semibold text-xl">
              15. Contact
            </h2>
            <p>
              For questions about these Terms, contact us at:
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

export default TermsOfUse;
