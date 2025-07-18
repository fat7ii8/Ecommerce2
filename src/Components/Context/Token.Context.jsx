import { createContext, useState } from "react";

export const TokenContext = createContext(null);
export default function TokenProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  function LogOOut() {
    setToken(null);
    localStorage.removeItem("token");
    console.log("delete");
  }
  return (
    <TokenContext.Provider value={{ token, setToken, LogOOut }}>
      {children}
    </TokenContext.Provider>
  );
}
