/* ============================================================
   MARIA AMÉLIA — SITE OFICIAL · v3.0
   main.js
   ============================================================ */
'use strict';

/* ── Header + voltar ao topo ── */
const hdr = document.getElementById('hdr');
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => {
  hdr && hdr.classList.toggle('sc', scrollY > 60);
  btt && btt.classList.toggle('sh', scrollY > 500);
}, { passive: true });
btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── Scroll suave com compensação do header ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    window.scrollTo({
      top: t.getBoundingClientRect().top + scrollY - (hdr?.offsetHeight || 76) - 12,
      behavior: 'smooth'
    });
  });
});

/* ── Menu mobile ── */
const ham = document.getElementById('ham');
const mobM = document.getElementById('mob-m');
const mobOv = document.getElementById('mob-ov');
const mobX = document.getElementById('mob-x');
const abrirMenu = () => {
  mobM?.classList.add('on'); mobOv?.classList.add('on'); ham?.classList.add('on');
  ham?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
};
const fecharMenu = () => {
  mobM?.classList.remove('on'); mobOv?.classList.remove('on'); ham?.classList.remove('on');
  ham?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
};
ham?.addEventListener('click', () => ham.classList.contains('on') ? fecharMenu() : abrirMenu());
mobX?.addEventListener('click', fecharMenu);
mobOv?.addEventListener('click', fecharMenu);
document.querySelectorAll('.mob-l').forEach(l => l.addEventListener('click', fecharMenu));

/* ── Reveal on scroll ── */
const obs = new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vs'); obs.unobserve(e.target); }
  });
}, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.rv,.rl,.rr').forEach(el => obs.observe(el));

/* ── Modal das bandeiras ── */
const modal = document.getElementById('modal');
const abrirModal = card => {
  if (!modal) return;
  document.getElementById('m-ico').innerHTML = `<i class="fa-solid ${card.dataset.ico}"></i>`;
  document.getElementById('m-tit').textContent = card.dataset.tit;
  document.getElementById('m-des').textContent = card.dataset.des;
  const ul = document.getElementById('m-pris');
  ul.innerHTML = '';
  const pris = (card.dataset.pri || '').split('|').filter(Boolean);
  pris.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p;
    ul.appendChild(li);
  });
  document.querySelector('.m-pri').style.display = pris.length ? '' : 'none';
  // link externo opcional (ações sociais)
  let lk = document.getElementById('m-lk');
  if (lk) lk.remove();
  if (card.dataset.lk) {
    lk = document.createElement('a');
    lk.id = 'm-lk';
    lk.className = 'btn btn-cheio';
    lk.style.marginTop = '1.4rem';
    lk.target = '_blank'; lk.rel = 'noopener noreferrer';
    lk.href = card.dataset.lk;
    lk.innerHTML = `<i class="fa-solid fa-arrow-up-right-from-square"></i> ${card.dataset.lkt || 'Visitar site'}`;
    document.querySelector('.m-box').appendChild(lk);
  }
  modal.classList.add('on');
  document.body.style.overflow = 'hidden';
};
const fecharModal = () => {
  modal?.classList.remove('on');
  document.body.style.overflow = '';
};
document.querySelectorAll('.band-card').forEach(c => c.addEventListener('click', () => abrirModal(c)));
document.getElementById('mural-acoes')?.addEventListener('click', e => {
  const c = e.target.closest('.acaox');
  if (c) abrirModal(c);
});
document.getElementById('m-x')?.addEventListener('click', fecharModal);
modal?.addEventListener('click', e => { if (e.target === modal) fecharModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { fecharModal(); fecharMenu(); } });

