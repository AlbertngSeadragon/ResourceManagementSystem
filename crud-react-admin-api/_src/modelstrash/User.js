const { DataTypes } = require("sequelize")
const sequelize = require("./Database")

const User = sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

User.sync()
    .then(() => {
        console.log("[+] User table is now synced")
    })  
    .catch((err) => {
        console.log("[!] Could not sync user table")
        console.log("reason: " + err.message)
    })

module.exports = User