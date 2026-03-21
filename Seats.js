// 📥 Read URL data
const params = new URLSearchParams(window.location.search);
const lang = params.get("lang");   // ✅ NEW

const movieId = params.get("movie");
const selectedTime = params.get("time");
const selectedDate = params.get("date");
const theatreName = params.get("theatre");
const price = parseInt(params.get("price")) || 200;

// 🔑 Booking key
const bookingKey = `${movieId}_${lang}_${selectedDate}_${selectedTime}_${theatreName}`;

// ✅ SAFE localStorage (FIXED)
let bookedSeats = [];

try {
  bookedSeats = JSON.parse(localStorage.getItem(bookingKey)) || [];
} catch (e) {
  bookedSeats = [];
}

// 🎬 Show info
document.getElementById("seatPrice").innerText = `₹${price} per seat`;

if (selectedDate && selectedTime && theatreName) {
  document.getElementById("showDetails").innerText =
    `${selectedDate}, ${selectedTime} at ${theatreName}`;
}

// ---------------- SEATS ----------------
const container = document.getElementById("seatContainer");

// ✅ Safety check
if (!container) {
  console.error("seatContainer not found ❌");
}

// rows & cols
const rows = ["A","B","C","D","E","F","G","H"];
const cols = 10;

// 🎟️ Create seats
rows.forEach(row => {
  for (let j = 1; j <= cols; j++) {

    const seat = document.createElement("div");
    seat.classList.add("seat");

    const seatId = row + j;

    seat.innerText = j;
    seat.setAttribute("data-seat", seatId);

    // 🔒 occupied
    if (bookedSeats.includes(seatId)) {
      seat.classList.add("occupied");
    }

    // 🎯 click event
    seat.addEventListener("click", () => {

      if (seat.classList.contains("occupied")) return;

      seat.classList.toggle("selected");
      updateSummary();
    });

    container.appendChild(seat);
  }
});

// ---------------- SUMMARY ----------------
function updateSummary() {

  const selectedSeats = document.querySelectorAll(".seat.selected");

  let seatList = [];

  selectedSeats.forEach(seat => {
    seatList.push(seat.getAttribute("data-seat"));
  });

  const count = seatList.length;

  document.getElementById("selectedSeats").innerText =
    count ? seatList.join(", ") : "None";

  document.getElementById("seatCount").innerText =
    count ? `${count} Seat${count > 1 ? "s" : ""} Selected` : "0 Seats Selected";

  document.getElementById("totalPrice").innerText = count * price;
}

// ---------------- PAYMENT ----------------
document.getElementById("payBtn").addEventListener("click", () => {

  const selectedSeats = document.querySelectorAll(".seat.selected");

  if (selectedSeats.length === 0) {
    alert("Please select seats!");
    return;
  }

  let seats = [];

  selectedSeats.forEach(seat => {
    seats.push(seat.getAttribute("data-seat"));
  });

  const total = seats.length * price;

  // 🔐 store seats
  let storedSeats = [];

  try {
    storedSeats = JSON.parse(localStorage.getItem(bookingKey)) || [];
  } catch {
    storedSeats = [];
  }

  storedSeats = [...new Set([...storedSeats, ...seats])];

  localStorage.setItem(bookingKey, JSON.stringify(storedSeats));

  // 👉 redirect
window.location.href =
  `payment.html?movie=${movieId}` +
  `&lang=${lang}` +   // ✅ ADD THIS
  `&date=${encodeURIComponent(selectedDate)}` +
  `&time=${encodeURIComponent(selectedTime)}` +
  `&theatre=${encodeURIComponent(theatreName)}` +
  `&seats=${seats.join(",")}` +
  `&total=${total}`;
});