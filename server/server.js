const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
app.use(express.json());
app.use(cors());
const route = require("./src/routers/index");

route(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
