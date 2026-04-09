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

const workViewport = document.getElementById('work-viewport');
const prev = document.getElementById('work-prev');
const next = document.getElementById('work-next');

if (workViewport && prev && next) {
  const shift = () => Math.min(workViewport.clientWidth * 0.86, 560);
  prev.addEventListener('click', () => workViewport.scrollBy({ left: -shift(), behavior: 'smooth' }));
  next.addEventListener('click', () => workViewport.scrollBy({ left: shift(), behavior: 'smooth' }));
}

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
    chip.addEventListener('mouseenter', () => {
      hoveredIndex = index;
      rotationActive = false;
      updateCenterInfo(chip);
    });

    chip.addEventListener('mouseleave', () => {
      hoveredIndex = null;
      rotationActive = true;
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