/* ── Depoimentos (trilho contínuo) ── */
const DEPOIMENTOS = [
  { t: 'Conheço a Maria Amélia há anos pelos doces maravilhosos que ela faz para nossa família. Quando soube da pré-candidatura, não tive dúvida: é exatamente o tipo de mulher que o DF precisa, trabalhadora, de fé e com valores de verdade.', n: 'Paula M.', c: 'Cliente da Maria Amélia Doces' },
  { t: 'O apoio dela à Vila do Pequenino Jesus não é de fachada. Ela aparece toda semana, abraça, ajuda de verdade e leva os acolhidos para tomar café na fábrica. Isso é o que a diferencia. Política feita com coração e presença real.', n: 'Rosana T.', c: 'Voluntária da Vila Pequenino Jesus' },
  { t: 'Como empreendedora, me identifico muito com a história dela. Veio do nada, construiu uma empresa referência no DF e agora quer fazer pela população o que fez pelos seus clientes: entregar qualidade, compromisso e resultado.', n: 'Carla F.', c: 'Empreendedora · Taguatinga, DF' },
  { t: 'Uma mulher conservadora, de família e de fé, que não tem vergonha de defender seus valores. O DF precisa desse tipo de representante na Câmara, com coragem, autenticidade e vontade real de servir ao povo.', n: 'João G.', c: 'Empresário · Brasília, DF' },
  { t: 'Fiquei emocionada no lançamento da pré-candidatura. Ver a Michelle e a Bia Kicis ao lado dela mostrou que não é uma candidatura qualquer, é um movimento de mulheres com propósito, fé e amor pelo Brasil.', n: 'Ana L.', c: 'Moradora do Gama, DF' },
  { t: 'A Maria Amélia é uma mulher que vive o que prega. Católica praticante, mãe dedicada, avó presente e empresária de sucesso. Ela representa as mulheres reais do Brasil, que trabalham, criam família e ainda encontram tempo para servir ao próximo.', n: 'Márcia S.', c: 'Professora · Ceilândia, DF' },
  { t: 'Trabalho com ela há mais de dez anos e posso afirmar: a Maria Amélia trata cada funcionário como família. Ela gerou emprego, renda e dignidade para dezenas de pessoas no DF. Uma candidata que sabe o que é trabalho de verdade.', n: 'Fernanda B.', c: 'Colaboradora da Maria Amélia Doces' },
  { t: 'O que mais me impressiona nela é a consistência. Não é candidata de campanha, ela já está nas ruas, nas instituições, nas igrejas e nas comunidades há anos. Quando entrar na política, vai chegar preparada e com raízes profundas no DF.', n: 'Luciano A.', c: 'Pastor · Samambaia, DF' },
  { t: 'Como mãe, quero ver na Câmara alguém que entenda minha realidade: filhos, trabalho, fé e família. A Maria Amélia vive isso todos os dias. Ela não fala de pauta feminina pela teoria, ela a vive na prática, todos os dias.', n: 'Tatiane R.', c: 'Mãe e empreendedora · Sobradinho, DF' }
];
const trilho = document.getElementById('dep-trilho');
if (trilho) {
  const render = d => `
    <article class="dep-card">
      <span class="aspas" aria-hidden="true">“</span>
      <p>${d.t}</p>
      <div class="dep-quem">
        <span class="ini">${d.n.charAt(0)}</span>
        <div><b>${d.n}</b><small>${d.c}</small></div>
      </div>
    </article>`;
  // duplicado para o loop infinito do marquee
  trilho.innerHTML = DEPOIMENTOS.map(render).join('') + DEPOIMENTOS.map(render).join('');
}

/* ── Cookies ── */
(() => {
  const box = document.getElementById('cookies');
  if (!box) return;
  try {
    if (document.cookie.includes('ma_ck=')) return;
    setTimeout(() => box.classList.add('sh'), 2200);
    const decidir = v => {
      document.cookie = `ma_ck=${v};path=/;max-age=${60 * 60 * 24 * 180};SameSite=Lax`;
      box.classList.remove('sh');
    };
    document.getElementById('ck-sim')?.addEventListener('click', () => decidir('1'));
    document.getElementById('ck-nao')?.addEventListener('click', () => decidir('0'));
  } catch (e) { /* silencioso */ }
})();

