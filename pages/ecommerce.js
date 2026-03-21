'use strict';

/* ── PRODUCT DATA ── */
const PRODUCTS = [
  { id: 'p01', name: 'iPhone 17 Pro Max 1TB', names: { en: 'iPhone 17 Pro Max 1TB', ta: 'ஐபோன் 17 ப்ரோ மேக்ஸ் 1டிபி', ml: 'ഐഫോൺ 17 പ്രോ മാക്സ് 1ടിബി', hi: 'आईफोन 17 प्रो मैक्स 1टीबी', es: 'iPhone 17 Pro Max 1TB' }, cat: 'mobiles', tags: ['mobile', '100000', '3', 'apple', 'new', 'iphone'], price: 174900, rating: 3.5, stars: '⭐⭐⭐', img: '../assets/images/images/Productimage1.jpg', desc: 'The most powerful iPhone ever with 1TB storage.' },
  { id: 'p02', name: 'Samsung S26 Ultra', names: { en: 'Samsung S26 Ultra', ta: 'சாம்சங் எஸ்26 அல்ட்ரா', ml: 'സാംസങ് എസ്26 അൾട്രാ', hi: 'सैमसंग एस26 अल्ट्रा', es: 'Samsung S26 Ultra' }, cat: 'mobiles', tags: ['mobile', '100000', '5', 'samsung', 'blue', 'phone'], price: 139900, rating: 5, stars: '⭐⭐⭐⭐⭐', img: '../assets/images/images/Productimage2.jpg', desc: 'Ultra-fast performance meets stunning blue design.' },
  { id: 'p03', name: 'OnePlus Nord 5 512GB', names: { en: 'OnePlus Nord 5 512GB', ta: 'ஒன்பிளஸ் நார்ட் 5', ml: 'വൺപ്ലസ് നോർഡ് 5', hi: 'वनप्लस नॉर्ड 5', es: 'OnePlus Nord 5' }, cat: 'mobiles', tags: ['mobile', '50000', '5', 'oneplus', 'green', 'phone'], price: 69900, rating: 5, stars: '⭐⭐⭐⭐⭐', img: '../assets/images/images/Productimage3.jpg', desc: 'Power-packed 512GB storage in green.' },
  { id: 'p04', name: 'Whirlpool 184 Liter 5S', names: { en: 'Whirlpool 184 Liter 5S', ta: 'வேர்ல்பூல் 184 லிட்டர்', ml: 'വേൾപൂൾ 184 ലിറ്റർ', hi: 'व्हर्लपूल 184 लीटर', es: 'Whirlpool 184 Litros' }, cat: 'home', tags: ['home', '10000', '2', 'whirlpool', 'blue', 'fridge', 'refrigerator'], price: 14900, rating: 2.5, stars: '⭐⭐', img: '../assets/images/images/Productimage4.jpg', desc: 'Efficient cooling for your modern home.' },
  { id: 'p05', name: 'Bosch 7 kg, 5 Star Washing', names: { en: 'Bosch 7 kg, 5 Star Washing', ta: 'போஷ் வாஷிங் மெஷின்', ml: 'ബോഷ് വാഷിംഗ് മെഷീൻ', hi: 'बॉश वाशिंग मशीन', es: 'Lavadora Bosch' }, cat: 'home', tags: ['home', '10000', '4', 'bosch', 'white', 'washing'], price: 27900, rating: 4.6, stars: '⭐⭐⭐⭐', img: '../assets/images/images/Productimage5.jpg', desc: 'Superior cleaning with energy efficiency.' },
  { id: 'p06', name: 'Panasonic Microwave Oven', names: { en: 'Panasonic Microwave Oven', ta: 'பானாசோனிக் மைக்ரோவேவ் அவன்', ml: 'പാനസോണിക് മൈക്രോവേവ് ഓവൻ', hi: 'पैनासोनिक माइक्रोवेव ओवन', es: 'Horno Microondas Panasonic' }, cat: 'home', tags: ['home', '1000', '5', 'black', 'microwave', 'oven'], price: 7590, rating: 5, stars: '⭐⭐⭐⭐⭐', img: '../assets/images/images/Productimage6.jpg', desc: 'Perfect cooking results at your fingertips.' },
  { id: 'p07', name: 'Lymio Nyka Polo T Shirt', names: { en: 'Lymio Nyka Polo T Shirt', ta: 'போலோ டி ஷர்ட்', ml: 'പോളോ ടി ഷർട്ട്', hi: 'पोलो टी शर्ट', es: 'Camiseta Polo' }, cat: 'fashion', tags: ['fashion', 'wearable', '100', '2', 'blue', 'new', 'tshirt'], price: 450, rating: 2.5, stars: '⭐⭐', img: '../assets/images/images/Productimage7.jpg', desc: 'Stylish polo tee for your casual lookup.' },
  { id: 'p08', name: "Men's Cotton Jean", names: { en: "Men's Cotton Jean", ta: 'ஆண்கள் காட்டன் ஜின்ஸ்', ml: 'മെൻസ് കോട്ടൺ ജീൻസ്', hi: 'मेंस कॉटन जींस', es: 'Vaqueros de Algodón' }, cat: 'fashion', tags: ['fashion', 'wearable', '1000', '4', 'blue', 'jean', 'phant'], price: 1900, rating: 4.9, stars: '⭐⭐⭐⭐', img: '../assets/images/images/Productimage8.jpg', desc: 'Comfortable stretchable jeans for all-day wear.' },
  { id: 'p09', name: 'Mens Ironman Shoes', names: { en: 'Mens Ironman Shoes', ta: 'இரும்பு மனிதன் காலணிகள்', ml: 'അയൺമാൻ ഷൂസ്', hi: 'आयरनमैन शूज', es: 'Zapatos Ironman' }, cat: 'fashion', tags: ['fashion', 'footwear', 'wearable', '1000', '3', 'white', 'shoes'], price: 1200, rating: 3.9, stars: '⭐⭐⭐', img: '../assets/images/images/Productimage9.jpg', desc: 'Durable and trendy shoes for your adventures.' },
  { id: 'p10', name: 'Omega backpack', names: { en: 'Omega backpack', ta: 'ஒமேகா முதுகுப்பை', ml: 'ഒമേഗ ബാക്ക്പാക്ക്', hi: 'ओमेगा बैकपैक', es: 'Mochila Omega' }, cat: 'accessories', tags: ['bag', 'wearable', '100', '4', 'black', 'new'], price: 900, rating: 4, stars: '⭐⭐⭐⭐', img: '../assets/images/images/Productimage10.jpg', desc: 'Spacious and stylish backpack for daily use.' },
  { id: 'p11', name: "Women's Sling Bag", names: { en: "Women's Sling Bag", ta: 'பெண்கள் ஸ்லிங் பேக்', ml: 'വുമൺസ് സ്ളിംഗ് ബാഗ്', hi: 'विमेंस स्लिंग बैग', es: 'Bolso de Hombro' }, cat: 'fashion', tags: ['fashion', 'bag', 'wearable', '1000', '4', 'green'], price: 1350, rating: 4.5, stars: '⭐⭐⭐⭐', img: '../assets/images/images/Productimage11.jpg', desc: 'Elegant green sling bag for every occasion.' },
  { id: 'p12', name: 'COSMUS Everest grey', names: { en: 'COSMUS Everest grey', ta: 'காஸ்மஸ் எவரெஸ்ட் பை', ml: 'കോസ്മസ് എവറസ്റ്റ് ബാഗ്', hi: 'कॉस्मस एवरेस्ट बैग', es: 'Mochila COSMUS' }, cat: 'accessories', tags: ['bag', 'wearable', '1000', '2', 'grey'], price: 2900, rating: 2.9, stars: '⭐⭐', img: '../assets/images/images/Productimage12.jpg', desc: 'Tough grey bag built for the Everest spirit.' },
  { id: 'p13', name: 'Zebronics Headphone', names: { en: 'Zebronics Headphone', ta: 'ஜெப்ரானிக்ஸ் ஹெட்போன்', ml: 'സെബ്രോണിക്സ് ഹെഡ്‌ഫോൺ', hi: 'जेब्रोनिक्स हेडफोन', es: 'Auriculares Zebronics' }, cat: 'electronics', tags: ['electronic', '1000', '4', 'grey', 'new', 'headphone'], price: 2400, rating: 4.7, stars: '⭐⭐⭐⭐', img: '../assets/images/images/Productimage13.jpg', desc: 'Premium sound experience with noise isolation.' },
  { id: 'p14', name: 'Canon V7 R Camera', names: { en: 'Canon V7 R Camera', ta: 'கேனான் கேமரா', ml: 'കാനൻ ക്യാമറ', hi: 'कैनन कैमरा', es: 'Cámara Canon' }, cat: 'electronics', tags: ['electronic', '50000', '5', 'black', 'camera'], price: 75900, rating: 5, stars: '⭐⭐⭐⭐⭐', img: '../assets/images/images/Productimage14.jpg', desc: 'Capture every detail with stunning clarity.' },
  { id: 'p15', name: 'Fastrack Smart Watch', names: { en: 'Fastrack Smart Watch', ta: 'ஃபாஸ்ட்ராக் ஸ்மார்ட் வாட்ச்', ml: 'ഫാസ്ട്രാക്ക് സ്മാർട്ട് വാച്ച്', hi: 'फास्टट्रैक स्मार्ट वॉच', es: 'Reloj Inteligente Fastrack' }, cat: 'electronics', tags: ['electronic', 'wearable', '1000', '3', 'fastrack', 'black', 'new', 'watch'], price: 2900, rating: 3.5, stars: '⭐⭐⭐', img: '../assets/images/images/Productimage15.jpg', desc: 'Stay connected and track your fitness.' },
  { id: 'p16', name: 'HP 15S Gen 11 Laptop', names: { en: 'HP 15S Gen 11 Laptop', ta: 'ஹெச்பி லேப்டாப்', ml: 'എച്ച്പി ലാപ്‌ടോപ്പ്', hi: 'एचपी लैपटॉप', es: 'Portátil HP' }, cat: 'electronics', tags: ['electronic', '10000', '5', 'hp', 'white', 'laptop'], price: 45000, rating: 5, stars: '⭐⭐⭐⭐⭐', img: '../assets/images/ecommerce-card.jpg', desc: 'Powerful performance for work and play.' },
];

