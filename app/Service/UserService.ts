import { request } from "../Config/Request"
import { UserLogin } from "../Type/UserType";

export const UserService={
    login: async(data:UserLogin)=>{
        const res = await request.post("",data)
        return res;
    }
}