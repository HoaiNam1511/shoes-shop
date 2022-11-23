const category = require("./category");
const product = require("./product");
function route(app) {
  app.use("/category", category);
  app.use("/product", product);
}

module.exports = route;
