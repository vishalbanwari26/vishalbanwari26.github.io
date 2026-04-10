/* ========================================
   Portfolio — CRAZY 3D Neural Space Edition
   script.js
   ======================================== */

// ────────────────────────────────────────
// Data: Projects, Skills, Domains
// ────────────────────────────────────────
const PROJECTS = [
  {
    id: 'hill',
    label: 'HILL Framework',
    type: 'project',
    description: 'Human in the Latent Loop — An interactive framework allowing users to incorporate human intuition into the model training loop by reshaping latent space representations.',
    url: 'https://www.arxiv.org/pdf/2505.06325',
    techs: ['Python', 'PyTorch', 'Visualization', 'Human-AI'],
    language: 'Python',
    stars: 0,
    domain: 'Research'
  },
  {
    id: 'stylized-rag',
    label: 'STYLIZED RAG',
    type: 'project',
    description: 'A RAG pipeline designed for text style transfer, with a strong emphasis on modularity, stylistic control, and enhanced retrieval using an ensemble approach.',
    url: 'https://github.com/vishalbanwari26/STYLIZED_RAG',
    techs: ['Python', 'NLP', 'RAG', 'LangChain'],
    language: 'Jupyter Notebook',
    stars: 1,
    domain: 'NLP'
  },
  {
    id: 'clad',
    label: 'CLAD',
    type: 'project',
    description: 'Continual Learning Video Anomaly Detection on RGB Video Frames of ATARI Games. Implements incremental model updates to detect anomalous gameplay behavior.',
    url: 'https://github.com/vishalbanwari26/CLAD',
    techs: ['Python', 'PyTorch', 'Computer Vision', 'Deep Learning'],
    language: 'Python',
    stars: 0,
    domain: 'Computer Vision'
  },
  {
    id: 'finetune-llm',
    label: 'LLM Translation',
    type: 'project',
    description: 'Fine-tuned a multilingual LLM (bloomz-3b) for German-French translation using real and synthetic data with PEFT (LoRA), evaluated using BLEU & BERTScore, and deployed via Gradio.',
    url: 'https://github.com/vishalbanwari26/FineTuningLLMforLanguageTranslation',
    techs: ['Python', 'Hugging Face', 'LoRA', 'NLP'],
    language: 'Jupyter Notebook',
    stars: 0,
    domain: 'NLP'
  },
  {
    id: 'meal-planner',
    label: 'Meal Planner',
    type: 'project',
    description: 'A multi-agent system designed to assist users in planning daily meals while considering dietary preferences, nutritional goals, and financial constraints using intelligent agents.',
    url: 'https://github.com/vishalbanwari26/MULTI-AGENT-MEAL-PLANNER',
    techs: ['Python', 'LangChain', 'Multi-Agent', 'NLP'],
    language: 'Jupyter Notebook',
    stars: 0,
    domain: 'NLP'
  },
  {
    id: 'drive-act',
    label: 'Drive-Act',
    type: 'project',
    description: 'Activity recognition from videos collected in the Drive&Act Dataset, using PyTorch and OpenCV for deep learning-based video classification.',
    url: 'https://github.com/vishalbanwari26/Drive-Act-Activity-Recognition',
    techs: ['Python', 'PyTorch', 'OpenCV', 'Computer Vision'],
    language: 'Jupyter Notebook',
    stars: 0,
    domain: 'Computer Vision'
  },
  {
    id: 'rag-bot',
    label: 'RAG Bot Study',
    type: 'project',
    description: 'An interactive Streamlit app that performs RAG over academic PDFs. Upload research papers, ask questions, and generate MCQs — powered by local embeddings and Groq LLMs.',
    url: 'https://github.com/vishalbanwari26/RAG-BOT-STUDY',
    techs: ['Python', 'RAG', 'Streamlit', 'Embeddings'],
    language: 'Python',
    stars: 1,
    domain: 'NLP'
  },
  {
    id: 'resume-matcher',
    label: 'Resume Matcher',
    type: 'project',
    description: 'A Streamlit web app that matches a candidate\'s resume with job descriptions using semantic similarity powered by sentence-transformers.',
    url: 'https://github.com/vishalbanwari26/RESUME-MATCHER-EMBEDDINGS',
    techs: ['Python', 'Embeddings', 'Streamlit', 'NLP'],
    language: 'Python',
    stars: 0,
    domain: 'NLP'
  },
  {
    id: 'statefarm',
    label: 'Driver Distraction',
    type: 'project',
    description: 'Uses the StateFarm Driver Distraction dataset to classify driver behaviors like texting, talking on the phone, adjusting the radio using image-based CNNs.',
    url: 'https://github.com/vishalbanwari26/StateFarm-Driver-Distraction-Detection',
    techs: ['Python', 'Deep Learning', 'Computer Vision', 'PyTorch'],
    language: 'Jupyter Notebook',
    stars: 0,
    domain: 'Computer Vision'
  },
  {
    id: 'crypto',
    label: 'Crypto Forecast',
    type: 'project',
    description: 'Short-term return forecasting for cryptocurrency assets using time series analysis and machine learning models.',
    url: 'https://github.com/vishalbanwari26/CryptoCurrency-Forecasting',
    techs: ['Python', 'scikit-learn', 'Deep Learning'],
    language: 'Python',
    stars: 1,
    domain: 'Deep Learning'
  },
  {
    id: 'toxic-comment',
    label: 'Toxic Comments',
    type: 'project',
    description: 'Toxic Comment Classification from the Kaggle Competition. Multi-label text classification using NLP techniques and deep learning.',
    url: 'https://github.com/vishalbanwari26/Toxic-Comment-Classification',
    techs: ['Python', 'NLP', 'Deep Learning', 'Hugging Face'],
    language: 'Jupyter Notebook',
    stars: 0,
    domain: 'NLP'
  },
  {
    id: 'job-assistant',
    label: 'Job Application AI',
    type: 'project',
    description: 'AI-powered tool to generate tailored resumes and cover letters for any job posting. Uses LLMs for personalized document generation.',
    url: 'https://github.com/vishalbanwari26/JobApplicationAssistant',
    techs: ['Python', 'NLP', 'LangChain'],
    language: 'Python',
    stars: 0,
    domain: 'NLP'
  }
];

