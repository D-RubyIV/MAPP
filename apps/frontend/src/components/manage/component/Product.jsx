import Table from "../base/Table";

const EXM = () => {
    const labelHeaders = [
        {
            "nameColumn": "Id",
            "nameAttribute": "id",
            "media": import.meta.env.VITE_md,
            "allowEdit": false,
            "type": "integer"
        },
        {
            "nameColumn": "Name",
            "nameAttribute": "name",
            "media": import.meta.env.VITE_sm,
            "allowEdit": true,
            "type": "string"
        },
        {
            "nameColumn": "Quantity",
            "nameAttribute": "quantity",
            "media": import.meta.env.VITE_sm,
            "allowEdit": true,
            "type": "string"
        },
        {
            "nameColumn": "Price",
            "nameAttribute": "price",
            "media": import.meta.env.VITE_sm,
            "allowEdit": true,
            "type": "string"
        },
        {
            "nameColumn": "Description",
            "nameAttribute": "description",
            "media": import.meta.env.VITE_md,
            "allowEdit": true,
            "type": "string"
        },
        {
            "nameColumn": "Category",
            "nameAttribute": "categoryModel",
            "media": import.meta.env.VITE_sm,
            "allowEdit": true,
            "type": "object"
        },

    ]
    const config = {
        "indexApi": "api/manage/products",
        "foreignModel": [
            {
                "nameAttribute": "categoryModel",
                "apiUrl": "/api/manage/categories"
            }
        ],
    }
    return (
        <div>
            <Table tableName={"User"} labelHeaders={labelHeaders} config={config}></Table>
        </div>
    );
}

export default EXM;