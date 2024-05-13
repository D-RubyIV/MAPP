import { Fragment } from "react/jsx-runtime";
import TableComponent from "../base/TableComponent";
import { Type } from "../model/Type";
import { Label } from "../model/Label";
import { Config } from "../model/Config";
const ProductComponent = () => {
    const urlServer = import.meta.env.VITE_SERVERURL;
    const config: Config = {
        "api": `${urlServer}/api/manage/products`
    }
    const labels: Label[] = [
        {
            "name": "Id",
            "type": Type.NUMBER,
            "attribute": "id",
        },
        {
            "name": "Name",
            "type": Type.STRING,
            "attribute": "name",
        },
        {
            "name": "Description",
            "type": Type.STRING,
            "attribute": "description"
        },
        {
            "name": "Price",
            "type": Type.STRING,
            "attribute": "price"
        },
        {
            "name": "Image",
            "type": Type.STRING,
            "attribute": "image"
        },
        {
            "name": "Quantity",
            "type": Type.STRING,
            "attribute": "quantity"
        },
        {
            "name": "Category",
            "type": Type.OBJECT,
            "attribute": "categoryModel",
            "api":  `${urlServer}/api/manage/categories`
        },
    ];

    return (
        <Fragment>
            <TableComponent labels={labels} config={config}/>
        </Fragment>
    );
}
 
export default ProductComponent;