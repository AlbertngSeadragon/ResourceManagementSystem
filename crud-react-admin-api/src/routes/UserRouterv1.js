const express = require("express");
const AdminController = require("../controllers/AdminControllerv1")
const ProfessorController = require("../controllers/ProfessorControllerv1")
const General_Office_GO_StaffController = require("../controllers/General_Office_GO_StaffControllerv1")
const router = express.Router();

router.get("/admins", AdminController.fetchAll)
router.get("/admins/:id", AdminController.fetchOne)
router.post("/admins", AdminController.create)
router.put("/admins/:id", AdminController.update)
router.delete("/admins/:id", AdminController.delete)

router.get("/professors", ProfessorController.fetchAll)
router.get("/professors/:id", ProfessorController.fetchOne)
router.post("/professors", ProfessorController.create)
router.put("/professors/:id", ProfessorController.update)
router.delete("/professors/:id", ProfessorController.delete)

router.get("/general_office_go_staffs", General_Office_GO_StaffController.fetchAll)
router.get("/general_office_go_staffs/:id", General_Office_GO_StaffController.fetchOne)
router.post("/general_office_go_staffs", General_Office_GO_StaffController.create)
router.put("/general_office_go_staffs/:id", General_Office_GO_StaffController.update)
router.delete("/general_office_go_staffs/:id", General_Office_GO_StaffController.delete)

module.exports = router