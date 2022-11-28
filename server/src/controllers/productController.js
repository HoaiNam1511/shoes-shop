const connectDB = require("../config/connectDB");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

class productController {
  createProduct(req, res) {
    let upload = multer({ storage: storage }).array("productImages", 12);
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // Một lỗi của Multer xảy ra khi upload.
      } else if (err) {
        // Một lỗi không xác định xảy ra khi upload.
      } else {
        const imageArray = req.files;
        const {
          productTitle,
          productPrice,
          categoryStatusId,
          categoryStyleId,
          categoryLineId,
          categoryCollectionId,
          categoryMaterialId,
        } = req.body;
        connectDB.query(
          "INSERT INTO products(product_title,product_price,fk_category_status_id,fk_category_style_id,fk_category_line_id,fk_category_collection_id,fk_category_material_id) VALUES(?,?,?,?,?,?,?)",
          [
            productTitle,
            productPrice,
            categoryStatusId,
            categoryStyleId,
            categoryLineId,
            categoryCollectionId,
            categoryMaterialId,
          ],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              connectDB.query(
                "SELECT id FROM products ORDER BY id DESC LIMIT 1",
                [],
                (err, result) => {
                  if (err) {
                    console.log(err);
                  } else {
                    const insert_data = imageArray.reduce(
                      (accumulator, currentValue) => [
                        ...accumulator,
                        [result[0].id, currentValue.filename],
                      ],
                      []
                    );
                    connectDB.query(
                      "INSERT INTO product_images(fk_product_id,image) VALUES ?",
                      [insert_data],
                      (err, result) => {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log("success");
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
        console.log("aaaa");
      }
    });
  }

  getAllProduct(req, res) {
    let sql =
      "SELECT prd.id,prd.product_code,prd.product_title,prd.product_price,prd.fk_category_status_id,prd.fk_category_style_id,prd.fk_category_line_id,prd.fk_category_collection_id,prd.fk_category_material_id FROM products as prd JOIN";
    connectDB.query("Select * from products", [], (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }

  deleteProduct(req, res) {
    const { id } = req.params;
    connectDB.query("DELETE FROM products WHERE id=?", [id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    });
  }

  updateProduct(req, res) {
    const { id } = req.params;
    const {
      productTitle,
      productPrice,
      categoryStatusId,
      categoryStyleId,
      categoryLineId,
      categoryCollectionId,
      categoryMaterialId,
    } = req.body;
    connectDB.query(
      "UPDATE products SET product_title = ?,product_price = ?,fk_category_status_id = ?,fk_category_style_id = ?,fk_category_line_id = ?,fk_category_collection_id = ?,fk_category_material_id = ? WHERE id=?",
      [
        productTitle,
        productPrice,
        categoryStatusId,
        categoryStyleId,
        categoryLineId,
        categoryCollectionId,
        categoryMaterialId,
        id,
      ],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Value Update");
        }
      }
    );
  }
}
module.exports = new productController();
