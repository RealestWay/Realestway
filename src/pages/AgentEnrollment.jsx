import { useState } from "react";
import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

const AgentEnrollmentPage = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission (you can add your API request or state handling here)
    setFormSubmitted(true);
  };

  return (
    <div>
      <header style={headerStyle}>
        <PageNav />
        <h1>Welcome to RealEstWay</h1>
        <p>Your trusted partner for house renting and real estate services.</p>
      </header>

      <div style={containerStyle}>
        {/* Intro Section */}
        <section style={sectionStyle}>
          <h2>Join Our Real Estate Network</h2>
          <p>
            At RealEstWay, we are committed to creating a strong network of real
            estate agents who share our passion for excellence and customer
            satisfaction. Our vision is to revolutionize the real estate
            experience, making it easier for buyers and renters to find their
            perfect homes while providing agents with the tools and support they
            need to succeed.
          </p>
          <p>
            Our mission is to provide innovative solutions for both agents and
            clients, fostering long-term relationships built on trust and
            professionalism.
          </p>
          <p>
            Learn more about us and our story on our{" "}
            <Link to={"/AboutUs"}>About Us</Link> page.
          </p>
        </section>

        {/* Enrollment Form Section */}
        {!formSubmitted ? (
          <section style={sectionStyle}>
            <h2>Agent Enrollment</h2>
            <p>
              Please provide your email and phone number to get started in our
              agent recruitment process:
            </p>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  style={inputStyle}
                />
              </div>

              <div>
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="Enter your phone number"
                  style={inputStyle}
                />
              </div>

              <button type="submit" style={buttonStyle}>
                Enroll Now
              </button>
            </form>
          </section>
        ) : (
          <section style={sectionStyle}>
            <h2>Thank You for Enrolling!</h2>
            <p>
              We have received your information. You will be contacted soon with
              the next steps in the recruitment process.
            </p>
            <p>
              For more details, you can{" "}
              <a href="/recruitment-process">view the full instructions</a>.
            </p>
          </section>
        )}

        {/* Instructions Section */}
        <section style={sectionStyle}>
          <h2>Recruitment Process</h2>
          <p>
            Once you submit your enrollment, we will contact through your
            details and guide you through the next steps in our recruitment
            process. You will receive an email with further instructions on how
            to proceed.
          </p>
          <p>
            For more details about the recruitment process, click here to{" "}
            <a href="/recruitment-process">view the full instructions</a>.
          </p>
        </section>
      </div>

      <footer style={footerStyle}>
        <p>&copy; 2025 [Your Brand Name]. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Styles for the components (inline styles)
const headerStyle = {
  backgroundColor: "#0044cc",
  color: "white",
  padding: "20px",
  textAlign: "center",
};

const containerStyle = {
  width: "80%",
  margin: "0 auto",
};

const sectionStyle = {
  margin: "30px 0",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  fontSize: "16px",
  border: "1px solid #ddd",
  borderRadius: "5px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

const footerStyle = {
  backgroundColor: "#333",
  color: "white",
  textAlign: "center",
  padding: "20px",
};

export default AgentEnrollmentPage;
