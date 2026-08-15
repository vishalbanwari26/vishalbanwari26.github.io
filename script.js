/* ==========================================================================
   Vishal Banwari — portfolio
   No frameworks, no animation libraries. Vanilla, and quiet by default.
   ========================================================================== */

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Back issues — everything that isn't a full case study above. */
const ARCHIVE = [
  {
    name: 'HILL Framework',
    year: '2025',
    desc: 'Human in the Latent Loop. Lets a person reshape latent representations during training through a distillation-inspired objective.',
    url: 'https://www.arxiv.org/pdf/2505.06325',
  },
  {
    name: 'Continual Video Anomaly Detection',
    year: '2024',
    desc: 'Continual learning on RGB frames of ATARI gameplay. Incremental updates that detect anomalous behaviour without catastrophic forgetting.',
    url: 'https://github.com/vishalbanwari26/CLAD',
  },
  {
    name: 'LLM Translation',
    year: '2024',
    desc: 'bloomz-3b fine-tuned for German to French translation with PEFT/LoRA, scored on BLEU and BERTScore, served through Gradio.',
    url: 'https://github.com/vishalbanwari26/FineTuningLLMforLanguageTranslation',
  },
  {
    name: 'RAG Bot Study',
    year: '2024',
    desc: 'Retrieval over academic PDFs. Upload papers, ask questions, generate MCQs, on local embeddings and Groq models.',
    url: 'https://github.com/vishalbanwari26/RAG-BOT-STUDY',
  },
  {
    name: 'Multi-Agent Meal Planner',
    year: '2024',
    desc: 'Agents that negotiate a daily meal plan against dietary preferences, nutritional targets and a budget.',
    url: 'https://github.com/vishalbanwari26/MULTI-AGENT-MEAL-PLANNER',
  },
];

document.documentElement.classList.add('js-anim');

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initTheme();
  initArchive();
  initReveal();
  initNav();
  initMask();
  initDemos();
  initSpin();
  initDragline();
});

/* ── Demo panels ────────────────────────────────────────────────────────
   Each case study opens on a screen recording. They are preload="none" and
   only play while on screen, so the page never has three things looping at
   once and nothing downloads until you scroll to it. */
function initDemos() {
  // Only the recordings; some panels are stills, which need nothing.
  const videos = document.querySelectorAll('video.case-demo-media');
  if (!videos.length) return;

  // Reduced motion: leave the poster frame up and never fetch the video.
  if (REDUCED || !('IntersectionObserver' in window)) return;

  const onScreen = new Set();

  // Chrome pauses muted video-only media whenever the tab is hidden, so a
  // play() issued while backgrounded rejects. Poster frames cover that, and
  // anything still on screen resumes when the tab comes back.
  const start = (v) => {
    if (v.preload === 'none') v.preload = 'auto';
    if (document.hidden) return;
    v.play().catch(() => {});
  };

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const v = entry.target;
      if (entry.isIntersecting) {
        onScreen.add(v);
        start(v);
      } else {
        onScreen.delete(v);
        if (!v.paused) v.pause();
      }
    });
  }, { threshold: 0.25 });

  videos.forEach((v) => obs.observe(v));

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) return;
    onScreen.forEach(start);
  });
}

/* ── Behind the mask ────────────────────────────────────────────────────
   Hover handles it on a pointer device; this makes the reveal reachable by
   tap and by keyboard, where :hover never fires. */
function initMask() {
  const frame = document.getElementById('maskFrame');
  if (!frame) return;

  frame.addEventListener('click', () => {
    const on = frame.classList.toggle('is-revealed');
    frame.setAttribute('aria-pressed', String(on));
  });
}

/* ── Loader ──────────────────────────────────────────────────────────────
   Gated on the real load event with a short floor, so it reads as a beat
   rather than an artificial wait. */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  const FLOOR = REDUCED ? 0 : 1100;
  const start = performance.now();

  const dismiss = () => {
    const wait = Math.max(0, FLOOR - (performance.now() - start));
    setTimeout(() => {
      loader.classList.add('is-done');
      setTimeout(() => loader.remove(), 600);
    }, wait);
  };

  if (document.readyState === 'complete') dismiss();
  else window.addEventListener('load', dismiss, { once: true });
}

/* ── Theme ─────────────────────────────────────────────────────────────── */
const THEMES = [
  { id: 'night',     label: 'Night' },
  { id: 'newsprint', label: 'Newsprint' },
  { id: 'party',     label: 'Party' },
];

