'use strict';

/* ══ MOVIE DATA ══ */
const movies = {
  thaai: {
    name: "Thaai Kizhavi", names: { en: "Thaai Kizhavi", ta: "தாய் கிழவி", ml: "തായ് കിഴവി", hi: "थाई किज़वी", es: "Thaai Kizhavi" },
    certificate: "U", language: "Tamil, Malayalam",
    duration: "2h 30m", poster: "../assets/images/movies/p-thai.jpg"
  },
  dhurandhar: {
    name: "Dhurandhar", names: { en: "Dhurandhar", ta: "துரந்தர்", ml: "ദുരന്തർ", hi: "धुरंधर", es: "Dhurandhar" },
    certificate: "A", language: "Tamil, Hindi, Malayalam",
    duration: "3h", poster: "../assets/images/movies/p-dhu.jpg"
  },
  youth: {
    name: "Youth", names: { en: "Youth", ta: "யூத்", ml: "യൂത്ത്", hi: "यूथ", es: "Youth" },
    certificate: "TBA", language: "Tamil, Telugu",
    duration: "2h 40m", poster: "../assets/images/movies/p-youth.jpg"
  },
  aadu: {
    name: "Aadu-3", names: { en: "Aadu-3", ta: "ஆடு-3", ml: "ആട്-3", hi: "आदु-3", es: "Aadu-3" },
    certificate: "A", language: "Tamil, Malayalam",
    duration: "2h 30m", poster: "../assets/images/movies/p-aadu.jpg"
  },
  vadam: {
    name: "Vadam", names: { en: "Vadam", ta: "வடம்", ml: "വടം", hi: "वड़म", es: "Vadam" },
    certificate: "U/A", language: "Tamil",
    duration: "2h 20m", poster: "../assets/images/movies/p-VAdam.jpg"
  },
  withlove: {
    name: "With Love", names: { en: "With Love", ta: "வித் லவ்", ml: "വിത്ത് ലവ്", hi: "विद लव", es: "Con Amor" },
    certificate: "U/A", language: "Tamil, Hindi",
    duration: "2h 25m", poster: "../assets/images/movies/p-withlovw.jpg"
  },
  vowels: {
    name: "VOWELS", names: { en: "VOWELS", ta: "வோவெல்ஸ்", ml: "വവൽസ്", hi: "वोवेल्स", es: "Vocales" },
    certificate: "U/A", language: "Tamil, Telugu",
    duration: "2h 50m", poster: "../assets/images/movies/p-VOWELS.jpg"
  }
};

const upcomingMovies = {
  lovemocktail: {
    name: "Love Mocktail-3", names: { en: "Love Mocktail-3", ta: "லவ் மொக்டெய்ல்-3", ml: "ലവ് മോക്ടൈൽ-3", hi: "लव कॉकटेल-3", es: "Love Mocktail-3" },
    certificate: "U", language: "Tamil, Malayalam, Telugu",
    duration: "2h 30m", releaseDate: "1 Apr 2026",
    poster: "../assets/images/movies/p-Love-Mocktail-3-.jpg"
  },
  jananayagan: {
    name: "Jananayagan", names: { en: "Jananayagan", ta: "ஜன நாயகன்", ml: "ജന നായകൻ", hi: "जननायक", es: "Jananayagan" },
    certificate: "U/A", language: "Tamil",
    duration: "2h 40m", releaseDate: "10 Apr 2026",
    poster: "../assets/images/movies/p-jana.jpg"
  },
  korpur: {
    name: "Korpur", names: { en: "Korpur", ta: "கோர்பூர்", ml: "കോർപ്പൂർ", hi: "कोरपुर", es: "Korpur" },
    certificate: "U", language: "Tamil, Malayalam",
    duration: "2h 35m", releaseDate: "19 Apr 2026",
    poster: "../assets/images/movies/p-Korpur-2.jpg"
  },
  kadhalresetrepeat: {
    name: "Kadhal Reset Repeat", names: { en: "Kadhal Reset Repeat", ta: "காதல் ரிசெட் ரிப்பீட்", ml: "കാതൽ റീസെറ്റ് റീപ്പീറ്റ്", hi: "काधल रिसेट रिपीट", es: "Amor Reset Repetir" },
    certificate: "U", language: "Tamil, Malayalam, Hindi",
    duration: "2h 35m", releaseDate: "21 Mar 2026",
    poster: "../assets/images/movies/p-Kadharesetrepeat.jpg"
  },
  kenathakanom: {
    name: "Kenatha Kanom", names: { en: "Kenatha Kanom", ta: "கிணத்த காணோம்", ml: "കിണത്തെ കാണാം", hi: "केनाथ कानोम", es: "Kenatha Kanom" },
    certificate: "U/A", language: "Tamil",
    duration: "2h 10m", releaseDate: "21 Apr 2026",
    poster: "../assets/images/movies/p-kk.jpg"
  }
};

