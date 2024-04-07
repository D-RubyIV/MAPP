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
            "nameColumn": "Username",
            "nameAttribute": "username",
            "media": import.meta.env.VITE_sm,
            "allowEdit": true,
            "type": "string"
        },
        {
            "nameColumn": "Email",
            "nameAttribute": "email",
            "media": import.meta.env.VITE_sm,
            "allowEdit": true,
            "type": "string"
        },
        {
            "nameColumn": "Phone",
            "nameAttribute": "phone",
            "media": import.meta.env.VITE_2xl,
            "allowEdit": true,
            "type": "string"
        },
        {
            "nameColumn": "Balance",
            "nameAttribute": "balance",
            "media": import.meta.env.VITE_md,
            "allowEdit": true,
            "type": "string"
        },
        {
            "nameColumn": "Role",
            "nameAttribute": "roleModel",
            "media": import.meta.env.VITE_md,
            "allowEdit": true,
            "type": "object",
            "foreigntKey": "roleId"
        },
        {
            "nameColumn": "Enabled",
            "nameAttribute": "enabled",
            "media": import.meta.env.VITE_md,
            "allowEdit": true,
            "type": "boolean"
        },
    ]
    const config = {
        "indexApi": "api/manage/users",
        "foreignModel": [
            {
                "nameAttribute": "roleModel",
                "apiUrl": "/api/manage/roles"
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