/**
 * VISION MIND - FUTURISTIC AUTHENTICATION ENGINE
 * Lógica interactiva para cambio de pestañas, alternancia de ingreso (correo/teléfono),
 * validaciones en tiempo real y animación de partículas cuánticas.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCyberParticles();
  initTabs();
  initLoginMethodToggle();
  initPasswordToggles();
  initPasswordStrengthMeter();
  initFormSubmissions();
});

/* ==========================================================================
   1. CANVAS DE PARTÍCULAS CUÁNTICAS & REJILLA
   ========================================================================== */
function initCyberParticles() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  const PARTICLE_COUNT = 45;
  const COLORS = ['#00f5d4', '#38bdf8', '#ffffff', '#ff4b6e'];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.size = Math.random() * 2 + 1;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha = Math.random() * 0.6 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Conectar partículas cercanas con líneas cuánticas
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = '#38bdf8';
          ctx.globalAlpha = (1 - dist / 110) * 0.18;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    // Dibujar y actualizar partículas
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. PESTAÑAS (INICIAR SESIÓN / CREAR CUENTA)
   ========================================================================== */
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.form-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetMode = btn.dataset.mode;

      tabButtons.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(`panel-${targetMode}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // Enlaces rápidos en pie de tarjeta
  const switchLinks = document.querySelectorAll('[data-switch-to]');
  switchLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetMode = link.dataset.switchTo;
      const targetBtn = document.querySelector(`.tab-btn[data-mode="${targetMode}"]`);
      if (targetBtn) targetBtn.click();
    });
  });
}

/* ==========================================================================
   3. ALTERNANCIA DE MÉTODO DE INGRESO (CORREO VS TELÉFONO)
   ========================================================================== */
function initLoginMethodToggle() {
  const methodButtons = document.querySelectorAll('.method-btn');
  const emailGroup = document.getElementById('login-email-group');
  const phoneGroup = document.getElementById('login-phone-group');
  const emailInput = document.getElementById('login-email');
  const phoneInput = document.getElementById('login-phone');

  methodButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const method = btn.dataset.method;
      methodButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (method === 'email') {
        emailGroup.style.display = 'block';
        phoneGroup.style.display = 'none';
        emailInput.setAttribute('required', 'true');
        phoneInput.removeAttribute('required');
        emailInput.focus();
      } else {
        emailGroup.style.display = 'none';
        phoneGroup.style.display = 'block';
        phoneInput.setAttribute('required', 'true');
        emailInput.removeAttribute('required');
        phoneInput.focus();
      }
    });
  });
}

/* ==========================================================================
   4. MOSTRAR / OCULTAR CONTRASEÑA
   ========================================================================== */
function initPasswordToggles() {
  const toggleButtons = document.querySelectorAll('.toggle-password-btn');

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const passwordInput = document.getElementById(targetId);
      if (!passwordInput) return;

      const isPassword = passwordInput.getAttribute('type') === 'password';
      passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

      // Alternar icono SVG
      btn.innerHTML = isPassword 
        ? `<svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12c-2.48 0-4.5-2.02-4.5-4.5S9.52 7.5 12 7.5s4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5zm0-7a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"/></svg>`
        : `<svg viewBox="0 0 24 24"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>`;
    });
  });
}

/* ==========================================================================
   5. MEDIDOR DE FORTALEZA DE CONTRASEÑA (REGISTRO)
   ========================================================================== */
function initPasswordStrengthMeter() {
  const regPassword = document.getElementById('reg-password');
  const strengthFill = document.getElementById('strength-fill');
  const strengthText = document.getElementById('strength-text');

  if (!regPassword || !strengthFill || !strengthText) return;

  regPassword.addEventListener('input', () => {
    const val = regPassword.value;
    let score = 0;

    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    strengthFill.className = 'strength-fill';

    if (val.length === 0) {
      strengthFill.style.width = '0%';
      strengthText.textContent = 'Introduce tu contraseña';
      strengthText.style.color = 'var(--blanco-dim)';
    } else if (score <= 2) {
      strengthFill.classList.add('weak');
      strengthText.textContent = 'Seguridad: Baja';
      strengthText.style.color = 'var(--rojito)';
    } else if (score <= 4) {
      strengthFill.classList.add('medium');
      strengthText.textContent = 'Seguridad: Media';
      strengthText.style.color = 'var(--azul-clarito)';
    } else {
      strengthFill.classList.add('strong');
      strengthText.textContent = 'Seguridad: Alta (Excelente)';
      strengthText.style.color = 'var(--aguamarina)';
    }
  });
}

/* ==========================================================================
   6. GESTIÓN Y SIMULACIÓN DE ENVÍO DE FORMULARIOS
   ========================================================================== */
function initFormSubmissions() {
  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');

  // Envío Formulario de Login
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();

      const activeMethod = document.querySelector('.method-btn.active').dataset.method;
      const credential = activeMethod === 'email' 
        ? document.getElementById('login-email').value.trim()
        : `${document.getElementById('login-country-code').value} ${document.getElementById('login-phone').value.trim()}`;
      
      const password = document.getElementById('login-password').value;
      const submitBtn = formLogin.querySelector('.btn-cyber-submit');
      const originalText = submitBtn.innerHTML;

      // Validación simple
      if (!credential || !password) {
        showToast('Por favor completa todos los campos requeridos', 'error');
        return;
      }

      // Animación de carga futurista
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="cyber-spinner"></span> VERIFICANDO CREDENCIALES...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showToast(`¡Acceso Concedido! Bienvenido a Vision Mind.`, 'success');

        // Efecto visual de autorización
        document.querySelector('.status-dot').style.backgroundColor = 'var(--aguamarina)';
        
        setTimeout(() => {
          window.location.href = 'Index.html';
        }, 1200);
      }, 1200);
    });
  }

  // Envío Formulario de Registro
  if (formRegister) {
    formRegister.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullname = document.getElementById('reg-fullname').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const phone = document.getElementById('reg-phone').value.trim();
      const password = document.getElementById('reg-password').value;
      const confirm = document.getElementById('reg-confirm-password').value;
      const terms = document.getElementById('reg-terms').checked;
      const submitBtn = formRegister.querySelector('.btn-cyber-submit');
      const originalText = submitBtn.innerHTML;

      if (password !== confirm) {
        showToast('Las contraseñas no coinciden. Verifícalas.', 'error');
        return;
      }

      if (!terms) {
        showToast('Debes aceptar los términos y condiciones de Vision Mind', 'error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="cyber-spinner"></span> REGISTRANDO USUARIO EN RED...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showToast(`¡Cuenta creada con éxito para ${fullname}!`, 'success');

        setTimeout(() => {
          // Cambiar a pestaña de inicio de sesión
          document.querySelector('.tab-btn[data-mode="login"]').click();
          document.getElementById('login-email').value = email;
        }, 1200);
      }, 1400);
    });
  }
}

/* ==========================================================================
   7. TOASTS Y MENSAJES HUD DE RETROALIMENTACIÓN
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('cyber-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'cyber-toast-container';
    container.className = 'cyber-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `cyber-toast toast-${type}`;

  const iconSvg = type === 'success'
    ? `<svg width="20" height="20" fill="#00f5d4" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`
    : type === 'error'
    ? `<svg width="20" height="20" fill="#ff4b6e" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`
    : `<svg width="20" height="20" fill="#38bdf8" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`;

  toast.innerHTML = `
    <span>${iconSvg}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
