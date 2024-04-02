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
            "nameColumn": "Secret",
            "nameAttribute": "secret",
            "media": import.meta.env.VITE_sm,
            "allowEdit": true,
            "type": "string"
        },
        {
            "nameColumn": "CreateTime",
            "nameAttribute": "createAt",
            "media": import.meta.env.VITE_sm,
            "allowEdit": true,
            "type": "string"
        },
        {
            "nameColumn": "FreezeAt",
            "nameAttribute": "freezeAt",
            "media": import.meta.env.VITE_2xl,
            "allowEdit": true,
            "type": "string"
        },
        {
            "nameColumn": "Category",
            "nameAttribute": "categoryModel",
            "media": import.meta.env.VITE_md,
            "allowEdit": true,
            "type": "object",
        },
    ]
    const config = {
        "indexApi": "api/manage/licenses",
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