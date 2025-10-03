document.querySelector('.img-btn').addEventListener('click', function() {
    document.querySelector('.cont').classList.toggle('s-signup')
});
function handleRegister() {
    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirm = document.getElementById("signup-confirm").value;

    if (!username || !email || !password || !confirm) {
        showToast("❌ Bạn chưa sẵn sàng – hãy điền đầy đủ thông tin để khai sinh chiến binh mới.");
        return;
    }
    if (email==="admin"){
        showToast("❌ Đây là email của admin chiến binh hãy đăng ký email khác!")
        return;
    }
    if (password !== confirm) {
        showToast("⚠️ Sức mạnh chưa đồng bộ – mật khẩu xác nhận không trùng khớp.");
        return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
        showToast("❌ Chiến binh này đã tồn tại – hãy dùng email khác để tạo hành trình mới.");
        return;
    }
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    showToast("✅ Chiến binh mới đã xuất hiện! Hành trình vinh quang đang chờ bạn phía trước.");
    document.querySelector('.cont').classList.remove('s-signup');
}
function handleLogin() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email);
    if (!user) {
        showToast("❌ Không tìm thấy chiến binh – hãy đăng ký trước khi tham chiến.");
        setTimeout(() => {
            document.querySelector('.cont').classList.add('s-signup');  
        },500)
        return;
    }
    if (user.email==="admin" && user.password !== password){
        showToast("❌ Đây là tài khoản của admin")
        return
    }
    if (user.email==="admin" && user.password === password){
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        showToast("✅ Chào mừng admin đã trở lại")
        dangnhap();
        return setTimeout(()=>{
            window.location.href = "profile.html";
        },2000)
    }
    if (user.password === password) {
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        showToast("✅ Đăng nhập thành công! Chiến binh " + user.username + " đã trở lại chiến trường!");
        dangnhap();
        setTimeout(()=>{
            window.location.href = "index.html";
        },2000)
    } else {
        showToast("❌ Sức mạnh không khớp – mật khẩu không chính xác.");
    }
}
function dangnhap(){
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!user) return;
    const email = user.email;
    const today = new Date().toISOString().split("T")[0];
    let data = JSON.parse(localStorage.getItem(`onlineTimeData_${email}`)) || {};
    if (!data[today]) {
        data[today] = { start: Date.now() };
        localStorage.setItem(`onlineTimeData_${email}`, JSON.stringify(data));
    }
}