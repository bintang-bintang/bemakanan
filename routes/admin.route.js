const express = require(`express`)
const app = express()
app.use(express.json())
const adminController = require(`../controller/admin.controller`)
const authenticateController = require(`../controller/auth.controller`)

app.post("/",  adminController.register)
app.post("/auth",  authenticateController.authenticate)
app.post("/rize",  authenticateController.authorize)

module.exports = app
