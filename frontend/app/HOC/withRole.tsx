import useAuth from "../api/Auth.api";
import { useRouter } from "next/navigation";

const withRole =(Component :any , allowedRoles : string[]) =>{
    return function ProtectedRoute(props :any){
        const role = useAuth();
        const router =  useRouter()
        if(!allowedRoles.includes(role)){
            router.push("/redirect/unauthorized")
            return null
        }
        return <Component {...props}/>
    }
}
export default withRole
