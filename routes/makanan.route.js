const express = require(`express`)
const app = express()
app.use(express.json())
const makananController = require(`../controller/makanan.controller`)
const { authorize } = require('../controller/auth.controller')


app.post("/",  authorize,makananController.addMakanan)
app.put("/:id",  authorize,makananController.updateMakanan)
app.delete("/:id",  authorize,makananController.deleteMakanan)
app.get("/search",  makananController.findMakanan)





module.exports = app
