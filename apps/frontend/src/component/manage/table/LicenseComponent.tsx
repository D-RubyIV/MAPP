import { Fragment } from "react/jsx-runtime";
import TableComponent from "../base/TableComponent";
import { Type } from "../model/Type";
import { Label } from "../model/Label";
import { Config } from "../model/Config";

const LicenseComponent = () => {
    const urlServer = import.meta.env.VITE_SERVERURL;
    const config: Config = {
        "api": `${urlServer}/api/manage/licenses`
    }
    const labels: Label[] = [
        {
            "name": "Id",
            "type": Type.NUMBER,
            "attribute": "id",
        },
        {
            "name": "Secret",
            "type": Type.STRING,
            "attribute": "secret",
        },
        {
            "name": "FreezeAt",
            "type": Type.NUMBER,
            "attribute": "freezeAt"
        },
    ];

    return (
        <Fragment>
            <TableComponent labels={labels} config={config}/>
        </Fragment>
    );
}
 
export default LicenseComponent;