const SKILLS = [
  { id: 'python', label: 'Python', type: 'skill', category: 'Languages' },
  { id: 'pytorch', label: 'PyTorch', type: 'skill', category: 'ML/AI' },
  { id: 'huggingface', label: 'Hugging Face', type: 'skill', category: 'ML/AI' },
  { id: 'langchain', label: 'LangChain', type: 'skill', category: 'ML/AI' },
  { id: 'opencv', label: 'OpenCV', type: 'skill', category: 'ML/AI' },
  { id: 'sklearn', label: 'scikit-learn', type: 'skill', category: 'ML/AI' },
  { id: 'nlp', label: 'NLP', type: 'skill', category: 'Focus' },
  { id: 'cv', label: 'Computer Vision', type: 'skill', category: 'Focus' },
  { id: 'dl', label: 'Deep Learning', type: 'skill', category: 'Focus' },
  { id: 'rag', label: 'RAG', type: 'skill', category: 'Focus' },
  { id: 'lora', label: 'LoRA', type: 'skill', category: 'ML/AI' },
  { id: 'streamlit', label: 'Streamlit', type: 'skill', category: 'Tools' },
  { id: 'embeddings', label: 'Embeddings', type: 'skill', category: 'ML/AI' },
  { id: 'visualization', label: 'Visualization', type: 'skill', category: 'Focus' },
  { id: 'human-ai', label: 'Human-AI', type: 'skill', category: 'Focus' },
  { id: 'multi-agent', label: 'Multi-Agent', type: 'skill', category: 'Focus' },
];

const DOMAINS = [
  { id: 'domain-nlp', label: 'NLP', type: 'category' },
  { id: 'domain-cv', label: 'Computer Vision', type: 'category' },
  { id: 'domain-dl', label: 'Deep Learning', type: 'category' },
  { id: 'domain-research', label: 'Research', type: 'category' },
];

// ────────────────────────────────────────
// Color Maps
// ────────────────────────────────────────
const TYPE_COLORS = {
  project: '#00d4ff',
  skill: '#8b5cf6',
  category: '#f59e0b'
};

const TYPE_COLORS_THREE = {
  project: 0x00d4ff,
  skill: 0x8b5cf6,
  category: 0xf59e0b
};

