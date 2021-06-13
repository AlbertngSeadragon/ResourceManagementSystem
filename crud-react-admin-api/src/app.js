require("dotenv/config")
const express = require("express")
const cors = require("cors")
//const UserRouter = require("./routes/UserRouter")
const UserRouter = require("./routes/UserRouterv1")
const CatchErrorHandler = require("./middlewares/CatchErrorHandler")
const swaggerUi = require("swagger-ui-express"),
    swaggerDocument = require("../swagger.json");
const range = require("./middlewares/range")

const app = express()
app.use(express.json())
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Content-Length, Accept, Content-Range, X-Total-Count");
//     next();
//   });
app.use(cors())
app.use(range)
// app.all('*', function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin','*');
// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');  
//    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');  
//     // res.setHeader("Content-Type", "application/json;charset=utf-8");
//     res.setHeader('Content-Range', 'posts 0-25/25'); 
//     next();
// });
app.use(UserRouter)
app.use(CatchErrorHandler)
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.get("*", (req, res) => {
    res.sendStatus(404)
})

module.exports = app