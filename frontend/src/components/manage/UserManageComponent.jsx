import { Fragment, useEffect, useState } from "react";
import myAxios from "../../axios/CustomAxios";
import TableComponent from "../table/TableComponent";
const UserManageComponent = () => {
    const [users, setUsers] = useState([])
    const labelHeaderItems = [
        {
            "name": "Id",
            "width": "w-1/12",
            "attribute": "id",
            "collapse": false,
            "foreign": false,
            "foreign_view": null,
            "type": "int",
            "only_view": true,
            "api": null
        },
        {
            "name": "Username",
            "width": "w-5/12",
            "attribute": "username",
            "collapse": true,
            "foreign": false,
            "foreign_view": null,
            "type": "str",
            "only_view": false,
            "api": null
        },
        {
            "name": "Email",
            "width": "w-3/12",
            "attribute": "email",
            "collapse": true,
            "foreign": false,
            "foreign_view": null,
            "type": "str",
            "only_view": false,
            "api": null
        },
        {
            "name": "Phone",
            "width": "w-3/12",
            "attribute": "phone",
            "collapse": false,
            "foreign": false,
            "foreign_view": null,
            "type": "str",
            "only_view": false,
            "api": null
        },
        {
            "name": "Balance",
            "width": "w-3/12",
            "attribute": "balance",
            "collapse": false,
            "foreign": false,
            "foreign_view": null,
            "type": "int",
            "only_view": false,
            "api": null
        },
        {
            "name": "Enabled",
            "width": "w-3/12",
            "attribute": "enabled",
            "collapse": true,
            "foreign": false,
            "foreign_view": null,
            "type": "bool",
            "only_view": false,
            "api": null
        },
        {
            "name": "Role",
            "width": "w-3/12",
            "attribute": "roleModel",
            "collapse": false,
            "foreign": true,
            "foreign_view": null,
            "type": "object",
            "only_view": false,
            "api": "api/manage/roles"
        },
        {
            "name": "CreateAt",
            "width": "w-5/12",
            "attribute": "createAt",
            "collapse": false,
            "foreign": false,
            "foreign_view": null,
            "type": "date",
            "only_view": true,
            "api": null
        },
        {
            "name": "UpdateAt",
            "width": "w-5/12",
            "attribute": "updateAt",
            "collapse": false,
            "foreign": false,
            "foreign_view": null,
            "type": "date",
            "only_view": true,
            "api": null
        },
    ]

    return (
        <Fragment>
            <TableComponent
                title={"user"}
                endpoint={"api/manage/users"}
                labelHeaderItems={labelHeaderItems}
            >
            </TableComponent>
        </Fragment>
    );
}

export default UserManageComponent;