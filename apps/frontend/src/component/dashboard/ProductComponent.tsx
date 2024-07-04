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
                <div className="mt-3">
                    <CollectionComponent />
                </div>
            </Fragment>
        </Fragment>
    );
};

export default ProductComponent;