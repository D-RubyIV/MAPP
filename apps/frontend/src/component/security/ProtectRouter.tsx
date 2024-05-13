import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import instance from "../../axios/Instance";
import { useEffect } from "react";
import Toast from "../../toast/Toast";
import LoadingComponent from "../common/LoadingComponent";

const ProtectRouter = () => {
    const {setIsLoading} = useAuth()
    const navigate = useNavigate();
    const { authenticated, setAuthenticated } = useAuth(); // Type assertion
    
    if (authenticated === false) {
        console.log("AUTHENTICATED: ", authenticated)
    }
    const initSetup = async () => {
        instance.get("api/auth/me").then(function (response) {
            console.log(response)
            if (response.status === 200) {
                if (response.data === "anonymousUser") {
                    setTimeout(()=>{setIsLoading(false)}, 500)
                    setAuthenticated(false)
                    navigate("/auth")
                }
                else{
                    setTimeout(()=>{setIsLoading(false)}, 500)
                    setAuthenticated(true)
                }
            }
            
        })
        
    }
    useEffect(() => {
        initSetup()
    }, [])

    return (
        <div className="px-8 py-4 md:px-10 xl:px-16" >
            <Toast></Toast>
            <Outlet></Outlet>
            <LoadingComponent></LoadingComponent>
        </div>
    );
}

export default ProtectRouter;