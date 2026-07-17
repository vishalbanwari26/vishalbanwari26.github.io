/* ========================================
   Portfolio Script
   ======================================== */

// ── Featured Projects (top 6 only) ──
const ALL_PROJECTS = [
  {
    id: 'mnemos', label: 'mnemos', domain: 'Agents', year: '2026',
    description: 'Persistent memory framework for LLM agents. Episodic and semantic memory, retrieval that adapts its own similarity/recency strategy per user, and a reflection engine that merges, decays, and forgets stale facts with a full audit trail. Three interchangeable storage backends (Postgres/pgvector, Qdrant, Neo4j) behind one interface, a FastAPI backend, a React dashboard, and a benchmark that measures recall over simulated time instead of just demoing well.',
    techs: ['Python', 'FastAPI', 'React', 'Postgres', 'Neo4j'],
    url: 'https://github.com/vishalbanwari26/mnemos'
  },
  {
    id: 'cortex', label: 'Cortex', domain: 'Agents', year: '2025',
    description: 'Cognitive-loop orchestrator for embodied agents. Perceives a scene with a vision-language model, decomposes a natural-language goal into a multi-step plan, dispatches steps through a modular skill registry, and adapts in real time when a step fails. Provider-agnostic: the same loop runs on Groq, Anthropic, or a deterministic mock with no code changes.',
    techs: ['Python', 'LLMs', 'Multi-Agent', 'Vision', 'Groq'],
    url: 'https://github.com/vishalbanwari26/cortex'
  },
  {
    id: 'hill', label: 'HILL Framework', domain: 'Research', year: '2025',
    description: 'Human in the Latent Loop. An interactive framework that lets users incorporate human intuition into model training by reshaping latent space representations via a distillation-inspired approach.',
    techs: ['Python', 'PyTorch', 'Human-AI', 'Visualization'],
    url: 'https://www.arxiv.org/pdf/2505.06325'
  },
  {
    id: 'stylized-rag', label: 'STYLIZED RAG', domain: 'LLM', year: '2024',
    description: 'RAG pipeline designed for text style transfer, with modularity, stylistic control, and enhanced retrieval using an ensemble approach.',
    techs: ['Python', 'RAG', 'LangChain', 'Embeddings'],
    url: 'https://github.com/vishalbanwari26/STYLIZED_RAG'
  },
  {
    id: 'clad', label: 'Continual Learning Video Anomaly Detection', domain: 'Computer Vision', year: '2024',
    description: 'Continual learning applied to video anomaly detection on RGB frames of ATARI games. Implements incremental model updates to detect anomalous gameplay behavior without catastrophic forgetting.',
    techs: ['Python', 'PyTorch', 'Computer Vision', 'Deep Learning'],
    url: 'https://github.com/vishalbanwari26/CLAD'
  },
  {
    id: 'finetune-llm', label: 'LLM Translation', domain: 'LLM', year: '2024',
    description: 'Fine-tuned multilingual LLM (bloomz-3b) for German-French translation using PEFT/LoRA, evaluated with BLEU and BERTScore, and deployed via Gradio.',
    techs: ['Python', 'Hugging Face', 'LoRA / PEFT', 'Gradio'],
    url: 'https://github.com/vishalbanwari26/FineTuningLLMforLanguageTranslation'
  },
  {
    id: 'rag-bot', label: 'RAG Bot Study', domain: 'LLM', year: '2024',
    description: 'Streamlit app that performs RAG over academic PDFs. Upload research papers, ask questions, and generate MCQs powered by local embeddings and Groq LLMs.',
    techs: ['Python', 'RAG', 'Streamlit', 'Embeddings'],
    url: 'https://github.com/vishalbanwari26/RAG-BOT-STUDY'
  },
  {
    id: 'meal-planner', label: 'Multi Agents LLM Meal Planner', domain: 'LLM', year: '2024',
    description: 'Multi-agent system for daily meal planning. Uses intelligent agents to factor in dietary preferences, nutritional goals, and financial constraints.',
    techs: ['Python', 'LangChain', 'Multi-Agent', 'Generative AI'],
    url: 'https://github.com/vishalbanwari26/MULTI-AGENT-MEAL-PLANNER'
  },
];

