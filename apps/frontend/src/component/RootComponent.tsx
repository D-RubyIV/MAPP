import { Outlet } from "react-router-dom";
import NavbarComponent from "./head/NavbarComponent";
import ScrollToTop from "react-scroll-to-top";
const RootComponent = () => {
    return (
        <div className="relative px-8 py-4 md:px-10 xl:px-20">
            <ScrollToTop smooth top={60} width="18" height="15" style={{"borderRadius": 100}} className="flex items-center justify-center border-2 !bg-slate-200 !ring-1 !bg-opacity-75"/>
            <NavbarComponent />
            <Outlet />
        </div>

    );
}

export default RootComponent;