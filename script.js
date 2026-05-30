/* ========================================
   Portfolio Script
   ======================================== */

// ── Featured Projects (top 6 only) ──
const ALL_PROJECTS = [
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
  'LLM':            '#00d4ff',
  'Computer Vision':'#8b5cf6',
  'Deep Learning':  '#f59e0b',
  'Research':       '#ec4899',
};

// ────────────────────────────────────────
// Init
// ────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
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
});

// ────────────────────────────────────────
// Theme Toggle
// ────────────────────────────────────────
function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const stored = localStorage.getItem('vb-theme');
  if (stored === 'light') document.documentElement.setAttribute('data-theme', 'light');

  btn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    document.documentElement.setAttribute('data-theme', isLight ? 'dark' : 'light');
    localStorage.setItem('vb-theme', isLight ? 'dark' : 'light');
  });
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

  const ctx = canvas.getContext('2d');
  const LABELS  = ['Nature lover', 'AI engineer', 'Lifemaxxing'];
  const COLORS  = ['#00d4ff', '#ff6b35', '#8b5cf6']; // cyan, orange, purple
  const SEGS    = 16;
  const GRAVITY = 0.5;
  const DAMPING = 0.982;
  const ITERS   = 40;
  let W, H, segLen, anchors;
  let dragging = null;

  // Each rope: array of {x,y,ox,oy}
  const ropes = LABELS.map(() => []);

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;
    segLen = (H * 0.65) / SEGS;
    // anchor ropes in the right 40% of the full canvas
    const rx = W * 0.60;
    anchors = [rx + W*0.08, rx + W*0.18, rx + W*0.28];
    // init / reset rope points
    ropes.forEach((pts, ri) => {
      pts.length = 0;
      const ax = anchors[ri];
      for (let i = 0; i <= SEGS; i++) {
        pts.push({ x: ax, y: i * segLen, ox: ax, oy: i * segLen, pinned: i === 0 });
      }
    });
  }

  function constrain(pts, ax) {
    for (let iter = 0; iter < ITERS; iter++) {
      // lock anchor
      pts[0].x = ax; pts[0].y = 0;
      for (let i = 0; i < SEGS; i++) {
        const a = pts[i], b = pts[i + 1];
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.sqrt(dx*dx + dy*dy) || 0.001;
        const diff = (dist - segLen) / dist * 0.5;
        if (!a.pinned) { a.x += dx * diff; a.y += dy * diff; }
        if (!b.pinned) { b.x -= dx * diff; b.y -= dy * diff; }
      }
      pts[0].x = ax; pts[0].y = 0;
    }
  }

  function tick() {
    ropes.forEach(pts => {
      pts.forEach(p => {
        if (p.pinned) return;
        const vx = (p.x - p.ox) * DAMPING;
        const vy = (p.y - p.oy) * DAMPING;
        p.ox = p.x; p.oy = p.y;
        p.x += vx;
        p.y += vy + GRAVITY;
      });
    });
    ropes.forEach((pts, ri) => constrain(pts, anchors[ri]));
  }

  function hexToRgba(hex, a) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${a})`;
  }

  function draw() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const tagBg  = isDark ? '#0e0e0e' : '#ffffff';

    ctx.clearRect(0, 0, W, H);

    ropes.forEach((pts, ri) => {
      const col = COLORS[ri];

      // rope glow (thick, faint)
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 0; i < SEGS - 1; i++) {
        const mx = (pts[i].x + pts[i+1].x) / 2;
        const my = (pts[i].y + pts[i+1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
      }
      ctx.lineTo(pts[SEGS].x, pts[SEGS].y);
      ctx.strokeStyle = hexToRgba(col, 0.12);
      ctx.lineWidth   = 8;
      ctx.lineCap     = 'round';
      ctx.stroke();

      // rope core (sharp)
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 0; i < SEGS - 1; i++) {
        const mx = (pts[i].x + pts[i+1].x) / 2;
        const my = (pts[i].y + pts[i+1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
      }
      ctx.lineTo(pts[SEGS].x, pts[SEGS].y);
      ctx.strokeStyle = hexToRgba(col, 0.7);
      ctx.lineWidth   = 1.5;
      ctx.stroke();

      // pin dot at top
      ctx.beginPath();
      ctx.arc(pts[0].x, 2, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();

      // label tag
      const tip = pts[SEGS];
      const label = LABELS[ri];
      ctx.font = '600 9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      const tw = ctx.measureText(label).width;
      const pw = tw + 18, ph = 20, pr = 3;
      const tx = tip.x, ty = tip.y + 4;
      const x0 = tx - pw/2, y0 = ty;

      // tag bg
      ctx.beginPath();
      ctx.moveTo(x0 + pr, y0);
      ctx.lineTo(x0 + pw - pr, y0);
      ctx.arcTo(x0 + pw, y0, x0 + pw, y0 + pr, pr);
      ctx.lineTo(x0 + pw, y0 + ph - pr);
      ctx.arcTo(x0 + pw, y0 + ph, x0 + pw - pr, y0 + ph, pr);
      ctx.lineTo(x0 + pr, y0 + ph);
      ctx.arcTo(x0, y0 + ph, x0, y0 + ph - pr, pr);
      ctx.lineTo(x0, y0 + pr);
      ctx.arcTo(x0, y0, x0 + pr, y0, pr);
      ctx.closePath();
      ctx.fillStyle = tagBg;
      ctx.fill();
      ctx.strokeStyle = hexToRgba(col, 0.5);
      ctx.lineWidth = 1;
      ctx.stroke();

      // tag text
      ctx.fillStyle = col;
      ctx.fillText(label.toUpperCase(), tx, ty + 13.5);
    });
  }

  function loop() {
    tick();
    draw();
    requestAnimationFrame(loop);
  }

  // nudge ropes on load for natural sway
  function nudge() {
    ropes.forEach((pts, ri) => {
      const dir = ri === 1 ? -1 : 1;
      for (let i = 3; i <= SEGS; i++) {
        pts[i].x += dir * (i / SEGS) * 12;
      }
    });
  }

  // drag interaction
  function getCanvasPos(e) {
    const r = canvas.getBoundingClientRect();
    return {
      cx: (e.touches ? e.touches[0].clientX : e.clientX) - r.left,
      cy: (e.touches ? e.touches[0].clientY : e.clientY) - r.top
    };
  }

  // drag via window (canvas is pointer-events:none so hero links still work)
  window.addEventListener('mousedown', e => {
    const { cx, cy } = getCanvasPos(e);
    let best = 36, found = null;
    ropes.forEach((pts, ri) => {
      pts.forEach((p, pi) => {
        if (pi === 0) return;
        const d = Math.hypot(p.x - cx, p.y - cy);
        if (d < best) { best = d; found = { ri, pi }; }
      });
    });
    if (found) { dragging = found; e.preventDefault(); }
  }, { passive: false });

  window.addEventListener('touchstart', e => {
    const { cx, cy } = getCanvasPos(e);
    let best = 44, found = null;
    ropes.forEach((pts, ri) => {
      pts.forEach((p, pi) => {
        if (pi === 0) return;
        const d = Math.hypot(p.x - cx, p.y - cy);
        if (d < best) { best = d; found = { ri, pi }; }
      });
    });
    if (found) { dragging = found; e.preventDefault(); }
  }, { passive: false });

  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    const { cx, cy } = getCanvasPos(e);
    const p = ropes[dragging.ri][dragging.pi];
    p.ox = p.x; p.oy = p.y; p.x = cx; p.y = cy;
    e.preventDefault();
  }, { passive: false });

  window.addEventListener('touchmove', e => {
    if (!dragging) return;
    const { cx, cy } = getCanvasPos(e);
    const p = ropes[dragging.ri][dragging.pi];
    p.ox = p.x; p.oy = p.y; p.x = cx; p.y = cy;
    e.preventDefault();
  }, { passive: false });

  window.addEventListener('mouseup',  () => { dragging = null; });
  window.addEventListener('touchend', () => { dragging = null; });

  resize();
  window.addEventListener('resize', resize);
  setTimeout(nudge, 300);
  loop();
});
