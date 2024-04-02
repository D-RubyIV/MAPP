import { Fragment, useEffect, useState } from "react";
import myAxios from "../../axios/CustomAxios";
import TableComponent from "../table/TableComponent";
const CategoryManageComponent = () => {
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
            "width": "w-2/12",
            "attribute": "name",
            "collapse": true,
            "foreign": false,
            "type": "string",
            "only_view": false,
            "api": null
        },
        {
            "name": "Code",
            "width": "w-3/12",
            "attribute": "code",
            "collapse": true,
            "foreign": false,
            "type": "string",
            "only_view": false,
            "api": null
        },
        {
            "name": "CreateAt",
            "width": "w-6/12",
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
                title={"category"}
                endpoint={"api/manage/categories"}
                labelHeaderItems={labelHeaderItems}
            >
            </TableComponent>
        </Fragment>
    );
}

export default CategoryManageComponent;