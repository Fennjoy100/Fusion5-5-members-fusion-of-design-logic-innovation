'use strict';

/* ── 1. PRELOADER ── */
function initPreloader(){
  window.addEventListener('load',()=>{
    setTimeout(()=>{
      const p=document.getElementById('preloader');
      if(p)p.classList.add('done');
    },1600);
  });
}

/* ── 2. CUSTOM CURSOR ── */
function initCursor(){
  const c=document.getElementById('cursor');
  const f=document.getElementById('cursorFollower');
  if(!c||!f)return;
  let mx=0,my=0,fx=0,fy=0;
  document.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    c.style.left=mx+'px';c.style.top=my+'px';
  });
  function followCursor(){
    fx+=(mx-fx)*0.12;fy+=(my-fy)*0.12;
    f.style.left=fx+'px';f.style.top=fy+'px';
    requestAnimationFrame(followCursor);
  }
  followCursor();
  document.querySelectorAll('a,button').forEach(el=>{
    el.addEventListener('mouseenter',()=>{
      c.style.transform='translate(-50%,-50%) scale(2)';
      f.style.transform='translate(-50%,-50%) scale(1.5)';
      f.style.borderColor='rgba(201,168,76,0.8)';
    });
    el.addEventListener('mouseleave',()=>{
      c.style.transform='translate(-50%,-50%) scale(1)';
      f.style.transform='translate(-50%,-50%) scale(1)';
      f.style.borderColor='rgba(201,168,76,0.5)';
    });
  });
}

/* ── 3. THEME TOGGLE ── */
function initThemeToggle(){
  const btns=document.querySelectorAll('#themeBtn,#footerThemeBtn');
  if(!btns.length)return;
  const saved=localStorage.getItem('fusion5-theme')||'dark';
  document.documentElement.setAttribute('data-theme',saved);
  updateThemeIcon(saved);
  btns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      const cur=document.documentElement.getAttribute('data-theme');
      const next=cur==='dark'?'light':'dark';
      document.documentElement.setAttribute('data-theme',next);
      localStorage.setItem('fusion5-theme',next);
      updateThemeIcon(next);
      showToast(next==='light'?'Light mode ☀':'Dark mode ◑');
    });
  });
}
function updateThemeIcon(t){
  const i=document.querySelector('#themeBtn .theme-icon');
  if(i)i.textContent=t==='dark'?'☀':'◑';
}

/* ── 4. NAVBAR SCROLL ── */
function initNavbarScroll(){
  const nav=document.getElementById('navbar');
  if(!nav)return;
  const fn=()=>nav.classList.toggle('scrolled',window.scrollY>80);
  window.addEventListener('scroll',fn,{passive:true});
  fn();
}

/* ── 5. HAMBURGER ── */
function initHamburger(){
  const btn=document.getElementById('hamburger');
  const menu=document.getElementById('navLinks');
  if(!btn||!menu)return;
  btn.addEventListener('click',()=>{
    const open=menu.classList.toggle('open');
    btn.classList.toggle('open',open);
    btn.setAttribute('aria-expanded',String(open));
    document.body.style.overflow=open?'hidden':'';
  });
  menu.querySelectorAll('.nav-link').forEach(l=>{
    l.addEventListener('click',()=>{
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    });
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&menu.classList.contains('open')){
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    }
  });
}

/* ── 6. SCROLL REVEAL (IntersectionObserver) ── */
function initScrollReveal(){
  const items=document.querySelectorAll('.reveal,.reveal-card');
  if(!items.length)return;
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },{threshold:0.1,rootMargin:'0px 0px -60px 0px'});
  items.forEach(el=>obs.observe(el));
}

/* ── 7. PARALLAX QUOTE ── */
function initParallax(){
  const bg=document.getElementById('pqBg');
  if(!bg)return;
  window.addEventListener('scroll',()=>{
    const rect=bg.parentElement.getBoundingClientRect();
    const scroll=-(rect.top*0.3);
    bg.style.transform=`translateY(${scroll}px)`;
  },{passive:true});
}

