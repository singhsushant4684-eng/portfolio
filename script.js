/* NAVIGATION: toggle mobile menu */
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('active');
});

/* CLOSE MENU on link click (mobile) */
document.querySelectorAll('#navLinks a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

/* IntersectionObserver for sections */
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.18 });
sections.forEach(s => observer.observe(s));

/* HERO: animate title on load */
window.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.style.opacity = 0;
    heroTitle.style.transform = 'translateY(18px)';
    setTimeout(() => {
      heroTitle.style.transition = 'all 800ms cubic-bezier(.2,.9,.2,1)';
      heroTitle.style.opacity = 1;
      heroTitle.style.transform = 'translateY(0)';
    }, 220);
  }
});

/* HERO PARTICLES: lightweight canvas background */
(() => {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles;

  const resize = () => {
    w = canvas.width = canvas.clientWidth * devicePixelRatio;
    h = canvas.height = canvas.clientHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
  };

  function createParticles() {
    const count = Math.max(18, Math.floor((canvas.clientWidth / 80)));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.clientWidth,
        y: Math.random() * canvas.clientHeight,
        r: 1 + Math.random() * 3,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.2) * 0.4,
        hue: 200 + Math.random() * 160
      });
    }
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      ctx.beginPath();
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
      grad.addColorStop(0, `hsla(${p.hue},80%,70%,0.12)`);
      grad.addColorStop(1, `hsla(${p.hue},80%,50%,0)`);
      ctx.fillStyle = grad;
      ctx.arc(p.x, p.y, p.r * 2, 0, Math.PI * 2);
      ctx.fill();

      // move
      p.x += p.vx;
      p.y += p.vy;

      // wrap
      if (p.x < -20) p.x = canvas.clientWidth + 20;
      if (p.x > canvas.clientWidth + 20) p.x = -20;
      if (p.y < -20) p.y = canvas.clientHeight + 20;
      if (p.y > canvas.clientHeight + 20) p.y = -20;
    }
    requestAnimationFrame(draw);
  }

  const onResize = () => {
    resize();
    createParticles();
  };

  onResize();
  window.addEventListener('resize', onResize);
  draw();
})();

/* SKILL animation: small visual feedback (no bars, just stagger reveals) */
(() => {
  const skills = document.querySelectorAll('.skill');
  skills.forEach((el, i) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(14px)';
    setTimeout(() => {
      el.style.transition = 'all 600ms cubic-bezier(.2,.9,.2,1)';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, 260 + i * 120);
  });
})();

/* CONTACT FORM - fake submission (UI feedback) */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Sent ✓';
      btn.style.background = 'linear-gradient(90deg,#6a11cb,#2575fc)';
      setTimeout(() => {
        btn.textContent = 'Send';
        btn.disabled = false;
        btn.style.background = ''; // revert to CSS default
        contactForm.reset();
      }, 1600);
    }, 800);
  });
}
