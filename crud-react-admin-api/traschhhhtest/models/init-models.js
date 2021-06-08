var DataTypes = require("sequelize").DataTypes;
var _Admins = require("./Admins");
var _General_Office_GO_Staffs = require("./General_Office_GO_Staffs");
var _Professors = require("./Professors");

function initModels(sequelize) {
  var Admins = _Admins(sequelize, DataTypes);
  var General_Office_GO_Staffs = _General_Office_GO_Staffs(sequelize, DataTypes);
  var Professors = _Professors(sequelize, DataTypes);


  return {
    Admins,
    General_Office_GO_Staffs,
    Professors,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
