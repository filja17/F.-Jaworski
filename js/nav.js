'use strict';

(function () {
  const burger = document.getElementById('nav-burger');
  const drawer = document.getElementById('nav-drawer');
  const close  = document.getElementById('drawer-close');

  function open() {
    drawer.classList.add('open');
    burger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function shut() {
    drawer.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
    /* restore portfolio label if visible */
    const lbl = document.getElementById('intro-label');
    if (lbl) {
      lbl.style.display = '';
      lbl.style.opacity = '1';
    }
  }

  burger.addEventListener('click', () => drawer.classList.contains('open') ? shut() : open());
  close.addEventListener('click', shut);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') shut(); });

  document.querySelectorAll('[data-page]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      shut();
      openOverlay(a.dataset.page);
    });
  });
})();
