const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8080;
const cors = require("cors");
const route = require("./src/routers/index");
// app.use(cors());
app.use(cookieParser());
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:3001",
            "http://192.168.1.12:3000",
            "http://172.20.10.3:3000",
        ],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded());
app.use("/Images", express.static("Images"));

route(app);
app.listen(port, "0.0.0.0", () => {
    console.log(`Example app listening on port ${port}`);
});
