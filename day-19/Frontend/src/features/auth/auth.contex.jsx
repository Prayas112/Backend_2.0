import { createContext, useEffect, useState } from "react";
import { getme } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const checkuser = async () => {
      try {
        const response = await getme();
        setuser(response.user);
      } catch (error) {
        setuser(null);
      } finally {
        setloading(false);
      }
    };

    checkuser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setuser, loading, setloading }}>
      {children}
    </AuthContext.Provider>
  );
};
