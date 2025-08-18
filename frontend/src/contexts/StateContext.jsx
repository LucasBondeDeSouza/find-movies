import { createContext, useContext, useState } from "react";

// Criar o contexto
const StateContext = createContext();

// Criar o provider que envolve a aplicação
export const StateProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <StateContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </StateContext.Provider>
  );
};

// Hook para acessar facilmente o estado
export const useGlobalState = () => useContext(StateContext);