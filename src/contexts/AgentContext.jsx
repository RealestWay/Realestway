// import { createContext, useContext, useEffect, useState } from "react";

// const AgentContext = createContext();
// const BASEURL = "http://localhost:9000";

// const AgentProvider = ({ children }) => {
//   const [agents, setAgents] = useState([]);

//   async function fetchAgents() {
//     try {
//       const res = await fetch(`${BASEURL}/agents`);
//       const data = await res.json();
//       setAgents(data);
//       localStorage.setItem("Agents", JSON.stringify(data));
//     } catch {
//       alert("there was an error loading your data...");
//     }
//   }
//   useEffect(() => {
//     const cachedAgents = localStorage.getItem("Agents");
//     if (cachedAgents) {
//       setAgents(JSON.parse(cachedAgents));
//     } else {
//       fetchAgents();
//     }
//   }, []);
//   return (
//     <AgentContext.Provider value={{ agents, fetchAgents }}>
//       {children}
//     </AgentContext.Provider>
//   );
// };

// const UseAgents = () => {
//   const Agents = useContext(AgentContext);
//   if (Agents === undefined)
//     throw new Error("Agents context was used outside its provider");
//   return Agents;
// };

// export { AgentProvider, UseAgents };
