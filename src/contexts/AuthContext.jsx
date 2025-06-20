import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";

const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: true };

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

  async function fetchAgents(email, password) {
    try {
      const res = await fetch(
        "https://backend.realestway.com/api/agents/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to log in as agent");

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
      if (userData && userData.user && userData.token) {
        setToken(userData.token);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify(userData.user));
        dispatch({ type: "login", payload: userData.user });
        setIsLoading(false);
        setLoginMsg("");
        return;
      }

      const agentData = await fetchAgents(email, password);
      if (agentData && agentData.user && agentData.token) {
        setToken(agentData.token);
        localStorage.setItem("token", agentData.token);
        localStorage.setItem("user", JSON.stringify(agentData.user));
        dispatch({ type: "login", payload: agentData.user });
        setIsLoading(false);
        setLoginMsg("");
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

    const isRegularUser = user.id.startsWith("U");
    const logoutUrl = isRegularUser
      ? "https://backend.realestway.com/api/logout"
      : "https://backend.realestway.com/api/agents/logout";

    try {
      const res = await fetch(logoutUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
