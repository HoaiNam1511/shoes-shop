const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8080;
const cors = require("cors");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/Images", express.static("Images"));
const route = require("./src/routers/index");
route(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