const DOMAIN_COLORS = {
  'Agents':         '#56d4dc',
  'LLM':            '#00d4ff',
  'Computer Vision':'#8b5cf6',
  'Deep Learning':  '#f59e0b',
  'Research':       '#ec4899',
};

// ────────────────────────────────────────
// Init
// ────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  initLoader();

  gsap.set([
    '.hero-badge', '.hero-tagline', '.hero-subtitle', '.hero-cta',
    '.hero-scroll-hint', '.hero-stats', '.hero-divider', '.hero-marquee'
  ], { opacity: 0 });

  // Small delay so browser has painted before animations fire
  setTimeout(() => {
    playHeroAnimations();
    initGlitch();
  }, 80);

  initThemeToggle();
  initCursor();
  initProjects();
  initGSAP();
  initVanillaTilt();
  initNavBurger();
  initHobbies();
  initTimelineWave();
});

function initTimelineWave() {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;

  const nodes = Array.from(timeline.querySelectorAll('.timeline-node'));
  if (nodes.length < 2) return;

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('timeline-wave-svg');
  svg.setAttribute('aria-hidden', 'true');
  timeline.appendChild(svg);

  function getLayoutPos(el, ancestor) {
    // use offsetTop/offsetLeft to avoid GSAP transform offsets
    let top = 0, left = 0, cur = el;
    while (cur && cur !== ancestor) {
      top  += cur.offsetTop;
      left += cur.offsetLeft;
      cur   = cur.offsetParent;
    }
    return { x: left + el.offsetWidth / 2, y: top + el.offsetHeight / 2 };
  }

  function buildWave() {
    svg.innerHTML = '';
    const W = timeline.offsetWidth;
    const H = timeline.offsetHeight;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('width', W);
    svg.setAttribute('height', H);

    const cx = W / 2; // centre X — all dots are here
    const AMP = W * 0.18; // wide horizontal swing

    const pts = nodes.map(n => getLayoutPos(n, timeline));

    let d = '';
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      // alternate swing direction so it weaves
      const dir = i % 2 === 0 ? 1 : -1;
      const cp1x = cx + AMP * dir;
      const cp1y = a.y + (b.y - a.y) * 0.33;
      const cp2x = cx - AMP * dir;
      const cp2y = a.y + (b.y - a.y) * 0.67;
      d += `M ${a.x} ${a.y} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${b.x} ${b.y} `;
    }

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d.trim());
    path.setAttribute('stroke', '#ff6b35');
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-opacity', '0.45');
    path.setAttribute('stroke-linecap', 'round');
    svg.appendChild(path);
  }

  setTimeout(buildWave, 400);
  window.addEventListener('resize', buildWave);
}

// ────────────────────────────────────────
// Loader
// ────────────────────────────────────────
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  const MIN_VISIBLE = 2000;
  const start = performance.now();

  const hide = () => {
    const elapsed = performance.now() - start;
    const wait = Math.max(0, MIN_VISIBLE - elapsed);
    setTimeout(() => {
      loader.classList.add('loader-hide');
      setTimeout(() => loader.remove(), 600);
    }, wait);
  };

  if (document.readyState === 'complete') hide();
  else window.addEventListener('load', hide);
}

// ────────────────────────────────────────
// Theme Toggle
// ────────────────────────────────────────
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const order = ['dark', 'light', 'party'];
  const stored = localStorage.getItem('vb-theme');
  if (order.includes(stored)) document.documentElement.setAttribute('data-theme', stored);
  syncPartyConfetti();

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = order[(order.indexOf(current) + 1) % order.length];
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('vb-theme', next);
    syncPartyConfetti();
  });
}

// ────────────────────────────────────────
// Party Confetti
// ────────────────────────────────────────
let partyConfettiInterval = null;

function syncPartyConfetti() {
  const isParty = document.documentElement.getAttribute('data-theme') === 'party';
  if (isParty && !partyConfettiInterval) {
    startPartyConfetti();
  } else if (!isParty && partyConfettiInterval) {
    stopPartyConfetti();
  }
}

const CONFETTI_COLORS = ['#ff2e93', '#00f0ff', '#ffd23f', '#b967ff', '#5cff8a'];

