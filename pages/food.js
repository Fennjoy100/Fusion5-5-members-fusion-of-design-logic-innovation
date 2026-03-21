/* 
   FOOD COURT — food.js
   Functions: Preloader, Scroll Top, Navbar Glass,
   Active Nav, Hamburger, Theme Toggle, Cart Badge,
   Toast, Smooth Scroll, Voice stub
*/
'use strict';

/* 1. PRELOADER */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('fade-out');
  }, 2400);
});

/* 2+3. SCROLL — scroll-top + navbar glass */
window.addEventListener('scroll', () => {
  const navbar   = document.getElementById('navbar');
  const scrollTop = document.getElementById('scroll-top');
  if (navbar)    navbar.classList.toggle('scrolled', window.scrollY > 80);
  if (scrollTop) scrollTop.classList.toggle('active', window.scrollY > 60);
}, { passive: true });

let currentLang = localStorage.getItem('fusion5-lang') || 'en';

const FOOD_TRANSLATIONS = {
  'tasty burger': { en: 'Tasty Burger', ta: 'சுவையான பர்கர்', ml: 'രുചികരമായ ബർഗർ', hi: 'स्वादिष्ट बर्गर', es: 'Hamburguesa Sabrosa' },
  'tasty cakes': { en: 'Tasty Cakes', ta: 'சுவையான கேக்குகள்', ml: 'രുചികരമായ കേക്കുകൾ', hi: 'स्वादिष्ट केक', es: 'Pasteles Sabrosos' },
  'tasty sweets': { en: 'Tasty Sweets', ta: 'சுவையான இனிப்புகள்', ml: 'രുചികരമായ മധുരപലഹാരങ്ങൾ', hi: 'स्वादिष्ट मिठाइयाँ', es: 'Dulces Sabrosos' },
  'tasty cupcakes': { en: 'Tasty Cupcakes', ta: 'சுவையான கப்கேக்குகள்', ml: 'രുചികരമായ കപ്പ് கேക്കുകൾ', hi: 'स्वादिष्ट कप केक', es: 'Magdalenas Sabrosas' },
  'tasty cupcakes': { en: 'Tasty Cupcakes', ta: 'சுவையான கப்கேக்குகள்', ml: 'രുചികരമായ കപ്പ് കേക്കുകൾ', hi: 'स्वादिष्ट कप केक', es: 'Magdalenas Sabrosas' },
  'cold drinks': { en: 'Cold Drinks', ta: 'குளிர் பானங்கள்', ml: 'തണുത്ത പാനീയങ്ങൾ', hi: 'शीतल पेय', es: 'Bebidas Frías' },
  'cold ice cream': { en: 'Cold Ice Cream', ta: 'குளிர் ஐஸ்கிரீம்', ml: 'തണുത്ത ഐസ്ക്രീം', hi: 'ठंडी आइसक्रीम', es: 'Helado Frío' },
  'cold ice-cream': { en: 'Cold Ice-Cream', ta: 'குளிர் ஐஸ்கிரீம்', ml: 'തണുത്ത ഐസ്ക്രീം', hi: 'ठंडी आइसक्रीम', es: 'Helado Frío' },
  'tasty food': { en: 'Tasty Food', ta: 'சுவையான உணவு', ml: 'രുചികരമായ ഭക്ഷണം', hi: 'स्वादिष्ट भोजन', es: 'Comida Sabrosa' },
  'tastybites': { en: 'TastyBites', ta: 'சுவையான கப்கள்', ml: 'രുചികരമായ കടികൾ', hi: 'स्वादिष्ट बाइट्स', es: 'Bocados Sabrosos' },
  'tasty chocolate': { en: 'Tasty Chocolate', ta: 'சுவையான சாக்லேட்', ml: 'രുചികരമായ ചോக்லேറ്റ്', hi: 'स्वादिष्ट चॉकलेट', es: 'Chocolate Sabroso' },
  'tasty breakfast': { en: 'Tasty Breakfast', ta: 'சுவையான காலை உணவு', ml: 'രുചികരമായ പ്രഭാതഭക്ഷണം', hi: 'स्वादिष्ट नाश्ता', es: 'Desayuno Sabroso' },
  "our's special": { en: "Our's Special", ta: 'எங்கள் சிறப்பு', ml: 'ഞങ്ങളുടെ പ്രത്യേകത', hi: 'हमारी विशेषता', es: 'Nuestra Especialidad' },
  'our speciality': { en: 'Our Speciality', ta: 'எங்கள் சிறப்பு', ml: 'ഞങ്ങളുടെ പ്രത്യേകത', hi: 'हमारी विशेषता', es: 'Nuestra Especialidad' },
  'our popular foods': { en: 'Our Popular Foods', ta: 'பிரபலமான உணவுகள்', ml: 'ഞങ്ങളുടെ ജനപ്രിയ ഭക്ഷണങ്ങൾ', hi: 'हमारे लोकप्रिय खाद्य पदार्थ', es: 'Nuestros Platos Populares' },
  'our food gallery': { en: 'Our Food Gallery', ta: 'உணவு தொகுப்பு', ml: 'ഞങ്ങളുടെ ഫுட் ഗാലറി', hi: 'हमारी फूड गैलरी', es: 'Nuestra Galería de Comida' },
  'customer reviews': { en: 'Customer Reviews', ta: 'வாடிக்கையாளர் மதிப்புரைகள்', ml: 'ഉപഭോക്തൃ അവലോകനങ്ങൾ', hi: 'ग्राहक समीक्षाएं', es: 'Opiniones de los Clientes' }
};

