import { Fragment } from "react";
import NavbarComponent from "./NavbarComponent";
import BenefitsComponet from "./BenefitsComponent"
import ProductComponent from "./ProductComponent";
import FooterComponent from "./FooterComponent";
const HomeComponent = () => {
    return (
        <Fragment>
            <BenefitsComponet></BenefitsComponet>
            <ProductComponent></ProductComponent>
            <FooterComponent></FooterComponent>
        </Fragment>
    );
}

export default HomeComponent;