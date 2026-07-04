'use strict';

/* ── geometry ── */
const IS_MOBILE       = () => window.innerWidth < 768;
const STEP_PX         = IS_MOBILE() ? 300 : 600;
const STEPS_PER_ALBUM = 5;
const TOTAL_STEPS     = ALBUMS.length * STEPS_PER_ALBUM;
const JOURNEY_H       = TOTAL_STEPS * STEP_PX + window.innerHeight;

const journeyEl = document.getElementById('journey');
journeyEl.style.height = JOURNEY_H + 'px';

/* ── dom ── */
const bgStack          = document.getElementById('bg-stack');
const coverWrap        = document.getElementById('cover-wrap');
const coverImg         = document.getElementById('cover-img');
const coverPlaceholder = document.getElementById('cover-placeholder');
const albumNumber      = document.getElementById('album-number');
const albumYear        = document.getElementById('album-year');
const morphTitle       = document.getElementById('morph-title');
const morphTracks      = document.getElementById('morph-tracks');
const morphQuote       = document.getElementById('morph-quote');
const albumTags        = document.getElementById('album-tags');
const albumCta         = document.getElementById('album-cta');
const scrollHint       = document.getElementById('scroll-hint');
const progressDots     = document.getElementById('progress-dots');

/* ── state ── */
let currentAlbumIdx = -1;
let currentBgIdx    = -1;
let bgLayers        = [];
let hasScrolled     = false;
let currentLayer    = '';

/* ── build bg layers ── */
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

/* ── build progress dots ── */
function buildDots() {
  ALBUMS.forEach((album, i) => {
    const dot = document.createElement('div');
    dot.className = 'pdot';
    dot.title = album.title;
    dot.addEventListener('click', () => {
      window.scrollTo({ top: i * STEPS_PER_ALBUM * STEP_PX + 1, behavior: 'smooth' });
    });
    progressDots.appendChild(dot);
  });
}

/* ── show background — slow transition ── */
function showBg(albumIdx, bgIdx) {
  const key = `${albumIdx}-${bgIdx}`;
  if (`${currentAlbumIdx}-${currentBgIdx}` === key) return;
  currentBgIdx = bgIdx;
  bgLayers.forEach(layer => {
    const match =
      parseInt(layer.dataset.albumIdx) === albumIdx &&
      parseInt(layer.dataset.bgIdx)    === bgIdx;
    layer.classList.toggle('visible', match);
  });
}

/* ── render album ── */
function renderAlbum(album, idx) {
  if (currentAlbumIdx === idx) return;
  currentAlbumIdx = idx;

  /* hide cover — show only after new image loads to prevent flash */
  coverImg.style.opacity = '0';

  if (album.cover) {
    const tmp = new Image();
    tmp.onload = () => {
      coverImg.src   = album.cover;
      coverImg.alt   = album.title;
      coverImg.style.display  = 'block';
      coverImg.style.opacity  = '1';
      coverPlaceholder.style.display = 'none';
    };
    tmp.onerror = () => {
      coverImg.style.display = 'none';
      coverPlaceholder.style.display = 'block';
      coverPlaceholder.innerHTML = makePlaceholderSVG(album);
    };
    tmp.src = album.cover;
  } else {
    coverImg.style.display = 'none';
    coverPlaceholder.style.display = 'block';
    coverPlaceholder.innerHTML = makePlaceholderSVG(album);
  }

  coverWrap.onclick = () => {
    window.location.href = `pages/album.html?id=${album.id}`;
  };

  albumNumber.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(ALBUMS.length).padStart(2, '0')}`;
  albumYear.textContent   = album.year;
  albumCta.href = `pages/album.html?id=${album.id}`;

  morphTitle.innerHTML = album.title
    .split(' ')
    .map(w => `<span>${w}</span>`)
    .join('');

  morphTracks.innerHTML = `
    <p class="album-desc-index">${album.desc}</p>
    <div class="tracks-list">
      ${album.tracks.map((tr, i) => `
        <div class="track-row">
          <span class="track-num">${String(i + 1).padStart(2, '0')}</span>
          <span class="track-name">${tr.title}</span>
        </div>`).join('')}
    </div>`;

  morphTracks.onclick = () => window.location.href = `pages/album.html?id=${album.id}`;
  morphQuote.textContent = '';

  /* always start at title when album changes */
  currentLayer = ''; /* force reset */
  setMorphLayer('title');

  /* on mobile: always show cover when album first renders */
  if (IS_MOBILE()) {
    coverWrap.style.opacity = '1';
    coverWrap.style.pointerEvents = 'auto';
  }

  document.querySelectorAll('.pdot').forEach((d, i) => {
    d.classList.toggle('active', i === idx);
  });
}

/* ── morph layers ── */
function setMorphLayer(layer) {
  if (currentLayer === layer) return;
  currentLayer = layer;
  morphTitle.classList.toggle('active',  layer === 'title');
  morphTracks.classList.toggle('active', layer === 'tracks');
  morphQuote.classList.toggle('active',  layer === 'quote');
}

/* ── scroll ── */
function onScroll() {
  const scrollY = window.scrollY;

  if (!hasScrolled && scrollY > 10) {
    hasScrolled = true;
    scrollHint.classList.add('hidden');
  }

  const globalStep  = scrollY / STEP_PX;
  const albumIdx    = Math.min(Math.floor(globalStep / STEPS_PER_ALBUM), ALBUMS.length - 1);
  const stepInAlbum = globalStep - albumIdx * STEPS_PER_ALBUM;
  const album       = ALBUMS[albumIdx];

  renderAlbum(album, albumIdx);

  /* morph phase */
  if (stepInAlbum < 1.5) {
    setMorphLayer('title');
    if (IS_MOBILE()) {
      coverWrap.style.opacity      = '1';
      coverWrap.style.pointerEvents = 'auto';
    }
  } else {
    setMorphLayer('tracks');
    if (IS_MOBILE()) {
      coverWrap.style.opacity      = '0';
      coverWrap.style.pointerEvents = 'none';
    }
  }

  /* background crossfade — only change at step boundaries to avoid rapid switching */
  const bgCount = album.bgs.length;
  let bgIdx = 0;
  if (stepInAlbum >= 2.5 && bgCount > 1) bgIdx = 1;
  if (stepInAlbum >= 3.5 && bgCount > 2) bgIdx = 2;
  showBg(albumIdx, bgIdx);
}

/* ── placeholder svg ── */
function makePlaceholderSVG(album) {
  const c = album.color || '#888';
  return `
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
      <rect width="400" height="400" fill="#0e0e0e"/>
      ${[110,78,50,28,12].map((r, i) =>
        `<circle cx="200" cy="200" r="${r}" fill="none"
           stroke="${c}" stroke-width=".6"
           opacity="${(.06 + i * .055).toFixed(2)}"/>`
      ).join('')}
      <circle cx="200" cy="200" r="3.5" fill="${c}" opacity=".6"/>
    </svg>`;
}

/* ── init ── */
buildBgLayers();
buildDots();
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

coverImg.addEventListener('error', () => {
  coverImg.style.display = 'none';
  coverPlaceholder.style.display = 'block';
  coverPlaceholder.innerHTML = makePlaceholderSVG(ALBUMS[currentAlbumIdx] || ALBUMS[0]);
});
