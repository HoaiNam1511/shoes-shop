const connectionDB = require("../config/connectDB");

class categoryController {
  getALLCategoryGroup(req, res) {
    connectionDB.query("SELECT * FROM category_groups", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  }

  getAllCategory(req, res) {
    connectionDB.query(
      "SELECT cc.id, cc.category_title, cc.fk_category_group_id, pcg.category_group_title FROM categorys as cc JOIN category_groups as pcg ON cc.fk_category_group_id = pcg.id ORDER BY cc.fk_category_group_id ASC, id",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  }
  createCategory(req, res) {
    const { categoryTitle, categoryGroupId } = req.body;
    connectionDB.query(
      "INSERT INTO categorys(fk_category_group_id, category_title) VALUES(?, ?)",
      [categoryGroupId, categoryTitle],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Value Inserted");
        }
      }
    );
  }
  deleteCategory(req, res) {
    const id = req.params.id;
    connectionDB.query(
      "DELETE from categorys WHERE id = ? ",
      [id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Value Deleted");
        }
      }
    );
  }

  updateCategory(req, res) {
    const { categoryTitle, categoryGroupId } = req.body;
    const id = req.params.id;

    connectionDB.query(
      "UPDATE categorys SET category_title = ?, fk_category_group_id= ? WHERE id = ? ",
      [categoryTitle, categoryGroupId, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Value Updated");
        }
      }
    );
  }
}
module.exports = new categoryController();