/* Module-level so the dragline agent can flip the theme itself. */
function setTheme(id, persist = true) {
  const theme = THEMES.find((t) => t.id === id) || THEMES[0];
  const name = document.getElementById('themeName');
  const btn = document.getElementById('themeToggle');

  document.documentElement.setAttribute('data-theme', theme.id);
  if (name) name.textContent = theme.label;
  if (btn) btn.setAttribute('title', `Theme: ${theme.label}. Click to switch.`);
  if (persist) localStorage.setItem('vb-theme', theme.id);

  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    'content',
    getComputedStyle(document.documentElement).getPropertyValue('--paper').trim()
  );
  syncConfetti();
}

function initTheme() {
  const btn = document.getElementById('themeToggle');
  const name = document.getElementById('themeName');
  if (!btn || !name) return;

  const apply = (id) => {
    const theme = THEMES.find((t) => t.id === id) || THEMES[0];
    document.documentElement.setAttribute('data-theme', theme.id);
    name.textContent = theme.label;
    btn.setAttribute('title', `Theme: ${theme.label}. Click to switch.`);
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      getComputedStyle(document.documentElement).getPropertyValue('--paper').trim()
    );
    syncConfetti();
  };

  const stored = localStorage.getItem('vb-theme');
  apply(THEMES.some((t) => t.id === stored) ? stored : 'night');

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = THEMES[(THEMES.findIndex((t) => t.id === current) + 1) % THEMES.length];
    localStorage.setItem('vb-theme', next.id);
    apply(next.id);
  });
}

/* ── Back issues ─────────────────────────────────────────────────────────── */
function initArchive() {
  const list = document.getElementById('archiveList');
  if (!list) return;

  list.innerHTML = ARCHIVE.map((p) => `
    <li class="archive-row">
      <a href="${p.url}" target="_blank" rel="noopener">
        <span class="archive-name">${p.name}</span>
        <span class="archive-year">${p.year} &nbsp;↗</span>
        <span class="archive-desc">${p.desc}</span>
      </a>
    </li>
  `).join('');
}

/* ── Scroll reveal ───────────────────────────────────────────────────────── */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  // Fail open: no IntersectionObserver means everything is simply visible.
  if (REDUCED || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      obs.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

  items.forEach((el) => obs.observe(el));
}

/* ── Nav ─────────────────────────────────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById('nav');
  const links = document.getElementById('navLinks');
  const burger = document.getElementById('navBurger');

  if (nav) {
    const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('.nav-link').forEach((a) =>
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // Active section
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);
  if (!sections.length || !('IntersectionObserver' in window)) return;

  const seen = new Map();
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => seen.set(e.target.id, e.intersectionRatio));
    let bestId = null, best = 0;
    seen.forEach((ratio, id) => { if (ratio > best) { best = ratio; bestId = id; } });
    navLinks.forEach((a) =>
      a.classList.toggle('is-active', best > 0 && a.getAttribute('href') === `#${bestId}`)
    );
  }, { threshold: [0, 0.15, 0.4, 0.7] });

  sections.forEach((s) => obs.observe(s));
}

/* ── Confetti — party theme only ─────────────────────────────────────────── */
let confettiTimer = null;
const CONFETTI = ['#ff2e93', '#00f0ff', '#ffd23f', '#b967ff', '#5cff8a', '#ff6b35'];

function syncConfetti() {
  const party = document.documentElement.getAttribute('data-theme') === 'party';
  if (party && !confettiTimer && !REDUCED) startConfetti();
  else if (!party && confettiTimer) stopConfetti();
}

function startConfetti() {
  let box = document.getElementById('confetti');
  if (!box) {
    box = document.createElement('div');
    box.id = 'confetti';
    box.setAttribute('aria-hidden', 'true');

    // A generous hit box plus pause-on-hover, so a falling piece is actually
    // catchable with a trackpad.
    box.addEventListener('click', (e) => {
      const piece = e.target.closest('.confetti-piece');
      if (piece) burst(piece, box);
    });
    box.addEventListener('mouseover', (e) => {
      const piece = e.target.closest('.confetti-piece');
      if (piece) piece.style.setProperty('--fall', 'paused');
    });
    box.addEventListener('mouseout', (e) => {
      const piece = e.target.closest('.confetti-piece');
      if (piece && piece.isConnected) piece.style.setProperty('--fall', 'running');
    });

    document.body.appendChild(box);
  }

  confettiTimer = setInterval(() => {
    if (document.hidden) return;
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const dur = 3.5 + Math.random() * 2.5;
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.animationDuration = dur + 's';
    piece.style.setProperty('--piece', CONFETTI[(Math.random() * CONFETTI.length) | 0]);
    piece.style.setProperty('--drift', (Math.random() - 0.5) * 160 + 'px');
    piece.style.setProperty('--piece-r', Math.random() > 0.5 ? '50%' : '1px');
    box.appendChild(piece);
    setTimeout(() => piece.remove(), dur * 1000 + 120);
  }, 240);
}

