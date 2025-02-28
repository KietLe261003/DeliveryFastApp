import { Children, createContext, ReactNode, useContext, useState } from "react";
import { UserLogin } from "../Type/UserType";
import { UserService } from "../Service/UserService";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext<any | undefined>(undefined);
interface AuthProviderProps {
    children: ReactNode;  
  }
export const AuthProvider = ({ children }:AuthProviderProps) => {
  const [user, setUser] = useState<UserLogin | null>(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
   const nav = useNavigation<any>();
  const login = async (data:UserLogin)=>{
    setIsLoading(true);
    try {
      // const res = await UserService.login(data);
      if(data.email==="abc" && data.password==="123")
      {
        setUser(data);
        console.log("Login Success");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }
  return (
    <AuthContext.Provider value={{ user, token, isLoading, setIsLoading, login }}>
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
