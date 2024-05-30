import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import instance from "../../axios/Instance";
import { useEffect } from "react";
import Toast from "../../toast/Toast";
import LoadingComponent from "../common/LoadingComponent";

const ProtectRouter = () => {
    const { setIsLoading } = useAuth()
    const navigate = useNavigate();
    const { user, setUser } = useAuth(); // Type assertion

    console.log("AUTHENTICATED: ", user)
    const initSetup = async () => {
        instance.get("api/auth/me").then(function (response) {
            console.log(response)
            if (response.status === 200) {
                if (response.data === "anonymousUser") {
                    navigate("/auth")
                }
                else {
                    setUser(response.data)
                }
            }
        })
        setIsLoading(false)
    }
    useEffect(() => {
        initSetup()
    }, [])

    return (
        <div className="px-8 py-4 md:px-10 xl:px-20" >
            <Toast></Toast>
            <Outlet></Outlet>
            {/* <LoadingComponent/> */}
        </div>
    );
}

export default ProtectRouter;