import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { AuthProvider } from "./contexts/AuthContext";
import { HouseProvider } from "./contexts/HouseContext";
import ProtectedRoutes from "./ProtectedRoutes";
import OrderPage from "./pages/OrderPage";
import ChatPage from "./Chat/ChatPageHouse";
import ScrollToTop from "./components/ScrollToTop";
import AgentEnrollmentPage from "./pages/AgentEnrollment";
import CheckEmail from "./pages/Auth/CheckEmail";
import EmailVerified from "./pages/Auth/EmailVerified";
import ProtectedAuthRoutes from "./ProtectedAuthRoutes";
import FaqPage from "./pages/Faqs";
import TermsOfUse from "./pages/Terms-of-use";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ServicesAndFacilities from "./pages/S&F";
import Careers from "./pages/Careers";
import { ChatProvider } from "./contexts/ChatsContext";
import Chat from "./Chat/Chat";
import RentSearchPage from "./pages/Product/RentSearchPage";
import SearchPage from "./pages/Product/SearchPage";
import BuySearchPage from "./pages/Product/BuySearchPage";

const App = () => {
  return (
    //Passing Context values
    <AuthProvider>
      <HouseProvider>
        <ChatProvider>
          <BrowserRouter>
            <ScrollToTop />
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
              <Route
                path="Profile"
                element={
                  <ProtectedRoutes>
                    <UserProfile />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="Chat"
                element={
                  <ProtectedRoutes>
                    <ChatPage />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="message"
                element={
                  <ProtectedRoutes>
                    <Chat />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="OrderPage/:propertyId"
                element={
                  <ProtectedRoutes>
                    <OrderPage />
                  </ProtectedRoutes>
                }
              />
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
              <Route path="order" element={<OrderPage />}></Route>
              <Route path="onboard" element={<AgentEnrollmentPage />}></Route>
              <Route path="faqs" element={<FaqPage />}></Route>
              <Route path="terms" element={<TermsOfUse />}></Route>
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="services" element={<ServicesAndFacilities />} />
              <Route path="careers" element={<Careers />} />
            </Routes>
          </BrowserRouter>
        </ChatProvider>
      </HouseProvider>
    </AuthProvider>
  );
};

export default App;
