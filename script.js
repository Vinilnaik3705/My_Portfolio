const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

const sectionIds = ['about', 'projects', 'skills', 'faq'];
const navLinks = [...document.querySelectorAll('.main-nav a')];

const setActiveLink = () => {
  const fromTop = window.scrollY + 160;
  let current = sectionIds[0];

  sectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (section && section.offsetTop <= fromTop) {
      current = id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', setActiveLink);
setActiveLink();


const billButtons = [...document.querySelectorAll('.bill-btn')];
const pricingCards = [...document.querySelectorAll('.price-card')];

const formatPrice = (num) => Number(num).toLocaleString('en-US');

billButtons.forEach((button) => {
  button.addEventListener('click', () => {
    billButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');

    const mode = button.dataset.mode;
    pricingCards.forEach((card) => {
      const value = mode === 'yearly' ? card.dataset.yearly : card.dataset.monthly;
      const target = card.querySelector('.price-value');
      if (target && value) {
        target.textContent = formatPrice(value);
      }
    });
  });
});

const reveals = document.querySelectorAll('.reveal-up');
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.14 }
);

reveals.forEach((item) => revealObserver.observe(item));

const heroCard = document.getElementById('hero-card');

if (heroCard) {
  heroCard.addEventListener('mousemove', (event) => {
    const rect = heroCard.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 12;

    heroCard.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
  });

  heroCard.addEventListener('mouseleave', () => {
    heroCard.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  });
}

const skillsCarousel = document.querySelector('.skills-carousel');
const skillChips = [...document.querySelectorAll('.skill-chip')];
const skillsCenter = document.getElementById('skills-center');

if (skillsCarousel && skillsCenter && skillChips.length) {
  let rotationOffset = 0;
  let hoveredIndex = null;
  let rotationActive = true;
  let rafId = null;

  const getOrbitSize = () => {
    const rect = skillsCarousel.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = rect.height || 700;

    const radiusX = Math.max(110, Math.min(width * 0.38, 420));
    const radiusY = Math.max(80, Math.min(height * 0.32, 230));
    return { radiusX, radiusY };
  };

  const updateCenterInfo = (chip) => {
    const title = skillsCenter.querySelector('h3');
    const text = skillsCenter.querySelector('p');
    if (!title || !text) {
      return;
    }

    title.textContent = chip.dataset.name || '';
    text.textContent = chip.dataset.desc || '';
  };

  const animateSkills = () => {
    if (rotationActive) {
      rotationOffset = (rotationOffset + 0.12) % 360;
    }

    const { radiusX, radiusY } = getOrbitSize();
    const angleStep = 360 / skillChips.length;
    const positions = [];
    let centerIndex = 0;
    let bestFrontValue = -1000;

    skillChips.forEach((chip, index) => {
      const angle = (index * angleStep + rotationOffset) % 360;
      const rad = (angle - 90) * (Math.PI / 180);
      const x = Math.cos(rad) * radiusX;
      const y = Math.sin(rad) * radiusY;
      const frontValue = Math.sin(rad);
      positions.push({ x, y, frontValue });

      if (frontValue > bestFrontValue) {
        bestFrontValue = frontValue;
        centerIndex = index;
      }
    });

    const activeIndex = hoveredIndex !== null ? hoveredIndex : centerIndex;

    skillChips.forEach((chip, index) => {
      const { x, y, frontValue } = positions[index];
      const depthRatio = (frontValue + 1) / 2;
      const opacity = 0.42 + (depthRatio * 0.58);
      const zIndex = Math.floor(frontValue * 100) + 100;
      let scale = 0.8 + (depthRatio * 0.38);
      if (index === activeIndex) {
        scale += 0.09;
      }

      chip.style.transform = `translate(-50%, -50%) translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) scale(${scale.toFixed(3)})`;
      chip.style.opacity = `${opacity.toFixed(3)}`;
      chip.style.zIndex = `${zIndex}`;
    });

    updateCenterInfo(skillChips[activeIndex]);
    rafId = requestAnimationFrame(animateSkills);
  };

  skillChips.forEach((chip, index) => {
    const openDocs = () => {
      const url = chip.dataset.doc;
      if (!url) {
        return;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
    };

    chip.addEventListener('mouseenter', () => {
      hoveredIndex = index;
      rotationActive = false;
      updateCenterInfo(chip);
    });

    chip.addEventListener('mouseleave', () => {
      hoveredIndex = null;
      rotationActive = true;
    });

    chip.addEventListener('click', openDocs);

    chip.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openDocs();
      }
    });
  });

  skillsCarousel.addEventListener('mouseleave', () => {
    hoveredIndex = null;
    rotationActive = true;
  });

  rafId = requestAnimationFrame(animateSkills);

  window.addEventListener('beforeunload', () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
  });
}

