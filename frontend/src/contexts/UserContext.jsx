import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const axiosGet = async () => {
      try {
        const { data } = await axios.get("/users/profile");
        setUser(data);
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    axiosGet();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};