let currentLang = localStorage.getItem('fusion5-lang') || 'en';

/* ══ SLIDER ══ */
let slideIndex = 0;
const totalSlides = 3;

function showSlide(i) {
  document.querySelectorAll('.mv-slide').forEach((s, idx) => {
    s.classList.toggle('active', idx === i);
  });
  document.querySelectorAll('.mv-dot').forEach((d, idx) => {
    d.classList.toggle('active', idx === i);
  });
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % totalSlides;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
  showSlide(slideIndex);
}

// Auto slide
let autoSlide = setInterval(nextSlide, 4000);

function resetAuto() {
  clearInterval(autoSlide);
  autoSlide = setInterval(nextSlide, 4000);
}

/* ══ CREATE MOVIE CARDS ══ */
function createNowCard(key, movie) {
  const card = document.createElement('article');
  card.className = 'mv-card';
  card.setAttribute('role', 'listitem');
  card.innerHTML = `
    <div class="mv-card-img-wrap">
      <img src="${movie.poster}" alt="${movie.name}" loading="lazy">
      <span class="mv-card-tag">Now</span>
    </div>
    <div class="mv-card-info">
      <h3>${movie.names[currentLang] || movie.name}</h3>
      <p>${movie.language} · ${movie.duration} · ${movie.certificate}</p>
      <button class="mv-card-btn" onclick="openModal('${key}')">Book Tickets</button>
    </div>
  `;
  card.addEventListener('click', () => openModal(key));
  return card;
}

function createUpcomingCard(key, movie) {
  const card = document.createElement('article');
  card.className = 'mv-card';
  card.setAttribute('role', 'listitem');
  card.innerHTML = `
    <div class="mv-upcoming-wrap">
      <img src="${movie.poster}" alt="${movie.name}" loading="lazy" style="width:100%;aspect-ratio:2/3;object-fit:cover;border-radius:12px;">
      <div class="mv-upcoming-overlay">
        <p>Release Date</p>
        <h4>${movie.releaseDate}</h4>
      </div>
    </div>
    <div class="mv-card-info">
      <h3>${movie.names[currentLang] || movie.name}</h3>
      <p>${movie.duration} • ${movie.language}</p>
      <button class="mv-card-btn upcoming" onclick="showToast('Booking opens soon')">Notify Me</button>
    </div>
  `;
  card.addEventListener('click', () => {
    showToast(`${movie.name} releases on ${movie.releaseDate}`);
  });
  return card;
}

/* ══ LOAD MOVIES ══ */
function loadMovies(query = '') {
  const grid = document.getElementById('movieGrid');
  const upGrid = document.getElementById('upcomingGrid');
  if (!grid || !upGrid) return;
  grid.innerHTML = '';
  upGrid.innerHTML = '';
  const q = query.toLowerCase().trim();

  Object.keys(movies).forEach(key => {
    const movie = movies[key];
    const nameInCurrentLang = movie.names[currentLang] || movie.name;
    if (!q || movie.name.toLowerCase().includes(q) || nameInCurrentLang.toLowerCase().includes(q)) {
      grid.appendChild(createNowCard(key, movie));
    }
  });

  Object.keys(upcomingMovies).forEach(key => {
    const movie = upcomingMovies[key];
    const nameInCurrentLang = movie.names[currentLang] || movie.name;
    if (!q || movie.name.toLowerCase().includes(q) || nameInCurrentLang.toLowerCase().includes(q)) {
      upGrid.appendChild(createUpcomingCard(key, movie));
    }
  });

  if (!grid.children.length) grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#666;padding:2rem;">No movies found.</p>';
  if (!upGrid.children.length) upGrid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#666;padding:2rem;">No upcoming movies.</p>';
}

/* ══ MODAL ══ */
let selectedMovie = '';

function openModal(key) {
  const movie = movies[key];
  if (!movie) return;
  selectedMovie = key;
  document.getElementById('movieTitle').textContent = movie.names[currentLang] || movie.name;

  const container = document.getElementById('languageOptions');
  const langs = movie.language.split(',').map(l => l.trim());
  container.innerHTML = langs.map((lang, i) => `
    <label>
      <input type="radio" name="lang" value="${lang}" ${i === 0 ? 'checked' : ''}>
      <span>${lang}</span>
    </label>
  `).join('');

  const modal = document.getElementById('languageModal');
  const langStep = document.getElementById('langStep');
  const seatStep = document.getElementById('seatStep');
  if (langStep) langStep.style.display = 'block';
  if (seatStep) seatStep.style.display = 'none';

  modal.classList.add('show');
  modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('languageModal');
  modal.classList.remove('show');
  modal.style.display = 'none';
}

