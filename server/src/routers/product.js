const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/get", productController.getAllProduct);
router.post("/create", productController.createProduct);
router.delete("/delete/:id", productController.deleteProduct);
router.put("/update/:id", productController.updateProduct);
router.post("/imageUpload", productController.uploadImage);
module.exports = router;
