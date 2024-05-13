import { Fragment } from "react/jsx-runtime";
import TableComponent from "../base/TableComponent";
import { Type } from "../model/Type";
import { Label } from "../model/Label";
import { Config } from "../model/Config";

const OrderComponent = () => {
    const urlServer = import.meta.env.VITE_SERVERURL;
    const config: Config = {
        "api": `${urlServer}/api/manage/orders`
    }
    const labels: Label[] = [
        {
            "name": "User",
            "type": Type.OBJECT,
            "attribute": "userModel",
            "api": `${urlServer}/api/manage/users`
        },
        {
            "name": "Voucher",
            "type": Type.OBJECT,
            "attribute": "voucherModel",
            "api": `${urlServer}/api/manage/vouchers`
        },
        {
            "name": "Amount",
            "type": Type.NUMBER,
            "attribute": "amount"
        },
    ];

    return (
        <Fragment>
            <TableComponent labels={labels} config={config}/>
        </Fragment>
    );
}
 
export default OrderComponent;