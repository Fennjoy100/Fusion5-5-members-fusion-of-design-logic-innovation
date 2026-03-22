/* 
   FOOD COURT — script.js 
   Functions:
   1. Preloader — setTimeout 
   2. Scroll top button
   3. Navbar scroll → glass effect
   4. Active nav link on scroll
   5. Hamburger toggle — mobile menu
   6. Theme toggle — dark/light + localStorage
   7. Cart badge update
   8. showToast — notification
   9. Smooth scroll close menu
 */

'use strict';

/* ── 1. PRELOADER — fixed (setTimeout, not setInterval) ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('fade-out');
  }, 2400);
});

/* ── 2 + 3. SCROLL — scroll-top + navbar glass ── */
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const scrollTop = document.getElementById('scroll-top');

  /* Navbar glass effect */
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  }

  /* Scroll top button */
  if (scrollTop) {
    scrollTop.classList.toggle('active', window.scrollY > 60);
  }
}, { passive: true });

/* ── 4. ACTIVE NAV on scroll ── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]`
        );
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* ── 5. HAMBURGER — mobile menu ── */
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

  /* Close on link click */
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* Close on ESC */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

/* ── 6. THEME TOGGLE ── */
function initTheme() {
  const btn  = document.getElementById('themeBtn');
  const icon = document.querySelector('.theme-icon');
  if (!btn) return;

  /* Load saved theme */
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

/* ── 7. CART BADGE ── */
function updateCartBadge() {
  const cart  = JSON.parse(localStorage.getItem('fusion5-cart') || '[]');
  const total = cart.reduce((s, i) => s + (i.qty || 1), 0);
  const badge = document.getElementById('cartCount');
  if (!badge) return;
  badge.textContent = total;
  badge.style.display = total > 0 ? 'flex' : 'none';
}
window.updateCartBadge = updateCartBadge;

/* ── 8. TOAST ── */
function showToast(msg, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast${type === 'error' ? ' error' : ''}`;
  toast.setAttribute('role', 'alert');
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}
window.showToast = showToast;

/* ── 9. SMOOTH SCROLL for anchor links ── */
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

/* ── INIT ALL on DOM ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHamburger();
  initActiveNav();
  initVoice();
  initSmoothScroll();
  updateCartBadge();
});
