
// ---------------- GET MOVIE + LANGUAGE FROM URL ----------------
const params = new URLSearchParams(window.location.search);

const movieId = params.get("movie");
const lang = params.get("lang");

// ---------------- GET DATA ----------------
const movie = movies[movieId];
const upcomingmovie = upcomingMovies[movieId];
const selectedMovie = movie || upcomingmovie;

// ---------------- UPDATE UI ----------------
if (selectedMovie) {

  // ✅ TITLE FIX (NO EMPTY ISSUE)
  document.getElementById("movieName").innerText =
    `${selectedMovie.name}${lang ? " (" + lang + ")" : ""}`;

  // ✅ META FIX (NO || ISSUE)
  document.getElementById("movieMeta").innerText =
    `${selectedMovie.certificate} • ${selectedMovie.language} • ${selectedMovie.duration}`;

  document.getElementById("moviePoster").src = selectedMovie.poster;

} else {
  document.getElementById("movieName").innerText = "Movie not found";
}

// ---------------- DATE SCROLL ----------------
const container = document.getElementById("dateContainer");
const today = new Date();

let selectedDate = "";
container.innerHTML = "";

for (let i = 0; i < 5; i++) {
  let dateObj = new Date();
  dateObj.setDate(today.getDate() + i);

  let day = dateObj.getDate();
  let weekDay = dateObj.toLocaleDateString("en-US", { weekday: "short" });

  let div = document.createElement("div");
  div.classList.add("date");

  if (i === 0) {
    div.classList.add("active");
    selectedDate = `${day} ${weekDay}`;
  }

  div.innerHTML = `<h3>${day}</h3><p>${weekDay}</p>`;

  div.addEventListener("click", () => {
    document.querySelectorAll(".date").forEach(d => d.classList.remove("active"));
    div.classList.add("active");
    selectedDate = `${day} ${weekDay}`;
  });

  container.appendChild(div);
}

// ---------------- THEATRE + TIME ----------------
document.querySelectorAll(".theater").forEach(theater => {

  const theatreName = theater.querySelector("h3").innerText;

  let price = 200;

  if (theatreName.includes("PVR")) price = 350;
  else if (theatreName.includes("KG")) price = 300;
  else if (theatreName.includes("Karpagam")) price = 280;
  else if (theatreName.includes("SENTHIL")) price = 250;
  else if (theatreName.includes("INOX")) price = 350;
  else if (theatreName.includes("Murugan")) price = 320;

  theater.querySelectorAll(".show-times button").forEach(btn => {

    btn.addEventListener("click", () => {

      document.querySelectorAll(".show-times button")
        .forEach(b => b.classList.remove("selected"));

      btn.classList.add("selected");

      const time = btn.getAttribute("data-time") || btn.innerText;

      if (!selectedDate) {
        alert("Please select a date");
        return;
      }

      // ✅ FINAL REDIRECT (FULL FIX)
      window.location.href =
        `Seats.html?movie=${movieId}` +
        `&lang=${encodeURIComponent(lang || "")}` +
        `&time=${encodeURIComponent(time)}` +
        `&date=${encodeURIComponent(selectedDate)}` +
        `&theatre=${encodeURIComponent(theatreName)}` +
        `&price=${price}`;
    });

  });

});

