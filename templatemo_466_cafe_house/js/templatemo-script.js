/**
 * Cafe House — interacciones del rediseño "Liquid Glass"
 */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var nav = document.querySelector('.tm-nav');
  var menuBtn = document.querySelector('.mobile-menu-icon');

  /* ---------- Preloader ---------- */
  var started = false;
  function onReady() {
    if (started) return;
    started = true;
    document.body.classList.add('loaded');
    setTimeout(initReveal, 200);
  }
  window.addEventListener('load', onReady);
  setTimeout(onReady, 2500); // por si algún recurso externo tarda demasiado

  /* ---------- Encabezado al hacer scroll ---------- */
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Píldora deslizante en la navegación ---------- */
  var indicator = nav.querySelector('.nav-indicator');
  var activeLink = nav.querySelector('a.active');

  function moveIndicator(link, instant) {
    if (!link) return;
    indicator.classList.toggle('no-anim', !!instant);
    indicator.style.width = link.offsetWidth + 'px';
    indicator.style.transform = 'translateX(' + link.offsetLeft + 'px)';
  }
  if (indicator && activeLink) {
    nav.classList.add('has-indicator');
    moveIndicator(activeLink, true);
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('mouseenter', function () { moveIndicator(a); });
    });
    nav.addEventListener('mouseleave', function () { moveIndicator(activeLink); });
    window.addEventListener('resize', function () { moveIndicator(activeLink, true); });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { moveIndicator(activeLink, true); });
    }
  }

  /* ---------- Menú móvil ---------- */
  function setMenu(open) {
    nav.classList.toggle('open', open);
    menuBtn.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  menuBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    setMenu(!nav.classList.contains('open'));
  });
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('open') && !nav.contains(e.target)) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* ---------- Aparición suave al hacer scroll ---------- */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    // Al terminar, se quita la clase para que el hover de cada tarjeta funcione normal
    function finish(el) {
      var delay = parseFloat(getComputedStyle(el).transitionDelay) || 0;
      setTimeout(function () { el.classList.remove('reveal', 'in'); }, 1200 + delay * 1000);
    }
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); finish(el); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        finish(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Brillo que sigue al cursor en el vidrio ---------- */
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.glass-interactive').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---------- Toast (aviso flotante) ---------- */
  var toast, toastTimer;
  function showToast(msg) {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    toast.innerHTML = '<i class="fa fa-check-circle"></i><span></span>';
    toast.querySelector('span').textContent = msg;
    // Forzar reflow para reiniciar la animación
    toast.classList.remove('show');
    void toast.offsetWidth;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2600);
  }

  /* ---------- Botones "Ordenar" ---------- */
  document.querySelectorAll('.js-order').forEach(function (btn) {
    var original = btn.innerHTML;
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      showToast((btn.getAttribute('data-item') || 'Producto') + ' agregado a tu pedido');
      btn.classList.add('added');
      btn.innerHTML = '<i class="fa fa-check"></i> Listo';
      setTimeout(function () {
        btn.classList.remove('added');
        btn.innerHTML = original;
      }, 1600);
    });
  });

  /* ---------- Filtros de la página de menú ---------- */
  var catBtns = document.querySelectorAll('.cat-btn');
  var menuItems = document.querySelectorAll('.menu-item');
  catBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');
      catBtns.forEach(function (b) {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      var i = 0;
      menuItems.forEach(function (item) {
        var show = filter === 'all' || item.getAttribute('data-cat') === filter;
        item.classList.remove('reveal', 'in', 'pop');
        item.classList.toggle('is-hidden', !show);
        if (show) {
          item.style.setProperty('--i', i++);
          void item.offsetWidth;
          item.classList.add('pop');
          // Quitar la animación al terminar para no bloquear el hover
          item.addEventListener('animationend', function () {
            item.classList.remove('pop');
          }, { once: true });
        }
      });
    });
  });

  /* ---------- Formulario de contacto ---------- */
  var form = document.querySelector('.tm-contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast('¡Gracias! Te responderemos pronto.');
      form.reset();
    });
  }
})();
