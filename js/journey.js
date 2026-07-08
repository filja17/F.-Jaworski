'use strict';

/* ══════════════════════════════════════
   journey.js
   - Każdy album = dokładnie 1 warstwa tła
   - Płynna zmiana tła dokładnie w połowie ekranu
   - Brak drżenia dzięki natywnej synchronizacji warstw
══════════════════════════════════════ */

const bgStack = document.getElementById('bg-stack');
const journey = document.getElementById('journey');

let bgLayers = [];

/* ── Budowanie warstw tła (zawsze 1 pierwsze zdjęcie z albumu) ── */
function buildBgLayers() {
  ALBUMS.forEach((album, ai) => {
    // Pobieramy tylko pierwsze zdjęcie z tablicy bgs
    const src = Array.isArray(album.bgs) ? album.bgs[0] : album.bgs;
    const div = document.createElement('div');
    div.className = 'bg-layer';
    div.style.backgroundImage = `url('${src}')`;
    div.dataset.ai = ai;
    bgStack.appendChild(div);
    bgLayers.push(div);
  });
}

/* ── Przełączanie widoczności tła (aktywuje tylko jedno wybrane) ── */
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
  // rootMargin "-50% 0px" sprawia, że strefa detekcji staje się wąską linią na samym środku ekranu.
  // Kiedy sekcja najeżdża na tę linię, natychmiast odpala się zmiana zdjęcia.
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const ai = parseInt(e.target.dataset.ai);
        showBg(ai);
      }
    });
  }, { rootMargin: "-50% 0px -50% 0px" });

  // Obserwujemy zarowno tytuł jak i sekcję z utworami, dzięki temu pierwsze zdjęcie 
  // zaczyna się od razu po napisie "Albumy" i trwa stabilnie aż do połowy następnego albumu.
  document.querySelectorAll('.js-title, .js-content').forEach(s => obs.observe(s));
}

/* ── Init ── */
buildBgLayers();
buildSections();
initObserver();
showBg(0); // Pierwsze zdjęcie aktywne na starcie
