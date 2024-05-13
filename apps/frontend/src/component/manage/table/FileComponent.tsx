import { Fragment } from "react/jsx-runtime";
import TableComponent from "../base/TableComponent";
import { Type } from "../model/Type";
import { Label } from "../model/Label";
import { Config } from "../model/Config";
const FileComponent = () => {
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
            "name": "Type",
            "type": Type.STRING,
            "attribute": "type",
        },
        {
            "name": "Uuid",
            "type": Type.STRING,
            "attribute": "uuid"
        },
        {
            "name": "Download",
            "type": Type.STRING,
            "attribute": "download"
        },
    ];

    return (
        <Fragment>
            <TableComponent labels={labels} config={config} />
        </Fragment>
    );
}

export default FileComponent;