import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const BASEURL = "http://localhost:9000";
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

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(`${BASEURL}/users`);
        const data = await res.json();
        setUsers(data);
      } catch {
        alert("there was an error loading your data...");
      }
    }
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
      (u) => u.email === email && u.password === password
    );
    const agent = agents.find(
      (a) => a.email === email && a.password === password
    );
    const ruser = user || agent;
    dispatch({ type: "login", payload: ruser });
    console.log(ruser);
  }

  function logout() {
    dispatch({ type: "logout" });
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
        fetchAgents,
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
