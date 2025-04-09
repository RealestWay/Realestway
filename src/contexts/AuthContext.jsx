import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false };
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

  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function fetchUsers(email, password) {
    try {
      const res = await fetch(
        "https://realestway-backend.up.railway.app/api/login", // User login API
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

      if (!res.ok) throw new Error("Failed to log in user");

      const data = await res.json();
      return data.user; // Return user data
    } catch (err) {
      return null; // If user login fails, return null
    }
  }

  async function fetchAgents(email, password) {
    try {
      const res = await fetch(
        "https://realestway-backend.up.railway.app/api/agents/login", // Agent login API
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
      return data.user; // Return agent data
    } catch (err) {
      return null; // If agent login fails, return null
    }
  }

  // Login function to try both user and agent login
  async function login(email, password) {
    try {
      // Try logging in as a user
      const userData = await fetchUsers(email, password);
      if (userData) {
        // If user login is successful
        dispatch({ type: "login", payload: userData });
        setLoginMsg(""); // Clear any existing login messages
        return; // Exit if user login is successful
      }

      // If user login fails, try logging in as an agent
      const agentData = await fetchAgents(email, password);
      if (agentData) {
        // If agent login is successful
        dispatch({ type: "login", payload: agentData });
        setLoginMsg(""); // Clear any existing login messages
      } else {
        // If both user and agent login fail
        setLoginMsg("Incorrect details. Please check again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginMsg("An error occurred during login. Please try again.");
    }
  }

  async function logout() {
    try {
      const res = fetch(
        "https://realestway-backend.up.railway.app/api/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch {
      alert("failed to logout");
    }
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        loginMsg,
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
