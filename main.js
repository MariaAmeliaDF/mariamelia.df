/* ============================================================
   MARIA AMÉLIA — SITE OFICIAL
   main.js — JavaScript Principal
   ============================================================ */

'use strict';

/* ── LOADER ── */
window.addEventListener('load', () => {
  const l = document.getElementById('ldr');
  setTimeout(() => {
    l && l.classList.add('out');
    setTimeout(() => l && l.remove(), 600);
  }, 1600);
});

/* ── HEADER + BTT ── */
const hdr = document.getElementById('hdr');
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => {
  hdr && (scrollY > 55 ? hdr.classList.add('sc') : hdr.classList.remove('sc'));
  btt && (scrollY > 400 ? btt.classList.add('sh') : btt.classList.remove('sh'));
}, { passive: true });
btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - (hdr?.offsetHeight || 80) - 16, behavior: 'smooth' });
  });
});

/* ── MOBILE MENU ── */
const ham   = document.getElementById('ham');
const mobM  = document.getElementById('mob-m');
const mobOv = document.getElementById('mob-ov');
const mobX  = document.getElementById('mob-x');
const openMenu  = () => { mobM?.classList.add('on'); mobOv?.classList.add('on'); ham?.classList.add('on'); ham?.setAttribute('aria-expanded','true'); document.body.style.overflow='hidden'; };
const closeMenu = () => { mobM?.classList.remove('on'); mobOv?.classList.remove('on'); ham?.classList.remove('on'); ham?.setAttribute('aria-expanded','false'); document.body.style.overflow=''; };
ham?.addEventListener('click', openMenu);
mobX?.addEventListener('click', closeMenu);
mobOv?.addEventListener('click', closeMenu);
document.querySelectorAll('.mob-l').forEach(l => l.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeMenu(); closeModal(); } });

/* ── SCROLL REVEAL ── */
const obs = new IntersectionObserver(en => {
  en.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vs'); obs.unobserve(e.target); } });
}, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.rv,.rl,.rr').forEach(el => obs.observe(el));

/* ── MODAL PAUTAS ── */
const modal = document.getElementById('modal');
const openModal = c => {
  document.getElementById('m-ico').innerHTML = `<i class="fa-solid ${c.dataset.ico}"></i>`;
  document.getElementById('m-tit').textContent = c.dataset.tit;
  document.getElementById('m-des').textContent = c.dataset.des;
  document.getElementById('m-pris').innerHTML = c.dataset.pri.split('|').map(p => `<li>${p.trim()}</li>`).join('');
  modal.classList.add('on'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
};
const closeModal = () => { modal?.classList.remove('on'); modal?.setAttribute('aria-hidden','true'); document.body.style.overflow=''; };
document.querySelectorAll('.pc').forEach(c => {
  c.addEventListener('click', () => openModal(c));
  c.addEventListener('keydown', e => (e.key==='Enter'||e.key===' ') && (e.preventDefault(), openModal(c)));
});
document.getElementById('m-x')?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => e.target === modal && closeModal());

/* ── DEPOIMENTOS SLIDER ── */
const tr    = document.getElementById('dep-tr');
const dotsEl = document.getElementById('sl-dots');
let cur = 0, autoT;
const getV = () => innerWidth >= 1100 ? 3 : innerWidth >= 700 ? 2 : 1;
const getT = () => Math.max(0, (tr?.children.length || 0) - getV() + 1);
const buildD = () => {
  if (!dotsEl) return; dotsEl.innerHTML = '';
  for (let i = 0; i < getT(); i++) {
    const d = document.createElement('button');
    d.className = 'sl-d' + (i === cur ? ' on' : '');
    d.setAttribute('aria-label', `Depoimento ${i+1}`);
    d.addEventListener('click', () => { goTo(i); rst(); });
    dotsEl.appendChild(d);
  }
};
const upd = () => {
  if (!tr) return;
  const c = tr.children;
  if (!c.length) return;
  tr.style.transform = `translateX(-${cur * (c[0].offsetWidth + 22)}px)`;
  dotsEl?.querySelectorAll('.sl-d').forEach((d,i) => d.classList.toggle('on', i === cur));
};
const goTo = i => { cur = Math.max(0, Math.min(i, getT()-1)); upd(); };
const nxt = () => { cur = cur >= getT()-1 ? 0 : cur+1; upd(); };
const prv = () => { cur = cur <= 0 ? getT()-1 : cur-1; upd(); };
const rst = () => { clearInterval(autoT); autoT = setInterval(nxt, 5200); };
document.getElementById('sl-n')?.addEventListener('click', () => { nxt(); rst(); });
document.getElementById('sl-p')?.addEventListener('click', () => { prv(); rst(); });
buildD(); rst();
let rt;
window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { cur=0; buildD(); upd(); }, 280); });
let tx = 0;
tr?.addEventListener('touchstart', e => tx = e.changedTouches[0].clientX, { passive: true });
tr?.addEventListener('touchend', e => { const d = tx - e.changedTouches[0].clientX; if (Math.abs(d)>45) { d>0?nxt():prv(); rst(); } }, { passive: true });