// ────────────────────────────────────────
// Global State
// ────────────────────────────────────────
const state = {
  isLoaded: false,
  mouse: { x: 0, y: 0, nX: 0, nY: 0 },
  hoveredNode: null
};

function lerp(a, b, t) { return a + (b - a) * t; }

// ────────────────────────────────────────
// Init on DOM Ready
// ────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  // Set initial hidden state for hero elements before GSAP takes over
  gsap.set(['.hero-badge', '.hero-title-line', '.hero-title-accent', '.hero-tagline', '.hero-subtitle', '.hero-cta', '.hero-scroll-hint'], { opacity: 0 });

  // Start loader dismiss
  setTimeout(() => {
    state.isLoaded = true;
    const loader = document.getElementById('loader');
    gsap.to(loader, {
      opacity: 0,
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        loader.style.display = 'none';
        playHeroAnimations();
      }
    });
  }, 1800);

  initCursor();
  initThreeJS();
  initNetworkCanvas();  // NEW: Separate 2D canvas neural network
  initGSAP();
  initVanillaTilt();
  initNavBurger();
  bindCaseStudyEvents();
});

// ────────────────────────────────────────
// Hero GSAP Timeline
// ────────────────────────────────────────
function playHeroAnimations() {
  const tl = gsap.timeline();
  tl.fromTo('.hero-badge',
    { opacity: 0, y: 30, scale: 0.8 },
    { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }
  )
  .fromTo('.hero-title-line:first-child',
    { opacity: 0, y: 60, rotationX: -15 },
    { opacity: 1, y: 0, rotationX: 0, duration: 0.9, ease: 'power3.out' },
    '-=0.4'
  )
  .fromTo('.hero-title-accent',
    { opacity: 0, y: 60, rotationX: -15, scale: 0.9 },
    { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 0.9, ease: 'power3.out' },
    '-=0.6'
  )
  .fromTo('.hero-tagline',
    { opacity: 0, x: -40 },
    { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' },
    '-=0.4'
  )
  .fromTo('.hero-subtitle',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6 },
    '-=0.3'
  )
  .fromTo('.hero-cta',
    { opacity: 0, scale: 0.85 },
    { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
    '-=0.2'
  )
  .fromTo('.hero-scroll-hint',
    { opacity: 0 },
    { opacity: 1, duration: 1.2 },
    '+=0.3'
  );

  // Scramble the tagline text for extra wow
  scrambleText(document.querySelector('.hero-tagline'));
}

// ────────────────────────────────────────
// Custom Cursor & Magnetic Buttons
// ────────────────────────────────────────
function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const outline = document.getElementById('cursor-outline');
  if (!dot || !outline) return;

  let currentX = window.innerWidth / 2;
  let currentY = window.innerHeight / 2;
  let outlineX = currentX;
  let outlineY = currentY;

  window.addEventListener('mousemove', (e) => {
    currentX = e.clientX;
    currentY = e.clientY;
    state.mouse.nX = (e.clientX / window.innerWidth) * 2 - 1;
    state.mouse.nY = -(e.clientY / window.innerHeight) * 2 + 1;
    state.mouse.x = e.clientX;
    state.mouse.y = e.clientY;
    dot.style.left = currentX + 'px';
    dot.style.top = currentY + 'px';
  });

  // Smooth follower
  function followLoop() {
    outlineX += (currentX - outlineX) * 0.12;
    outlineY += (currentY - outlineY) * 0.12;
    outline.style.left = outlineX + 'px';
    outline.style.top = outlineY + 'px';
    requestAnimationFrame(followLoop);
  }
  followLoop();

  // Hover state for interactive elements
  const addHover = (el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  };
  document.querySelectorAll('a, button, .glass-card, .nav-link, .social-link, .skill-badge, .hobby-item, .cs-connection-item, .cs-tag').forEach(addHover);

  // Magnetic buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.35, y: y * 0.35, rotation: x * 0.04, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, rotation: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
    });
  });
}

// ────────────────────────────────────────
// Three.js — Background Ambient Particles
// (Spread outward, NO interactive nodes)
// ────────────────────────────────────────
let scene, camera, renderer;
let particlesMesh;

function initThreeJS() {
  const container = document.getElementById('three-container');
  if (!container) return;

  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x030308, 0.0008);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.z = 500;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // ── Background starfield only (spread outward, avoid center) ──
  createStarfield();

  window.addEventListener('resize', onThreeResize);
  animateThree();
}

