'use strict';

(function () {
  const burger = document.getElementById('nav-burger');
  const drawer = document.getElementById('nav-drawer');
  const close  = document.getElementById('drawer-close');

  function open() {
    if (drawer && burger) {
      drawer.classList.add('open');
      burger.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }
  function shut() {
    if (drawer && burger) {
      drawer.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (burger) {
    burger.addEventListener('click', () => drawer && drawer.classList.contains('open') ? shut() : open());
  }
  if (close) close.addEventListener('click', shut);
  
  document.addEventListener('keydown', e => { if (e.key === 'Escape') shut(); });

  document.querySelectorAll('[data-page]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      shut();
      if (typeof openOverlay === 'function') {
        openOverlay(a.dataset.page);
      }
    });
  });
})();
