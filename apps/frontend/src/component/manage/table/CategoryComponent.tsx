import { Fragment } from "react/jsx-runtime";
import TableComponent from "../base/TableComponent";
import { Type } from "../model/Type";
import { Label } from "../model/Label";
import { Config } from "../model/Config";
const CategoryComponent = () => {
    const urlServer = import.meta.env.VITE_SERVERURL;
    const config: Config = {
        "api": `${urlServer}/api/manage/categories`
    }
    const labels: Label[] = [
        {
            "name": "Id",
            "type": Type.NUMBER,
            "attribute": "id",
        },
        {
            "name": "Code",
            "type": Type.STRING,
            "attribute": "code",
        },
        {
            "name": "Name",
            "type": Type.STRING,
            "attribute": "name"
        },
    ];

    return (
        <Fragment>
            <TableComponent labels={labels} config={config}/>
        </Fragment>
    );
}
 
export default CategoryComponent;