function createStarfield() {
  const count = 2000;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);

  const c1 = new THREE.Color(0x00d4ff);
  const c2 = new THREE.Color(0x8b5cf6);
  const c3 = new THREE.Color(0xec4899);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // Spread particles to the EDGES — avoid center area
    // Use a ring distribution: particles spawn far from center
    let x, y, z;
    do {
      x = (Math.random() - 0.5) * 2000;
      y = (Math.random() - 0.5) * 2000;
      z = (Math.random() - 0.5) * 1500 - 300;
    } while (Math.abs(x) < 300 && Math.abs(y) < 250); // Reject center zone

    pos[i3]     = x;
    pos[i3 + 1] = y;
    pos[i3 + 2] = z;

    const pick = Math.random();
    const c = pick < 0.4 ? c1 : pick < 0.7 ? c2 : c3;
    col[i3]     = c.r;
    col[i3 + 1] = c.g;
    col[i3 + 2] = c.b;
  }

  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));

  const mat = new THREE.PointsMaterial({
    size: 1.8,
    vertexColors: true,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });

  particlesMesh = new THREE.Points(geo, mat);
  scene.add(particlesMesh);
}

function onThreeResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animateThree() {
  requestAnimationFrame(animateThree);

  // Camera follows mouse for parallax
  const targetCamX = state.mouse.nX * 60;
  const targetCamY = state.mouse.nY * 40;
  camera.position.x += (targetCamX - camera.position.x) * 0.03;
  camera.position.y += (targetCamY - camera.position.y) * 0.03;
  camera.lookAt(scene.position);

  // Slowly rotate starfield
  particlesMesh.rotation.y += 0.00025;
  particlesMesh.rotation.x += 0.0001;

  renderer.render(scene, camera);
}

// ────────────────────────────────────────
// 2D Canvas Neural Network (inside .network-container)
// Separate from the Three.js background
// ────────────────────────────────────────
let networkNodes = [];
let networkEdges = [];
let networkCanvas, networkCtx;
let networkHovered = null;
let networkAnimId = null;

function initNetworkCanvas() {
  networkCanvas = document.getElementById('networkCanvas');
  if (!networkCanvas) return;

  const container = document.getElementById('networkContainer');
  networkCanvas.width = container.clientWidth;
  networkCanvas.height = container.clientHeight;
  networkCtx = networkCanvas.getContext('2d');

  // Build nodes
  buildNetworkNodes();
  buildNetworkEdges();

  // Event listeners
  networkCanvas.addEventListener('mousemove', onNetworkMouseMove);
  networkCanvas.addEventListener('click', onNetworkClick);

  // Start animation
  animateNetwork();

  // Handle resize
  window.addEventListener('resize', () => {
    const container = document.getElementById('networkContainer');
    if (container) {
      networkCanvas.width = container.clientWidth;
      networkCanvas.height = container.clientHeight;
      layoutNetworkNodes();
    }
  });
}

function buildNetworkNodes() {
  const allData = [...DOMAINS, ...PROJECTS, ...SKILLS];
  networkNodes = allData.map((item, idx) => {
    let radius;
    if (item.type === 'category') radius = 28;
    else if (item.type === 'project') radius = 18;
    else radius = 12;

    return {
      data: item,
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      radius: radius,
      vx: 0,
      vy: 0,
      floatPhase: Math.random() * Math.PI * 2,
      floatSpeed: 0.3 + Math.random() * 0.4,
      floatAmplitude: 1.5 + Math.random() * 2
    };
  });
  layoutNetworkNodes();
}