function updateTranslations() {
  const elements = document.querySelectorAll('.box h3, h1.heading');
  elements.forEach(el => {
    const text = el.textContent.trim().replace(/\n/g, '').replace(/\s+/g, ' ');
    const entry = Object.values(FOOD_TRANSLATIONS).find(val => 
      val.en.toLowerCase() === text.toLowerCase() || 
      Object.values(val).some(v => v === text)
    );
    if (entry) {
      if (el.tagName === 'H1' && el.querySelector('span')) {
        const spanText = el.querySelector('span').textContent;
        // Keep the span structure if it was there
        el.textContent = entry[currentLang] || entry.en;
      } else {
        el.textContent = entry[currentLang] || entry.en;
      }
    }
  });
}

/* 4. ACTIVE NAV */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  if (!sections.length || !links.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));
}

/* 5. HAMBURGER */
function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('navLinks');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
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

/* 6. THEME TOGGLE */
function initTheme() {
  const btn  = document.getElementById('themeBtn');
  const icon = document.querySelector('.theme-icon');
  if (!btn) return;
  const saved = localStorage.getItem('fusion5-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  if (icon) icon.textContent = saved === 'dark' ? '☀' : '◑';
  btn.addEventListener('click', () => {
    const cur  = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('fusion5-theme', next);
    if (icon) icon.textContent = next === 'dark' ? '☀' : '◑';
    showToast(next === 'light' ? 'Light mode ☀' : 'Dark mode ◑');
  });
}

/* 7. CART BADGE */
function updateCartBadge() {
  try {
    const cart  = JSON.parse(localStorage.getItem('fusion5-cart') || '[]');
    const total = cart.reduce((s, i) => s + (i.qty || 1), 0);
    const badge = document.getElementById('cartCount');
    if (!badge) return;
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
  } catch (err) {
    console.error('Cart badge failed:', err);
  }
}
window.updateCartBadge = updateCartBadge;

/* 10. TRANSLATOR */
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
      updateTranslations();
      showToast(`Language changed to ${btn.textContent}`);
    });
  });

  // initial application of translations
  updateTranslations();
}

/* 11. TEXT TO SPEECH (Speaker) */
function initTTS() {
  const speakerBtn = document.getElementById('speakerBtn');
  if (!speakerBtn) return;

  speakerBtn.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      const displayedItems = document.querySelectorAll('.box h3');
      if (displayedItems.length === 0) {
        showToast('No items to read', 'error');
        return;
      }

      showToast('Reading items...', 'info');
      speakerBtn.classList.add('playing');

      let textToRead = 'Welcome to Fusion 5 Food Court. Today we have: ';
      displayedItems.forEach((h3, index) => {
        textToRead += h3.textContent + (index < displayedItems.length - 1 ? ', ' : '.');
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

/* 8. TOAST */
function showToast(msg, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'alert');
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}
window.showToast = showToast;

/* 9. SMOOTH SCROLL */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const h = link.getAttribute('href');
      if (!h || h === '#') return;
      e.preventDefault();
      const target = document.querySelector(h);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── CURSOR ── */
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
  document.querySelectorAll('a, button, input, textarea, .box').forEach(el => {
    el.addEventListener('mouseenter', () => {
      c.classList.add('hover');
      f.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      c.classList.remove('hover');
      f.classList.remove('hover');
    });
  });
}

/* 10. VOICE SEARCH — mic FAB + Navbar Btn */
function initVoiceSearch() {
  const voiceBtns = document.querySelectorAll('#voiceBtn, #micFab');
  const searchInput = document.getElementById('search-box');

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
      showToast('Listening...', 'info');
    });
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    const cleanQuery = transcript.replace('i need a ', '').replace('show me ', '').replace('order ', '').replace('find ', '').replace('search ', '').trim();
    
    // Check for navigation keywords
    const navMap = {
      'special': '#speciality',
      'speciality': '#speciality',
      'popular': '#popular',
      'gallery': '#gallery',
      'review': '#review',
      'order': '#order',
      'home': '#home'
    };

    if (navMap[cleanQuery]) {
      const target = document.querySelector(navMap[cleanQuery]);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        showToast(`Navigating to ${cleanQuery}...`);
      }
    } else {
      // Search for food names or their translations
      const items = document.querySelectorAll('.box h3');
      let found = false;
      items.forEach(h3 => {
        const text = h3.textContent.toLowerCase();
        if (text.includes(cleanQuery)) {
          h3.closest('.box').scrollIntoView({ behavior: 'smooth', block: 'center' });
          h3.closest('.box').style.outline = '2px solid var(--gold)';
          setTimeout(() => h3.closest('.box').style.outline = 'none', 3000);
          found = true;
        }
      });

      if (found) {
        showToast(`Found: ${cleanQuery}`);
      } else {
        showToast(`No match for: ${cleanQuery}`, 'error');
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

/* INIT ALL */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHamburger();
  initActiveNav();
  initCursor();
  initVoiceSearch();
  initTranslator();
  initTTS();
  initSmoothScroll();
  updateCartBadge();
});
