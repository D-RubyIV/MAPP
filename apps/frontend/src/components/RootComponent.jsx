import { Outlet } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import CustomToast from "./toast/CustomToast"
import { useAuth } from "../provider/authProvider.jsx"
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useEffect } from "react";

const RootComponent = () => {
    const { isLoading } = useAuth();
    if (isLoading == false) {
        return (
            <div className="w-full">
                <div className="fixed w-5/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                    <Skeleton count={10} className="h-10" />
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="">
                <CustomToast></CustomToast>
                <Outlet></Outlet>
            </div>
        );
    }
}

export default RootComponent;