const express = require("express");
const mysql = require("mysql");

require("dotenv").config();

const app = express();

app.use(express.json());

const db = mysql.createConnection({
    user: process.env.USER,
    host: process.env.HOST,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})

app.post('/register', (req, res)=> {
    db.query
}) 

app.listen(3001, () => {
    console.log("Running server on Port 3001");
});