/* ── FORMULÁRIO DE CONTATO ── */
const frm = document.getElementById('frm');
const fok = document.getElementById('f-ok');
const sE = (id,eid) => { document.getElementById(id)?.classList.add('err'); const e=document.getElementById(eid); if(e)e.style.display='block'; };
const cE = (id,eid) => { document.getElementById(id)?.classList.remove('err'); const e=document.getElementById(eid); if(e)e.style.display='none'; };
['fn','fe','fm'].forEach(id => document.getElementById(id)?.addEventListener('input', () => cE(id, id+'-e')));
frm?.addEventListener('submit', e => {
  e.preventDefault(); let ok = true;
  cE('fn','fn-e'); cE('fe','fe-e'); cE('fm','fm-e');
  const n  = document.getElementById('fn')?.value.trim();
  const em = document.getElementById('fe')?.value.trim();
  const m  = document.getElementById('fm')?.value.trim();
  if (!n||n.length<2)  { sE('fn','fn-e'); ok=false; }
  if (!em||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { sE('fe','fe-e'); ok=false; }
  if (!m||m.length<10) { sE('fm','fm-e'); ok=false; }
  if (ok) {
    const b = frm.querySelector('.f-sub');
    if (b) { b.disabled=true; b.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Enviando...'; }
    setTimeout(() => { frm.style.display='none'; if(fok) fok.style.display='block'; }, 1400);
  }
});

/* ── MÁSCARA TELEFONE ── */
document.getElementById('ft')?.addEventListener('input', e => {
  let v = e.target.value.replace(/\D/g,'').slice(0,11);
  if (v.length>7) v=`(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
  else if (v.length>2) v=`(${v.slice(0,2)}) ${v.slice(2)}`;
  else if (v.length) v=`(${v}`;
  e.target.value = v;
});

/* ── LGPD ── */
const lgpd = document.getElementById('lgpd');
const LK   = 'ma_lgpd3';
const hideLG = () => lgpd?.classList.remove('sh');
if (!localStorage.getItem(LK)) setTimeout(() => lgpd?.classList.add('sh'), 2800);
document.getElementById('lg-a')?.addEventListener('click', () => { try{localStorage.setItem(LK,'acc')}catch(e){} hideLG(); });
document.getElementById('lg-r')?.addEventListener('click', () => { try{localStorage.setItem(LK,'rej')}catch(e){} hideLG(); });
document.getElementById('lg-c')?.addEventListener('click', () => { try{localStorage.setItem(LK,'cus')}catch(e){} hideLG(); });

/* ── FLICKR GALLERY ── */
const galGrid   = document.getElementById('gal-grid');
const galLoading = document.getElementById('gal-loading');
let flickrPhotos = [];
let lbxIdx = 0;

window.flickrCallback = function(data) {
  if (!data?.items?.length) {
    if (galLoading) galLoading.innerHTML = '<a href="https://www.flickr.com/photos/204380075@N06/" target="_blank" style="color:var(--vm);font-weight:600"><i class="fa-brands fa-flickr"></i> Ver fotos no Flickr</a>';
    return;
  }
  flickrPhotos = data.items.slice(0, 9);
  if (galLoading) galLoading.remove();
  flickrPhotos.forEach((item, i) => {
    const thumbUrl = item.media.m.replace('_m.','_z.');
    const title    = item.title || 'Foto';
    const div = document.createElement('div');
    div.className = 'gi rv';
    if (i === 0) div.style.cssText = 'grid-column:span 2;grid-row:span 2;';
    const img = document.createElement('img');
    img.src = thumbUrl; img.alt = title; img.loading = 'lazy';
    img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;transition:transform .4s ease;min-height:' + (i===0?'360':'180') + 'px';
    const ov = document.createElement('div');
    ov.className = 'gi-ov';
    ov.innerHTML = '<i class="fa-solid fa-expand"></i>';
    div.appendChild(img); div.appendChild(ov);
    div.addEventListener('click', () => openLbx(i));
    galGrid.appendChild(div);
    setTimeout(() => div.classList.add('vs'), i * 80);
  });
};

(function(){
  const s = document.createElement('script');
  s.src = 'https://www.flickr.com/services/feeds/photos_public.gne?id=204380075%40N06&format=json&jsoncallback=flickrCallback';
  s.onerror = () => { if(galLoading) galLoading.innerHTML = '<a href="https://www.flickr.com/photos/204380075@N06/" target="_blank" style="color:var(--vm);font-weight:600"><i class="fa-brands fa-flickr"></i> Ver fotos no Flickr</a>'; };
  document.body.appendChild(s);
})();

/* ── LIGHTBOX ── */
const lbx    = document.getElementById('lbx');
const lbxImg = document.getElementById('lbx-img');
const lbxCap = document.getElementById('lbx-cap');
const openLbx = idx => {
  lbxIdx = idx;
  const p = flickrPhotos[lbxIdx];
  lbxImg.src = p.media.m.replace('_m.','_b.');
  lbxCap.textContent = p.title || '';
  lbx.classList.add('on'); document.body.style.overflow='hidden';
};
const closeLbx = () => { lbx.classList.remove('on'); document.body.style.overflow=''; };
const lbxNav = dir => {
  lbxIdx = (lbxIdx + dir + flickrPhotos.length) % flickrPhotos.length;
  const p = flickrPhotos[lbxIdx];
  lbxImg.src = p.media.m.replace('_m.','_b.');
  lbxCap.textContent = p.title || '';
};
document.getElementById('lbx-close')?.addEventListener('click', closeLbx);
document.getElementById('lbx-prev')?.addEventListener('click', () => lbxNav(-1));
document.getElementById('lbx-next')?.addEventListener('click', () => lbxNav(1));
lbx?.addEventListener('click', e => { if(e.target===lbx) closeLbx(); });
document.addEventListener('keydown', e => {
  if (!lbx?.classList.contains('on')) return;
  if (e.key==='ArrowRight') lbxNav(1);
  if (e.key==='ArrowLeft')  lbxNav(-1);
  if (e.key==='Escape')     closeLbx();
});

/* ── INSTAGRAM FEED — Embeds oficiais ── */
// Posts reais de @mariaamelia.df via embed oficial do Instagram
const INSTA_POSTS = [
  'https://www.instagram.com/p/DYsukdJEYAk/',
  'https://www.instagram.com/p/DY9er04kXaW/',
  'https://www.instagram.com/p/DYp5-4Zkasz/',
  'https://www.instagram.com/p/DYgBVT1RwpR/',
];

const instaWrap = document.getElementById('insta-embed-wrap');
if (instaWrap) {
  INSTA_POSTS.forEach(url => {
    const item = document.createElement('div');
    item.className = 'insta-embed-item';
    item.innerHTML = `<blockquote class="instagram-media"
      data-instgrm-captioned
      data-instgrm-permalink="${url}?utm_source=ig_embed&utm_campaign=loading"
      data-instgrm-version="14"
      style="background:#FFF;border:0;border-radius:12px;box-shadow:0 2px 16px rgba(0,0,0,.1);margin:0;max-width:100%;min-width:280px;padding:0;width:100%;">
    </blockquote>`;
    instaWrap.appendChild(item);
  });

  // Carrega o script oficial do Instagram para renderizar os embeds
  if (!document.getElementById('ig-embed-script')) {
    const s = document.createElement('script');
    s.id = 'ig-embed-script';
    s.async = true;
    s.src = '//www.instagram.com/embed.js';
    document.body.appendChild(s);
  } else if (window.instgrm) {
    window.instgrm.Embeds.process();
  }

  // Slider controls para o feed
  const sliderEl = document.getElementById('insta-slider');
  const prevBtn  = document.getElementById('insta-prev');
  const nextBtn  = document.getElementById('insta-next');
  if (sliderEl && prevBtn && nextBtn) {
    let pos = 0;
    const scrollAmt = () => sliderEl.offsetWidth * 0.85;
    nextBtn.addEventListener('click', () => {
      pos = Math.min(pos + scrollAmt(), sliderEl.scrollWidth - sliderEl.offsetWidth);
      sliderEl.scrollTo({ left: pos, behavior: 'smooth' });
    });
    prevBtn.addEventListener('click', () => {
      pos = Math.max(pos - scrollAmt(), 0);
      sliderEl.scrollTo({ left: pos, behavior: 'smooth' });
    });
  }
}

/* ── HERO PARALLAX ── */
const hs = document.getElementById('hero');
if (hs) window.addEventListener('scroll', () => {
  if (scrollY > innerHeight) return;
  hs.querySelectorAll('.h-sh').forEach((s,i) => { s.style.transform = `translateY(${scrollY*(i+1)*.055}px)`; });
}, { passive: true });