function layoutNetworkNodes() {
  const W = networkCanvas.width;
  const H = networkCanvas.height;
  const cx = W / 2;
  const cy = H / 2;

  // Place domains at the center in a small ring
  const domains = networkNodes.filter(n => n.data.type === 'category');
  const domainRadius = Math.min(W, H) * 0.10;
  domains.forEach((d, i) => {
    const angle = (i / domains.length) * Math.PI * 2 - Math.PI / 2;
    d.targetX = cx + Math.cos(angle) * domainRadius;
    d.targetY = cy + Math.sin(angle) * domainRadius;
    d.x = d.targetX;
    d.y = d.targetY;
  });

  // Place projects in a wide outer ring, grouped by domain
  const projects = networkNodes.filter(n => n.data.type === 'project');
  const projectRadius = Math.min(W * 0.42, H * 0.38);
  const domainLabelMap = { 'NLP': 'domain-nlp', 'Computer Vision': 'domain-cv', 'Deep Learning': 'domain-dl', 'Research': 'domain-research' };

  // Group projects by domain
  const grouped = {};
  projects.forEach(p => {
    const dId = domainLabelMap[p.data.domain] || 'domain-nlp';
    if (!grouped[dId]) grouped[dId] = [];
    grouped[dId].push(p);
  });

  domains.forEach((d, dIdx) => {
    const baseAngle = (dIdx / domains.length) * Math.PI * 2 - Math.PI / 2;
    const projs = grouped[d.data.id] || [];
    const spread = Math.PI * 0.55; // Wider spread so projects don't pile up
    projs.forEach((p, pIdx) => {
      const angle = baseAngle + (pIdx - (projs.length - 1) / 2) * (spread / Math.max(projs.length - 1, 1));
      p.targetX = cx + Math.cos(angle) * projectRadius;
      p.targetY = cy + Math.sin(angle) * projectRadius;
      p.x = p.targetX;
      p.y = p.targetY;
    });
  });

  // Place skills in outermost ring — use full canvas width
  const skills = networkNodes.filter(n => n.data.type === 'skill');
  const skillRadius = Math.min(W * 0.47, H * 0.46);
  skills.forEach((s, i) => {
    const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 4;
    s.targetX = cx + Math.cos(angle) * skillRadius;
    s.targetY = cy + Math.sin(angle) * skillRadius;
    s.x = s.targetX;
    s.y = s.targetY;
  });
}

function buildNetworkEdges() {
  networkEdges = [];
  const nodeMap = {};
  networkNodes.forEach(n => nodeMap[n.data.id] = n);

  const techToSkill = {};
  SKILLS.forEach(s => techToSkill[s.label] = s.id);

  const domainLabelMap = { 'NLP': 'domain-nlp', 'Computer Vision': 'domain-cv', 'Deep Learning': 'domain-dl', 'Research': 'domain-research' };

  PROJECTS.forEach(p => {
    const pNode = nodeMap[p.id];
    if (!pNode) return;

    // Connect to skills
    p.techs.forEach(tech => {
      const skillId = techToSkill[tech];
      if (skillId && nodeMap[skillId]) {
        networkEdges.push({ from: pNode, to: nodeMap[skillId], type: 'skill' });
      }
    });

    // Connect to domain
    const dId = domainLabelMap[p.domain];
    if (dId && nodeMap[dId]) {
      networkEdges.push({ from: pNode, to: nodeMap[dId], type: 'domain' });
    }
  });
}

