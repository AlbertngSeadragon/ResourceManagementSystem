const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    logging: false,
    dialect: "mysql",
    host: process.env.DB_HOST
})

sequelize.authenticate()
    .then(() => {
        console.log("[+] Database connected")
    })
    .catch(err => {
        console.log("[!] Could no connect with Database")
        console.log("Reason: " + err.original.sqlMessage)
    })

module.exports = sequelize