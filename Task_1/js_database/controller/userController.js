const { getRepository } = require("typeorm");

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).send({ message: "Thiếu username hoặc password" });
        }

        const userRepo = getRepository("User"); // 👈 dùng string
        const newUser = userRepo.create({ username, password });
        await userRepo.save(newUser);

        res.send({ message: "✅ Đăng ký thành công!", user: newUser });
    } catch (err) {
        res.status(500).send({ message: "❌ Lỗi server", error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const userRepo = getRepository("User"); // 👈 dùng string

        const user = await userRepo.findOne({ where: { username, password } });
        if (!user) {
            return res.status(401).send({ message: "❌ Sai username hoặc password" });
        }

        res.send({ message: "✅ Đăng nhập thành công!", user });
    } catch (err) {
        res.status(500).send({ message: "❌ Lỗi server", error: err.message });
    }
};