function startPartyConfetti() {
  let container = document.getElementById('party-confetti');
  if (!container) {
    container = document.createElement('div');
    container.id = 'party-confetti';
    container.setAttribute('aria-hidden', 'true');
    container.addEventListener('click', (e) => {
      const piece = e.target.closest('.confetti-piece');
      if (piece) burstConfettiPiece(piece, container);
    });
    // Hovering (even briefly, with a forgiving trackpad-friendly hit box)
    // pauses the fall so there's time to actually land the click.
    container.addEventListener('mouseover', (e) => {
      const piece = e.target.closest('.confetti-piece');
      if (piece) piece.style.setProperty('--fall-state', 'paused');
    });
    container.addEventListener('mouseout', (e) => {
      const piece = e.target.closest('.confetti-piece');
      if (piece && piece.isConnected) piece.style.setProperty('--fall-state', 'running');
    });
    document.body.appendChild(container);
  }

  partyConfettiInterval = setInterval(() => {
    if (document.hidden) return;
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const duration = 3.5 + Math.random() * 2.5;
    const drift = (Math.random() - 0.5) * 160;
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.setProperty('--piece-color', CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]);
    piece.style.animationDuration = duration + 's';
    piece.style.setProperty('--drift', drift + 'px');
    piece.style.setProperty('--piece-radius', Math.random() > 0.5 ? '50%' : '2px');
    container.appendChild(piece);
    setTimeout(() => piece.remove(), duration * 1000 + 100);
  }, 220);
}

function burstConfettiPiece(piece, container) {
  const pieceRect = piece.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const cx = pieceRect.left - containerRect.left + pieceRect.width / 2;
  const cy = pieceRect.top - containerRect.top + pieceRect.height / 2;
  const color = piece.style.getPropertyValue('--piece-color');
  const count = 10;

  for (let i = 0; i < count; i++) {
    const bit = document.createElement('div');
    bit.className = 'confetti-burst-piece';
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
    const dist = 30 + Math.random() * 40;
    bit.style.left = cx + 'px';
    bit.style.top = cy + 'px';
    bit.style.background = color;
    bit.style.setProperty('--bx', Math.cos(angle) * dist + 'px');
    bit.style.setProperty('--by', Math.sin(angle) * dist + 'px');
    container.appendChild(bit);
    setTimeout(() => bit.remove(), 650);
  }
  piece.remove();
}

function stopPartyConfetti() {
  clearInterval(partyConfettiInterval);
  partyConfettiInterval = null;
  const container = document.getElementById('party-confetti');
  if (container) container.remove();
}

// ────────────────────────────────────────
// Hero Animations
// ────────────────────────────────────────
function playHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.fromTo('.hero-badge', { opacity:0, x:-24 }, { opacity:1, x:0, duration:0.6, ease:'power3.out' })
    .fromTo('.hero-title-line:first-child', { opacity:0, y:80 }, { opacity:1, y:0, duration:0.9 }, '-=0.2')
    .fromTo('.hero-title-accent',           { opacity:0, y:80 }, { opacity:1, y:0, duration:0.9 }, '-=0.6')
    .to('.hero-divider',   { opacity:1, scaleX:1, duration:0.8, ease:'power3.out' }, '-=0.3')
    .to('.hero-tagline',   { opacity:1, duration:0.6 }, '-=0.5')
    .to('.hero-subtitle',  { opacity:1, duration:0.5 }, '-=0.4')
    .to('.hero-stats',     { opacity:1, duration:0.5 }, '-=0.3')
    .to('.hero-cta',       { opacity:1, duration:0.5, ease:'back.out(1.5)' }, '-=0.2')
    .to('.hero-marquee',   { opacity:1, duration:0.8 }, '-=0.1');
  tl.call(animateCounters, [], '-=0.5');
}

function animateCounters() {
  document.querySelectorAll('.hero-stat-num').forEach(el => {
    const target = parseInt(el.getAttribute('data-target') || '0', 10);
    const suffix = el.getAttribute('data-suffix') || '';
    let step = 0; const steps = 60;
    const timer = setInterval(() => {
      step++;
      el.textContent = Math.min(Math.round(target / steps * step), target) + suffix;
      if (step >= steps) { el.textContent = target + suffix; clearInterval(timer); }
    }, 1200 / steps);
  });
}

