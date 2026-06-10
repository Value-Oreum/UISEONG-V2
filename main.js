/* =========================================================
   The Brilliant Star of UISEONG — interactions
   ========================================================= */

// ===== SPLASH / LANDING =====
(function () {
  const splash = document.getElementById('splash');
  if (!splash) { document.body.classList.remove('splash-active'); return; }
  let done = false;
  const enter = () => {
    if (done) return; done = true;
    clearTimeout(timer);
    splash.classList.add('hide');
    document.body.classList.remove('splash-active');
    document.body.classList.add('entered');
    setTimeout(() => splash.remove(), 1000);
  };
  const timer = setTimeout(enter, 2800);
  ['click', 'keydown', 'wheel', 'touchstart'].forEach(ev =>
    window.addEventListener(ev, enter, { once: true, passive: true })
  );
})();

// ===== BRAND LOGO → 표지(맨 위)로 이동 =====
const navBrand = document.querySelector('.nav-brand');
if (navBrand) {
  navBrand.addEventListener('click', e => {
    e.preventDefault();
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== SCROLL PROGRESS =====
const prog = document.getElementById('progress');
window.addEventListener('scroll', () => {
  const h = document.body.scrollHeight - window.innerHeight;
  prog.style.width = (h > 0 ? window.scrollY / h * 100 : 0) + '%';
}, { passive: true });

// ===== MOBILE MENU =====
const navMenuBtn = document.getElementById('navMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (navMenuBtn && mobileMenu) {
  navMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
}
function closeMobileMenu() { if (mobileMenu) mobileMenu.classList.remove('open'); }

// ===== REVEAL ON SCROLL =====
const revObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revObserver.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal').forEach(el => revObserver.observe(el));

// ===== ANIMATED COUNTERS (budget) =====
const counters = document.querySelectorAll('.count');
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const to = parseInt(el.dataset.to, 10);
    const dur = 1100;
    const start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(eased * to);
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = to;
    };
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(c => countObserver.observe(c));

// ===== ANIMATED COUNTERS (proven case stats, comma-formatted) =====
const csNums = document.querySelectorAll('.cs-num');
const csObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const to = parseInt(el.dataset.count, 10);
    const dur = 1300;
    const start = performance.now();
    const fmt = n => n.toLocaleString('ko-KR');
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(eased * to));
      if (p < 1) requestAnimationFrame(tick); else el.textContent = fmt(to);
    };
    requestAnimationFrame(tick);
    csObserver.unobserve(el);
  });
}, { threshold: 0.5 });
csNums.forEach(c => csObserver.observe(c));

// ===== BEFORE / AFTER SLIDER =====
document.querySelectorAll('.slider-wrap').forEach(wrap => {
  const before = wrap.querySelector('.slider-before');
  const line = wrap.querySelector('.slider-line');
  let active = false;
  const set = x => {
    const r = wrap.getBoundingClientRect();
    const pct = Math.max(4, Math.min(96, (x - r.left) / r.width * 100));
    before.style.width = pct + '%';
    line.style.left = pct + '%';
  };
  wrap.addEventListener('mousedown', e => { active = true; set(e.clientX); });
  wrap.addEventListener('touchstart', e => { active = true; set(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('mousemove', e => { if (active) set(e.clientX); });
  window.addEventListener('touchmove', e => { if (active) set(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('mouseup', () => active = false);
  window.addEventListener('touchend', () => active = false);
});

// ===== SEQUENCE PLAYER =====
(function () {
  const player = document.querySelector('.seq-player');
  if (!player) return;

  const images = Array.from(player.querySelectorAll('.seq-screen img'));
  const playBtn = player.querySelector('.play-btn');
  const prevBtn = player.querySelector('.prev-btn');
  const nextBtn = player.querySelector('.next-btn');
  const fill = player.querySelector('.seq-fill');
  const timeEl = player.querySelector('.seq-time');
  const labelEl = player.querySelector('.seq-label');
  const thumbs = Array.from(player.querySelectorAll('.seq-thumb'));
  const status = player.querySelector('.seq-status');

  const segments = [
    { time: '00:00', label: '오프닝 — 스피어 LED 전체 조명 점등' },
    { time: '00:03', label: '날씨 정보 — 현재 의성군 날씨와 주간 예보' },
    { time: '00:06', label: '실시간 시민 의견 — 의견이 실시간으로 표출' },
    { time: '00:09', label: '의성군 소식 LIVE — 주요 소식 실시간 안내' },
    { time: '00:12', label: '주요 관광지 BEST 3 — 인기 관광지 소개' },
    { time: '00:15', label: '행사·축제 안내 — 다가오는 행사와 일정' },
    { time: '00:18', label: '교통·안내 정보 — 버스·교통·주차 정보' },
    { time: '00:21', label: 'AI 추천 정보 — 맞춤형 추천 콘텐츠 제공' },
    { time: '00:24', label: '지구본 모드 — 의성을 글로벌로 연결' },
    { time: '00:27', label: '시민 참여 유도 — QR로 참여해 의견 남기기' },
    { time: '00:29', label: '엔딩 클로징 — 함께 만드는 우리 의성의 미래' },
    { time: '00:30', label: '의성군 브랜드 클로징' },
  ];

  const STEP = 2500;
  let cur = 0, playing = false, timer = null;

  const show = (idx, instant) => {
    const prev = cur; cur = idx;
    images[cur].style.transition = instant ? 'none' : '';
    images.forEach((im, i) => im.classList.toggle('active', i === cur));
    thumbs.forEach((t, i) => t.classList.toggle('active', i === cur));
    if (timeEl) timeEl.textContent = segments[cur].time;
    if (labelEl) labelEl.textContent = segments[cur].label;
    if (fill) fill.style.width = (cur / (images.length - 1) * 100) + '%';
    if (status) status.textContent = `${cur + 1} / ${images.length}`;
  };

  const advance = () => show((cur + 1) % images.length);
  const startPlay = () => { playing = true; if (playBtn) playBtn.textContent = '⏸'; timer = setInterval(advance, STEP); };
  const stopPlay = () => { playing = false; if (playBtn) playBtn.textContent = '▶'; clearInterval(timer); timer = null; };

  if (playBtn) playBtn.addEventListener('click', () => playing ? stopPlay() : startPlay());
  if (prevBtn) prevBtn.addEventListener('click', () => { stopPlay(); show((cur - 1 + images.length) % images.length); });
  if (nextBtn) nextBtn.addEventListener('click', () => { stopPlay(); show((cur + 1) % images.length); });
  thumbs.forEach((t, i) => t.addEventListener('click', () => { stopPlay(); show(i); }));

  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !playing) startPlay();
      else if (!e.isIntersecting && playing) stopPlay();
    });
  }, { threshold: 0.35 }).observe(player);

  images.forEach(img => { const s = img.getAttribute('src'); if (s) { const p = new Image(); p.src = s; } });
  show(0, true);
})();
