import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { HouseProvider } from "./contexts/HouseContext";
import ScrollToTop from "./components/ScrollToTop";
import AppRoutes from "./AppRoutes";
import { ChatProvider } from "./contexts/ChatsContext";
import ReactGA from "react-ga4";
import AnalyticsTracking from "./service/Analytics";
import Maintenance from "./components/Maintenance";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
ReactGA.initialize("G-WRVHG3YM2J");

const App = () => {
  const isUnderMaintenance = false;

  if (isUnderMaintenance) {
    return <Maintenance />;
  }
  return (
    //Passing Context values
    <AuthProvider>
      <HouseProvider>
        <ChatProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AnalyticsTracking />
            <AppRoutes />
            <ToastContainer />
          </BrowserRouter>
        </ChatProvider>
      </HouseProvider>
    </AuthProvider>
  );
};

export default App;
