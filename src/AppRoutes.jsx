import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import SignIn from "./pages/Auth/SignIn";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Verify from "./pages/Auth/Verify";
import ItemView from "./pages/Product/ItemView";
import UserProfile from "./pages/User/UserProfile";
import AgentEnrollmentPage from "./pages/AgentEnrollment";
import CheckEmail from "./pages/Auth/CheckEmail";
import EmailVerified from "./pages/Auth/EmailVerified";
import ProtectedAuthRoutes from "./ProtectedAuthRoutes";
import FaqPage from "./pages/Faqs";
import TermsOfUse from "./pages/Terms-of-use";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ServicesAndFacilities from "./pages/S&F";
import Careers from "./pages/Careers";
import RentSearchPage from "./pages/Product/RentSearchPage";
import SearchPage from "./pages/Product/SearchPage";
import BuySearchPage from "./pages/Product/BuySearchPage";
import AgentDashboard from "./pages/User/AgentDash";
import AgentProfile from "./pages/User/AgentProfile";
import AgentListings from "./pages/User/AgentListings";
import AgentMessages from "./pages/User/AgentMessages";
import AgentAccount from "./pages/User/AgentAccount";
import ProtectedRoutes from "./ProtectedRoutes";
import OrderPage from "./pages/OrderPage";
import { useAuth } from "./contexts/AuthContext";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="login"
        element={
          <ProtectedAuthRoutes>
            <SignIn />
          </ProtectedAuthRoutes>
        }
      />
      <Route
        path="register"
        element={
          <ProtectedAuthRoutes>
            <Signup />
          </ProtectedAuthRoutes>
        }
      />
      {user?.role === "user" || user?.role === "admin" ? (
        <Route
          path="profile"
          element={
            <ProtectedRoutes>
              <UserProfile />
            </ProtectedRoutes>
          }
        />
      ) : (
        <Route
          path="profile"
          element={
            <ProtectedRoutes>
              <AgentProfile />
            </ProtectedRoutes>
          }
        >
          <Route index element={<AgentDashboard />}></Route>
          <Route path="/profile/my-listings" element={<AgentListings />} />
          <Route path="/profile/messages" element={<AgentMessages />} />
          <Route path="/profile/account" element={<AgentAccount />} />
        </Route>
      )}
      <Route path="about" element={<AboutUs />} />
      <Route path="contact" element={<ContactUs />} />
      <Route path="/search" element={<SearchPage />}>
        <Route index element={<RentSearchPage />} />
        <Route path="/search/buy" element={<BuySearchPage />} />
      </Route>
      <Route path="property/:id" element={<ItemView />} />
      <Route
        path="Verify"
        element={
          <ProtectedAuthRoutes>
            <Verify />
          </ProtectedAuthRoutes>
        }
      />{" "}
      <Route
        path="forgotPassword"
        element={
          <ProtectedAuthRoutes>
            <ForgotPassword />
          </ProtectedAuthRoutes>
        }
      />{" "}
      <Route
        path="check-email"
        element={
          <ProtectedAuthRoutes>
            <CheckEmail />
          </ProtectedAuthRoutes>
        }
      />{" "}
      <Route
        path="verify-email"
        element={
          <ProtectedAuthRoutes>
            <EmailVerified />
          </ProtectedAuthRoutes>
        }
      />{" "}
      <Route path="*" element={<PageNotFound />} />
      <Route path="payment" element={<OrderPage />}></Route>
      <Route path="onboard" element={<AgentEnrollmentPage />}></Route>
      <Route path="faqs" element={<FaqPage />}></Route>
      <Route path="terms" element={<TermsOfUse />}></Route>
      <Route path="privacy" element={<PrivacyPolicy />} />
      <Route path="services" element={<ServicesAndFacilities />} />
      <Route path="careers" element={<Careers />} />
    </Routes>
  );
};

export default AppRoutes;
