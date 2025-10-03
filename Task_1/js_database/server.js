require("reflect-metadata");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createConnection } = require("typeorm");

const ormConfig = require("./config/ormconfig");
const userController = require("./controller/userController");

const app = express();
app.use(cors());
app.use(bodyParser.json());

createConnection(ormConfig).then(() => {
    console.log("✅ Kết nối DB thành công!");

    // Routes
    app.post("/register", userController.register);
    app.post("/login", userController.login);

    app.listen(3000, () => {
        console.log("🚀 Server chạy tại http://localhost:3000");
    });
}).catch(err => console.error("❌ Lỗi kết nối DB:", err));