// ────────────────────────────────────────
// Periodic Glitch on "Banwari"
// ────────────────────────────────────────
function initGlitch() {
  const el = document.querySelector('.hero-title-accent');
  if (!el) return;
  function glitch() {
    el.classList.add('glitching');
    setTimeout(() => el.classList.remove('glitching'), 380);
    setTimeout(glitch, 5000 + Math.random() * 7000);
  }
  setTimeout(glitch, 4500);
}

// ────────────────────────────────────────
// Projects — Card Grid
// ────────────────────────────────────────
function initProjects() {
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  ALL_PROJECTS.forEach((p, i) => {
    const dc      = DOMAIN_COLORS[p.domain] || '#ff6b35';
    const isArxiv = (p.url || '').includes('arxiv');
    const card    = document.createElement('div');
    card.className = 'project-card';
    card.style.setProperty('--dc', dc);
    card.innerHTML = `
      <div class="pc-top">
        <span class="pc-num">${String(i + 1).padStart(2, '0')}</span>
        <span class="pc-domain">${p.domain}</span>
      </div>
      <h3 class="pc-name">${p.label}</h3>
      <p class="pc-desc">${p.description}</p>
      <div class="pc-techs">
        ${p.techs.slice(0, 3).map(t => `<span class="pc-tech">${t}</span>`).join('')}
      </div>
      <span class="pc-link">${isArxiv ? 'Read ↗' : 'GitHub ↗'}</span>
    `;

    card.addEventListener('click', () => { if (p.url) window.open(p.url, '_blank'); });
    card.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    card.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));

    grid.appendChild(card);
  });

  // Stagger cards in on scroll
  gsap.fromTo('.project-card',
    { opacity: 0, y: 24 },
    {
      opacity: 1, y: 0,
      stagger: 0.04, duration: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: grid, start: 'top 85%', toggleActions: 'play none none reverse' }
    }
  );
}

// ────────────────────────────────────────
// Beyond Code — pop-in hobbies
// ────────────────────────────────────────
function initHobbies() {
  const items = document.querySelectorAll('.hobby-item');
  if (!items.length) return;
  const grid = document.querySelector('.hobbies-grid');
  if (!grid) return;

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      items.forEach((item, i) => setTimeout(() => {
        item.style.transition = 'opacity .4s ease, transform .4s cubic-bezier(.34,1.56,.64,1)';
        item.classList.add('popped');
      }, i * 60));
      obs.disconnect();
    }
  }, { threshold: 0.2 });
  obs.observe(grid);
}

// ────────────────────────────────────────
// Custom Cursor
// ────────────────────────────────────────
function initCursor() {
  const dot     = document.getElementById('cursor-dot');
  const outline = document.getElementById('cursor-outline');
  if (!dot || !outline) return;

  let cx = innerWidth / 2, cy = innerHeight / 2;
  let ox = cx, oy = cy;

  window.addEventListener('mousemove', e => {
    cx = e.clientX; cy = e.clientY;
    dot.style.left = cx + 'px'; dot.style.top = cy + 'px';
  });
  (function follow() {
    ox += (cx - ox) * 0.12; oy += (cy - oy) * 0.12;
    outline.style.left = ox + 'px'; outline.style.top = oy + 'px';
    requestAnimationFrame(follow);
  })();

  document.querySelectorAll('a, button, .glass-card, .skill-badge, .hobby-item').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top  - r.height / 2;
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1,.3)' });
    });
  });
}