// IDE / Code Editor Component Interactivity
const ideFiles = {
  profile: {
    name: 'profile.json',
    icon: 'json',
    iconText: '{}',
    lines: 10,
    code: `{
  <span class="token-key">"name"</span>: <span class="token-string">"Vinil Naik"</span>,
  <span class="token-key">"role"</span>: <span class="token-string">"CS Student & Automation Engineer"</span>,
  <span class="token-key">"focus"</span>: [
    <span class="token-string">"Design Thinking"</span>,
    <span class="token-string">"Agentic Workflows"</span>,
    <span class="token-string">"Full-Stack Engineering"</span>
  ],
  <span class="token-key">"bio"</span>: <span class="token-string">"I blend product design, backend logic, and automation into clean systems."</span>
}`
  },
  build: {
    name: 'what_i_build.py',
    icon: 'py',
    iconText: 'py',
    lines: 17,
    code: `<span class="token-keyword">def</span> <span class="token-function">get_recent_projects</span>():
    <span class="token-keyword">return</span> {
        <span class="token-string">"trade_simulator"</span>: {
            <span class="token-string">"stack"</span>: [<span class="token-string">"React"</span>, <span class="token-string">"Vite"</span>, <span class="token-string">"Supabase"</span>, <span class="token-string">"Groq"</span>],
            <span class="token-string">"features"</span>: [
                <span class="token-string">"Groq LLM market analyst"</span>,
                <span class="token-string">"d3-hierarchy heatmaps"</span>
            ]
        },
        <span class="token-string">"hr_automation_agent"</span>: {
            <span class="token-string">"stack"</span>: [<span class="token-string">"n8n"</span>, <span class="token-string">"FastAPI"</span>, <span class="token-string">"PostgreSQL"</span>, <span class="token-string">"GPT-4o-mini"</span>],
            <span class="token-string">"features"</span>: [
                <span class="token-string">"Sentence Transformers resume ranking"</span>,
                <span class="token-string">"4-stage automated pipeline"</span>
            ]
        }
    }`
  },
  skills: {
    name: 'skills_manifest.yml',
    icon: 'yml',
    iconText: 'yml',
    lines: 14,
    code: `<span class="token-comment"># Developer Skillset Manifest</span>
<span class="token-key">languages</span>:
  - <span class="token-string">Python</span>
  - <span class="token-string">JavaScript</span>
  - <span class="token-string">C++</span>
<span class="token-key">frameworks</span>:
  - <span class="token-string">React.js</span>
  - <span class="token-string">Node.js</span>
<span class="token-key">automation_tools</span>:
  - <span class="token-string">n8n</span>
  - <span class="token-string">GitHub Actions</span>
<span class="token-key">databases</span>:
  - <span class="token-string">MongoDB</span>
  - <span class="token-string">PostgreSQL</span>`
  },
  workflow: {
    name: 'workflow_pipeline.js',
    icon: 'js',
    iconText: 'js',
    lines: 15,
    code: `<span class="token-keyword">async function</span> <span class="token-function">executeProjectWorkflow</span>(project) {
  <span class="token-comment">// 1. Analyze user flows and details</span>
  <span class="token-keyword">const</span> spec = <span class="token-function">analyzeUserFlow</span>(project.requirements);
  
  <span class="token-comment">// 2. Build backend APIs and agent nodes</span>
  <span class="token-keyword">const</span> backend = <span class="token-keyword">await</span> <span class="token-function">deploySecureBackend</span>(spec);
  
  <span class="token-comment">// 3. Polish and animate interface</span>
  <span class="token-keyword">const</span> ui = <span class="token-function">designPremiumUI</span>(spec, backend);
  
  <span class="token-keyword">return</span> {
    status: <span class="token-string">"successfully_shipped"</span>,
    experience: <span class="token-string">"seamless"</span>
  };
}`
  }
};

const fileItems = document.querySelectorAll('.file-item');
const tabItems = document.querySelectorAll('.ide-tab');
const codeContent = document.getElementById('code-content');
const lineNumbersContainer = document.getElementById('line-numbers');

const selectFile = (fileKey) => {
  const fileData = ideFiles[fileKey];
  if (!fileData) return;

  // Update fileExplorer items active status
  fileItems.forEach(item => {
    if (item.dataset.file === fileKey) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Update tabs active status
  tabItems.forEach(tab => {
    if (tab.dataset.file === fileKey) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Render code
  if (codeContent) {
    codeContent.innerHTML = fileData.code;
  }

  // Render line numbers
  if (lineNumbersContainer) {
    let lineNumsHTML = '';
    for (let i = 1; i <= fileData.lines; i++) {
      lineNumsHTML += `<span>${i}</span>`;
    }
    lineNumbersContainer.innerHTML = lineNumsHTML;
  }
};

// Add event listeners to file list and tab bar items
fileItems.forEach(item => {
  item.addEventListener('click', () => {
    const fileKey = item.dataset.file;
    selectFile(fileKey);
  });
});

tabItems.forEach(tab => {
  tab.addEventListener('click', () => {
    const fileKey = tab.dataset.file;
    selectFile(fileKey);
  });
});

// Initialize with first file
if (fileItems.length && codeContent) {
  selectFile('profile');
}

