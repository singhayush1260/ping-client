import React, { createContext, useContext } from "react";
import { useQuery } from "react-query";
import { validateToken } from "@/api-client/auth-api";

interface IAuthContext{
  isLoggedIn: boolean;
};


const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { isError } = useQuery("validateToken", validateToken, { retry: false });

  const contextValue: IAuthContext = {
    isLoggedIn: !isError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};