// ────────────────────────────────────────
// GSAP ScrollTrigger
// ────────────────────────────────────────
function initGSAP() {
  gsap.registerPlugin(ScrollTrigger);

  // Section headers
  gsap.utils.toArray('.section-header').forEach(el => {
    const label = el.querySelector('.section-label');
    const title = el.querySelector('.section-title');
    const desc  = el.querySelector('.section-desc');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el, start: 'top 85%', toggleActions: 'play none none reverse',
        onEnter:     () => el.classList.add('in-view'),
        onLeaveBack: () => el.classList.remove('in-view')
      }
    });
    if (label) tl.fromTo(label, { opacity:0, x:-20 }, { opacity:1, x:0, duration:0.5 });
    if (title) tl.fromTo(title, { opacity:0, y:40   }, { opacity:1, y:0, duration:0.8, ease:'power3.out' }, '-=0.2');
    if (desc)  tl.fromTo(desc,  { opacity:0, y:20   }, { opacity:1, y:0, duration:0.5 }, '-=0.4');
  });

  // Timeline items
  gsap.utils.toArray('.timeline-item').forEach(el => {
    const side = el.getAttribute('data-side');
    gsap.fromTo(el,
      { opacity:0, x: side === 'left' ? -70 : 70 },
      { opacity:1, x:0, duration:0.9, ease:'power3.out',
        scrollTrigger: { trigger:el, start:'top 82%', toggleActions:'play none none reverse' }
      }
    );
  });

  // Skills cards
  gsap.utils.toArray('.skills-category').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity:0, y:50, scale:0.93 },
      { opacity:1, y:0, scale:1, duration:0.7, delay:i*0.08, ease:'back.out(1.5)',
        scrollTrigger: { trigger:el, start:'top 88%', toggleActions:'play none none reverse' }
      }
    );
  });

  // Publication cards — simple fade, no scroll dependency
  gsap.fromTo('.pub-card',
    { opacity:0, y:20 },
    { opacity:1, y:0, duration:0.6, ease:'power2.out', stagger:0.1,
      scrollTrigger: { trigger:'.pub-grid', start:'top 98%', once:true }
    }
  );

  // Contact
  gsap.fromTo('.contact-content',
    { opacity:0, y:60 },
    { opacity:1, y:0, duration:1, ease:'power3.out',
      scrollTrigger: { trigger:'.contact-section', start:'top 80%', toggleActions:'play none none reverse' }
    }
  );

  // Navbar
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: () => {
      const nav = document.getElementById('nav');
      if (scrollY > 80) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }
  });
}

// ────────────────────────────────────────
// VanillaTilt
// ────────────────────────────────────────
function initVanillaTilt() {
  if (typeof VanillaTilt === 'undefined') return;
  VanillaTilt.init(document.querySelectorAll('.glass-card'), {
    max: 6, speed: 400, glare: true, 'max-glare': 0.06, perspective: 1200
  });
}

// ────────────────────────────────────────
// Mobile Nav
// ────────────────────────────────────────
function initNavBurger() {
  const burger = document.getElementById('navBurger');
  const links  = document.getElementById('navLinks');
  if (!burger || !links) return;
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
    burger.classList.remove('open'); links.classList.remove('open');
  }));
}

