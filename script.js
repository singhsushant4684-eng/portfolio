/* ================== NAVIGATION ================== */
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('active');
});

document.querySelectorAll('#navLinks a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

/* ================== SECTION ANIMATIONS ================== */
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.18 });
sections.forEach(s => observer.observe(s));

/* ================== HERO TITLE ANIMATION ================== */
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

/* ================== HERO PARTICLES 3D ================== */
(() => {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(3, 3, 3);
  scene.add(ambientLight, dirLight);

  // Particle geometry
  const particleGeo = new THREE.SphereGeometry(0.06, 12, 12);
  const particleMat = new THREE.MeshStandardMaterial({ color: 0x2575fc, transparent: true, opacity: 0.7 });
  const particles = [];

  for (let i = 0; i < 60; i++) {
    const p = new THREE.Mesh(particleGeo, particleMat);
    p.position.set((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 2);
    scene.add(p);
    particles.push({ mesh: p, vx: (Math.random() - 0.5) * 0.01, vy: (Math.random() - 0.5) * 0.01 });
  }

  function animate() {
    requestAnimationFrame(animate);
    particles.forEach(p => {
      p.mesh.position.x += p.vx;
      p.mesh.position.y += p.vy;
      if (p.mesh.position.x > 3) p.mesh.position.x = -3;
      if (p.mesh.position.x < -3) p.mesh.position.x = 3;
      if (p.mesh.position.y > 2) p.mesh.position.y = -2;
      if (p.mesh.position.y < -2) p.mesh.position.y = 2;
    });
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  });
})();

/* ================== SKILLS STAGGER ANIMATION ================== */
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

/* ================== CONTACT FORM ================== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Sent ✓';
      setTimeout(() => {
        btn.textContent = 'Send';
        btn.disabled = false;
        contactForm.reset();
      }, 1600);
    }, 800);
  });
}

/* ================== ACHIEVEMENTS ANIMATION ================== */
const achievementCards = document.querySelectorAll('.achievement-card');
const achievementObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 0;
      entry.target.style.transform = 'translateY(20px)';
      setTimeout(() => {
        entry.target.style.transition = 'all 600ms cubic-bezier(.2,.9,.2,1)';
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }, 100);
      achievementObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

achievementCards.forEach(card => achievementObserver.observe(card));
