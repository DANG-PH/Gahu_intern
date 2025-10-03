if (!localStorage.getItem("demoDataLoaded")) {
    const demoUsers = [
    {
    username: "👑 Dang Hai",
    email: "admin",
    password:"1",
    kimcuong:9999999,
    history: [{"time": "2006-09-27T17:00:00.315Z","zeni": 9999999,"vnd": 0,}],
    },
    {
    username: "Dũnggg",
    email: "vip2@demo.cbrt",
    history: [{ zeni: 50000 }],
    },
    {
    username: "Saidepchiu",
    email: "vip3@demo.cbrt",
    history: [{ zeni: 158250 }],
    },

    {
    username: "LD Thànhh",
    email: "vip4@demo.cbrt",
    history: [{ zeni: 200000 }],
    },
    {
    username: "Huy Quang",
    email: "vip5@demo.cbrt",
    history: [{ zeni: 327500 }],
    },
    {
    username: "LQC-Nopee",
    email: "vip6@demo.cbrt",
    history: [{ zeni: 482750 }],
    },
    {
    username: "Hẹ Hẹ Hẹ",
    email: "vip7@demo.cbrt",
    history: [{ zeni: 32250 }],
    },
    {
    username: "chillboy",
    email: "vip8@demo.cbrt",
    history: [{ zeni: 124250 }],
    },
    {
    username: "admin",
    email: "vip9@demo.cbrt",
    history: [{ zeni: 1250 }],
    },
];

const Users = JSON.parse(localStorage.getItem("users")) || [];
const allUsers = [...Users, ...demoUsers];
localStorage.setItem("users", JSON.stringify(allUsers));
localStorage.setItem("demoDataLoaded", "true"); 
}