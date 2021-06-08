const express = require("express");
const UserController = require("../controllers/UserController")
const router = express.Router();

router.get("/users", UserController.fetchAll)
router.get("/users/:id", UserController.fetchOne)
router.post("/users", UserController.create)
router.put("/users/:id", UserController.update)
router.delete("/users/:id", UserController.delete)

module.exports = router