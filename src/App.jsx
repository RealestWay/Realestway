import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { HouseProvider } from "./contexts/HouseContext";
import ScrollToTop from "./components/ScrollToTop";
import AppRoutes from "./AppRoutes";
import { ChatProvider } from "./contexts/ChatsContext";

const App = () => {
  return (
    //Passing Context values
    <AuthProvider>
      <HouseProvider>
        <ChatProvider>
          <BrowserRouter>
            <ScrollToTop />
            <AppRoutes />
          </BrowserRouter>
        </ChatProvider>
      </HouseProvider>
    </AuthProvider>
  );
};

export default App;
