const express = require(`express`)
const app = express()
const cors = require(`cors`)
app.use(cors())


const admin = require(`./routes/admin.route`)
app.use(`/admin`, admin)

const makanan = require(`./routes/makanan.route`)
app.use(`/makanan`, makanan)

const order = require(`./routes/order.route`)
app.use(`/order`, order)

const PORT = 8000
app.listen(PORT, () => {
    console.log(`Server of Ticket Sales runs on port ${PORT}`)
})