function burst(piece, box) {
  const p = piece.getBoundingClientRect();
  const b = box.getBoundingClientRect();
  const cx = p.left - b.left + p.width / 2;
  const cy = p.top - b.top + p.height / 2;
  const color = piece.style.getPropertyValue('--piece');

  for (let i = 0; i < 10; i++) {
    const bit = document.createElement('div');
    bit.className = 'confetti-bit';
    const angle = (Math.PI * 2 * i) / 10 + Math.random() * 0.5;
    const dist = 30 + Math.random() * 40;
    bit.style.cssText = `left:${cx}px;top:${cy}px;background:${color}`;
    bit.style.setProperty('--bx', Math.cos(angle) * dist + 'px');
    bit.style.setProperty('--by', Math.sin(angle) * dist + 'px');
    box.appendChild(bit);
    setTimeout(() => bit.remove(), 650);
  }
  piece.remove();
}

function stopConfetti() {
  clearInterval(confettiTimer);
  confettiTimer = null;
  document.getElementById('confetti')?.remove();
}

/* ── Dragline agent ──────────────────────────────────────────────────────
   A spider riding a dragline down the right margin. Three jobs in one
   element: the thread length is scroll progress, the readout reports the
   section it is over, and clicking it makes it run a loop. Physics only
   tick while something is actually moving. */
function initDragline() {
  if (REDUCED) return;
  const mq = window.matchMedia('(min-width: 921px)');
  if (mq.matches) return buildDragline();
  mq.addEventListener('change', function once(e) {
    if (!e.matches) return;
    mq.removeEventListener('change', once);
    buildDragline();
  });
}

/* What the agent says it is looking at, in the Cortex log's own grammar. */
const BEATS = [
  { id: 'top',        eye: 'vishal banwari',  plan: 'ai + software engineer' },
  { id: 'about',      eye: 'about',           plan: 'seven years, then research' },
  { id: 'work',       eye: 'selected work',   plan: '5 issues' },
  { id: 'research',   eye: 'research',        plan: '3 papers' },
  { id: 'experience', eye: 'experience',      plan: '5 roles' },
  { id: 'stack',      eye: 'toolkit',         plan: '' },
  { id: 'contact',    eye: 'contact',         plan: 'say hello' },
];

