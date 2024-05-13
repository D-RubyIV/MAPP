import { Fragment } from "react/jsx-runtime";
import TableComponent from "../base/TableComponent";
import { Type } from "../model/Type";
import { Label } from "../model/Label";
import { Config } from "../model/Config";
const VoucherComponent = () => {
    const urlServer = import.meta.env.VITE_SERVERURL;
    const config: Config = {
        "api": `${urlServer}/api/manage/vouchers`
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
            "attribute": "name"
        },
        {
            "name": "Code",
            "type": Type.STRING,
            "attribute": "code",
        },
        {
            "name": "Percent",
            "type": Type.NUMBER,
            "attribute": "percent"
        },
        {
            "name": "Amount",
            "type": Type.NUMBER,
            "attribute": "amount"
        },
    ];

    return (
        <Fragment>
            <TableComponent labels={labels} config={config} />
        </Fragment>
    );
}

export default VoucherComponent;