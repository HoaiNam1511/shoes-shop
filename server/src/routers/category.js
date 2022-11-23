const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/getAllCategoryGroup", categoryController.getALLCategoryGroup);
router.get("/get", categoryController.getAllCategory);
router.post("/create", categoryController.createCategory);
router.put("/update/:id", categoryController.updateCategory);
router.delete("/delete/:id", categoryController.deleteCategory);
router.get("/", categoryController.getAllCategory);
module.exports = router;