function buildDragline() {
  const canvas = document.createElement('canvas');
  canvas.id = 'dragline';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  const readout = document.createElement('div');
  readout.id = 'agent-readout';
  readout.setAttribute('aria-hidden', 'true');
  document.body.appendChild(readout);

  const SEGS = 18, GRAV = 0.42, DAMP = 0.94, ITERS = 14, SLEEP = 0.05;
  const HEAD = 118;  // slack at scroll 0, enough to clear the nav bar
  const TAIL = 150;  // keep it clear of the very bottom

  let W = 0, H = 0, anchorX = 0, segLen = 6;
  let pts = [], raf = null, hovering = false;
  let readoutTimer = null, lastBeat = null, running = false;

  const token = (n) =>
    getComputedStyle(document.documentElement).getPropertyValue(n).trim();

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.offsetWidth; H = canvas.offsetHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    anchorX = W * 0.5;
    if (!pts.length) {
      // Start at the rest length, not compressed. A heavily compressed start
      // has to expand a long way, and that is when the strand folds.
      const seg = targetLen() / SEGS;
      for (let i = 0; i <= SEGS; i++) {
        pts.push({ x: anchorX, y: i * seg, ox: anchorX, oy: i * seg });
      }
    }
  }

  const progress = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    return max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
  };

  const targetLen = () => HEAD + progress() * (H - TAIL - HEAD);

  function step() {
    // Dragline length is reading progress; the chain relaxes toward it.
    segLen = targetLen() / SEGS;

    for (let i = 1; i <= SEGS; i++) {
      const p = pts[i];
      const vx = (p.x - p.ox) * DAMP, vy = (p.y - p.oy) * DAMP;
      p.ox = p.x; p.oy = p.y;
      p.x += vx; p.y += vy + GRAV;
    }
    for (let it = 0; it < ITERS; it++) {
      pts[0].x = anchorX; pts[0].y = 0;
      for (let i = 0; i < SEGS; i++) {
        const a = pts[i], b = pts[i + 1];
        const dx = b.x - a.x, dy = b.y - a.y;
        const d = Math.hypot(dx, dy) || 0.001;
        const f = ((d - segLen) / d) * 0.5;
        if (i !== 0) { a.x += dx * f; a.y += dy * f; }
        b.x -= dx * f; b.y -= dy * f;
      }
      // Distance constraints alone let a vertical, collinear strand fold back
      // on itself: every segment the right length, the whole thing coiled at
      // the top. Keeping y monotonic downward forces it to actually hang.
      for (let i = 1; i <= SEGS; i++) {
        if (pts[i].y < pts[i - 1].y) pts[i].y = pts[i - 1].y;
      }
    }
  }

  function spider(x, y, a) {
    const c = hovering ? token('--red-ink') : token('--red');
    ctx.save();
    ctx.translate(x, y); ctx.rotate(a);
    ctx.strokeStyle = c; ctx.fillStyle = c;
    ctx.lineWidth = 1.5; ctx.lineCap = 'round';
    [[-4,-2,-14,-10],[-4,0,-16,-1],[-4,2,-14,7],[-4,4,-11,12],
     [ 4,-2, 14,-10],[ 4,0, 16,-1],[ 4,2, 14,7],[ 4,4, 11,12]]
      .forEach(([x1,y1,x2,y2]) => {
        ctx.beginPath(); ctx.moveTo(x1,y1);
        ctx.quadraticCurveTo((x1+x2)/2, y1-6, x2, y2); ctx.stroke();
      });
    ctx.beginPath(); ctx.ellipse(0, 5, 5.5, 7, 0, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(0, -4, 4, 0, Math.PI*2); ctx.fill();
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < SEGS; i++) {
      const mx = (pts[i].x + pts[i+1].x)/2, my = (pts[i].y + pts[i+1].y)/2;
      ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
    }
    ctx.lineTo(pts[SEGS].x, pts[SEGS].y);
    ctx.strokeStyle = hovering ? token('--red') : token('--ink-3');
    ctx.lineWidth = 1; ctx.stroke();

    const tip = pts[SEGS], prev = pts[SEGS-1];
    spider(tip.x, tip.y, -Math.atan2(tip.x - prev.x, prev.y - tip.y));

    readout.style.top = Math.round(tip.y - 16) + 'px';
    if (!running) positionLog(tip.y);
  }

  function energy() {
    let e = 0;
    for (let i = 1; i <= SEGS; i++) e += Math.abs(pts[i].x-pts[i].ox) + Math.abs(pts[i].y-pts[i].oy);
    return e;
  }
  function loop() {
    step(); draw();
    if (energy() < SLEEP) { raf = null; return; }
    raf = requestAnimationFrame(loop);
  }
  const wake = () => { if (!raf) raf = requestAnimationFrame(loop); };

  /* ── Readout ── */
  function currentBeat() {
    const mid = scrollY + innerHeight * 0.45;
    let found = BEATS[0];
    BEATS.forEach((b) => {
      const el = document.getElementById(b.id);
      if (el && el.offsetTop <= mid) found = b;
    });
    return found;
  }

  function updateReadout() {
    const b = currentBeat();
    if (b.id !== lastBeat) {
      lastBeat = b.id;
      readout.innerHTML =
        `<div><span class="tag tag-eye">[eye]</span> ${b.eye}</div>` +
        (b.plan ? `<div><span class="tag">[plan]</span> ${b.plan}</div>` : '');
    }
    readout.classList.add('is-awake');
    clearTimeout(readoutTimer);
    readoutTimer = setTimeout(() => readout.classList.remove('is-awake'), 1700);
  }

  /* ── The loop it runs when clicked ── */
  const log = document.createElement('div');
  log.id = 'agent-log';
  log.setAttribute('aria-hidden', 'true');
  document.body.appendChild(log);

  function positionLog(tipY) {
    const h = log.offsetHeight || 160;
    log.style.top = Math.round(Math.min(Math.max(tipY - h / 2, 16), innerHeight - h - 16)) + 'px';
  }

  function runAgent() {
    if (running) return;
    running = true;

    const party = document.documentElement.getAttribute('data-theme') === 'party';
    const script = party
      ? [['[..]','Observing the scene...'], ['[eye]','Confetti already falling.'],
         ['[!]','Nothing to do here.'], ['[ok]','Standing down.']]
      : [['[..]','Observing the scene...'],
         ['[eye]','A portfolio. 5 issues, 3 papers.'],
         ['[..]','Planning to: liven this up.'],
         ['[plan]','1. locate toggle | 2. pull'],
         ['[>>]','[pull] pull -> party'],
         ['[ok]','Confetti deployed.']];

    log.innerHTML = '';
    positionLog(pts[SEGS].y);
    log.classList.add('is-open');

    script.forEach(([tag, text], i) => {
      setTimeout(() => {
        const cls = tag === '[eye]' ? 'tag-eye'
                  : tag === '[ok]'  ? 'tag-ok'
                  : tag === '[>>]'  ? 'tag-run' : 'tag';
        const p = document.createElement('p');
        p.innerHTML = `<span class="${cls}">${tag}</span> ${text}`;
        log.appendChild(p);
        positionLog(pts[SEGS].y);
      }, i * 480);
    });

    const total = script.length * 480;
    if (!party) {
      setTimeout(() => setTheme('party'), total - 200);
    }
    setTimeout(() => {
      log.classList.remove('is-open');
      running = false;
    }, total + 2200);
  }

  /* ── Pointer ──
     The spider is click-only. The canvas stays pointer-events:none until the
     cursor is actually on it, so it never eats a click meant for the page. */
  const local = (e) => {
    const r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const nearSpider = (p) => Math.hypot(pts[SEGS].x - p.x, pts[SEGS].y - p.y) < 26;

  window.addEventListener('pointermove', (e) => {
    const near = nearSpider(local(e));
    if (near === hovering) return;
    hovering = near;
    canvas.style.pointerEvents = near ? 'auto' : 'none';
    canvas.style.cursor = near ? 'pointer' : '';
    wake();
  }, { passive: true });

  canvas.addEventListener('click', (e) => {
    if (nearSpider(local(e))) runAgent();
  });

  window.addEventListener('scroll', () => { updateReadout(); wake(); }, { passive: true });
  window.addEventListener('resize', () => { resize(); wake(); });

  resize();
  updateReadout();
  setTimeout(() => readout.classList.remove('is-awake'), 2600);
  wake();
}

