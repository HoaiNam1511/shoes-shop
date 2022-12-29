const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/login", userController.login);
router.get("/role", userController.getRole);
router.post("/create", userController.createUser);
router.get("/get", userController.getUSer);
router.put("/update/:id", userController.updateUser);
router.delete("/delete/:id", userController.deleteUser);
router.get("/", userController.getUSer);

module.exports = router;
