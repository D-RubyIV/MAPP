import { Outlet } from "react-router-dom";
import NavbarComponent from "./head/NavbarComponent";

const RootComponent = () => {
    return (
        <div className="relative">
            <NavbarComponent />
            <Outlet />
        </div>

    );
}

export default RootComponent;