'use strict';

/* ══════════════════════════════════════
   journey.js — static scroll sections
   Każdy album to sekcja w normalnym flow.
   Tła crossfade w tle przez IntersectionObserver.
══════════════════════════════════════ */

const bgStack  = document.getElementById('bg-stack');
const frame    = document.getElementById('frame');

/* ── build background layers ── */
let bgLayers = [];
function buildBgLayers() {
  ALBUMS.forEach((album, ai) => {
    album.bgs.forEach((src, bi) => {
      const div = document.createElement('div');
      div.className = 'bg-layer';
      div.style.backgroundImage = `url('${src}')`;
      div.dataset.albumIdx = ai;
      div.dataset.bgIdx    = bi;
      bgStack.appendChild(div);
      bgLayers.push(div);
    });
  });
}

function showBg(albumIdx, bgIdx) {
  bgLayers.forEach(layer => {
    const match =
      parseInt(layer.dataset.albumIdx) === albumIdx &&
      parseInt(layer.dataset.bgIdx)    === bgIdx;
    layer.classList.toggle('visible', match);
  });
}

/* ── build album sections ── */
const journey = document.getElementById('journey');

function buildAlbumSections() {
  ALBUMS.forEach((album, ai) => {
    const section = document.createElement('div');
    section.className = 'album-section';
    section.dataset.albumIdx = ai;

    section.innerHTML = `
      <!-- TITLE BLOCK -->
      <div class="as-title-block">
        <div class="as-meta">
          <span class="as-num">${String(ai + 1).padStart(2, '0')} / ${String(ALBUMS.length).padStart(2, '0')}</span>
          <span class="as-year">${album.year}</span>
        </div>
        <h2 class="as-title">${album.title}</h2>
      </div>

      <!-- COVER + TRACKS BLOCK -->
      <div class="as-content-block">
        <div class="as-cover" onclick="window.location.href='pages/album.html?id=${album.id}'">
          ${album.cover
            ? `<img src="${album.cover}" alt="${album.title}"
                onerror="this.outerHTML='<div class=\\'as-cover-placeholder\\'></div>'">`
            : `<div class="as-cover-placeholder"></div>`}
        </div>
        <div class="as-tracks">
          ${album.tracks.map((tr, i) => `
            <div class="as-track-row" onclick="window.location.href='pages/album.html?id=${album.id}'">
              <span class="as-track-num">${String(i + 1).padStart(2, '0')}</span>
              <span class="as-track-name">${tr.title}</span>
            </div>`).join('')}
          <a class="as-cta" href="pages/album.html?id=${album.id}">Słuchaj →</a>
        </div>
      </div>
    `;

    journey.appendChild(section);
  });
}

/* ── IntersectionObserver: switch bg when section enters view ── */
function initBgObserver() {
  const options = { threshold: 0.3 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const ai = parseInt(entry.target.dataset.albumIdx);
      /* which bg to show based on which block is visible */
      const isContent = entry.target.classList.contains('as-content-block');
      showBg(ai, isContent ? 1 : 0);
    });
  }, options);

  document.querySelectorAll('.album-section').forEach(section => {
    observer.observe(section);
  });

  /* also observe individual blocks for bg switching */
  const blockObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const section = entry.target.closest('.album-section');
      if (!section) return;
      const ai  = parseInt(section.dataset.albumIdx);
      const album = ALBUMS[ai];
      const bgCount = album.bgs.length;
      if (entry.target.classList.contains('as-title-block')) {
        showBg(ai, 0);
      } else if (entry.target.classList.contains('as-content-block') && bgCount > 1) {
        showBg(ai, 1);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.as-title-block, .as-content-block').forEach(block => {
    blockObs.observe(block);
  });
}

/* ── init ── */
buildBgLayers();
buildAlbumSections();
initBgObserver();

/* show first bg immediately */
showBg(0, 0);
