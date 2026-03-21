// ---------------- SLIDER ----------------
let index = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.remove("active");
    if (dots[idx]) dots[idx].classList.remove("active");
  });

  slides[i].classList.add("active");
  if (dots[i]) dots[i].classList.add("active");
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

function goToSlide(i) {
  index = i;
  showSlide(index);
}

// AUTO SLIDE
setInterval(nextSlide, 3000);

// ---------------- REDIRECT ----------------
function goToPage(movieId, type) {
  if (type === "now") {
    window.location.href = `booking.html?movie=${movieId}`;
  } else {
    window.location.href = `movieDetails.html?movie=${movieId}`;
  }
}

// ---------------- CREATE CARDS ----------------

// NOW SHOWING CARD
function createNowCard(key, movie) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <span class="tag">Now</span>
    <img src="${movie.poster}" alt="${movie.name}">
    <h3>${movie.name}</h3>
    <p>${movie.language}</p>
  `;

  card.addEventListener("click", () => goToPage(key, "now"));
  return card;
}

// UPCOMING CARD
function createUpcomingCard(key, movie) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div class="img-box">
      <img src="${movie.poster}" alt="${movie.name}">
      <div class="overlay">
        <p>Release Date</p>
        <h4>${movie.releaseDate}</h4>
      </div>
    </div>
    <h3>${movie.name}</h3>
  `;

  card.addEventListener("click", () => goToPage(key, "upcoming"));
  return card;
}

// ---------------- LOAD MOVIES ----------------
const movieGrid = document.getElementById("movieGrid");
const upcomingGrid = document.getElementById("upcomingmovieGrid");

function loadMovies() {
  movieGrid.innerHTML = "";
  upcomingGrid.innerHTML = "";

  // NOW SHOWING
  Object.keys(movies).forEach(key => {
    const movie = movies[key];
    movieGrid.appendChild(createNowCard(key, movie));
  });

  // UPCOMING
  Object.keys(upcomingMovies).forEach(key => {
    const movie = upcomingMovies[key];
    upcomingGrid.appendChild(createUpcomingCard(key, movie));
  });
}

// INITIAL LOAD
loadMovies();

// ---------------- SEARCH ----------------
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function () {
  const value = this.value.toLowerCase();

  movieGrid.innerHTML = "";
  upcomingGrid.innerHTML = "";

  // RESET
  if (value === "") {
    loadMovies();
    return;
  }

  let foundNow = false;
  let foundUpcoming = false;

  // SEARCH NOW SHOWING
  Object.keys(movies).forEach(key => {
    const movie = movies[key];

    if (movie.name.toLowerCase().includes(value)) {
      foundNow = true;
      movieGrid.appendChild(createNowCard(key, movie));
    }
  });

  // SEARCH UPCOMING
  Object.keys(upcomingMovies).forEach(key => {
    const movie = upcomingMovies[key];

    if (movie.name.toLowerCase().includes(value)) {
      foundUpcoming = true;
      upcomingGrid.appendChild(createUpcomingCard(key, movie));
    }
  });

  // NO RESULTS
  if (!foundNow) {
    movieGrid.innerHTML = "<h3>No movies found 😢</h3>";
  }

  if (!foundUpcoming) {
    upcomingGrid.innerHTML = "<h3>No upcoming movies 😢</h3>";
  }
});

let selectedMovie = "";

// OPEN MODAL (NOW SHOWING)
function goToPage(movieId, type) {

  if (type === "now") {
    selectedMovie = movieId;

    const movie = movies[movieId];

    // set title
    document.getElementById("movieTitle").innerText = movie.name;

    // create languages dynamically
    const langs = movie.language.split(",");
    const container = document.getElementById("languageOptions");
    container.innerHTML = "";

    langs.forEach((lang, index) => {
      container.innerHTML += `
        <label>
          <input type="radio" name="lang" value="${lang.trim()}" ${index === 0 ? "checked" : ""}>
          <span>${lang.trim()}</span>
        </label>
      `;
    });

    const modal = document.getElementById("languageModal");
    modal.style.display = "flex";  // ✅ show only on click

  } else {
    // UPCOMING → movie details page
    window.location.href = `movieDetails.html?movie=${movieId}`;
  }
}


// CLOSE MODAL
function closeModal() {
  document.getElementById("languageModal").style.display = "none";
}


// CLICK OUTSIDE CLOSE
window.onclick = function(e) {
  const modal = document.getElementById("languageModal");
  if (e.target === modal) {
    closeModal();
  }
};


// PROCEED BUTTON
function proceedBooking() {
  const lang = document.querySelector('input[name="lang"]:checked').value;

  // NOW SHOWING → booking page
  window.location.href = `booking.html?movie=${selectedMovie}&lang=${lang}`;
}