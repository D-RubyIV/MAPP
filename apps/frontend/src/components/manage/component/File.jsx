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
            "nameColumn": "Type",
            "nameAttribute": "type",
            "media": import.meta.env.VITE_sm,
            "allowEdit": true,
            "type": "string"
        },

    ]
    const config = {
        "indexApi": "api/manage/files",
        "foreignModel": [

        ],
    }
    return (
        <div>
            <Table tableName={"User"} labelHeaders={labelHeaders} config={config}></Table>
        </div>
    );
}

export default EXM;