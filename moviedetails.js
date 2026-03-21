// ---------------- GET MOVIE ID ----------------
const params = new URLSearchParams(window.location.search);
const movieId = params.get("movie");

// ---------------- GET DATA ----------------
const movie = movies[movieId] || upcomingMovies[movieId];

// ---------------- ELEMENTS ----------------
const poster = document.getElementById("poster");
const title = document.getElementById("title");
const lang = document.getElementById("lang");
const release = document.getElementById("release");
const genre = document.getElementById("genre");

// Tabs content
const synopsisDiv = document.getElementById("synopsis");
const castDiv = document.getElementById("cast");
const videosDiv = document.getElementById("videos");
const postersDiv = document.getElementById("posters");

// ---------------- LOAD DATA ----------------
if (movie) {
  poster.src = movie.poster;
  title.innerText = movie.name;
  lang.innerText = movie.language;

  release.innerText = movie.releaseDate
    ? "Releasing on " + movie.releaseDate
    : "Now Showing";

  genre.innerText = movie.genre || "";

  // Tab data
  synopsisDiv.innerText = movie.synopsis || "No description available";
  castDiv.innerText = movie.cast || "Cast details coming soon";
  videosDiv.innerHTML = "🎥 Trailer coming soon";
  postersDiv.innerHTML = `<img src="${movie.poster}" width="200">`;

} else {
  document.body.innerHTML = "<h2>Movie not found 😢</h2>";
}

// ---------------- TABS FUNCTION ----------------
const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    // remove active
    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    // add active
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});