import { useContext } from "react";
import AuthContext from "../auth/AuthWrapper";;

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;