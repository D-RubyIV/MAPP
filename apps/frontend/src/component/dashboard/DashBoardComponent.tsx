import BenefitsComponent from "../body/BenefitsComponen";
import FooterComponent from "../footer/FooterComponnet";
import BlogComponent from "./BlogComponent";
import ProductComponent from "./ProductComponent";
const DashBoardComponent = () => {

    return (
        <div>
            <BenefitsComponent />
            <ProductComponent />
            <BlogComponent/>
            <FooterComponent />
        </div>
    );
}

export default DashBoardComponent;