/* ============================================================
   v3.1 — jingle, trajetória interativa e deck do Instagram
   ============================================================ */

/* ── Jingle ── */
(() => {
  const btn = document.getElementById('jingle-btn');
  const audio = document.getElementById('jingle');
  const ico = document.getElementById('jingle-ico');
  if (!btn || !audio) return;
  const atualizar = tocando => {
    btn.classList.toggle('tocando', tocando);
    btn.setAttribute('aria-pressed', String(tocando));
    ico.className = tocando ? 'fa-solid fa-pause' : 'fa-solid fa-play';
  };
  btn.addEventListener('click', () => {
    if (audio.paused) { audio.play(); atualizar(true); }
    else { audio.pause(); atualizar(false); }
  });
  audio.addEventListener('ended', () => { audio.currentTime = 0; atualizar(false); });
})();

/* ── Trajetória interativa ── */
(() => {
  const pts = [...document.querySelectorAll('.tlx-pt')];
  const slides = [...document.querySelectorAll('.tlx-slide')];
  const num = document.getElementById('tlx-n');
  if (!slides.length) return;
  let atual = 0, timer = null;
  const ir = i => {
    atual = (i + slides.length) % slides.length;
    slides.forEach((s, j) => s.classList.toggle('ativo', j === atual));
    pts.forEach((p, j) => {
      p.classList.toggle('ativo', j === atual);
      p.setAttribute('aria-selected', String(j === atual));
    });
    if (num) num.textContent = atual + 1;
    const nav = document.querySelector('.tlx-nav');
    const p = pts[atual];
    if (nav && p) nav.scrollTo({ left: p.offsetLeft - nav.clientWidth / 2 + p.clientWidth / 2, behavior: 'smooth' });
  };
  const auto = () => { clearInterval(timer); timer = setInterval(() => ir(atual + 1), 8000); };
  pts.forEach((p, i) => p.addEventListener('click', () => { ir(i); auto(); }));
  document.getElementById('tlx-ant')?.addEventListener('click', () => { ir(atual - 1); auto(); });
  document.getElementById('tlx-prx')?.addEventListener('click', () => { ir(atual + 1); auto(); });
  // pausa o avanço automático quando fora da tela ou com o mouse em cima
  const tlx = document.querySelector('.tlx');
  tlx.addEventListener('mouseenter', () => clearInterval(timer));
  tlx.addEventListener('mouseleave', auto);
  new IntersectionObserver(e => e[0].isIntersecting ? auto() : clearInterval(timer), { threshold: .2 }).observe(tlx);
  // gesto de arrastar no mobile
  let x0 = null;
  tlx.addEventListener('touchstart', e => x0 = e.touches[0].clientX, { passive: true });
  tlx.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) { ir(atual + (dx < 0 ? 1 : -1)); auto(); }
    x0 = null;
  }, { passive: true });
})();

/* ── Deck do Instagram ── */
(() => {
  const deck = document.getElementById('ig-deck');
  if (!deck) return;
  const cards = [...deck.querySelectorAll('.ig-card')];
  let atual = 0, timer = null, animando = false;
  const classesPara = off =>
    off === 0 ? 'p0' : off === 1 ? 'p1' : off === 2 ? 'p2' : 'pfundo';
  const pintar = () => cards.forEach((c, i) => {
    const off = (i - atual + cards.length) % cards.length;
    c.className = 'ig-card ' + classesPara(off);
  });
  const avancar = () => {
    if (animando) return;
    animando = true;
    const saindo = cards[atual];
    saindo.className = 'ig-card psaindo';
    atual = (atual + 1) % cards.length;
    cards.forEach((c, i) => {
      if (c === saindo) return;
      const off = (i - atual + cards.length) % cards.length;
      c.className = 'ig-card ' + classesPara(off);
    });
    setTimeout(() => { pintar(); animando = false; }, 720);
  };
  const voltar = () => {
    if (animando) return;
    atual = (atual - 1 + cards.length) % cards.length;
    pintar();
  };
  const auto = () => { clearInterval(timer); timer = setInterval(avancar, 5000); };
  document.getElementById('ig-prx')?.addEventListener('click', () => { avancar(); auto(); });
  document.getElementById('ig-ant')?.addEventListener('click', () => { voltar(); auto(); });
  deck.addEventListener('mouseenter', () => clearInterval(timer));
  deck.addEventListener('mouseleave', auto);
  pintar();
  new IntersectionObserver(e => e[0].isIntersecting ? auto() : clearInterval(timer), { threshold: .2 }).observe(deck);
})();

