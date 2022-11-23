const connectDB = require("../config/connectDB");

class productController {
  createProduct(req, res) {
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
      "INSERT INTO product(product_title,product_price,fk_category_status_id,fk_category_style_id,fk_category_line_id,fk_category_collection_id,fk_category_material_id) VALUES(?,?,?,?,?,?,?)",
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
          res.send("Value Inserted");
        }
      }
    );
  }
  getAllProduct(req, res) {
    connectDB.query("SELECT * FROM product", [], (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  }

  deleteProduct(req, res) {
    const { id } = req.params;
    connectDB.query("DELETE FROM product WHERE id=?", [id], (err, result) => {
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
      "UPDATE product SET product_title = ?,product_price = ?,fk_category_status_id = ?,fk_category_style_id = ?,fk_category_line_id = ?,fk_category_collection_id = ?,fk_category_material_id = ? WHERE id=?",
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

  uploadImage(req, res) {
    const file = "xinchao";

    const sql = "INSERT INTO users(image) VALUES ?";
    connectDB.query(sql, [file], (err, results) => {
      if (err) throw err;
      res.json({ success: 1 });
    });
    //res.send("success");
  }
}
module.exports = new productController();
