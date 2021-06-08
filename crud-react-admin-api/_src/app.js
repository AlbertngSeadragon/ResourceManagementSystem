require("dotenv/config")
const express = require("express")
const cors = require("cors")
const UserRouter = require("./routes/UserRouter")
const CatchErrorHandler = require("./middlewares/CatchErrorHandler")

const app = express()
app.use(express.json())
app.use(cors())
app.use(UserRouter)
app.use(CatchErrorHandler)

app.get("*", (req, res) => {
    res.sendStatus(404)
})

module.exports = app