let selectedLang = '';
let selectedSeat = '';

function showSeatStep() {
  const radio = document.querySelector('input[name="lang"]:checked');
  if (!radio) return;
  selectedLang = radio.value;

  document.getElementById('langStep').style.display = 'none';
  document.getElementById('seatStep').style.display = 'block';
  renderSeats();
}

function renderSeats() {
  const grid = document.getElementById('seatGrid');
  if (!grid) return;
  grid.innerHTML = '';
  selectedSeat = '';
  document.getElementById('confirmBtn').disabled = true;

  // Generate 24 seats (3 rows x 8 seats)
  for (let i = 1; i <= 24; i++) {
    const seat = document.createElement('div');
    seat.className = 'seat available';
    // Randomly occupy some seats
    const isOccupied = Math.random() < 0.2;
    if (isOccupied) {
      seat.classList.replace('available', 'occupied');
      seat.textContent = 'X';
    } else {
      seat.textContent = i;
      seat.onclick = () => selectSeat(seat, i);
    }
    grid.appendChild(seat);
  }
}

function selectSeat(el, num) {
  document.querySelectorAll('.seat.selected').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
  selectedSeat = num;
  document.getElementById('confirmBtn').disabled = false;
}

function confirmTicket() {
  if (!selectedSeat) return;
  const movie = movies[selectedMovie];
  closeModal();

  const success = document.getElementById('bookingSuccess');
  const msg = document.getElementById('successMsg');
  if (msg) {
    msg.innerHTML = `
      <strong>your comform ticket</strong><br><br>
      Movie: ${movie.names[currentLang] || movie.name}<br>
      Language: ${selectedLang}<br>
      Seat Number: <strong>${selectedSeat}</strong><br><br>
      Enjoy your movie! 🎬
    `;
  }
  if (success) success.style.display = 'flex';

  // Save to History
  const bookings = JSON.parse(localStorage.getItem('fusion5-bookings') || '[]');
  bookings.push({
    movie: movie.names[currentLang] || movie.name,
    lang: selectedLang,
    seat: selectedSeat,
    time: new Date().toLocaleString()
  });
  localStorage.setItem('fusion5-bookings', JSON.stringify(bookings));
}

function closeSuccess() {
  const success = document.getElementById('bookingSuccess');
  if (success) success.style.display = 'none';
}

window.openModal = openModal;
window.closeModal = closeModal;
window.showSeatStep = showSeatStep;
window.confirmTicket = confirmTicket;
window.closeSuccess = closeSuccess;

/* ══ CLICK OUTSIDE MODAL ══ */
window.addEventListener('click', e => {
  const modal = document.getElementById('languageModal');
  if (e.target === modal) closeModal();
});

/* ══ SEARCH ══ */
function initSearch() {
  ['searchInput', 'searchInput2'].forEach(id => {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener('input', () => {
      const other = document.getElementById(id === 'searchInput' ? 'searchInput2' : 'searchInput');
      if (other) other.value = input.value;
      loadMovies(input.value);
    });
  });
}

/* ══ TOAST ══ */
function showToast(msg, type = 'success') {
  let c = document.getElementById('toastContainer');
  if (!c) { c = document.createElement('div'); c.id = 'toastContainer'; document.body.appendChild(c); }
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.setAttribute('role', 'alert');
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => { t.classList.add('hide'); setTimeout(() => t.remove(), 400); }, 3000);
}
window.showToast = showToast;

/* ══ PRELOADER ══ */
function initPreloader() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const p = document.getElementById('preloader');
      if (p) p.classList.add('done');
    }, 1600);
  });
}

/* ══ CURSOR ══ */
function initCursor() {
  const c = document.getElementById('cursor');
  const f = document.getElementById('cursorFollower');
  if (!c || !f) return;
  let mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    c.style.left = mx + 'px'; c.style.top = my + 'px';
  });
  function follow() {
    fx += (mx - fx) * 0.12; fy += (my - fy) * 0.12;
    f.style.left = fx + 'px'; f.style.top = fy + 'px';
    requestAnimationFrame(follow);
  }
  follow();
}

