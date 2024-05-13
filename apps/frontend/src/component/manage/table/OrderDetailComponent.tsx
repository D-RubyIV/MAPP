import { Fragment } from "react/jsx-runtime";
import TableComponent from "../base/TableComponent";
import { Type } from "../model/Type";
import { Label } from "../model/Label";
import { Config } from "../model/Config";

const OrderDetailComponent = () => {
    const urlServer = import.meta.env.VITE_SERVERURL;
    const config: Config = {
        "api": `${urlServer}/api/manage/order-details`
    }
    const labels: Label[] = [
        {
            "name": "Id",
            "type": Type.NUMBER,
            "attribute": "id",
        },
        {
            "name": "Order",
            "type": Type.OBJECT,
            "attribute": "orderModel",
            "api": `${urlServer}/api/manage/orders`
        },
        {
            "name": "Product",
            "type": Type.OBJECT,
            "attribute": "productModel",
            "api": `${urlServer}/api/manage/products`
        },
     
    ];

    return (
        <Fragment>
            <TableComponent labels={labels} config={config}/>
        </Fragment>
    );
}
 
export default OrderDetailComponent;