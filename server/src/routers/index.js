const category = require("./category");
const product = require("./product");
const user = require("./user");
function route(app) {
    app.use("/category", category);
    app.use("/product", product);
    app.use("/user", user);
}

module.exports = route;
