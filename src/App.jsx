import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { HouseProvider } from "./contexts/HouseContext";
import { HouseRequestProvider } from "./contexts/HouseRequestContext"; // Named import
import ScrollToTop from "./components/ScrollToTop";
import AppRoutes from "./AppRoutes";
import { ChatProvider } from "./contexts/ChatsContext";
import ReactGA from "react-ga4";
import AnalyticsTracking from "./service/Analytics";
import Maintenance from "./components/Maintenance";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { SaleListingsProvider } from "./contexts/SalesContext";
import { Toaster } from "react-hot-toast";

ReactGA.initialize("G-WRVHG3YM2J");

const App = () => {
  const isUnderMaintenance = false;

  if (isUnderMaintenance) {
    return <Maintenance />;
  }

  return (
    <AuthProvider>
      <HouseProvider>
        <SaleListingsProvider>
          <ChatProvider>
            <HouseRequestProvider>
              {/* Now using named import */}
              <BrowserRouter>
                <ScrollToTop />
                <AnalyticsTracking />
                <AppRoutes />
                <ToastContainer />
                <Toaster />
              </BrowserRouter>
            </HouseRequestProvider>
          </ChatProvider>
        </SaleListingsProvider>
      </HouseProvider>
    </AuthProvider>
  );
};

export default App;
