// 🎤 Voice Recognition Setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const micBtn = document.getElementById("micBtn");
const transcriptionArea = document.getElementById("transcription");
const productCards = document.querySelectorAll(".product-card");

let isListening = false;

// 📱 Mobile Menu Toggle
function toggleMenu() {
  const navContainer = document.getElementById("navContainer");
  const menuToggle = document.getElementById("menuToggle");
  navContainer.classList.toggle("active");
  menuToggle.classList.toggle("active");
}

// Toggle Voice Listening
function toggleVoice() {
  if (isListening) {
    recognition.stop();
  } else {
    recognition.start();
    micBtn.classList.add("listening");
    transcriptionArea.style.display = "block";
    transcriptionArea.innerText = "Listening...";
    isListening = true;
  }
}

recognition.onresult = function(event) {
  const speech = event.results[0][0].transcript.toLowerCase();
  transcriptionArea.innerText = `You said: "${speech}"`;
  
  processSpeechCommand(speech);
  
  // Hide transcription after 3 seconds
  setTimeout(() => {
    transcriptionArea.style.display = "none";
    micBtn.classList.remove("listening");
    isListening = false;
  }, 3000);
};

recognition.onerror = function() {
  micBtn.classList.remove("listening");
  transcriptionArea.innerText = "Error recognizing speech.";
  isListening = false;
  setTimeout(() => transcriptionArea.style.display = "none", 3000);
};

recognition.onend = function() {
  micBtn.classList.remove("listening");
  isListening = false;
};

// 🧼 Handle Voice Search Logic
function processSpeechCommand(speech) {
  const keywords = ["laptop", "phone", "watch", "everything", "all"];
  const matchedKeywords = keywords.filter(k => speech.includes(k));

  if (matchedKeywords.includes("everything") || matchedKeywords.includes("all")) {
    showAllProducts();
    return;
  }

  if (matchedKeywords.length > 0) {
    applyFilters(matchedKeywords);
  } else {
    // If no keywords matched, maybe don't change anything or show a hint
    transcriptionArea.innerText = `Searching for: "${speech}"... No direct matches found.`;
  }
}

function applyFilters(matchedKeywords) {
  productCards.forEach(card => {
    const cardName = card.dataset.name.toLowerCase();
    const isMatched = matchedKeywords.some(k => cardName.includes(k));
    
    if (isMatched) {
      card.classList.remove("hidden");
      card.classList.add("reordered");
      card.style.order = "-1"; 
    } else {
      card.classList.add("hidden");
      card.classList.remove("reordered");
      card.style.order = "0";
    }
  });
}

function showAllProducts() {
  productCards.forEach(card => {
    card.classList.remove("hidden");
    card.classList.remove("reordered");
    card.style.order = "0";
  });
}

// 🌍 Translator Logic
const translations = {
  en: ["Modern Laptop Pro", "X-Phone Ultra", "SmartWatch Horizon"],
  ta: ["மடிக்கணினி புரோ", "எக்ஸ்-போன் அல்ட்ரா", "ஸ்மார்ட்வாட்ச் ஹொரைசன்"],
  ml: ["ലാപ്ടോപ്പ് പ്രോ", "ഫോൺ അൾട്രാ", "വാച്ച് ഹൊറൈസൺ"],
  hi: ["लैपटॉप प्रो", "फोन अल्ट्रा", "स्मार्टवॉच होराइजन"],
  es: ["Portátil Pro", "X-Teléfono Ultra", "SmartWatch Horizonte"]
};

function changeLanguage(lang) {
  const titles = document.querySelectorAll(".product-card h3");
  titles.forEach((t, index) => {
    if (translations[lang] && translations[lang][index]) {
      t.innerText = translations[lang][index];
    }
  });

  // Also update buttons? Maybe not necessary for this demo, 
  // but let's at least update the mic button text if needed
}

// 🔊 Speaker Logic
function speakProducts() {
  const titles = document.querySelectorAll(".product-card:not(.hidden) h3");
  
  if (titles.length === 0) {
    const msg = new SpeechSynthesisUtterance("No products found to speak.");
    window.speechSynthesis.speak(msg);
    return;
  }

  titles.forEach((t, index) => {
    // Delay slightly between each utterance for clarity
    setTimeout(() => {
      const speech = new SpeechSynthesisUtterance(t.innerText);
      speech.lang = document.getElementById("langSelect").value;
      window.speechSynthesis.speak(speech);
    }, index * 100);
  });
}

// 🎨 Theme Management
function applyTheme(theme) {
  document.body.classList.remove("light-theme", "classic-theme");
  if (theme === "light") document.body.classList.add("light-theme");
  if (theme === "normal") document.body.classList.add("classic-theme");
  
  localStorage.setItem("theme", theme);
  const themeSelect = document.getElementById("themeSelect");
  if (themeSelect) themeSelect.value = theme;
}

function changeTheme(theme) {
  applyTheme(theme);
}

// Initial Theme Check
const savedTheme = localStorage.getItem("theme") || "dark";
applyTheme(savedTheme);

// Also update the selector on page load if it exists
window.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById("themeSelect");
    if (themeSelect) themeSelect.value = savedTheme;
});
