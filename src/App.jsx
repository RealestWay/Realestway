import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import SignIn from "./pages/Auth/SignIn";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Verify from "./pages/Auth/Verify";
import HouseDetails from "./pages/Product/HouseDetails";
import MapDetails from "./pages/Product/MapDetails";
import ItemView from "./pages/Product/ItemView";
import UserProfile from "./pages/User/UserProfile";
import { AuthProvider } from "./contexts/AuthContext";
import ItemsPage from "./pages/Product/ItemsPage";
import { HouseProvider } from "./contexts/HouseContext";
import ProtectedRoutes from "./ProtectedRoutes";
import OrderPage from "./pages/OrderPage";
import ChatPage from "./pages/ChatPage";
import ScrollToTop from "./components/ScrollToTop";
import AgentEnrollmentPage from "./pages/AgentEnrollment";

const App = () => {
  return (
    //Passing Context values
    <AuthProvider>
      <HouseProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="login" element={<SignIn />} />
            <Route path="register" element={<Signup />} />
            <Route
              path="Profile"
              element={
                <ProtectedRoutes>
                  <UserProfile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="ChatPAge/:propertyId"
              element={
                <ProtectedRoutes>
                  <ChatPage />
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
            <Route path="AboutUs" element={<AboutUs />} />
            <Route path="ContactUs" element={<ContactUs />} />
            <Route
              path="/search"
              element={
                <ProtectedRoutes>
                  <ItemsPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="ItemView/:id"
              element={
                <ProtectedRoutes>
                  <ItemView />
                </ProtectedRoutes>
              }
            >
              <Route index element={<HouseDetails />} />
              <Route path="mapDetails" element={<MapDetails />} />
            </Route>
            <Route path="Verify" element={<Verify />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="Order" element={<OrderPage />}></Route>
            <Route path="onboard" element={<AgentEnrollmentPage />}></Route>
          </Routes>
        </BrowserRouter>
      </HouseProvider>
    </AuthProvider>
  );
};

export default App;
