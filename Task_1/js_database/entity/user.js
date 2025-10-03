const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "User",        // 👈 tên entity (dùng trong getRepository("User"))
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        username: {
            type: "varchar",
            length: 50,
        },
        password: {
            type: "varchar",
            length: 255,
        }
    }
});