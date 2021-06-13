const { DataTypes } = require("sequelize");
const Sequelize = require('sequelize');
const sequelize = require("./Database");

const Admin = sequelize.define('Admins', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: "username"
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  sequelize,
  tableName: 'Admins',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
    {
      name: "username",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "username" },
      ]
    },
  ]
});

Admin.sync()
  .then(() => {
    console.log("[+] Admin table is now synced")
  })
  .catch((err) => {
    console.log("[!] Could not sync admin table")
    console.log("reason: " + err.message)
  })

module.exports = Admin