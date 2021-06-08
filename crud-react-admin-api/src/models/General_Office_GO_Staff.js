const { DataTypes } = require("sequelize");
const Sequelize = require('sequelize');
const sequelize = require("./Database");

const General_Office_GO_Staff = sequelize.define('General_Office_GO_Staffs', {
  go_id: {
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
  tableName: 'General_Office_GO_Staffs',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "go_id" },
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

General_Office_GO_Staff.sync()
  .then(() => {
    console.log("[+] General_Office_GO_Staff table is now synced")
  })
  .catch((err) => {
    console.log("[!] Could not sync General_Office_GO_Staff table")
    console.log("reason: " + err.message)
  })

module.exports = General_Office_GO_Staff