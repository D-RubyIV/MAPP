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
            "nameColumn": "OrderModel",
            "nameAttribute": "orderModel",
            "media": import.meta.env.VITE_sm,
            "allowEdit": true,
            "type": "object"
        },
        {
            "nameColumn": "ProductModel",
            "nameAttribute": "productModel",
            "media": import.meta.env.VITE_sm,
            "allowEdit": true,
            "type": "object"
        },
        {
            "nameColumn": "Quantity",
            "nameAttribute": "quantity",
            "media": import.meta.env.VITE_sm,
            "allowEdit": true,
            "type": "string"
        },

    ]
    const config = {
        "indexApi": "api/manage/order-details",
        "foreignModel": [
            {
                "nameAttribute": "productModel",
                "apiUrl": "/api/manage/products"
            },
            {
                "nameAttribute": "orderModel",
                "apiUrl": "/api/manage/orders"
            }
        ],
    }
    return (
        <div>
            <Table tableName={"Order Detail"} labelHeaders={labelHeaders} config={config}></Table>
        </div>
    );
}

export default EXM;