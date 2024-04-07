import { Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute"
import NavbarComponent from "./NavbarComponent";
import CustomToast from "./toast/CustomToast"
const RootComponent = () => {
    return (
        <div className="">
            <CustomToast></CustomToast>
            <ProtectedRoute></ProtectedRoute>
            <Outlet></Outlet>
        </div>
    );
}

export default RootComponent;