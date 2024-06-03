
type Order = {
    id: number,
    orderDate: Date,
    voucher: Voucher | number,
    status: "Pending" | "Success"
}