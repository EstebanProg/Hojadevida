// ===================== Tema claro / oscuro =====================
(function () {
  const raiz = document.documentElement;
  const boton = document.getElementById('btn-tema');
  if (!boton) return;

  const pintarIcono = () => {
    const oscuro = raiz.getAttribute('data-bs-theme') === 'dark';
    boton.innerHTML = oscuro ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    boton.setAttribute('aria-pressed', String(oscuro));
  };

  boton.addEventListener('click', () => {
    const nuevo = raiz.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    raiz.setAttribute('data-bs-theme', nuevo);
    localStorage.setItem('tema', nuevo);
    pintarIcono();
  });

  pintarIcono();
})();

// ===================== Barras de habilidades =====================
const llenarBarra = (barra) => { barra.style.width = barra.dataset.width + '%'; };
const barras = document.querySelectorAll('.progress-bar[data-width]');

// ===================== Aparición al hacer scroll =====================
const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observador = new IntersectionObserver((entradas, obs) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      const el = entrada.target;
      if (el.classList.contains('progress-bar')) {
        llenarBarra(el);
      } else {
        el.classList.add('visible');
      }
      obs.unobserve(el);
    });
  }, { threshold: 0.15 });

  reveals.forEach((el) => observador.observe(el));
  barras.forEach((b) => observador.observe(b));
} else {
  reveals.forEach((el) => el.classList.add('visible'));
  barras.forEach(llenarBarra);
}

// Al imprimir, mostrar todo completo
window.addEventListener('beforeprint', () => {
  reveals.forEach((el) => el.classList.add('visible'));
  barras.forEach(llenarBarra);
});

// ===================== Efecto de escritura =====================
(function () {
  const el = document.querySelector('.typing');
  if (!el) return;

  let frases;
  try { frases = JSON.parse(el.dataset.frases); } catch (e) { return; }
  if (!frases || !frases.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let i = 0;
  let pos = frases[0].length;
  let borrando = true;

  const tick = () => {
    const actual = frases[i];
    if (borrando) {
      pos--;
      el.textContent = actual.slice(0, pos);
      if (pos === 0) {
        borrando = false;
        i = (i + 1) % frases.length;
      }
      setTimeout(tick, 40);
    } else {
      const siguiente = frases[i];
      pos++;
      el.textContent = siguiente.slice(0, pos);
      if (pos === siguiente.length) {
        borrando = true;
        setTimeout(tick, 2200);
      } else {
        setTimeout(tick, 80);
      }
    }
  };

  setTimeout(tick, 2500);
})();