let currentLang = localStorage.getItem('fusion5-lang') || 'en';

/* ── CART ── */
function getCart() { return JSON.parse(localStorage.getItem('fusion5-cart') || '[]'); }
function saveCart(arr) { localStorage.setItem('fusion5-cart', JSON.stringify(arr)); updateCartBadge(); renderCart(); }

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart(cart);
  showToast(`${product.names[currentLang] || product.name} added to cart ⊠`);
  openCart();
}

function removeFromCart(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  showToast('Item removed from cart');
}

function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, (item.qty || 1) + delta);
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
  showToast('Cart cleared');
}

/* ── RENDER PRODUCTS ── */
function renderProducts(list) {
  const grid = document.getElementById('productsGrid');
  const noRes = document.getElementById('noResults');
  if (!grid) return;
  grid.innerHTML = '';
  if (!list.length) {
    if (noRes) noRes.style.display = 'block';
    return;
  }
  if (noRes) noRes.style.display = 'none';

  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card reveal-card'; // Changed class name
    card.setAttribute('role', 'listitem');
    card.innerHTML = `
      <div class="product-badge">${p.cat.toUpperCase()}</div>
      <div class="product-image">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <div class="product-overlay">
          <button class="action-btn" onclick="addToCart('${p.id}')" aria-label="Add to cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          </button>
        </div>
      </div>
      <div class="product-info">
        <div class="rating">${p.stars} <span>(${p.rating})</span></div>
        <h3 class="product-title">${p.names[currentLang] || p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <span class="price">₹${p.price.toLocaleString('en-IN')}</span>
          <button class="add-to-cart-btn" onclick="addToCart('${p.id}')">Add to Cart</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
  // Re-initialize ScrollReveal for new cards
  if (typeof initScrollReveal === 'function') initScrollReveal();
}

/* ── RENDER CART ── */
function renderCart() {
  const cart = getCart();
  const itemsEl = document.getElementById('cartItems');
  const summaryEl = document.getElementById('cartSummary');
  const emptyEl = document.getElementById('emptyCart');
  if (!itemsEl) return;

  if (!cart.length) {
    if (emptyEl) emptyEl.style.display = 'block';
    if (summaryEl) summaryEl.style.display = 'none';
    itemsEl.innerHTML = '';
    itemsEl.appendChild(emptyEl);
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';
  if (summaryEl) summaryEl.style.display = 'block';

  itemsEl.innerHTML = '';
  cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'ec-cart-item';
    el.innerHTML = `
      <img class="ec-cart-item-img" src="${item.img}" alt="${item.name}">
      <div class="ec-cart-item-info">
        <div class="ec-cart-item-name">${item.names[currentLang] || item.name}</div>
        <div class="ec-cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
        <div class="ec-qty-ctrl">
          <button class="ec-qty-btn dec" data-id="${item.id}">−</button>
          <span class="ec-qty-val">${item.qty}</span>
          <button class="ec-qty-btn inc" data-id="${item.id}">+</button>
        </div>
      </div>
      <button class="ec-remove-btn" data-id="${item.id}">✕</button>
    `;
    itemsEl.appendChild(el);
  });

  itemsEl.querySelectorAll('.ec-qty-btn.dec').forEach(btn => {
    btn.addEventListener('click', () => { changeQty(btn.dataset.id, -1); });
  });
  itemsEl.querySelectorAll('.ec-qty-btn.inc').forEach(btn => {
    btn.addEventListener('click', () => { changeQty(btn.dataset.id, 1); });
  });
  itemsEl.querySelectorAll('.ec-remove-btn').forEach(btn => {
    btn.addEventListener('click', () => { removeFromCart(btn.dataset.id); });
  });

  const subtotal = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);
  const subEl = document.getElementById('subtotalVal');
  if (subEl) subEl.textContent = '₹' + subtotal.toLocaleString('en-IN');
}

/* ── CART SLIDEBAR LOGIC ── */
function openCart() {
  const sb = document.getElementById('cartSlidebar');
  const ov = document.getElementById('cartOverlay');
  if (sb) sb.classList.add('open');
  if (ov) ov.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  const sb = document.getElementById('cartSlidebar');
  const ov = document.getElementById('cartOverlay');
  if (sb) sb.classList.remove('open');
  if (ov) ov.classList.remove('visible');
  document.body.style.overflow = '';
}

function initCartSlidebar() {
  const closeBtn = document.getElementById('cartClose');
  const overlay = document.getElementById('cartOverlay');
  const cartBtn = document.querySelector('.cart-btn');

  if (closeBtn) closeBtn.addEventListener('click', closeCart);
  if (overlay) overlay.addEventListener('click', closeCart);
  if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  }
}

/* ── FILTER + SEARCH ── */
function initFilter() {
  const searchInput = document.getElementById('searchInput');
  const checkboxes = document.getElementsByName("Product");

  function applyFilter() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let checkedValues = [];
    checkboxes.forEach(box => {
      if (box.checked) checkedValues.push(box.value.toLowerCase());
    });

    let list = PRODUCTS;

    // Filter by checkboxes (OR logic within categories/tags)
    if (checkedValues.length > 0) {
      list = list.filter(p => {
        return checkedValues.some(val => p.tags.includes(val));
      });
    }

    // Filter by search
    if (query) {
      list = list.filter(p => {
        const nameInCurrentLang = (p.names[currentLang] || p.name).toLowerCase();
        return nameInCurrentLang.includes(query) || 
               p.cat.toLowerCase().includes(query) ||
               p.tags.some(t => t.toLowerCase().includes(query));
      });
    }

    renderProducts(list);
  }

  checkboxes.forEach(box => {
    box.addEventListener('change', applyFilter);
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilter);
  }

  renderProducts(PRODUCTS);
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
    const cleanQuery = transcript.replace('i need a ', '').replace('show me ', '').replace('find ', '').replace('search for ', '').trim();
    
    if (searchInput) {
      searchInput.value = cleanQuery;
      // Filter list
      const list = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(cleanQuery) || 
        p.cat.toLowerCase().includes(cleanQuery) ||
        p.tags.some(t => t.toLowerCase().includes(cleanQuery))
      );
      renderProducts(list);
      showToast(`Searching for: ${cleanQuery}`);
    }
    voiceBtns.forEach(btn => btn.classList.remove('recording'));
  };

  recognition.onerror = () => {
    voiceBtns.forEach(btn => btn.classList.remove('recording'));
    showToast('Voice recognition error. Try typing.', 'error');
  };

  recognition.onend = () => {
    voiceBtns.forEach(btn => btn.classList.remove('recording'));
  };
}

/* ── ORDER POPUP ── */
function initOrderPopup() {
  const checkoutBtn = document.getElementById('checkoutBtn');
  const orderOverlay = document.getElementById('orderOverlay');
  const orderPopup = document.getElementById('orderPopup');
  const backBtn = document.getElementById('backToShop');

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const cart = getCart();
      if (!cart.length) {
        showToast('Your cart is empty!', 'error');
        return;
      }
      closeCart();
      if (orderOverlay) orderOverlay.classList.add('visible');
      if (orderPopup) orderPopup.classList.add('visible');
      saveCart([]);
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (orderOverlay) orderOverlay.classList.remove('visible');
      if (orderPopup) orderPopup.classList.remove('visible');
      location.reload();
    });
  }
}

/* ── CART BADGE ── */
function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + (i.qty || 1), 0);
  const badge = document.getElementById('cartCount');
  if (!badge) return;
  badge.textContent = total;
  badge.style.display = total > 0 ? 'flex' : 'none';
}

/* ── PRELOADER ── */
function initPreloader() {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const p = document.getElementById('preloader');
      if (p) p.classList.add('done');
    }, 1600);
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
  function followCursor() {
    fx += (mx - fx) * 0.12; fy += (my - fy) * 0.12;
    f.style.left = fx + 'px'; f.style.top = fy + 'px';
    requestAnimationFrame(followCursor);
  }
  followCursor();
}

/* ── THEME TOGGLE ── */
function initThemeToggle() {
  const btns = document.querySelectorAll('#themeBtn,#footerThemeBtn');
  const saved = localStorage.getItem('fusion5-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  const icon = document.querySelector('#themeBtn .theme-icon');
  if (icon) icon.textContent = saved === 'dark' ? '☀' : '◑';
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('fusion5-theme', next);
      if (icon) icon.textContent = next === 'dark' ? '☀' : '◑';
      showToast(next === 'light' ? 'Light mode ☀' : 'Dark mode ◑');
    });
  });
}

/* ── NAVBAR SCROLL ── */
function initNavbarScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  const fn = () => nav.classList.toggle('scrolled', window.scrollY > 80);
  window.addEventListener('scroll', fn, { passive: true });
  fn();
}

/* ── HAMBURGER ── */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('navLinks');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  menu.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

function initScrollReveal() {
  const items = document.querySelectorAll('.reveal:not(.visible), .reveal-card:not(.visible)');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('visible'));
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01, rootMargin: '0px 0px 50px 0px' });
  items.forEach(el => obs.observe(el));
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const h = a.getAttribute('href');
      if (h === '#' || h.includes('.html')) return;
      e.preventDefault();
      const t = document.querySelector(h);
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ── TOAST ── */
function showToast(msg, type = 'success') {
  let c = document.getElementById('toastContainer');
  if (!c) { c = document.createElement('div'); c.id = 'toastContainer'; document.body.appendChild(c); }
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => { t.classList.add('hide'); setTimeout(() => t.remove(), 400); }, 3000);
}
window.showToast = showToast;

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
      localStorage.setItem('fusion5-lang', currentLang); // Save selected language
      initFilter(); // Re-render with new language
      renderCart(); // Re-render cart with new language
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
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const displayedProducts = document.querySelectorAll('.product-card h3');
      if (displayedProducts.length === 0) {
        showToast('No products to read', 'error');
        return;
      }

      showToast('Reading product names...', 'info');
      speakerBtn.classList.add('playing');

      let textToRead = 'Here are the products: ';
      displayedProducts.forEach((h3, index) => {
        textToRead += h3.textContent + (index < displayedProducts.length - 1 ? ', ' : '.');
      });

      const utterance = new SpeechSynthesisUtterance(textToRead);
      
      // Try to match voice to language
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

/* ── INIT ALL ── */
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCursor();
  initThemeToggle();
  initNavbarScroll();
  initHamburger();
  initFilter();
  initVoiceSearch();
  initTranslator(); // New initialization
  initTTS();        // New initialization
  initCartSlidebar();
  initOrderPopup();
  renderCart();
  updateCartBadge();
  initScrollReveal();
  initSmoothScroll();
});