function animateNetwork() {
  const time = Date.now() * 0.001;
  const ctx = networkCtx;
  const W = networkCanvas.width;
  const H = networkCanvas.height;

  ctx.clearRect(0, 0, W, H);

  // Float nodes
  networkNodes.forEach(n => {
    n.x = n.targetX + Math.sin(time * n.floatSpeed + n.floatPhase) * n.floatAmplitude;
    n.y = n.targetY + Math.cos(time * n.floatSpeed * 0.7 + n.floatPhase) * n.floatAmplitude;
  });

  // Draw edges
  networkEdges.forEach(edge => {
    const isHighlighted = networkHovered &&
      (edge.from === networkHovered || edge.to === networkHovered);
    
    ctx.beginPath();
    ctx.moveTo(edge.from.x, edge.from.y);
    ctx.lineTo(edge.to.x, edge.to.y);

    if (isHighlighted) {
      ctx.strokeStyle = edge.type === 'domain' ? 'rgba(245, 158, 11, 0.5)' : 'rgba(0, 212, 255, 0.4)';
      ctx.lineWidth = 1.5;
    } else {
      ctx.strokeStyle = edge.type === 'domain' ? 'rgba(245, 158, 11, 0.08)' : 'rgba(139, 92, 246, 0.06)';
      ctx.lineWidth = 0.5;
    }
    ctx.stroke();
  });

  // Draw nodes
  networkNodes.forEach(node => {
    const isHovered = node === networkHovered;
    const color = TYPE_COLORS[node.data.type];
    const r = isHovered ? node.radius * 1.3 : node.radius;

    // Glow
    const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 2.5);
    gradient.addColorStop(0, color + (isHovered ? '40' : '15'));
    gradient.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(node.x, node.y, r * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Node body
    ctx.beginPath();
    ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
    ctx.fillStyle = color + (isHovered ? 'dd' : '30');
    ctx.fill();
    ctx.strokeStyle = color + (isHovered ? 'ff' : '80');
    ctx.lineWidth = isHovered ? 2 : 1;
    ctx.stroke();

    // Pulse ring for hovered
    if (isHovered) {
      const pulseR = r + 6 + Math.sin(time * 4) * 3;
      ctx.beginPath();
      ctx.arc(node.x, node.y, pulseR, 0, Math.PI * 2);
      ctx.strokeStyle = color + '40';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Label
    ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(255,255,255,0.75)';
    ctx.font = isHovered
      ? `bold ${node.data.type === 'category' ? '12px' : '10px'} Inter, sans-serif`
      : `${node.data.type === 'category' ? '11px' : '9px'} Inter, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const label = node.data.label;
    // Truncate long labels
    const maxLen = node.data.type === 'skill' ? 12 : 16;
    const displayLabel = label.length > maxLen ? label.slice(0, maxLen - 1) + '…' : label;
    ctx.fillText(displayLabel, node.x, node.y);

    // Type badge below for projects/domains
    if (node.data.type !== 'skill') {
      ctx.font = '7px JetBrains Mono, monospace';
      ctx.fillStyle = color + '90';
      ctx.fillText(node.data.type === 'project' ? 'PROJECT' : 'DOMAIN', node.x, node.y + r + 10);
    }
  });

  // Draw tooltip for hovered
  if (networkHovered) {
    const n = networkHovered;
    const tooltipY = n.y - n.radius - 20;
    ctx.fillStyle = 'rgba(6, 6, 15, 0.9)';
    ctx.strokeStyle = TYPE_COLORS[n.data.type] + '60';
    ctx.lineWidth = 1;

    const tooltipText = n.data.type === 'project'
      ? `${n.data.label} — ${n.data.domain}`
      : n.data.type === 'skill'
      ? `${n.data.label} (${n.data.category})`
      : `Domain: ${n.data.label}`;

    ctx.font = '11px Inter, sans-serif';
    const tw = ctx.measureText(tooltipText).width + 20;

    const rx = n.x - tw / 2;
    const ry = tooltipY - 14;
    const rw = tw;
    const rh = 24;
    const cornerR = 6;

    ctx.beginPath();
    ctx.moveTo(rx + cornerR, ry);
    ctx.lineTo(rx + rw - cornerR, ry);
    ctx.quadraticCurveTo(rx + rw, ry, rx + rw, ry + cornerR);
    ctx.lineTo(rx + rw, ry + rh - cornerR);
    ctx.quadraticCurveTo(rx + rw, ry + rh, rx + rw - cornerR, ry + rh);
    ctx.lineTo(rx + cornerR, ry + rh);
    ctx.quadraticCurveTo(rx, ry + rh, rx, ry + rh - cornerR);
    ctx.lineTo(rx, ry + cornerR);
    ctx.quadraticCurveTo(rx, ry, rx + cornerR, ry);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.fillText(tooltipText, n.x, tooltipY);
  }

  networkAnimId = requestAnimationFrame(animateNetwork);
}

function onNetworkMouseMove(e) {
  const rect = networkCanvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  let found = null;
  for (let i = networkNodes.length - 1; i >= 0; i--) {
    const n = networkNodes[i];
    const dx = mx - n.x;
    const dy = my - n.y;
    if (dx * dx + dy * dy < (n.radius + 5) * (n.radius + 5)) {
      found = n;
      break;
    }
  }

  networkHovered = found;
  networkCanvas.style.cursor = found ? 'pointer' : 'default';
}

function onNetworkClick(e) {
  if (networkHovered) {
    openCaseStudy(networkHovered.data);
  }
}

// ────────────────────────────────────────
// GSAP ScrollTrigger Animations
// ────────────────────────────────────────
function initGSAP() {
  gsap.registerPlugin(ScrollTrigger);

  // Section headers reveal
  gsap.utils.toArray('.section-header').forEach((el) => {
    const label = el.querySelector('.section-label');
    const title = el.querySelector('.section-title');
    const desc = el.querySelector('.section-desc');
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
    });
    if (label) tl.fromTo(label, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
    if (title) tl.fromTo(title, { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }, '-=0.3');
    if (desc) tl.fromTo(desc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
  });

  // Timeline items stagger
  gsap.utils.toArray('.timeline-item').forEach((el, i) => {
    const side = el.getAttribute('data-side');
    gsap.fromTo(el,
      { opacity: 0, x: side === 'left' ? -80 : 80, rotationY: side === 'left' ? 8 : -8 },
      {
        opacity: 1, x: 0, rotationY: 0,
        duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none reverse' }
      }
    );
  });

  // Skills cards cascade
  gsap.utils.toArray('.skills-category').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 60, scale: 0.9, rotationX: 10 },
      {
        opacity: 1, y: 0, scale: 1, rotationX: 0,
        duration: 0.8, delay: i * 0.1, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
      }
    );
  });

  // Publication card
  gsap.utils.toArray('.publication-card').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 80, scale: 0.92 },
      {
        opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
      }
    );
  });

  // Hobby items pop in
  gsap.utils.toArray('.hobby-item').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, scale: 0, rotation: -15 },
      {
        opacity: 1, scale: 1, rotation: 0,
        duration: 0.5, delay: i * 0.06, ease: 'back.out(2)',
        scrollTrigger: { trigger: el.parentElement, start: 'top 85%', toggleActions: 'play none none reverse' }
      }
    );
  });

  // Contact section
  gsap.fromTo('.contact-content',
    { opacity: 0, y: 80 },
    {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-section', start: 'top 80%', toggleActions: 'play none none reverse' }
    }
  );

  // Navbar glass-on-scroll
  ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
      const nav = document.getElementById('nav');
      if (window.scrollY > 80) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    }
  });

  // Scroll-driven starfield parallax (NO zoom into nodes — just particles)
  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: 'bottom bottom',
    scrub: 1.5,
    onUpdate: (self) => {
      if (camera && particlesMesh) {
        camera.position.z = 500 - (self.progress * 350);
        particlesMesh.material.opacity = 0.55 + (self.progress * 0.25);
        particlesMesh.rotation.z = self.progress * 0.5;
      }
    }
  });
}

// ────────────────────────────────────────
// VanillaTilt for Glass Cards
// ────────────────────────────────────────
function initVanillaTilt() {
  if (typeof VanillaTilt === 'undefined') return;
  VanillaTilt.init(document.querySelectorAll('.glass-card'), {
    max: 8,
    speed: 400,
    glare: true,
    'max-glare': 0.12,
    perspective: 1200
  });
}

// ────────────────────────────────────────
// Mobile Navigation
// ────────────────────────────────────────
function initNavBurger() {
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  if (!burger || !links) return;

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });

  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      links.classList.remove('open');
    });
  });
}

// ────────────────────────────────────────
// Case Study Panel
// ────────────────────────────────────────
function bindCaseStudyEvents() {
  const closeBtn = document.getElementById('caseStudyClose');
  if (closeBtn) closeBtn.addEventListener('click', closeCaseStudy);

  // Click outside to close — click on the backdrop overlay
  const panel = document.getElementById('caseStudy');
  if (panel) {
    // Create a backdrop overlay
    const backdrop = document.createElement('div');
    backdrop.id = 'caseStudyBackdrop';
    backdrop.className = 'case-study-backdrop';
    panel.parentElement.insertBefore(backdrop, panel);

    backdrop.addEventListener('click', closeCaseStudy);
  }

  // Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCaseStudy();
  });
}

function openCaseStudy(data) {
  const panel = document.getElementById('caseStudy');
  const content = document.getElementById('caseStudyContent');
  if (!panel || !content) return;

  let html = '';

  if (data.type === 'project') {
    const connectedSkills = data.techs || [];
    html = `
      <span class="cs-type cs-type-project">Project</span>
      <h3 class="cs-title">${data.label}</h3>
      <p class="cs-description">${data.description}</p>
      <div class="cs-meta">
        ${data.language ? `<div class="cs-meta-item"><span class="cs-meta-label">Language</span> ${data.language}</div>` : ''}
        ${data.stars !== undefined ? `<div class="cs-meta-item"><span class="cs-meta-label">Stars</span> \u2B50 ${data.stars}</div>` : ''}
        ${data.domain ? `<div class="cs-meta-item"><span class="cs-meta-label">Domain</span> ${data.domain}</div>` : ''}
      </div>
      <div class="cs-tags">${connectedSkills.map(s => `<span class="cs-tag">${s}</span>`).join('')}</div>
      ${data.url ? `<a href="${data.url}" target="_blank" rel="noopener" class="btn btn-primary" style="margin-top:0.5rem;">
        <span class="btn-icon">${data.url.includes('arxiv') ? '\u{1F4C4}' : '\u{1F517}'}</span>
        ${data.url.includes('arxiv') ? 'Read Paper' : 'View on GitHub'}
      </a>` : ''}
      <div class="cs-connections">
        <div class="cs-connections-title">Connected Technologies</div>
        <div class="cs-connection-list">
          ${connectedSkills.map(s => `<span class="cs-connection-item">${s}</span>`).join('')}
        </div>
      </div>
    `;
  } else if (data.type === 'skill') {
    const relatedProjects = PROJECTS.filter(p => p.techs.includes(data.label));
    html = `
      <span class="cs-type cs-type-skill">Skill</span>
      <h3 class="cs-title">${data.label}</h3>
      <p class="cs-description">Technology used across ${relatedProjects.length} project${relatedProjects.length !== 1 ? 's' : ''} in my portfolio.</p>
      <div class="cs-meta">
        <div class="cs-meta-item"><span class="cs-meta-label">Category</span> ${data.category}</div>
        <div class="cs-meta-item"><span class="cs-meta-label">Projects</span> ${relatedProjects.length} linked</div>
      </div>
      <div class="cs-connections">
        <div class="cs-connections-title">Used In</div>
        <div class="cs-connection-list">
          ${relatedProjects.map(p => `<span class="cs-connection-item" onclick="window.open('${p.url}', '_blank')">${p.label}</span>`).join('')}
        </div>
      </div>
    `;
  } else if (data.type === 'category') {
    const domainLabelMap = { 'domain-nlp': 'NLP', 'domain-cv': 'Computer Vision', 'domain-dl': 'Deep Learning', 'domain-research': 'Research' };
    const domainLabel = domainLabelMap[data.id] || data.label;
    const relatedProjects = PROJECTS.filter(p => p.domain === domainLabel);
    html = `
      <span class="cs-type cs-type-category">Domain</span>
      <h3 class="cs-title">${domainLabel}</h3>
      <p class="cs-description">A core focus area with ${relatedProjects.length} project${relatedProjects.length !== 1 ? 's' : ''} in my portfolio.</p>
      <div class="cs-connections">
        <div class="cs-connections-title">Projects</div>
        <div class="cs-connection-list">
          ${relatedProjects.map(p => `<span class="cs-connection-item" onclick="window.open('${p.url}', '_blank')">${p.label}</span>`).join('')}
        </div>
      </div>
    `;
  }

  content.innerHTML = html;
  
  // Show backdrop and animate panel open
  const backdrop = document.getElementById('caseStudyBackdrop');
  if (backdrop) backdrop.classList.add('visible');
  panel.classList.add('open');
  
  // Animate content inside
  gsap.fromTo(content.children,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: 'power2.out', delay: 0.2 }
  );

  // Scramble the title
  scrambleText(content.querySelector('.cs-title'));

  // Re-bind cursor hover for dynamic elements
  content.querySelectorAll('a, button, .cs-connection-item, .cs-tag').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

function closeCaseStudy() {
  const panel = document.getElementById('caseStudy');
  if (panel) panel.classList.remove('open');
  const backdrop = document.getElementById('caseStudyBackdrop');
  if (backdrop) backdrop.classList.remove('visible');
}

// ────────────────────────────────────────
// Text Scramble / Decode Effect
// ────────────────────────────────────────
function scrambleText(element) {
  if (!element) return;
  const originalText = element.innerText;
  const chars = '!<>-_\\/[]{}=+*^?#@$%&~';
  let iteration = 0;

  const interval = setInterval(() => {
    element.innerText = originalText
      .split('')
      .map((letter, index) => {
        if (index < iteration) return originalText[index];
        if (letter === ' ') return ' ';
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');

    if (iteration >= originalText.length) {
      clearInterval(interval);
    }
    iteration += 0.5;
  }, 25);
}
