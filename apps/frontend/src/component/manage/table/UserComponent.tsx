import { Fragment } from "react/jsx-runtime";
import TableComponent from "../base/TableComponent";
import { Type } from "../model/Type";
import { Label } from "../model/Label";
import { Config } from "../model/Config";
const UserComponent = () => {
    const urlServer = import.meta.env.VITE_SERVERURL;
    const config: Config = {
        "api": `${urlServer}/api/manage/users`
    }
    const labels: Label[] = [
        {
            "name": "Id",
            "type": Type.NUMBER,
            "attribute": "id"
        },
        {
            "name": "Username",
            "type": Type.STRING,
            "attribute": "username"
        },
        {
            "name": "Email",
            "type": Type.STRING,
            "attribute": "email"
        },
        {
            "name": "Password",
            "type": Type.STRING,
            "attribute": "password"
        },
        {
            "name": "Phone",
            "type": Type.STRING,
            "attribute": "phone"
        },
        {
            "name": "Fullname",
            "type": Type.STRING,
            "attribute": "fullName"
        },
        {
            "name": "Balance",
            "type": Type.NUMBER,
            "attribute": "balance"
        },
        {
            "name": "Enabled",
            "type": Type.BOOLEAN,
            "attribute": "enabled"
        },
        {
            "name": "Provider",
            "type": Type.STRING,
            "attribute": "provider"
        },
        {
            "name": "Role",
            "type": Type.OBJECT,
            "attribute": "roleModel",
            "api": `${urlServer}/api/manage/roles`
        },
    ];

    return (
        <Fragment>
            <TableComponent labels={labels} config={config}/>
        </Fragment>
    );
}

export default UserComponent;
