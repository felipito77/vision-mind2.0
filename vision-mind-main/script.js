/**
 * VISION MIND - PLATAFORMA PRINCIPAL ENGINE
 * Control de pestañas del visor VR y navegación activa
 */

function cargar(pagina) {
  const visor = document.getElementById("visor");
  if (visor) {
    visor.src = pagina;
  }
}

function cargarTab(pagina, btnElement) {
  cargar(pagina);

  // Actualizar clase activa en los botones de pestañas
  const buttons = document.querySelectorAll('.tabs button, .tabs .tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  if (btnElement) {
    btnElement.classList.add('active');
  }
}

// Resaltar sección activa en el menú al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});