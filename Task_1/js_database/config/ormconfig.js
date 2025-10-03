module.exports = {
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "Phamhaidang112@",
    database: "gahu_intern",
    synchronize: true,   // auto tạo bảng từ entity (giống Hibernate hbm2ddl.auto)
    entities: [
        __dirname + "/../entity/*.js"
    ]
};