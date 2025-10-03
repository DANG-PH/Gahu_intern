const congTacCheDoToi = document.getElementById("darkModeToggle");

// Khi trang được tải
if (localStorage.getItem("cheDoToi") === "true") {
  document.body.classList.add("dark-mode"); 
  congTacCheDoToi.checked = true; 
}

// Khi người dùng bật hoặc tắt chế độ tối
congTacCheDoToi.addEventListener("change", function () {
  const dangBatCheDoToi = congTacCheDoToi.checked; 
  document.body.classList.toggle("dark-mode", dangBatCheDoToi);
  localStorage.setItem("cheDoToi", dangBatCheDoToi); 
});