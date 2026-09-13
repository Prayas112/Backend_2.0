import { createContext, useEffect, useState } from "react";
import { getme } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const data = await getme();
        setuser(data.user);
      } catch (error) {
        setuser(null);
      } finally {
        setloading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setuser,
        loading,
        setloading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
