import { Fragment } from "react";
import NavbarComponent from "./NavbarComponent";
import BenefitsComponet from "./BenefitsComponent"
import ProductComponent from "./ProductComponent";
const HomeComponent = () => {
    return (
        <Fragment>
            <BenefitsComponet></BenefitsComponet>
            <ProductComponent></ProductComponent>
        </Fragment>
    );
}

export default HomeComponent;