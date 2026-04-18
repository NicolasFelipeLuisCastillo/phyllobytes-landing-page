const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.main-nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const form = document.querySelector('.lead-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Gracias por tu solicitud. Nuestro equipo veterinario te contactara pronto.');
    form.reset();
  });
}
