import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";

const HomeComponent = () => {
    return (
        <Fragment>
            <NavbarComponent></NavbarComponent>
            <Outlet></Outlet>
        </Fragment>
    );
}
export default HomeComponent;