// ────────────────────────────────────────
// Text Scramble
// ────────────────────────────────────────
function scrambleText(el) {
  if (!el) return;
  const orig  = el.innerText;
  const chars = '!<>-_\\/[]{}=+*^?#@$%&~';
  let iter = 0;
  const interval = setInterval(() => {
    el.innerText = orig.split('').map((ch, idx) => {
      if (idx < iter) return orig[idx];
      if (ch === ' ') return ' ';
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');
    if (iter >= orig.length) clearInterval(interval);
    iter += 0.5;
  }, 25);
}

// ── Hanging Ropes ──────────────────────────────────────────────────────────
window.addEventListener('load', function() {
  const canvas = document.getElementById('ropes-canvas');
  if (!canvas) return;

  const ctx    = canvas.getContext('2d');
  const LABELS = ['Nature lover', 'AI engineer', 'Sidequesting'];
  const COLORS = ['#00d4ff', '#ff6b35', '#8b5cf6'];
  const SEGS   = 14;
  const GRAV   = 0.55;
  const DAMP   = 0.96;
  const ITERS  = 30;
  const SLEEP  = 0.08;
  const CLIMB_SPD = 0.04;
  const COLL_DIST = 20;

  let W, H, segLen, anchors;
  let dragging  = null;
  let rafId     = null;
  let sleeping  = false;
  let idleTimer  = null;
  let monkeyDrag = -1; // which rope's monkey is being dragged
  let hovRope   = -1;

  const monkeys = LABELS.map(() => ({ seg: SEGS, dir: 0, target: SEGS }));
  const ropes   = LABELS.map(() => []);

  function rgba(hex, a) {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${a})`;
  }

  // hide canvas once user has scrolled past the hero section
  const hero = document.getElementById('hero');
  function updateCanvasVisibility() {
    if (!hero) return;
    // hide as soon as the hero is more than 80% scrolled past
    const show = window.scrollY < hero.offsetHeight * 0.8;
    canvas.style.opacity = show ? '1' : '0';
    canvas.style.pointerEvents = show ? 'auto' : 'none';
  }
  updateCanvasVisibility();
  window.addEventListener('scroll', updateCanvasVisibility, { passive: true });

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';

    segLen = (H * 0.62) / SEGS;
    const base = W * 0.73, gap = W * 0.09;
    anchors = [base, base + gap, base + gap * 2];

    ropes.forEach((pts, ri) => {
      pts.length = 0;
      const ax = anchors[ri];
      for (let i = 0; i <= SEGS; i++)
        pts.push({ x: ax, y: i * segLen, ox: ax, oy: i * segLen, pinned: i === 0 });
    });
  }

  function constrain(pts, ax) {
    for (let it = 0; it < ITERS; it++) {
      pts[0].x = ax; pts[0].y = 0;
      for (let i = 0; i < SEGS; i++) {
        const a = pts[i], b = pts[i+1];
        const dx = b.x-a.x, dy = b.y-a.y;
        const d  = Math.sqrt(dx*dx+dy*dy) || 0.001;
        const f  = (d - segLen) / d * 0.5;
        if (!a.pinned) { a.x += dx*f; a.y += dy*f; }
        if (!b.pinned) { b.x -= dx*f; b.y -= dy*f; }
      }
      pts[0].x = ax; pts[0].y = 0;
    }
  }

  function collide() {
    for (let ri = 0; ri < ropes.length; ri++)
      for (let rj = ri+1; rj < ropes.length; rj++)
        for (let pi = 1; pi <= SEGS; pi++)
          for (let pj = 1; pj <= SEGS; pj++) {
            const a = ropes[ri][pi], b = ropes[rj][pj];
            const dx = b.x-a.x, dy = b.y-a.y;
            const d  = Math.sqrt(dx*dx+dy*dy) || 0.001;
            if (d < COLL_DIST) {
              const push = (COLL_DIST - d) / 2 / d;
              a.x -= dx*push; a.y -= dy*push;
              b.x += dx*push; b.y += dy*push;
            }
          }
  }

  function energy() {
    let e = 0;
    ropes.forEach(pts => pts.forEach(p => { if (!p.pinned) e += Math.abs(p.x-p.ox)+Math.abs(p.y-p.oy); }));
    return e;
  }

  function monkeyPos(ri) {
    const m  = monkeys[ri];
    const si = Math.min(Math.floor(m.seg), SEGS-1);
    const t  = m.seg - si;
    const pa = ropes[ri][si], pb = ropes[ri][Math.min(si+1, SEGS)];
    return { x: pa.x + (pb.x-pa.x)*t, y: pa.y + (pb.y-pa.y)*t };
  }

  function tick() {
    ropes.forEach(pts => pts.forEach(p => {
      if (p.pinned) return;
      const vx = (p.x-p.ox)*DAMP, vy = (p.y-p.oy)*DAMP;
      p.ox=p.x; p.oy=p.y; p.x+=vx; p.y+=vy+GRAV;
    }));
    ropes.forEach((pts,ri) => constrain(pts, anchors[ri]));
    collide();

    // monkey slides back to bottom when released
    monkeys.forEach((m, ri) => {
      if (ri === monkeyDrag || m.dir === 0) return;
      const spd = CLIMB_SPD * 0.7;
      m.seg += m.dir * spd;
      if (m.seg >= m.target) { m.seg = m.target; m.dir = 0; }
    });
  }

  function drawMonkey(mx, my, col) {
    const c1 = rgba(col, 0.88), c2 = rgba(col, 0.32), c3 = rgba(col, 0.55);
    // arms gripping rope
    ctx.strokeStyle = c1; ctx.lineWidth = 2; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(mx-6, my-6); ctx.lineTo(mx, my-13); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(mx+6, my-6); ctx.lineTo(mx, my-13); ctx.stroke();
    // body
    ctx.beginPath(); ctx.ellipse(mx, my+10, 9, 11, 0, 0, Math.PI*2);
    ctx.fillStyle = c1; ctx.fill();
    // belly
    ctx.beginPath(); ctx.ellipse(mx, my+12, 5, 7, 0, 0, Math.PI*2);
    ctx.fillStyle = c2; ctx.fill();
    // legs
    ctx.strokeStyle = c1; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(mx-5, my+20); ctx.lineTo(mx-8, my+28); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(mx+5, my+20); ctx.lineTo(mx+8, my+28); ctx.stroke();
    // feet
    [-8,8].forEach(fx => {
      ctx.beginPath(); ctx.ellipse(mx+fx, my+29, 4, 2.5, fx<0?-0.3:0.3, 0, Math.PI*2);
      ctx.fillStyle = c1; ctx.fill();
    });
    // head
    ctx.beginPath(); ctx.arc(mx, my-4, 13, 0, Math.PI*2);
    ctx.fillStyle = c1; ctx.fill();
    // ears
    [-13,13].forEach(ex => {
      ctx.beginPath(); ctx.arc(mx+ex, my-8, 5, 0, Math.PI*2); ctx.fillStyle = c1; ctx.fill();
      ctx.beginPath(); ctx.arc(mx+ex, my-8, 2.5, 0, Math.PI*2); ctx.fillStyle = c3; ctx.fill();
    });
    // muzzle
    ctx.beginPath(); ctx.ellipse(mx, my+2, 7.5, 6, 0, 0, Math.PI*2);
    ctx.fillStyle = c2; ctx.fill();
    // eyes
    [-4.5,4.5].forEach(ex => {
      ctx.beginPath(); ctx.arc(mx+ex, my-7, 3, 0, Math.PI*2); ctx.fillStyle='#fff'; ctx.fill();
      ctx.beginPath(); ctx.arc(mx+ex+0.5, my-6.5, 1.5, 0, Math.PI*2); ctx.fillStyle='#111'; ctx.fill();
    });
    // nostrils
    [-2,2].forEach(nx => { ctx.beginPath(); ctx.arc(mx+nx, my+1, 1, 0, Math.PI*2); ctx.fillStyle=rgba(col,0.6); ctx.fill(); });
    // smile
    ctx.beginPath(); ctx.arc(mx, my+3, 4, 0.15, Math.PI-0.15);
    ctx.strokeStyle = rgba(col,0.8); ctx.lineWidth=1.5; ctx.stroke();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ropes.forEach((pts, ri) => {
      const col  = COLORS[ri];
      const hovd = hovRope === ri;
      // rope
      ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 0; i < SEGS-1; i++) {
        const mx=(pts[i].x+pts[i+1].x)/2, my=(pts[i].y+pts[i+1].y)/2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
      }
      ctx.lineTo(pts[SEGS].x, pts[SEGS].y);
      ctx.strokeStyle = rgba(col, hovd ? 0.95 : 0.7);
      ctx.lineWidth = hovd ? 2.5 : 1.5; ctx.lineCap='round'; ctx.stroke();
      // pin dot
      ctx.beginPath(); ctx.arc(pts[0].x, 3, 3.5, 0, Math.PI*2);
      ctx.fillStyle = col; ctx.fill();
      // monkey
      const { x:mx, y:my } = monkeyPos(ri);
      drawMonkey(mx, my, col);
    });
  }

  function isActive() {
    if (energy() >= SLEEP) return true;
    return monkeys.some(m => m.dir !== 0); // sliding back to bottom
  }

  function loop() {
    tick(); draw();
    if (!dragging && monkeyDrag < 0 && !isActive()) {
      sleeping = true; rafId = null; return;
    }
    rafId = requestAnimationFrame(loop);
  }

  function wake() {
    if (sleeping) { sleeping=false; rafId=requestAnimationFrame(loop); }
    else if (!rafId) { rafId=requestAnimationFrame(loop); }
  }

  function clientPos(e) {
    const r = canvas.getBoundingClientRect();
    return { cx:(e.touches?e.touches[0].clientX:e.clientX)-r.left,
             cy:(e.touches?e.touches[0].clientY:e.clientY)-r.top };
  }

  function nearestSeg(ri, cx, cy) {
    let best = Infinity, bestPi = SEGS;
    ropes[ri].forEach((p, pi) => {
      if (pi === 0) return;
      const d = Math.hypot(p.x - cx, p.y - cy);
      if (d < best) { best = d; bestPi = pi; }
    });
    return bestPi;
  }

  function tryGrabMonkey(cx, cy) {
    for (let ri = 0; ri < ropes.length; ri++) {
      const { x, y } = monkeyPos(ri);
      if (Math.hypot(cx - x, cy - y) < 32) {
        monkeyDrag = ri;
        monkeys[ri].dir = 0;
        wake(); return true;
      }
    }
    return false;
  }

  canvas.addEventListener('mousedown', e => {
    const { cx, cy } = clientPos(e);
    if (tryGrabMonkey(cx, cy)) { e.preventDefault(); return; }
    let best=50, found=null;
    ropes.forEach((pts,ri) => pts.forEach((p,pi) => {
      if (pi===0) return;
      const d=Math.hypot(p.x-cx, p.y-cy);
      if (d<best) { best=d; found={ri,pi}; }
    }));
    if (found) { dragging=found; wake(); e.preventDefault(); }
  }, { passive:false });

  canvas.addEventListener('touchstart', e => {
    const { cx, cy } = clientPos(e);
    if (tryGrabMonkey(cx, cy)) { e.preventDefault(); return; }
    let best=60, found=null;
    ropes.forEach((pts,ri) => pts.forEach((p,pi) => {
      if (pi===0) return;
      const d=Math.hypot(p.x-cx, p.y-cy);
      if (d<best) { best=d; found={ri,pi}; }
    }));
    if (found) { dragging=found; wake(); e.preventDefault(); }
  }, { passive:false });

  canvas.addEventListener('mousemove', e => {
    const { cx, cy } = clientPos(e);
    if (monkeyDrag >= 0) {
      monkeys[monkeyDrag].seg = nearestSeg(monkeyDrag, cx, cy);
      wake(); return;
    }
    if (dragging) {
      const p=ropes[dragging.ri][dragging.pi];
      p.ox=p.x; p.oy=p.y; p.x=cx; p.y=cy;
      return;
    }
    let h=-1, onMonkey=false;
    ropes.forEach((pts,ri) => {
      const { x, y } = monkeyPos(ri);
      if (Math.hypot(cx-x, cy-y) < 32) { h=ri; onMonkey=true; return; }
      for (let pi=1; pi<=SEGS; pi++)
        if (Math.hypot(pts[pi].x-cx, pts[pi].y-cy)<18) { h=ri; break; }
    });
    if (h!==hovRope) {
      hovRope=h;
      canvas.style.cursor = onMonkey ? 'grab' : h>=0 ? 'crosshair' : 'default';
      wake();
    }
  });

  window.addEventListener('mousemove', e => {
    const { cx, cy } = clientPos(e);
    if (monkeyDrag >= 0) { monkeys[monkeyDrag].seg = nearestSeg(monkeyDrag, cx, cy); wake(); return; }
    if (!dragging) return;
    const p=ropes[dragging.ri][dragging.pi];
    p.ox=p.x; p.oy=p.y; p.x=cx; p.y=cy;
  });

  window.addEventListener('touchmove', e => {
    const { cx, cy } = clientPos(e);
    if (monkeyDrag >= 0) { monkeys[monkeyDrag].seg = nearestSeg(monkeyDrag, cx, cy); wake(); e.preventDefault(); return; }
    if (!dragging) return;
    const p=ropes[dragging.ri][dragging.pi];
    p.ox=p.x; p.oy=p.y; p.x=cx; p.y=cy;
    e.preventDefault();
  }, { passive:false });

  function onRelease() {
    dragging = null;
    if (monkeyDrag >= 0) {
      // slide back to bottom
      monkeys[monkeyDrag].target = SEGS;
      monkeys[monkeyDrag].dir = 1;
      monkeyDrag = -1;
      wake();
    }
  }
  window.addEventListener('mouseup',  onRelease);
  window.addEventListener('touchend', onRelease);

  resize();
  window.addEventListener('resize', () => { resize(); wake(); });
  draw();
});
