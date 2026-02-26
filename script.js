// ===================== INIT =====================
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initNavbar();
  initSmoothScroll();
  initMobileMenu();
  initForm();
});

// ===================== NAVBAR — box-shadow al hacer scroll =====================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const update = () => navbar.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ===================== SMOOTH SCROLL — offset 80px por navbar sticky =====================
function initSmoothScroll() {
  const OFFSET = 80;

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
      closeMobileMenu();
    });
  });
}

// ===================== MENÚ MÓVIL =====================
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);

    // Cambiar icono hamburger ↔ X
    toggle.innerHTML = open
      ? '<i data-lucide="x"></i>'
      : '<i data-lucide="menu"></i>';
    lucide.createIcons();
  });
}

function closeMobileMenu() {
  const links  = document.getElementById('navLinks');
  const toggle = document.getElementById('navToggle');
  if (!links || !links.classList.contains('open')) return;

  links.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.innerHTML = '<i data-lucide="menu"></i>';
  lucide.createIcons();
}

// ===================== FORMULARIO — validación + estado éxito =====================
function initForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const msgEl   = document.getElementById('successMsg');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm(form)) return;

    const nombre = form.querySelector('#nombre').value.trim();

    // Ocultar form, mostrar éxito
    form.hidden = true;
    success.hidden = false;
    msgEl.textContent = `¡Listo, ${nombre}!`;

    // Renderizar icono check-circle del estado éxito
    lucide.createIcons();
  });
}

function validateForm(form) {
  const required = ['nombre', 'email', 'telefono', 'especialidad', 'meta_pacientes'];
  let valid = true;

  // Limpiar errores previos
  form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

  required.forEach(name => {
    const field = form.querySelector(`[name="${name}"]`);
    if (!field || !field.value.trim()) {
      field && field.classList.add('error');
      valid = false;
    }
  });

  // Validar formato email
  const email = form.querySelector('#email');
  if (email && email.value && !isValidEmail(email.value)) {
    email.classList.add('error');
    valid = false;
  }

  return valid;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
