import { Fragment } from "react";
import CollectionComponent from "./CollectionComponent";
import CategoryComponent from "./CategoryComponent";

const ProductComponent = () => {

    return (
        <Fragment >
            {/* CATEGORY */}
            <Fragment>
                <CategoryComponent />
            </Fragment>
            {/* PRODUCT */}
            <Fragment>
                <CollectionComponent />
            </Fragment>
        </Fragment>
    );
};

export default ProductComponent;