/* ── Section rules spin in ─────────────────────────────────────────────
   The rule is a thread ending in a web fan: five spokes radiating from the
   right-hand anchor, with two sagging cross-threads. Anchor is (44,20). */
const RULE_WEB = `
<svg class="sec-rule-web" viewBox="0 0 44 40" fill="none" stroke="currentColor"
     stroke-width="0.9" stroke-linecap="round" aria-hidden="true">
  <path d="M44 20 L10 20"/>
  <path d="M44 20 L12 8.4"/>
  <path d="M44 20 L12 31.6"/>
  <path d="M44 20 L17.2 0.9"/>
  <path d="M44 20 L17.2 39.1"/>
  <path d="M33 11.4 Q27.9 20 33 28.6"/>
  <path d="M23.5 4 Q14.1 20 23.5 36"/>
</svg>`;

/* Contact closes on the same mark, mirrored about the centre. Anchors at
   (0,20) and (260,20), fans facing inward, one thread between them. */
const CONTACT_WEB = `
<svg viewBox="0 0 260 40" fill="none" stroke="currentColor"
     stroke-width="0.9" stroke-linecap="round" aria-hidden="true">
  <path d="M34 20 L226 20"/>
  <path d="M0 20 L34 20"/><path d="M0 20 L32 8.4"/><path d="M0 20 L32 31.6"/>
  <path d="M0 20 L26.8 0.9"/><path d="M0 20 L26.8 39.1"/>
  <path d="M11 11.4 Q16.1 20 11 28.6"/>
  <path d="M20.5 4 Q29.9 20 20.5 36"/>
  <path d="M260 20 L226 20"/><path d="M260 20 L228 8.4"/><path d="M260 20 L228 31.6"/>
  <path d="M260 20 L233.2 0.9"/><path d="M260 20 L233.2 39.1"/>
  <path d="M249 11.4 Q243.9 20 249 28.6"/>
  <path d="M239.5 4 Q230.1 20 239.5 36"/>
</svg>`;

function initSpin() {
  const heads = [
    ...document.querySelectorAll('.sec-head'),
    ...document.querySelectorAll('.contact-rule'),
  ];
  if (!heads.length) return;

  document.querySelectorAll('.sec-rule').forEach((rule) => {
    rule.innerHTML = '<span class="sec-rule-line"></span>' + RULE_WEB;
  });
  document.querySelectorAll('.contact-rule').forEach((el) => {
    el.innerHTML = CONTACT_WEB;
  });
  if (REDUCED || !('IntersectionObserver' in window)) {
    heads.forEach((h) => h.classList.add('is-spun'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-spun');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.4 });
  heads.forEach((h) => obs.observe(h));
}
