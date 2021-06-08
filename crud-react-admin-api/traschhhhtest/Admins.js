const { DataTypes } = require("sequelize")
const sequelize = require("./Database")

const Admin = sequelize.define("Admin", {
    admin_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
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

Admin.sync()
    .then(() => {
        console.log("[+] Admin table is now synced")
    })  
    .catch((err) => {
        console.log("[!] Could not sync user table")
        console.log("reason: " + err.message)
    })

module.exports = Admin