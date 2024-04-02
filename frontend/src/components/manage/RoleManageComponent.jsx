import { Fragment, useEffect, useState } from "react";
import myAxios from "../../axios/CustomAxios";
import TableComponent from "../table/TableComponent";
const RoleManageComponent = () => {
    const [users, setUsers] = useState([])
    const labelHeaderItems = [
        {
            "name": "Id",
            "width": "w-1/12",
            "attribute": "id",
            "collapse": false,
            "foreign": false,
            "type": "int",
            "only_view": true,
            "api": null
        },
        {
            "name": "Name",
            "width": "w-3/12",
            "attribute": "name",
            "collapse": true,
            "foreign": false,
            "type": "string",
            "only_view": false,
            "api": null
        },
        {
            "name": "Code",
            "width": "w-4/12",
            "attribute": "code",
            "collapse": true,
            "foreign": false,
            "type": "string",
            "only_view": false,
            "api": null
        },
        {
            "name": "CreateAt",
            "width": "w-4/12",
            "attribute": "createAt",
            "collapse": true,
            "foreign": false,
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
            "type": "date",
            "only_view": true,
            "api": null
        },
    ]
    return (
        <Fragment>
            <TableComponent
                title={"role"}
                endpoint={"api/manage/roles"}
                labelHeaderItems={labelHeaderItems}
            >
            </TableComponent>
        </Fragment>
    );
}

export default RoleManageComponent;