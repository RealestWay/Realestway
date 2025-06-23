import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false };
const BASE = "https://backend.realestway.com/api";
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [loginMsg, setLoginMsg] = useState(""); // Store login messages
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [refs, setRefs] = useState("");
  const [agent, setAgent] = useState("");
  // Load session from localStorage on app startup
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      dispatch({ type: "login", payload: JSON.parse(savedUser) });
    }
  }, []);

  async function fetchUsers(email, password) {
    try {
      const res = await fetch("https://backend.realestway.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!res.ok) throw new Error("Failed to log in user");

      const data = await res.json();

      return data;
    } catch (err) {
      return null;
    }
  }

  async function login(email, password) {
    try {
      setIsLoading(true);

      const userData = await fetchUsers(email, password);
      if (userData && userData.data.user && userData.data.token) {
        setToken(userData.data.token);
        localStorage.setItem("token", userData.data.token);
        localStorage.setItem("user", JSON.stringify(userData.data.user));
        dispatch({ type: "login", payload: userData.data.user });
        setIsLoading(false);
        setLoginMsg("");
        return;
      } else {
        setLoginMsg("Incorrect details. Please check again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      setLoginMsg("An error occurred during login. Please try again.");
    }
  }

  async function logout() {
    if (!user || !user.id) {
      console.warn("No user to log out.");
      return;
    }

    const logoutUrl = "https://backend.realestway.com/api/logout";

    try {
      const res = await fetch(logoutUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      dispatch({ type: "logout" });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken("");
    }
  }

  async function fetchAgent(id) {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE}/agents/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      setAgent(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchAllreferral() {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE}/referrals/stats`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      setRefs(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        loginMsg,
        isLoading,
        token,
        fetchAllreferral,
        refs,
        agent,
        fetchAgent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
