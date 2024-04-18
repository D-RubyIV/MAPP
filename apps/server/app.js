import axios from "axios";
import express from "express";

const port = 3006;
const cryptomusUri = "https://api.cryptomus.com/v1"
const serverUri = "https://dfc6-42-119-143-53.ngrok-free.app"

const app = express();

app.use(express.static("public"))
app.use(express.json())
app.get("/", (req, res) => {
    res.sendFile("index.html")
})

app.post("/checkout", async (req, res, next) => {
    try {
        const { product } = req.body;
        if (!product?.name || !product?.amount) {
            return next(new Error("Invalid product"))
        }

        const order = {
            product: product.name,
            amount: product.amount
        }
        // CREATE NEW ORDER
        const payload = {
            amount: order.amount,
            currency: "usd",
            order_id: "1234",
            url_callback: `${serverUri}/payment/success`
        }
        // const {data} = await axios.post(`${cryptomusUri}/`, payload)
        res.json({ order })
    } catch (error) {
        console.log(error)
    }
})
app.post("/payment/success", (req, res) => {
    console.log(req.body)
    res.send("Payment successful")
})
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message })
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})