/* ══ THEME ══ */
function initTheme() {
  const btn = document.getElementById('themeBtn');
  const icon = document.querySelector('#themeBtn .theme-icon');
  const saved = localStorage.getItem('fusion5-theme') || 'dark';
  if (icon) icon.textContent = saved === 'dark' ? '☀' : '◑';
  if (btn) {
    btn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('fusion5-theme', next);
      if (icon) icon.textContent = next === 'dark' ? '☀' : '◑';
      showToast(next === 'light' ? 'Light mode ☀' : 'Dark mode ◑');
    });
  }
}

/* ══ HAMBURGER ══ */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mvMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  menu.querySelectorAll('.mv-nav-link').forEach(l => {
    l.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ── VOICE SEARCH ── */
function initVoiceSearch() {
  const voiceBtns = document.querySelectorAll('#voiceBtn, #micFab');
  const searchInput = document.getElementById('searchInput');

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    voiceBtns.forEach(btn => btn.style.display = 'none');
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  voiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      recognition.start();
      btn.classList.add('recording');
      showToast('I am listening...', 'info');
    });
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    const cleanQuery = transcript.replace('i want to see ', '').replace('show me ', '').replace('book ', '').replace('find ', '').replace('search ', '').trim();
    
    // Check navigation
    const navMap = {
      'showing': '#nowShowing',
      'cinemas': '#nowShowing',
      'upcoming': '#upcoming',
      'soon': '#upcoming',
      'home': '#mvHero'
    };

    if (navMap[cleanQuery]) {
       const target = document.querySelector(navMap[cleanQuery]);
       if (target) {
         target.scrollIntoView({ behavior: 'smooth' });
         showToast(`Navigating to ${cleanQuery}...`);
       }
    } else {
      if (searchInput) {
        searchInput.value = cleanQuery;
        loadMovies(cleanQuery);
        showToast(`Searching for: ${cleanQuery}`);
        // Scroll to grid
        document.getElementById('nowShowing').scrollIntoView({ behavior: 'smooth' });
      }
    }
    voiceBtns.forEach(btn => btn.classList.remove('recording'));
  };

  recognition.onerror = () => {
    voiceBtns.forEach(btn => btn.classList.remove('recording'));
    showToast('Voice error. Refusing to listen.', 'error');
  };

  recognition.onend = () => {
    voiceBtns.forEach(btn => btn.classList.remove('recording'));
  };
}

/* ══ INIT ALL ══ */
/* ── TRANSLATOR ── */
function initTranslator() {
  const langBtn = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');
  if (!langBtn || !langDropdown) return;

  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('show');
  });

  document.addEventListener('click', () => langDropdown.classList.remove('show'));

  langDropdown.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      currentLang = btn.dataset.lang;
      localStorage.setItem('fusion5-lang', currentLang);
      loadMovies(); // Re-render movies with new language
      showToast(`Language changed to ${btn.textContent}`);
    });
  });
}

/* ── TEXT TO SPEECH (Speaker) ── */
function initTTS() {
  const speakerBtn = document.getElementById('speakerBtn');
  if (!speakerBtn) return;

  speakerBtn.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const displayedMovies = document.querySelectorAll('.mv-card h3');
      if (displayedMovies.length === 0) {
        showToast('No movies to read', 'error');
        return;
      }

      showToast('Reading movie titles...', 'info');
      speakerBtn.classList.add('playing');

      let textToRead = 'Now showing at Fusion 5 Cinema: ';
      displayedMovies.forEach((h3, index) => {
        textToRead += h3.textContent + (index < displayedMovies.length - 1 ? ', ' : '.');
      });

      const utterance = new SpeechSynthesisUtterance(textToRead);
      const voices = window.speechSynthesis.getVoices();
      const langMap = { 'ta': 'ta-IN', 'ml': 'ml-IN', 'hi': 'hi-IN', 'es': 'es-ES', 'en': 'en-US' };
      const voice = voices.find(v => v.lang.startsWith(langMap[currentLang]));
      if (voice) utterance.voice = voice;
      utterance.lang = langMap[currentLang] || 'en-US';

      utterance.onend = () => speakerBtn.classList.remove('playing');
      utterance.onerror = () => speakerBtn.classList.remove('playing');
      window.speechSynthesis.speak(utterance);
    } else {
      showToast('Browser does not support Text-to-Speech', 'error');
    }
  });
}

// Placeholder for initSmoothScroll if it's not defined elsewhere
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCursor();
  initTheme();
  initHamburger();
  initSearch();
  initVoiceSearch();
  loadMovies();
  initTranslator();
  initTTS();
  initSmoothScroll();

  // Slider buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAuto(); });

  // Dot clicks
  document.querySelectorAll('.mv-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      slideIndex = parseInt(dot.dataset.idx);
      showSlide(slideIndex);
      resetAuto();
    });
  });
});
