import { Children, createContext, ReactNode, useContext, useState } from "react";

export const AuthContext = createContext<any | undefined>(undefined);
interface AuthProviderProps {
    children: ReactNode;  
  }
export const AuthProvider = ({ children }:AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <AuthContext.Provider value={{ user, token, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth=()=>{
    const context = useContext(AuthContext);
    if(!context)
        throw new Error("User này bị rỗng");
    return context;
}
