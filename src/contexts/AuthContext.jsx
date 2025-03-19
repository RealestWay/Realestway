import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const BASEURL = "https://your-netlify-site.netlify.app/.netlify/functions/api";
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
  const [users, setUsers] = useState();
  const [agents, setAgents] = useState();
  const [loginMsg, setLoginMsg] = useState("");

  async function fetchUsers() {
    try {
      const res = await fetch(`${BASEURL}/users`);
      const data = await res.json();
      setUsers(data);
    } catch {
      alert("there was an error loading your data...");
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);
  async function fetchAgents() {
    try {
      const res = await fetch(`${BASEURL}/agents`);
      const data = await res.json();
      setAgents(data);
    } catch {
      alert("there was an error loading your data...");
    }
  }
  useEffect(() => {
    fetchAgents();
  }, []);

  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    const user = users.find(
      (u) => email === u.email && password === u.password
    );
    const agent = agents.find(
      (a) => email === a.email && password === a.password
    );
    const ruser = user || agent;
    if (ruser) {
      dispatch({ type: "login", payload: ruser });
      setLoginMsg("");
    } else setLoginMsg("Incorrect details. Please check again.");
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  // Function to update user details
  async function updateUserDetails(updatedData) {
    try {
      const res = await fetch(`${BASEURL}/users/${ruser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) {
        const updatedUser = await res.json();
        dispatch({ type: "update_user", payload: updatedUser });
      } else {
        throw new Error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data: ", error);
    }
  }

  // Function to add new items to the user details object
  async function addItemToUser(newItem) {
    try {
      const updatedUser = { ...user, ...newItem }; // Add new item to the user object
      const res = await fetch(`${BASEURL}/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
      if (res.ok) {
        const updatedUserData = await res.json();
        dispatch({ type: "update_user", payload: updatedUserData });
      } else {
        throw new Error("Failed to add new item to user data");
      }
    } catch (error) {
      console.error("Error adding new item to user data: ", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        users,
        agents,
        user,
        isAuthenticated,
        login,
        logout,
        loginMsg,
        fetchAgents,
        fetchUsers,
        updateUserDetails,
        addItemToUser,
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
