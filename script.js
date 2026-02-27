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

// ===================== FORMULARIO — validación + envío a n8n =====================
const N8N_WEBHOOK_URL = 'https://sasilan.app.n8n.cloud/webhook/nuvia-lead';

function initForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const msgEl   = document.getElementById('successMsg');
  const btn     = form && form.querySelector('button[type="submit"]');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validateForm(form)) return;

    const nombre = form.querySelector('#nombre').value.trim();
    const payload = {
      nombre,
      email:          form.querySelector('#email').value.trim(),
      telefono:       form.querySelector('#telefono').value.trim(),
      especialidad:   form.querySelector('#especialidad').value.trim(),
      meta_pacientes: form.querySelector('#meta_pacientes').value.trim(),
      fecha:          new Date().toISOString(),
      origen:         'landing-nuvia'
    };

    // Estado cargando
    if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }

    try {
      await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (_) {
      // Si falla la red, igual mostramos éxito para no bloquear al usuario
      // Los datos se pierden solo si el webhook está caído
    }

    // Mostrar éxito
    form.hidden = true;
    success.hidden = false;
    msgEl.textContent = `¡Listo, ${nombre}!`;
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
