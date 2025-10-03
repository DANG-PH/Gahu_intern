// âm thanh 
const amThanhNen = document.getElementById("bg-music");
amThanhNen.volume = 0.3;
const nutChuyenAmThanh = document.getElementById("toggle-music");

let dangPhatAmThanh = JSON.parse(localStorage.getItem("dangPhatAmThanh"));
if (dangPhatAmThanh === null){
  dangPhatAmThanh = true;
}

if (!dangPhatAmThanh) {
  amThanhNen.pause();
  nutChuyenAmThanh.textContent = "🔇";
} else {
  const thoiGianDaLuu = sessionStorage.getItem("thoiGianAmThanh");
  if (thoiGianDaLuu) {
    amThanhNen.currentTime = parseFloat(thoiGianDaLuu);
  }
  amThanhNen.play();
  nutChuyenAmThanh.textContent = "🔊";
}

nutChuyenAmThanh.addEventListener("click", function () {
  dangPhatAmThanh = !dangPhatAmThanh;
  if (dangPhatAmThanh) {
    amThanhNen.play();
    nutChuyenAmThanh.textContent = "🔊";
  } else {
    amThanhNen.pause();
    nutChuyenAmThanh.textContent = "🔇";
  }
  localStorage.setItem("dangPhatAmThanh", JSON.stringify(dangPhatAmThanh));
});

window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("thoiGianAmThanh", amThanhNen.currentTime);
});