import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { HouseProvider } from "./contexts/HouseContext";
import ScrollToTop from "./components/ScrollToTop";
import AppRoutes from "./AppRoutes";
import { ChatProvider } from "./contexts/ChatsContext";
import ReactGA from "react-ga4";
import AnalyticsTracking from "./service/Analytics";

ReactGA.initialize("G-WRVHG3YM2J");

const App = () => {
  return (
    //Passing Context values
    <AuthProvider>
      <HouseProvider>
        <ChatProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AnalyticsTracking />
            <AppRoutes />
          </BrowserRouter>
        </ChatProvider>
      </HouseProvider>
    </AuthProvider>
  );
};

export default App;