/* ============================================================
   v3.2 — overlay de som e player do jingle no header
   ============================================================ */
(() => {
  const audio = document.getElementById('jingle');
  const player = document.getElementById('hdr-player');
  const ico = document.getElementById('hp-ico');
  if (!audio || !player) return;

  const estado = tocando => {
    player.classList.toggle('tocando', tocando);
    player.setAttribute('aria-pressed', String(tocando));
    if (ico) ico.className = tocando ? 'fa-solid fa-pause' : 'fa-solid fa-play';
  };
  player.addEventListener('click', () => {
    if (audio.paused) { audio.play().then(() => estado(true)).catch(() => {}); }
    else { audio.pause(); estado(false); }
  });
  audio.addEventListener('ended', () => { audio.currentTime = 0; estado(false); });
  audio.addEventListener('pause', () => estado(false));
  audio.addEventListener('play', () => estado(true));
})();

/* ============================================================
   v3.6 — destaque da seção atual na barra inferior (mobile)
   ============================================================ */
(() => {
  const itens = [...document.querySelectorAll('.bm-item')];
  if (!itens.length) return;
  const secoes = itens
    .map(i => document.getElementById(i.dataset.sec))
    .filter(Boolean);
  const marcar = () => {
    const meio = scrollY + innerHeight * 0.4;
    let atual = secoes[0];
    secoes.forEach(s => { if (s.offsetTop <= meio) atual = s; });
    itens.forEach(i => i.classList.toggle('ativo', i.dataset.sec === atual.id));
  };
  window.addEventListener('scroll', marcar, { passive: true });
  marcar();
})();


/* ── Carrossel das ações sociais ── */
(() => {
  const trilho = document.getElementById('acoes-carrossel');
  if (!trilho) return;
  const passo = () => (trilho.querySelector('.acaox')?.offsetWidth || 340) + 16;
  document.getElementById('ac-prx')?.addEventListener('click', () => trilho.scrollBy({ left: passo(), behavior: 'smooth' }));
  document.getElementById('ac-ant')?.addEventListener('click', () => trilho.scrollBy({ left: -passo(), behavior: 'smooth' }));
})();


/* ── Mural de ações: loop contínuo no desktop ── */
(() => {
  const trilhos = document.querySelectorAll('.mural-trilho');
  if (!trilhos.length) return;
  trilhos.forEach(t => {
    t.innerHTML += t.innerHTML;
    t.classList.add('anima');
    t.querySelectorAll('.rv').forEach(el => el.classList.add('vs'));
  });
})();

/* ── Acordeão das bandeiras ── */
(() => {
  const cabs = document.querySelectorAll('.band-cab');
  if (!cabs.length) return;
  cabs.forEach(c => c.addEventListener('click', () => {
    const it = c.parentElement;
    const estava = it.classList.contains('aberto');
    document.querySelectorAll('.band-it.aberto').forEach(o => {
      o.classList.remove('aberto');
      o.querySelector('.band-cab').setAttribute('aria-expanded', 'false');
    });
    if (!estava) {
      it.classList.add('aberto');
      c.setAttribute('aria-expanded', 'true');
      setTimeout(() => {
        const r = it.getBoundingClientRect();
        if (r.top < 90) window.scrollBy({ top: r.top - 100, behavior: 'smooth' });
      }, 420);
    }
  }));
})();
