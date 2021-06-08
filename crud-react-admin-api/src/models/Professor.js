const { DataTypes } = require("sequelize");
const Sequelize = require('sequelize');
const sequelize = require("./Database");

const Professor = sequelize.define('Professors', {
  professor_id: {
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
  tableName: 'Professors',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "professor_id" },
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

Professor.sync()
  .then(() => {
    console.log("[+] Professor table is now synced")
  })
  .catch((err) => {
    console.log("[!] Could not sync Professor table")
    console.log("reason: " + err.message)
  })

module.exports = Professor