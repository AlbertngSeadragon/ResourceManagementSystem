const express = require("express");
const AdminController = require("../controllers/AdminController")
const ProfessorController = require("../controllers/ProfessorController")
const General_Office_GO_StaffController = require("../controllers/General_Office_GO_StaffController")
const router = express.Router();

router.get("/admins", AdminController.fetchAll)
router.get("/admins/:admin_id", AdminController.fetchOne)
router.post("/admins", AdminController.create)
router.put("/admins/:admin_id", AdminController.update)
router.delete("/admins/:admin_id", AdminController.delete)

router.get("/professors", ProfessorController.fetchAll)
router.get("/professors/:professor_id", ProfessorController.fetchOne)
router.post("/professors", ProfessorController.create)
router.put("/professors/:professor_id", ProfessorController.update)
router.delete("/professors/:professor_id", ProfessorController.delete)

router.get("/general_office_go_staffs", General_Office_GO_StaffController.fetchAll)
router.get("/general_office_go_staffs/:general_office_go_staff_id", General_Office_GO_StaffController.fetchOne)
router.post("/general_office_go_staffs", General_Office_GO_StaffController.create)
router.put("/general_office_go_staffs/:general_office_go_staff_id", General_Office_GO_StaffController.update)
router.delete("/general_office_go_staffs/:general_office_go_staff_id", General_Office_GO_StaffController.delete)

module.exports = router