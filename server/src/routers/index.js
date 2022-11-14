const category = require("./category");
function route(app) {
  app.use("/category", category);
}

module.exports = route;
