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
            "foreign_view": null,
            "type": "int",
            "only_view": true,
            "api": null
        },
        {
            "name": "Secret",
            "width": "w-5/12",
            "attribute": "secret",
            "collapse": true,
            "foreign": false,
            "foreign_view": null,
            "type": "int",
            "only_view": false,
            "api": null
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
        {
            "name": "FreezeAt",
            "width": "w-3/12",
            "attribute": "freezeAt",
            "collapse": true,
            "foreign": false,
            "foreign_view": null,
            "type": "iso",
            "only_view": false,
            "api": null
        },
        {
            "name": "CategoryModel",
            "width": "w-3/12",
            "attribute": "categoryModel",
            "collapse": true,
            "foreign": false,
            "foreign_view": "name",
            "foreign_attribute": "categoryId",
            "type": "object",
            "only_view": false,
            "api": "api/manage/categories"
        },
    ]
    return (
        <Fragment>
            <TableComponent
                title={"license"}
                endpoint={"api/manage/licenses"}
                labelHeaderItems={labelHeaderItems}
            >
            </TableComponent>
        </Fragment>
    );
}

export default CategoryManageComponent;