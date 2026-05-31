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

  const ctx    = canvas.getContext('2d');
  const DPR    = window.devicePixelRatio || 1;
  const LABELS = ['Nature lover', 'AI engineer', 'Sidequesting'];
  const COLORS = ['#00d4ff', '#ff6b35', '#8b5cf6'];
  const MONKEY_R  = 22;  // hitbox radius for monkey click
  const COLL_DIST = 20;  // rope-rope collision distance (px)
  const SEGS   = 14;
  const GRAV   = 0.55;
  const DAMP   = 0.96;   // higher = settles faster
  const ITERS  = 30;
  const SLEEP  = 0.08;   // velocity threshold to stop loop

  let W, H, segLen, anchors;
  let dragging  = null;
  let rafId     = null;
  let sleeping  = false;
  let idleTimer = null;

  const ropes = LABELS.map(() => []);

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    // set canvas buffer in physical pixels, scale ctx so coords are CSS px
    canvas.width  = W * DPR;
    canvas.height = H * DPR;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    segLen = (H * 0.62) / SEGS;

    // three anchors evenly spaced across the right 28% of the page
    const base = W * 0.73;
    const gap  = W * 0.09;
    anchors = [base, base + gap, base + gap * 2];

    ropes.forEach((pts, ri) => {
      pts.length = 0;
      const ax = anchors[ri];
      for (let i = 0; i <= SEGS; i++) {
        pts.push({ x: ax, y: i * segLen, ox: ax, oy: i * segLen, pinned: i === 0 });
      }
    });
  }

  function constrain(pts, ax) {
    for (let it = 0; it < ITERS; it++) {
      pts[0].x = ax; pts[0].y = 0;
      for (let i = 0; i < SEGS; i++) {
        const a = pts[i], b = pts[i + 1];
        const dx = b.x - a.x, dy = b.y - a.y;
        const d  = Math.sqrt(dx*dx + dy*dy) || 0.001;
        const f  = (d - segLen) / d * 0.5;
        if (!a.pinned) { a.x += dx*f; a.y += dy*f; }
        if (!b.pinned) { b.x -= dx*f; b.y -= dy*f; }
      }
      pts[0].x = ax; pts[0].y = 0;
    }
  }

  function ropeCollisions() {
    for (let ri = 0; ri < ropes.length; ri++) {
      for (let rj = ri + 1; rj < ropes.length; rj++) {
        for (let pi = 1; pi <= SEGS; pi++) {
          for (let pj = 1; pj <= SEGS; pj++) {
            const a = ropes[ri][pi], b = ropes[rj][pj];
            const dx = b.x - a.x, dy = b.y - a.y;
            const d  = Math.sqrt(dx*dx + dy*dy) || 0.001;
            if (d < COLL_DIST) {
              const push = (COLL_DIST - d) / 2;
              const nx = dx / d, ny = dy / d;
              a.x -= nx * push; a.y -= ny * push;
              b.x += nx * push; b.y += ny * push;
            }
          }
        }
      }
    }
  }

  function totalEnergy() {
    let e = 0;
    ropes.forEach(pts => pts.forEach(p => {
      if (p.pinned) return;
      e += Math.abs(p.x - p.ox) + Math.abs(p.y - p.oy);
    }));
    return e;
  }

  function tick() {
    ropes.forEach(pts => {
      pts.forEach(p => {
        if (p.pinned) return;
        const vx = (p.x - p.ox) * DAMP;
        const vy = (p.y - p.oy) * DAMP;
        p.ox = p.x; p.oy = p.y;
        p.x += vx;
        p.y += vy + GRAV;
      });
    });
    ropes.forEach((pts, ri) => constrain(pts, anchors[ri]));
    ropeCollisions();
  }

  function rgba(hex, a) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${a})`;
  }

  function drawRoundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y); ctx.arcTo(x+w,y, x+w,y+r, r);
    ctx.lineTo(x+w, y+h-r); ctx.arcTo(x+w,y+h, x+w-r,y+h, r);
    ctx.lineTo(x+r, y+h); ctx.arcTo(x,y+h, x,y+h-r, r);
    ctx.lineTo(x, y+r); ctx.arcTo(x,y, x+r,y, r);
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const tagBg  = isDark ? '#0a0a0a' : '#ffffff';

    ropes.forEach((pts, ri) => {
      const col = COLORS[ri];

      // glow pass
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 0; i < SEGS - 1; i++) {
        const mx = (pts[i].x + pts[i+1].x) / 2;
        const my = (pts[i].y + pts[i+1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
      }
      ctx.lineTo(pts[SEGS].x, pts[SEGS].y);
      ctx.strokeStyle = rgba(col, 0.13);
      ctx.lineWidth = 10; ctx.lineCap = 'round';
      ctx.stroke();

      // core pass
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 0; i < SEGS - 1; i++) {
        const mx = (pts[i].x + pts[i+1].x) / 2;
        const my = (pts[i].y + pts[i+1].y) / 2;
        ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
      }
      ctx.lineTo(pts[SEGS].x, pts[SEGS].y);
      ctx.strokeStyle = rgba(col, 0.75);
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // pin
      ctx.beginPath();
      ctx.arc(pts[0].x, 3, 3.5, 0, Math.PI*2);
      ctx.fillStyle = col; ctx.fill();

      // monkey body
      const tip = pts[SEGS];
      const mx = tip.x, my = tip.y + 10;

      // body
      ctx.beginPath();
      ctx.ellipse(mx, my + 14, 10, 12, 0, 0, Math.PI*2);
      ctx.fillStyle = rgba(col, 0.18); ctx.fill();
      ctx.strokeStyle = rgba(col, 0.5); ctx.lineWidth = 1; ctx.stroke();

      // head
      ctx.beginPath();
      ctx.arc(mx, my, 13, 0, Math.PI*2);
      ctx.fillStyle = rgba(col, 0.18); ctx.fill();
      ctx.strokeStyle = rgba(col, 0.5); ctx.lineWidth = 1; ctx.stroke();

      // ears
      [-14, 14].forEach(ex => {
        ctx.beginPath();
        ctx.arc(mx + ex, my - 2, 5, 0, Math.PI*2);
        ctx.fillStyle = rgba(col, 0.25); ctx.fill();
        ctx.strokeStyle = rgba(col, 0.5); ctx.lineWidth = 1; ctx.stroke();
      });

      // face plate
      ctx.beginPath();
      ctx.ellipse(mx, my + 4, 8, 7, 0, 0, Math.PI*2);
      ctx.fillStyle = rgba(col, 0.28); ctx.fill();

      // eyes
      [-4, 4].forEach(ex => {
        ctx.beginPath();
        ctx.arc(mx + ex, my - 3, 2, 0, Math.PI*2);
        ctx.fillStyle = col; ctx.fill();
      });

      // smile
      ctx.beginPath();
      ctx.arc(mx, my + 5, 4, 0.2, Math.PI - 0.2);
      ctx.strokeStyle = col; ctx.lineWidth = 1.5; ctx.stroke();

      // label below monkey
      ctx.font = '500 8px "JetBrains Mono",monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = rgba(col, 0.6);
      ctx.fillText(LABELS[ri].toUpperCase(), mx, my + 36);
    });
  }

  function scheduleIdleNudge() {
    if (idleTimer) return;
    const delay = 10000 + Math.random() * 5000; // 10–15 s
    idleTimer = setTimeout(() => {
      idleTimer = null;
      ropes.forEach((pts, ri) => {
        const dir = (ri % 2 === 0) ? 1 : -1;
        for (let pi = Math.floor(SEGS * 0.6); pi <= SEGS; pi++) {
          pts[pi].ox += dir * 4 * (pi / SEGS); // small nudge, weighted to tip
        }
      });
      wake();
    }, delay);
  }

  function loop() {
    tick();
    draw();
    if (!dragging && totalEnergy() < SLEEP) {
      sleeping = true;
      rafId = null;
      scheduleIdleNudge();
      return;
    }
    rafId = requestAnimationFrame(loop);
  }

  function wake() {
    if (sleeping) { sleeping = false; rafId = requestAnimationFrame(loop); }
    else if (!rafId) { rafId = requestAnimationFrame(loop); }
  }

  // mouse / touch drag via window
  function clientPos(e) {
    return { cx: e.touches ? e.touches[0].clientX : e.clientX,
             cy: e.touches ? e.touches[0].clientY : e.clientY };
  }

  function cancelIdleTimer() {
    if (idleTimer) { clearTimeout(idleTimer); idleTimer = null; }
  }

  function tryRepelMonkey(cx, cy) {
    for (let ri = 0; ri < ropes.length; ri++) {
      const tip = ropes[ri][SEGS];
      const mx = tip.x, my = tip.y + 10;
      if (Math.hypot(cx - mx, cy - my) < MONKEY_R + 10) {
        // direction away from cursor
        const dx = mx - cx, dy = my - cy;
        const d  = Math.sqrt(dx*dx + dy*dy) || 1;
        const fx = (dx/d) * 60, fy = (dy/d) * 60;
        // apply impulse to bottom half of rope
        for (let pi = Math.floor(SEGS/2); pi <= SEGS; pi++) {
          ropes[ri][pi].ox += -fx * (pi/SEGS);
          ropes[ri][pi].oy += -fy * (pi/SEGS);
        }
        wake();
        return true; // consumed
      }
    }
    return false;
  }

  window.addEventListener('mousedown', e => {
    const { cx, cy } = clientPos(e);
    cancelIdleTimer();
    if (tryRepelMonkey(cx, cy)) { e.preventDefault(); return; }
    let best = 40, found = null;
    ropes.forEach((pts, ri) => pts.forEach((p, pi) => {
      if (pi === 0) return;
      const d = Math.hypot(p.x-cx, p.y-cy);
      if (d < best) { best=d; found={ri,pi}; }
    }));
    if (found) { dragging=found; wake(); e.preventDefault(); }
  }, { passive: false });

  window.addEventListener('touchstart', e => {
    const { cx, cy } = clientPos(e);
    cancelIdleTimer();
    if (tryRepelMonkey(cx, cy)) { e.preventDefault(); return; }
    let best = 50, found = null;
    ropes.forEach((pts, ri) => pts.forEach((p, pi) => {
      if (pi === 0) return;
      const d = Math.hypot(p.x-cx, p.y-cy);
      if (d < best) { best=d; found={ri,pi}; }
    }));
    if (found) { dragging=found; wake(); e.preventDefault(); }
  }, { passive: false });

  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    const { cx, cy } = clientPos(e);
    const p = ropes[dragging.ri][dragging.pi];
    p.ox=p.x; p.oy=p.y; p.x=cx; p.y=cy;
  });

  window.addEventListener('touchmove', e => {
    if (!dragging) return;
    const { cx, cy } = clientPos(e);
    const p = ropes[dragging.ri][dragging.pi];
    p.ox=p.x; p.oy=p.y; p.x=cx; p.y=cy;
    e.preventDefault();
  }, { passive: false });

  window.addEventListener('mouseup',  () => { dragging=null; });
  window.addEventListener('touchend', () => { dragging=null; });

  resize();
  window.addEventListener('resize', () => { resize(); wake(); });

  // draw initial static frame (no animation until dragged)
  draw();
});
