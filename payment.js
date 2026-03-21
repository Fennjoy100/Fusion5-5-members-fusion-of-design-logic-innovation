// 📥 Get data from URL
const params = new URLSearchParams(window.location.search);

const movieId = params.get("movie");
const date = params.get("date") || "";
const time = params.get("time") || "";
const theatre = params.get("theatre") || "";
const seats = params.get("seats") || "";
const total = parseInt(params.get("total")) || 0;

// 🎬 Movie name from URL
document.getElementById("movieName").innerText =
  movieId
    .replace(/([A-Z])/g, " $1")
    .replace(/-/g, " ")
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim();

// 🏢 Theatre
document.getElementById("theatreName").innerText = theatre;

// 📅 Date + Time
document.getElementById("dateTime").innerText = `${date}, ${time}`;

// 🎟 Seats
document.getElementById("seatList").innerText = seats;

// 💰 Price
const tax = Math.round(total * 0.18);
const finalTotal = total + tax;

document.getElementById("ticketAmount").innerText = total;
document.getElementById("taxAmount").innerText = tax;
document.getElementById("finalTotal").innerText = finalTotal;

// 💳 Button
document.getElementById("payBtn").addEventListener("click", () => {
 // SHOW CUSTOM POPUP
document.getElementById("successPopup").style.display = "flex";
});
function goHome() {
  window.location.href = "movies.html";
}
function makePayment() {
  document.getElementById("successPopup").style.display = "flex";
}