/* ── 8. ACTIVE NAV ── */
function initActiveNav(){
  const secs=document.querySelectorAll('section[id]');
  const links=document.querySelectorAll('.nav-link[href^="#"]');
  if(!secs.length||!links.length)return;
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        links.forEach(l=>l.classList.remove('active'));
        const a=document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if(a)a.classList.add('active');
      }
    });
  },{threshold:0.5});
  secs.forEach(s=>obs.observe(s));
}

/* ── 9. SMOOTH SCROLL ── */
function initSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const h=a.getAttribute('href');
      if(h==='#')return;
      e.preventDefault();
      const t=document.querySelector(h);
      if(t)t.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
}

/* ── 10. SHOW TOAST ── */
function showToast(msg,type='success'){
  let c=document.getElementById('toastContainer');
  if(!c){c=document.createElement('div');c.id='toastContainer';document.body.appendChild(c);}
  const t=document.createElement('div');
  t.className=`toast${type==='error'?' error':''}`;
  t.setAttribute('role','alert');
  t.textContent=msg;
  c.appendChild(t);
  setTimeout(()=>{t.classList.add('hide');setTimeout(()=>t.remove(),400);},3000);
}
window.showToast=showToast;

/* ── 11. CART ── */
function getCart(){return JSON.parse(localStorage.getItem('fusion5-cart')||'[]');}
function saveCart(arr){localStorage.setItem('fusion5-cart',JSON.stringify(arr));updateCartBadge();}
function addToCart(p){
  const cart=getCart();
  const ex=cart.find(i=>i.id===p.id);
  if(ex){ex.qty=(ex.qty||1)+1;}else{cart.push({...p,qty:1});}
  saveCart(cart);
  showToast(`${p.name} added to cart ⊠`);
}
function updateCartBadge(){
  const cart=getCart();
  const total=cart.reduce((s,i)=>s+(i.qty||1),0);
  const b=document.getElementById('cartCount');
  if(!b)return;
  b.textContent=total;
  b.style.display=total>0?'flex':'none';
}
window.getCart=getCart;
window.saveCart=saveCart;
window.addToCart=addToCart;
window.updateCartBadge=updateCartBadge;

/* ── 12. SAVE BOOKING / ORDER ── */
function saveBooking(obj){
  const arr=JSON.parse(localStorage.getItem('fusion5-bookings')||'[]');
  arr.push({...obj,time:new Date().toLocaleString()});
  localStorage.setItem('fusion5-bookings',JSON.stringify(arr));
  showToast('Booking confirmed ◈');
}
function saveOrder(obj){
  const arr=JSON.parse(localStorage.getItem('fusion5-orders')||'[]');
  arr.push({...obj,time:new Date().toLocaleString()});
  localStorage.setItem('fusion5-orders',JSON.stringify(arr));
  showToast('Order placed ◈');
}
window.saveBooking=saveBooking;
window.saveOrder=saveOrder;

/* ── 13. CARD HOVER SHINE ── */
function initCardShine(){
  document.querySelectorAll('.s-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const x=((e.clientX-r.left)/r.width)*100;
      const y=((e.clientY-r.top)/r.height)*100;
      const shine=card.querySelector('.s-card-shine');
      if(shine){
        shine.style.background=
          `radial-gradient(circle at ${x}% ${y}%, rgba(201,168,76,0.1) 0%, transparent 60%)`;
      }
    });
  });
}

/* ── INIT ALL ── */
document.addEventListener('DOMContentLoaded',()=>{
  initPreloader();
  initCursor();
  initThemeToggle();
  initNavbarScroll();
  initHamburger();
  initScrollReveal();
  initParallax();
  initActiveNav();
  initSmoothScroll();
  initCardShine();
  updateCartBadge();
});
