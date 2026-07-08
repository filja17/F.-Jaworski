'use strict';

/* ══════════════════════════════════════
   journey.js
   - Każdy album = dokładnie 1 warstwa tła
   - Start bez zdjęć (czyste intro z wideo)
   - Płynne włączanie tła od pierwszego albumu dokładnie w połowie ekranu
══════════════════════════════════════ */

const bgStack = document.getElementById('bg-stack');
const journey = document.getElementById('journey');

let bgLayers = [];

/* ── Budowanie warstw tła ── */
function buildBgLayers() {
  ALBUMS.forEach((album, ai) => {
    const src = Array.isArray(album.bgs) ? album.bgs[0] : album.bgs;
    const div = document.createElement('div');
    div.className = 'bg-layer';
    div.style.backgroundImage = `url('${src}')`;
    div.dataset.ai = ai;
    bgStack.appendChild(div);
    bgLayers.push(div);
  });
}

/* ── Przełączanie widoczności tła (ai = -1 oznacza ukrycie wszystkich teł) ── */
function showBg(ai) {
  bgLayers.forEach(l => {
    l.classList.toggle('visible', parseInt(l.dataset.ai) === ai);
  });
}

/* ── Budowanie sekcji treści albumów ── */
function buildSections() {
  ALBUMS.forEach((album, ai) => {

    /* SEKCJA 1: Tytuł albumu (100vh) */
    const titleSec = document.createElement('div');
    titleSec.className = 'js-title';
    titleSec.dataset.ai = ai;
    titleSec.innerHTML = `
      <div class="jt-meta">
        <span class="jt-num">${String(ai+1).padStart(2,'0')} / ${String(ALBUMS.length).padStart(2,'0')}</span>
        <span class="jt-year">${album.year}</span>
      </div>
      <h2 class="jt-title">${album.title}</h2>`;
    journey.appendChild(titleSec);

    /* SEKCJA 2: Okładka + utwory (100vh) */
    const contentSec = document.createElement('div');
    contentSec.className = 'js-content';
    contentSec.dataset.ai = ai;
    contentSec.innerHTML = `
      <div class="jc-cover" onclick="location.href='pages/album.html?id=${album.id}'">
        ${album.cover
          ? `<img src="${album.cover}" alt="${album.title}" onerror="this.style.display='none'">`
          : `<div class="jc-placeholder"></div>`}
      </div>
      <div class="jc-tracks">
        ${album.tracks.map((tr, i) => `
          <div class="jc-row" onclick="location.href='pages/album.html?id=${album.id}'">
            <span class="jc-num">${String(i+1).padStart(2,'0')}</span>
            <span class="jc-name">${tr.title}</span>
          </div>`).join('')}
        <a class="jc-cta" href="pages/album.html?id=${album.id}">Zobacz album →</a>
      </div>`;
    journey.appendChild(contentSec);
  });
}

/* ── Precyzyjny IntersectionObserver (wycelowany w środek ekranu) ── */
function initObserver() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        // Jeśli środkową linię przetnie sekcja intro, przekazujemy ai = -1 (co gasi zdjęcia)
        const ai = e.target.id === 'intro-section' ? -1 : parseInt(e.target.dataset.ai);
        showBg(ai);
      }
    });
  }, { rootMargin: "-50% 0px -50% 0px" });

  // Obserwujemy sekcje albumów
  document.querySelectorAll('.js-title, .js-content').forEach(s => obs.observe(s));
  
  // Obserwujemy sekcję intro, aby wiedzieć kiedy użytkownik wrócił na samą górę
  const intro = document.getElementById('intro-section');
  if (intro) {
    obs.observe(intro);
  }
}

/* ── Init ── */
buildBgLayers();
buildSections();
initObserver();
// USUNIĘTO: showBg(0) - dzięki temu strona startuje w pełnej czerni bez zdjęcia w tle!
