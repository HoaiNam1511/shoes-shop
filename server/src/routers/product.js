const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const middlewareController = require("../controllers/middlewareController");

router.get("/get", productController.getAllProduct);
router.post(
    "/create",
    middlewareController.verifyToken,
    middlewareController.checkAdminAuth,
    productController.createProduct
);
router.delete(
    "/delete/:id",
    middlewareController.verifyToken,
    middlewareController.checkAdminAuth,
    productController.deleteProduct
);
router.put(
    "/update/:id",
    middlewareController.verifyToken,
    middlewareController.checkAdminAuth,
    productController.updateProduct
);

router.get("/:id", productController.getOneProduct);

router.get("/", productController.getAllProduct);

module.exports = router;
