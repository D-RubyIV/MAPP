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
            "nameColumn": "User",
            "nameAttribute": "userModel",
            "media": import.meta.env.VITE_sm,
            "allowEdit": true,
            "type": "object"
        },
        {
            "nameColumn": "Voucher",
            "nameAttribute": "voucherModel",
            "media": import.meta.env.VITE_sm,
            "allowEdit": true,
            "type": "object"
        },
        {
            "nameColumn": "Amount",
            "nameAttribute": "amount",
            "media": import.meta.env.VITE_sm,
            "allowEdit": true,
            "type": "integer"
        },

    ]
    const config = {
        "indexApi": "api/manage/orders",
        "foreignModel": [
            {
                "nameAttribute": "userModel",
                "apiUrl": "/api/manage/users"
            },
            {
                "nameAttribute": "voucherModel",
                "apiUrl": "/api/manage/vouchers"
            }
        ],
    }
    return (
        <div>
            <Table tableName={"Order"} labelHeaders={labelHeaders} config={config}></Table>
        </div>
    );
}

export default EXM;