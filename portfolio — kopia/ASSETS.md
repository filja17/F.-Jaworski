# Struktura assets/

Wrzucaj pliki tutaj i podmień ścieżki w js/data.js

```
assets/
│
├── covers/                    ← okładki albumów (kwadratowe, min 800×800px)
│   ├── cisza.jpg
│   ├── przeprawa.jpg
│   ├── tlo.jpg
│   ├── puls.jpg
│   ├── obraz.jpg
│   ├── zima.jpg
│   ├── granica.jpg
│   └── poczatek.jpg
│
├── backgrounds/               ← zdjęcia tła na index (landscape, min 1600×900px)
│   │                            każdy album może mieć 1–3 zdjęcia (bg[0], bg[1], bg[2])
│   ├── cisza-bg-1.jpg
│   ├── cisza-bg-2.jpg
│   ├── przeprawa-bg-1.jpg
│   ├── tlo-bg-1.jpg
│   ├── tlo-bg-2.jpg
│   └── ...
│
├── gallery/
│   ├── photo/                 ← zdjęcia do zakładki "Fotografia"
│   │   ├── 01.jpg             (dowolne proporcje, min długa krawędź 2000px)
│   │   ├── 02.jpg
│   │   └── ...
│   │
│   └── ebru/                  ← zdjęcia do zakładki "Ebru"
│       ├── 01.jpg
│       ├── 02.jpg
│       └── ...
│
├── projects/                  ← opcjonalne zdjęcia do podstron projektów
│   ├── szelest.jpg
│   ├── among-other-sounds.jpg
│   └── ...
│
└── about/
    └── portrait.jpg           ← portret do sekcji "O mnie" (pionowe, 3:4)
```

## Jak podmieniać w data.js

### Okładka albumu
```js
cover: 'assets/covers/cisza.jpg',   // zamiast: _cover(...)
```

### Tła na index (możesz dać 1, 2 lub 3 — będą crossfade przy scrollu)
```js
bgs: [
  'assets/backgrounds/cisza-bg-1.jpg',
  'assets/backgrounds/cisza-bg-2.jpg',
],
```

### Galeria fotografii
```js
const GALLERY = [
  { src: 'assets/gallery/photo/01.jpg', ar: '3/2',  caption: '' },
  { src: 'assets/gallery/photo/02.jpg', ar: '3/4',  caption: '' },
  // ar = aspect-ratio (szerokość/wysokość) — dopasuj do swoich zdjęć
  //   poziome 3:2 → '3/2'
  //   pionowe  2:3 → '2/3'
  //   kwadrat   1:1 → '1/1'
  //   panorama 16:9 → '16/9'
];
```

### Galeria Ebru
```js
const GALLERY_EBRU = [
  { src: 'assets/gallery/ebru/01.jpg', ar: '4/3', caption: '' },
  ...
];
```

### Portret
```js
const ABOUT = {
  portrait: 'assets/about/portrait.jpg',
  ...
};
```

## Formaty
- Zdjęcia: JPG (jakość 85–90) lub WebP
- Okładki: kwadrat 1:1, min 800×800px
- Tła index: landscape, min 1600×900px, będą przycięte do cover
- Galeria: dowolne, ale min 1400px po dłuższej krawędzi
- Portret: pionowy 3:4, min 800×1066px
