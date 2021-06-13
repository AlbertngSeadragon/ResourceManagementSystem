const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const saltRounds = 10;

require("dotenv").config();

const app = express();
app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

const db = mysql.createConnection({
    user: "admin",
    host: "fyp2021-2022.cysnvin5kbik.us-east-1.rds.amazonaws.com",
    password: "adminfyp2021",
    database: "user_management",
})

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM user_management.Admins WHERE username = ? UNION SELECT * FROM user_management.Professors WHERE username = ? UNION SELECT * FROM user_management.General_Office_GO_Staffs WHERE username = ?;",
        [username, username, username],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            //console.log(result)
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        req.session.user = result;
                        console.log(req.session.user);
                        res.status(200).send(result);
                    } else {
                        res.status(403).send({ message: "Wrong username/password combination!" });
                    }
                });
            } else {
                res.status(400).send({ message: "User doesn't exist" });
            }
        }
    );
});

app.get("/adminlogin", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

app.post("/adminlogin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM user_management.Admins WHERE username = ?;",
        [username],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            //console.log(result)
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        req.session.user = result;
                        console.log(req.session.user);
                        res.status(200).send(result);
                    } else {
                        res.status(401).send({ message: "Wrong username/password combination!" });
                    }
                });
            } else {
                res.status(400).send({ message: "User doesn't exist" });
            }
        }
    );
});

app.listen(3001, () => {
    console.log("running server");
});
