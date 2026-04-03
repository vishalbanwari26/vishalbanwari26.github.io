/* ========================================
   Portfolio — Neural Network Brain Theme
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
// Color Mappings
// ────────────────────────────────────────
const TYPE_COLORS = {
  project: { r: 0, g: 212, b: 255 },     // cyan
  skill: { r: 139, g: 92, b: 246 },       // purple
  category: { r: 245, g: 158, b: 11 },    // orange
};

// ────────────────────────────────────────
// Utility
// ────────────────────────────────────────
function lerp(a, b, t) { return a + (b - a) * t; }
function dist(x1, y1, x2, y2) { return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2); }
function rand(min, max) { return Math.random() * (max - min) + min; }

// ────────────────────────────────────────
// Neural Network Node
// ────────────────────────────────────────
class NeuralNode {
  constructor(data, x, y) {
    this.data = data;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.targetX = x;
    this.targetY = y;
    this.baseRadius = data.type === 'project' ? 18 : data.type === 'category' ? 14 : 10;
    this.radius = this.baseRadius;
    this.hovered = false;
    this.selected = false;
    this.pulsePhase = Math.random() * Math.PI * 2;
    this.connections = [];
    this.color = TYPE_COLORS[data.type];
    this.glowIntensity = 0;
    this.labelOpacity = data.type === 'project' ? 0.9 : 0;
  }
}

// ────────────────────────────────────────
// Synapse (Connection)
// ────────────────────────────────────────
class Synapse {
  constructor(nodeA, nodeB) {
    this.nodeA = nodeA;
    this.nodeB = nodeB;
    this.pulses = [];
    this.strength = 0.3;
    this.baseOpacity = 0.12;
  }

  fire() {
    this.pulses.push({ t: 0, speed: rand(0.008, 0.02) });
  }
}

// ────────────────────────────────────────
// Neural Network Canvas
// ────────────────────────────────────────
class NeuralNetwork {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.synapses = [];
    this.mouse = { x: -1000, y: -1000, pressed: false };
    this.hoveredNode = null;
    this.selectedNode = null;
    this.isVisible = false;
    this.thinkTimer = 0;
    this.dpr = window.devicePixelRatio || 1;

    this.resize();
    this.buildGraph();
    this.bindEvents();
    this.animate();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    // Reposition nodes if they exist
    if (this.nodes.length > 0) {
      this.layoutNodes();
    }
  }

  buildGraph() {
    const allData = [...PROJECTS, ...SKILLS, ...DOMAINS];

    // Create nodes
    allData.forEach(data => {
      const node = new NeuralNode(data, rand(100, this.width - 100), rand(100, this.height - 100));
      this.nodes.push(node);
    });

    // Build connections: project ↔ skill (via techs)
    const nodeMap = {};
    this.nodes.forEach(n => { nodeMap[n.data.id] = n; });

    // Map tech names to skill IDs
    const techToSkill = {};
    SKILLS.forEach(s => {
      techToSkill[s.label] = s.id;
    });

    // Connect projects to their tech skills
    PROJECTS.forEach(p => {
      const pNode = nodeMap[p.id];
      p.techs.forEach(tech => {
        const skillId = techToSkill[tech];
        if (skillId && nodeMap[skillId]) {
          const sNode = nodeMap[skillId];
          const synapse = new Synapse(pNode, sNode);
          this.synapses.push(synapse);
          pNode.connections.push(sNode);
          sNode.connections.push(pNode);
        }
      });

      // Connect projects to their domain
      const domainMap = {
        'NLP': 'domain-nlp',
        'Computer Vision': 'domain-cv',
        'Deep Learning': 'domain-dl',
        'Research': 'domain-research'
      };
      const domainId = domainMap[p.domain];
      if (domainId && nodeMap[domainId]) {
        const dNode = nodeMap[domainId];
        const synapse = new Synapse(pNode, dNode);
        this.synapses.push(synapse);
        pNode.connections.push(dNode);
        dNode.connections.push(pNode);
      }
    });

    this.layoutNodes();
  }

  layoutNodes() {
    const cx = this.width / 2;
    const cy = this.height / 2;
    const rx = Math.min(this.width * 0.35, 380);
    const ry = Math.min(this.height * 0.32, 220);

    // Place domains at cardinal positions
    const domains = this.nodes.filter(n => n.data.type === 'category');
    domains.forEach((n, i) => {
      const angle = (i / domains.length) * Math.PI * 2 - Math.PI / 2;
      n.targetX = cx + Math.cos(angle) * rx * 0.4;
      n.targetY = cy + Math.sin(angle) * ry * 0.4;
      n.x = n.targetX;
      n.y = n.targetY;
    });

    // Place projects in middle ring
    const projects = this.nodes.filter(n => n.data.type === 'project');
    projects.forEach((n, i) => {
      const angle = (i / projects.length) * Math.PI * 2 + 0.3;
      const r = rand(0.55, 0.85);
      n.targetX = cx + Math.cos(angle) * rx * r;
      n.targetY = cy + Math.sin(angle) * ry * r;
      n.x = n.targetX + rand(-20, 20);
      n.y = n.targetY + rand(-20, 20);
    });

    // Place skills in outer ring, positioned near related projects
    const skills = this.nodes.filter(n => n.data.type === 'skill');
    skills.forEach((n, i) => {
      if (n.connections.length > 0) {
        // Average position of connected nodes
        let ax = 0, ay = 0;
        n.connections.forEach(c => { ax += c.targetX; ay += c.targetY; });
        ax /= n.connections.length;
        ay /= n.connections.length;
        // Push outward slightly
        const dirX = ax - cx;
        const dirY = ay - cy;
        const d = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
        n.targetX = ax + (dirX / d) * rand(40, 80);
        n.targetY = ay + (dirY / d) * rand(30, 60);
      } else {
        const angle = (i / skills.length) * Math.PI * 2;
        n.targetX = cx + Math.cos(angle) * rx * 1.1;
        n.targetY = cy + Math.sin(angle) * ry * 1.1;
      }
      n.x = n.targetX + rand(-15, 15);
      n.y = n.targetY + rand(-15, 15);
    });

    // Clamp all nodes to canvas bounds
    this.nodes.forEach(n => {
      const pad = 50;
      n.targetX = Math.max(pad, Math.min(this.width - pad, n.targetX));
      n.targetY = Math.max(pad, Math.min(this.height - pad, n.targetY));
      n.x = Math.max(pad, Math.min(this.width - pad, n.x));
      n.y = Math.max(pad, Math.min(this.height - pad, n.y));
    });
  }

  bindEvents() {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      let clicked = null;
      for (const node of this.nodes) {
        const d = dist(mx, my, node.x, node.y);
        if (d < node.radius + 8) {
          clicked = node;
          break;
        }
      }

      if (clicked) {
        this.selectNode(clicked);
        // Fire synapses from this node
        this.synapses.forEach(s => {
          if (s.nodeA === clicked || s.nodeB === clicked) {
            s.fire();
          }
        });
        // Hide hint
        const hint = document.getElementById('networkHint');
        if (hint) hint.classList.add('hidden');
      } else {
        this.deselectNode();
      }
    });

    // Touch support
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = touch.clientX - rect.left;
      this.mouse.y = touch.clientY - rect.top;

      let clicked = null;
      for (const node of this.nodes) {
        const d = dist(this.mouse.x, this.mouse.y, node.x, node.y);
        if (d < node.radius + 12) {
          clicked = node;
          break;
        }
      }

      if (clicked) {
        this.selectNode(clicked);
        this.synapses.forEach(s => {
          if (s.nodeA === clicked || s.nodeB === clicked) s.fire();
        });
        const hint = document.getElementById('networkHint');
        if (hint) hint.classList.add('hidden');
      }
    }, { passive: false });

    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  selectNode(node) {
    this.selectedNode = node;
    node.selected = true;
    openCaseStudy(node.data);
  }

  deselectNode() {
    if (this.selectedNode) {
      this.selectedNode.selected = false;
      this.selectedNode = null;
    }
    closeCaseStudy();
  }

  // Periodic "thinking" animation
  think() {
    this.thinkTimer++;
    if (this.thinkTimer % 90 === 0) {
      // Fire random synapses
      const count = Math.floor(rand(2, 5));
      for (let i = 0; i < count; i++) {
        const s = this.synapses[Math.floor(Math.random() * this.synapses.length)];
        if (s) s.fire();
      }
    }
  }

  update() {
    this.think();

    // Update node positions with gentle organic motion
    this.nodes.forEach(node => {
      // Brownian motion
      node.vx += rand(-0.15, 0.15);
      node.vy += rand(-0.15, 0.15);

      // Spring back to target
      const dx = node.targetX - node.x;
      const dy = node.targetY - node.y;
      node.vx += dx * 0.008;
      node.vy += dy * 0.008;

      // Damping
      node.vx *= 0.92;
      node.vy *= 0.92;

      node.x += node.vx;
      node.y += node.vy;

      // Hover detection
      const d = dist(this.mouse.x, this.mouse.y, node.x, node.y);
      node.hovered = d < node.radius + 12;

      // Pulse
      node.pulsePhase += 0.02;
      const pulse = Math.sin(node.pulsePhase) * 0.15 + 1;
      const targetRadius = node.hovered || node.selected
        ? node.baseRadius * 1.5
        : node.baseRadius * pulse;
      node.radius = lerp(node.radius, targetRadius, 0.1);

      // Glow intensity
      const targetGlow = node.hovered || node.selected ? 1 : 0;
      node.glowIntensity = lerp(node.glowIntensity, targetGlow, 0.08);

      // Label opacity
      const showLabel = node.data.type === 'project' || node.hovered || node.selected;
      const targetLabelOp = showLabel ? 1 : 0;
      node.labelOpacity = lerp(node.labelOpacity, targetLabelOp, 0.08);
    });

    // Update synapse pulses
    this.synapses.forEach(s => {
      s.pulses = s.pulses.filter(p => {
        p.t += p.speed;
        return p.t <= 1;
      });

      // Highlight connected synapses
      const shouldHighlight =
        (this.hoveredNode && (s.nodeA === this.hoveredNode || s.nodeB === this.hoveredNode)) ||
        (this.selectedNode && (s.nodeA === this.selectedNode || s.nodeB === this.selectedNode));
      s.strength = lerp(s.strength, shouldHighlight ? 1 : 0.3, 0.08);
    });

    // Track hovered node
    let foundHover = null;
    for (const node of this.nodes) {
      if (node.hovered) {
        foundHover = node;
        break;
      }
    }
    this.hoveredNode = foundHover;

    // Cursor
    this.canvas.style.cursor = this.hoveredNode ? 'pointer' : 'default';
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Draw synapses
    this.synapses.forEach(s => {
      const { nodeA, nodeB } = s;
      const opacity = s.baseOpacity + (s.strength - 0.3) * 0.3;

      // Base line
      ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(nodeA.x, nodeA.y);
      ctx.lineTo(nodeB.x, nodeB.y);
      ctx.stroke();

      // Pulse travelers
      s.pulses.forEach(p => {
        const px = lerp(nodeA.x, nodeB.x, p.t);
        const py = lerp(nodeA.y, nodeB.y, p.t);
        const alpha = 1 - Math.abs(p.t - 0.5) * 2;
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, 8);
        gradient.addColorStop(0, `rgba(0, 212, 255, ${alpha * 0.9})`);
        gradient.addColorStop(1, `rgba(0, 212, 255, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();

        // Light trail
        const trailLen = 0.08;
        const tx1 = lerp(nodeA.x, nodeB.x, Math.max(0, p.t - trailLen));
        const ty1 = lerp(nodeA.y, nodeB.y, Math.max(0, p.t - trailLen));
        ctx.strokeStyle = `rgba(0, 212, 255, ${alpha * 0.3})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tx1, ty1);
        ctx.lineTo(px, py);
        ctx.stroke();
      });
    });

    // Draw nodes
    this.nodes.forEach(node => {
      const { color } = node;
      const x = node.x;
      const y = node.y;
      const r = node.radius;

      // Outer glow
      if (node.glowIntensity > 0.01) {
        const glowGrad = ctx.createRadialGradient(x, y, r * 0.5, x, y, r * 3.5);
        glowGrad.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${0.25 * node.glowIntensity})`);
        glowGrad.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(x, y, r * 3.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Ring
      if (node.data.type === 'project') {
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.2)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, r + 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Node body with gradient
      const bodyGrad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
      bodyGrad.addColorStop(0, `rgba(${Math.min(255, color.r + 60)}, ${Math.min(255, color.g + 60)}, ${Math.min(255, color.b + 60)}, 0.95)`);
      bodyGrad.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`);
      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      // Inner highlight
      ctx.fillStyle = `rgba(255, 255, 255, 0.15)`;
      ctx.beginPath();
      ctx.arc(x - r * 0.2, y - r * 0.2, r * 0.4, 0, Math.PI * 2);
      ctx.fill();

      // Shadow
      ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.4)`;
      ctx.shadowBlur = 15;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.01)`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Selection ring
      if (node.selected) {
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`;
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(x, y, r + 12, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Label
      if (node.labelOpacity > 0.02) {
        ctx.font = `${node.data.type === 'project' ? '600' : '500'} ${node.data.type === 'project' ? '11px' : '10px'} Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = `rgba(241, 245, 249, ${node.labelOpacity * 0.9})`;

        const label = node.data.label;
        const textY = y + r + 8;

        // Text bg (pill shape)
        const textWidth = ctx.measureText(label).width;
        const pad = 6;
        ctx.fillStyle = `rgba(6, 6, 15, ${node.labelOpacity * 0.7})`;
        ctx.beginPath();
        const pillW = textWidth + pad * 2;
        const pillH = 16;
        const pillX = x - pillW / 2;
        const pillY = textY - 2;
        ctx.roundRect(pillX, pillY, pillW, pillH, 4);
        ctx.fill();

        ctx.fillStyle = `rgba(241, 245, 249, ${node.labelOpacity * 0.9})`;
        ctx.fillText(label, x, textY);
      }
    });
  }

  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

// ────────────────────────────────────────
// Case Study Panel
// ────────────────────────────────────────
function openCaseStudy(data) {
  const panel = document.getElementById('caseStudy');
  const content = document.getElementById('caseStudyContent');

  let html = '';

  if (data.type === 'project') {
    // Find connected skills
    const connectedSkills = data.techs || [];
    html = `
      <span class="cs-type cs-type-project">Project</span>
      <h3 class="cs-title">${data.label}</h3>
      <p class="cs-description">${data.description}</p>
      <div class="cs-meta">
        ${data.language ? `<div class="cs-meta-item"><span class="cs-meta-label">Language</span> ${data.language}</div>` : ''}
        ${data.stars !== undefined ? `<div class="cs-meta-item"><span class="cs-meta-label">Stars</span> ⭐ ${data.stars}</div>` : ''}
        ${data.domain ? `<div class="cs-meta-item"><span class="cs-meta-label">Domain</span> ${data.domain}</div>` : ''}
      </div>
      <div class="cs-tags">${connectedSkills.map(s => `<span class="cs-tag">${s}</span>`).join('')}</div>
      ${data.url ? `<a href="${data.url}" target="_blank" rel="noopener" class="btn btn-primary" style="margin-top:0.5rem;">
        <span class="btn-icon">${data.url.includes('arxiv') ? '📄' : '🔗'}</span>
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
    // Find projects using this skill
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
    // Domain node — show all projects in this domain
    const domainLabelMap = {
      'domain-nlp': 'NLP',
      'domain-cv': 'Computer Vision',
      'domain-dl': 'Deep Learning',
      'domain-research': 'Research'
    };
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
  panel.classList.add('open');
}

function closeCaseStudy() {
  document.getElementById('caseStudy').classList.remove('open');
}

document.getElementById('caseStudyClose').addEventListener('click', () => {
  closeCaseStudy();
  if (window.neuralNet) {
    window.neuralNet.deselectNode();
  }
});

// ────────────────────────────────────────
// Hero Canvas — Subtle floating particles
// ────────────────────────────────────────
class HeroBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.connections = [];
    this.dpr = window.devicePixelRatio || 1;
    this.mouse = { x: -1000, y: -1000 };

    this.resize();
    this.init();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  init() {
    const count = Math.min(Math.floor((this.width * this.height) / 15000), 80);
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: rand(0, this.width),
        y: rand(0, this.height),
        vx: rand(-0.3, 0.3),
        vy: rand(-0.3, 0.3),
        radius: rand(1.5, 3),
        opacity: rand(0.1, 0.4),
        hue: Math.random() > 0.5 ? 270 : 190, // purple or cyan
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  animate() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // Update & draw particles
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;
      if (p.y < -10) p.y = this.height + 10;
      if (p.y > this.height + 10) p.y = -10;

      // Mouse repulsion
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < 120) {
        const force = (120 - d) / 120 * 0.3;
        p.vx += (dx / d) * force;
        p.vy += (dy / d) * force;
      }

      // Damping
      p.vx *= 0.99;
      p.vy *= 0.99;

      // Draw
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.opacity})`;
      ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const d = dist(a.x, a.y, b.x, b.y);
        if (d < 150) {
          const alpha = (1 - d / 150) * 0.08;
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

// ────────────────────────────────────────
// Contact Canvas — Minimal floating dots
// ────────────────────────────────────────
class ContactBackground {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.dots = [];
    this.dpr = window.devicePixelRatio || 1;
    this.resize();
    this.init();
    window.addEventListener('resize', () => this.resize());
    this.animate();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  init() {
    const count = 30;
    for (let i = 0; i < count; i++) {
      this.dots.push({
        x: rand(0, this.width),
        y: rand(0, this.height),
        vx: rand(-0.2, 0.2),
        vy: rand(-0.2, 0.2),
        r: rand(1, 2.5),
        o: rand(0.05, 0.2),
      });
    }
  }

  animate() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    this.dots.forEach(d => {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0 || d.x > this.width) d.vx *= -1;
      if (d.y < 0 || d.y > this.height) d.vy *= -1;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 92, 246, ${d.o})`;
      ctx.fill();
    });

    for (let i = 0; i < this.dots.length; i++) {
      for (let j = i + 1; j < this.dots.length; j++) {
        const a = this.dots[i], b = this.dots[j];
        const d = dist(a.x, a.y, b.x, b.y);
        if (d < 120) {
          ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - d / 120) * 0.06})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(() => this.animate());
  }
}

// ────────────────────────────────────────
// Loader
// ────────────────────────────────────────
function hideLoader() {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1800);
}

// ────────────────────────────────────────
// Navigation
// ────────────────────────────────────────
function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Active section
    const sections = ['network', 'experience', 'publication', 'skills', 'contact'];
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 200) {
        current = id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  });

  // Mobile burger
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      links.classList.remove('open');
    });
  });
}

// ────────────────────────────────────────
// Scroll Reveal
// ────────────────────────────────────────
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ────────────────────────────────────────
// Init
// ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  hideLoader();
  initNav();
  initScrollReveal();

  // Hero background
  new HeroBackground('heroCanvas');

  // Neural Network (main feature)
  setTimeout(() => {
    window.neuralNet = new NeuralNetwork('networkCanvas');
  }, 500);

  // Contact background
  new ContactBackground('contactCanvas');

  // Smooth scroll for explore button
  document.getElementById('exploreBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('network')?.scrollIntoView({ behavior: 'smooth' });
  });
});

// Close case study with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeCaseStudy();
    if (window.neuralNet && window.neuralNet.selectedNode) {
      window.neuralNet.selectedNode.selected = false;
      window.neuralNet.selectedNode = null;
    }
  }
});
