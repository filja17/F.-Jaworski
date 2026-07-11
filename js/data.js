'use strict';

/* ─── SVG helpers ─── */
function _bg(c1, c2) {
  const s = `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'>
    <defs><radialGradient id='g' cx='40%' cy='45%' r='70%'>
      <stop offset='0%' stop-color='${c2}'/><stop offset='100%' stop-color='${c1}'/>
    </radialGradient></defs>
    <rect width='1200' height='800' fill='url(#g)'/>
    <circle cx='600' cy='400' r='200' fill='none' stroke='rgba(255,255,255,0.025)' stroke-width='90'/>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
}
function _cover(c1, c2, label) {
  const s = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'>
    <defs><radialGradient id='g' cx='35%' cy='38%' r='75%'>
      <stop offset='0%' stop-color='${c2}'/><stop offset='100%' stop-color='${c1}'/>
    </radialGradient></defs>
    <rect width='600' height='600' fill='url(#g)'/>
    <circle cx='300' cy='280' r='140' fill='none' stroke='rgba(255,255,255,0.07)' stroke-width='1'/>
    <circle cx='300' cy='280' r='85'  fill='none' stroke='rgba(255,255,255,0.05)' stroke-width='0.8'/>
    <circle cx='300' cy='280' r='38'  fill='none' stroke='rgba(255,255,255,0.08)' stroke-width='0.6'/>
    <circle cx='300' cy='280' r='5'   fill='rgba(255,255,255,0.38)'/>
    <text x='300' y='488' text-anchor='middle' font-family='system-ui,sans-serif'
      font-size='10' letter-spacing='4' fill='rgba(255,255,255,0.16)'>${label}</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
}
function _photo(c1, c2, w, h) {
  const s = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='${c1}'/><stop offset='100%' stop-color='${c2}'/>
    </linearGradient></defs>
    <rect width='${w}' height='${h}' fill='url(#g)'/>
    <rect x='${w*.12}' y='${h*.12}' width='${w*.76}' height='${h*.76}'
      fill='none' stroke='rgba(255,255,255,0.04)' stroke-width='1'/>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
}

/* ═══════════════════════════════════
   8 ALBUMÓW
═══════════════════════════════════ */
const ALBUMS = [
  {
    id:'cisza', title:'Industry of Life Commitment', year:'2020', color:'#9ba8b0',
    cover: 'assets/covers/cisza.jpg',
    bgs: ['assets/backgrounds/cisza-bg-1.jpg','assets/backgrounds/cisza-bg-2.jpg','assets/backgrounds/cisza-bg-3.jpg'],
    tags:['ambient','drone','instrumental'],
    desc:'Zapis ciszy między dźwiękami. Album nagrany w całości na analogowym sprzęcie podczas trzech nocy w górskiej chacie.',
    quote:'Cisza nie jest brakiem dźwięku — jest jego fundamentem.',
    tracks:[
      {title:'Babushka'},
      {title:'Daily D'},
      {title:'Dysociation'},
      {title:'El camino'},
      {title:'Melting'},
      {title:'Plum Plum Bzz Bzz'},
      {title:'Reich'},
      {title:'She is dead'},
      {title:'We got no more'},
    ],
    buy:{digital:45,currency:'PLN'},
    buyUrl:'https://ko-fi.com/s/TWOJ_LINK',
    streaming:[
      {name:'Bandcamp',   icon:'◈', action:'Kup / Słuchaj', url:'#'},
      {name:'Spotify',    icon:'◉', action:'Słuchaj',       url:'https://open.spotify.com/album/3Qypn6mvBOe8xxebsoislP'},
    ],
  },
  {
    id:'przeprawa', title:'Bez kontaktu', year:'2021', color:'#b09060',
    cover: 'assets/covers/przeprawa.jpg',
    bgs: ['assets/backgrounds/przeprawa-bg-1.jpg','assets/backgrounds/przeprawa-bg-2.jpg','assets/backgrounds/przeprawa-bg-3.jpg'],
    tags:['folk','akustyczny','narracja'],
    desc:'Osiem pieśni o przekraczaniu progów — między miejscami, stanami, ludźmi. Nagrania z podróży przez Polskę.',
    quote:'Każda przeprawa zostawia ślad po obu stronach.',
    tracks:[
      {title:'Immensely Wrang'},
      {title:'On the Bridge'},
      {title:'17 minutes'},
      {title:'Sun watches its reflection in the mirror of your eyes'},
      {title:'Autumn winds did it better'},
      {title:'Glimpse at your dream'},
      {title:'It is just another night'},
      {title:'Picnic without any jokes'},
      {title:'She sleeps gently'},
    ],
    buy:{digital:39,currency:'PLN'},
    streaming:[
      {name:'Bandcamp',    icon:'◈', action:'Kup / Słuchaj', url:'#'},
      {name:'Apple Music', icon:'◎', action:'Słuchaj',       url:'#'},
    ],
  },
  {
    id:'tlo', title:'Burn Down My house', year:'2021', color:'#7a8c6e',
    cover: 'assets/covers/tlo.jpg',
    bgs: ['assets/backgrounds/tlo-bg-1.jpg','assets/backgrounds/tlo-bg-2.jpg','assets/backgrounds/tlo-bg-3.jpg'],
    tags:['ambient','field recording','tekstury'],
    desc:'Nagrania terenowe splecione z elektroniką. Dźwięk jako przestrzeń do myślenia.',
    quote:'Tło jest tym, czego nie słuchasz — ale bez niego wszystko milknie.',
    tracks:[
      {title:'Private Crank'},
      {title:'Fading'},
      {title:'Faded'},
      {title:'In the Garden Without Greed'},
      {title:'A Posthumous Whisper'},
      {title:'Then I'},
    ],
    buy:{digital:35,currency:'PLN'},
    streaming:[{name:'Bandcamp',icon:'◈',action:'Kup / Słuchaj',url:'#'}],
  },
  {
    id:'puls', title:'It feels like rain', year:'2023', color:'#a06060',
    cover: 'assets/covers/puls.jpg',
    bgs: ['assets/backgrounds/puls-bg-1.jpg','assets/backgrounds/puls-bg-2.jpg','assets/backgrounds/puls-bg-3.jpg'],
    tags:['elektronika','rytm','taneczny'],
    desc:'Eksploracja rytmu jako formy oddychania. Minimalizm perkusyjny w służbie transu.',
    quote:'Puls poprzedza myśl.',
    tracks:[
      {title:'Last day of 11th flor'},
      {title:'Maybe inside out'},
      {title:'Drizzle'},
      {title:'Paranoia'},
      {title:'Scary monsters among freeks'},
      {title:'Cant talk to tell'},
      {title:'The End to another End'},
      {title:'It feels like rain'},
    ],
    buy:{digital:42,currency:'PLN'},
    streaming:[
      {name:'Bandcamp',icon:'◈',action:'Kup / Słuchaj',url:'#'},
      {name:'Spotify', icon:'◉',action:'Słuchaj',      url:'https://open.spotify.com/album/4Rg51X5w9fH43JT5g3dmuh?si=mvuGzm5hSHqfIwzj02L2-w'},
    ],
  },
  {
    id:'obraz', title:'Tension with no Solution', year:'2023', color:'#8878a8',
    cover: 'assets/covers/obraz.jpg',
    bgs: ['assets/backgrounds/obraz-bg-1.jpg','assets/backgrounds/obraz-bg-2.jpg','assets/backgrounds/obraz-bg-3.jpg'],
    tags:['ambient','synth','filmowy'],
    desc:'Muzyka komponowana do obrazów, które nie istnieją. Ścieżka dźwiękowa wyobraźni.',
    quote:'Każdy dźwięk rysuje kształt w ciemności.',
    tracks:[
      {title:'One way trip to Malaroca'},
      {title:'Closer to being closed'},
      {title:'Day'},
      {title:'Smog'},
      {title:'Fleo'},
      {title:'A Submissive Smile'},
      {title:'One Day with Ayn Rand'},
    ],
    buy:{digital:39,currency:'PLN'},
    streaming:[
      {name:'Bandcamp',    icon:'◈',action:'Kup / Słuchaj',url:'#'},
      {name:'Spotify',     icon:'◉',action:'Słuchaj',      url:'https://open.spotify.com/album/6AyCubuS0wxscaxZWN8cO4?si=AqvruKmATUutaf7eY6vyuQ'},
      {name:'Apple Music', icon:'◎',action:'Słuchaj',      url:'#'},
    ],
  },
  {
    id:'zima', title:'7284th morning on Earth', year:'2023', color:'#8899aa',
    cover: 'assets/covers/zima.jpg',
    bgs: ['assets/backgrounds/zima-bg-1.jpg','assets/backgrounds/zima-bg-2.jpg','assets/backgrounds/zima-bg-3.jpg'],
    tags:['ambient','fortepian','sezonowy'],
    desc:'Nagrany w grudniu, w nieogrzewanym pomieszczeniu. Słyszysz mróz w artykulacji.',
    quote:'Zima uczy cierpliwości wobec pustki.',
    tracks:[
      {title:'Ornitological proof'},
      {title:'Valeriana before upcoming life'},
      {title:'Marimm'},
      {title:'Ambient'},
      {title:'Space with no time, Unconcern'},
      {title:'Avalanch'},
      {title:'Myriada'},
      {title:'Yellow ractangel'},
    ],
    buy:{digital:35,currency:'PLN'},
    streaming:[
      {name:'Bandcamp',icon:'◈',action:'Kup / Słuchaj',url:'#'},
      {name:'Spotify',icon:'◉',action:'Słuchaj',url:'https://open.spotify.com/album/2O8tdcWAPwzVSIeFEJGUZb?si=LldAR-WjQN6QSziks5R4jw'},
    ],
  },
  {
    id:'granica', title:'Granica', year:'2020', color:'#a89060',
    cover: 'assets/covers/granica.jpg',
    bgs: ['assets/backgrounds/granica-bg-1.jpg','assets/backgrounds/granica-bg-2.jpg','assets/backgrounds/granica-bg-3.jpg'],
    tags:['eksperymentalny','noise','improwizowany'],
    desc:'Nagrania na granicy słyszalności i znośności. Eksploracja progu bólu i piękna.',
    quote:'Granica jest miejscem, nie linią.',
    tracks:[
      {title:'Strona A'},
      {title:'Strona B'},
    ],
    buy:{digital:30,currency:'PLN'},
    streaming:[{name:'Bandcamp',icon:'◈',action:'Kup / Słuchaj',url:'#'}],
  },
  {
    id:'poczatek', title:'Początek', year:'2018', color:'#708090',
    cover: 'assets/covers/poczatek.jpg',
    bgs: ['assets/backgrounds/poczatek-bg-1.jpg','assets/backgrounds/poczatek-bg-2.jpg','assets/backgrounds/poczatek-bg-3.jpg'],
    tags:['debiut','elektronika','szkice'],
    desc:'Pierwszy album. Nagrany na laptopie, w akademiku, między wykładami. Niedoskonały celowo.',
    quote:'Każdy musi zacząć od czegoś niedokończonego.',
    tracks:[
      {title:'Szkic 1'},
      {title:'Szkic 2'},
      {title:'Szkic 3'},
      {title:'Szkic 4'},
      {title:'Szkic 5'},
      {title:'Szkic 6'},
      {title:'Szkic 7'},
    ],
    buy:{digital:20,currency:'PLN'},
    streaming:[
      {name:'Bandcamp',icon:'◈',action:'Kup / Słuchaj',url:'#'},
      {name:'Spotify', icon:'◉',action:'Słuchaj',      url:'#'},
    ],
  },
];

/* ─── PROJEKTY ARTYSTYCZNE ─── */
const PROJECTS = [
  {
    id:'szelest',
    name:'Szelest',
    year:'2022–2024',
    tag:'sound art',
    desc:'Projekt dźwiękowy eksplorujący dźwięki marginalne — to, co słychać na granicy percepcji. Instalacje i nagrania oparte na dźwiękach codziennych przedmiotów, tkanin, papieru.',
    tracks:[
      {title:'Papier'},
      {title:'Tkanina'},
      {title:'Suche liście'},
      {title:'Drewno'},
    ],
  },
  {
    id:'arbitraz-sztuki',
    name:'Arbitraż Sztuki',
    year:'2025–obecnie',
    tag:'warsztaty artystyczne',
    desc:'Cykl warsztatów artystycznych poświęconych wielom techniką artystycznym, jak i warsztatowo, tak i od strony teoretycznej. Współtworzone z dwoma wspaniałymi artystkami - Dominika Rozkrut i Helena Pryżanowską',
    link:'https://arbitrazsztuki.pl',
    tracks:[],
  },
  {
    id:'lekkosc',
    name:'Lekkość',
    year:'2026',
    tag:'chusty',
    desc:'Projekt chust artystycznych z wykorzystaniem szerokiego spektrum technik, głównie skupiających się dookoła pigmentó naturalnych, barwników naturalnych i metody marmurkowej',
    tracks:[],
  },
  {
    id:'among-other-sounds',
    name:'Among Other Sounds',
    year:'2025–obecnie',
    tag:'minimal/loop recording',
    desc:'Projekt muzyczny, z wykorzystaniem klarnetu, pianina, syntezatorów i wielu innych. Założeniem projektu jest odsuzkiwanie atmosfery i ekspresji, poprzez wykorzystanie jaknjabrdziej okrojonych form kompozycyjnych. Innymi słowy ukazanie jaknajszerszego spektrum emocji, barwy, lekkości, uzywając jaknajmniejszej ilości środków muzycznych.',
    tracks:[
      {title:'Huta Cynku, Miasteczko Śląskie'},
      {title:'Wioska Gori, Gruzja'},
      {title:'Plaża Reynisfjara, Islandia'},
      {title:'Kopalnia Guido, Zabrze'},
    ],
  },
  {
    id:'nota-contra-notam',
    name:'Nota Contra Notam',
    year:'2020–2026',
    tag:'muzyka elektroniczna',
    desc:'Projekt, w którym inspiracjami były klasyczne utowry drummbasowe, ',
    tracks:[
      {title:'NCN I'},
      {title:'NCN II'},
      {title:'NCN III'},
      {title:'NCN IV'},
    ],
  },
  {
    id:'kamaw-tut',
    name:'Kamaw Tut',
    year:'2019–2021',
    tag:'kolaboracja',
    desc:'Współpraca artystyczna dookoła form alternatywnego rocka, funku, krautrocka, z takimi twórcami jak Bernar Mileau, Jędrek Woźniak czy Michał Kilijanek',
     },
  {
    id:'drumless-blonde-heads',
    name:'Drumless Blonde Heads',
    year:'2018–2019',
    tag:'band',
    desc:'Pierwszy projekt muzyczny, będący połączeniem licznych ścierzek gitarowych, licznych pogłosów, przesterów i ciszy w głośności. Inspirowany krautrockiem i kompozycjami Jozefa Van Wissema',
     },
];

/* ─── O MNIE ─── */
const ABOUT = {
  portrait: 'assets/about/portrait.jpg',
  paragraphs: [
    'Założeniem jest wyrazić siebie, nieważne do jkaiego medium podchodzę, liczy się tylko wolnośc jakie w nim się dobija',
    'Nagrywam ambient, muzykę eksperymentalną i akustyczną, jednak określanie gatunku jest porblematyczne, ponieważ to wszstko jest na temat barwy, równowagi i adekwatności',
    'Spełniam się również w sztukach plastycznych, yuzywając pigmentów naturlanych czy malarstwem na wodzie tzw. Ebru',
    'Tworzenie jest życiem, życie bez towrzenia jest popadaneim w nieadekwatność i ciężkość',
  ],
};

/* ═══════════════════════════════════
   GALERIA FOTOGRAFII (Zaktualizowana do 9 serii)
═══════════════════════════════════ */
const GALLERY = [
  {
    cover: 'assets/gallery/photo/seria-1/01.jpg',
    title: 'Seria 1',
    images: [
      'assets/gallery/photo/seria-1/01.jpg', 'assets/gallery/photo/seria-1/02.jpg',
      'assets/gallery/photo/seria-1/03.jpg', 'assets/gallery/photo/seria-1/04.jpg',
      'assets/gallery/photo/seria-1/05.jpg', 'assets/gallery/photo/seria-1/06.jpg',
      'assets/gallery/photo/seria-1/07.jpg', 'assets/gallery/photo/seria-1/08.jpg',
      'assets/gallery/photo/seria-1/09.jpg', 'assets/gallery/photo/seria-1/10.jpg',
      'assets/gallery/photo/seria-1/11.jpg', 'assets/gallery/photo/seria-1/12.jpg',
      'assets/gallery/photo/seria-1/13.jpg', 'assets/gallery/photo/seria-1/14.jpg',
      'assets/gallery/photo/seria-1/15.jpg', 'assets/gallery/photo/seria-1/16.jpg',
      'assets/gallery/photo/seria-1/17.jpg', 'assets/gallery/photo/seria-1/18.jpg',
      'assets/gallery/photo/seria-1/19.jpg', 'assets/gallery/photo/seria-1/20.jpg',
      'assets/gallery/photo/seria-1/21.jpg', 'assets/gallery/photo/seria-1/22.jpg',
      'assets/gallery/photo/seria-1/23.jpg', 'assets/gallery/photo/seria-1/24.jpg',
      'assets/gallery/photo/seria-1/25.jpg', 'assets/gallery/photo/seria-1/26.jpg',
      'assets/gallery/photo/seria-1/27.jpg', 'assets/gallery/photo/seria-1/28.jpg',
      'assets/gallery/photo/seria-1/29.jpg'
    ],
  },
  {
    cover: 'assets/gallery/photo/seria-2/01.jpg',
    title: 'Seria 2',
    images: [
      'assets/gallery/photo/seria-2/01.jpg', 'assets/gallery/photo/seria-2/02.jpg',
      'assets/gallery/photo/seria-2/03.jpg', 'assets/gallery/photo/seria-2/04.jpg',
      'assets/gallery/photo/seria-2/05.jpg', 'assets/gallery/photo/seria-2/06.jpg',
      'assets/gallery/photo/seria-2/07.jpg', 'assets/gallery/photo/seria-2/08.jpg',
      'assets/gallery/photo/seria-2/09.jpg', 'assets/gallery/photo/seria-2/10.jpg',
      'assets/gallery/photo/seria-2/11.jpg', 'assets/gallery/photo/seria-2/12.jpg',
      'assets/gallery/photo/seria-2/13.jpg', 'assets/gallery/photo/seria-2/14.jpg',
      'assets/gallery/photo/seria-2/15.jpg', 'assets/gallery/photo/seria-2/16.jpg',
      'assets/gallery/photo/seria-2/17.jpg', 'assets/gallery/photo/seria-2/18.jpg',
      'assets/gallery/photo/seria-2/19.jpg', 'assets/gallery/photo/seria-2/20.jpg',
      'assets/gallery/photo/seria-2/21.jpg', 'assets/gallery/photo/seria-2/22.jpg',
      'assets/gallery/photo/seria-2/23.jpg', 'assets/gallery/photo/seria-2/24.jpg'
    ],
  },
  {
    cover: 'assets/gallery/photo/seria-3/01.jpg',
    title: 'Seria 3',
    images: [
      'assets/gallery/photo/seria-3/01.jpg', 'assets/gallery/photo/seria-3/02.jpg',
      'assets/gallery/photo/seria-3/03.jpg', 'assets/gallery/photo/seria-3/04.jpg',
      'assets/gallery/photo/seria-3/05.jpg', 'assets/gallery/photo/seria-3/06.jpg',
      'assets/gallery/photo/seria-3/07.jpg', 'assets/gallery/photo/seria-3/08.jpg'
    ],
  },
  {
    cover: 'assets/gallery/photo/seria-4/01.jpg',
    title: 'Seria 4',
    images: [
      'assets/gallery/photo/seria-4/01.jpg', 'assets/gallery/photo/seria-4/02.jpg',
      'assets/gallery/photo/seria-4/03.jpg', 'assets/gallery/photo/seria-4/04.jpg',
      'assets/gallery/photo/seria-4/05.jpg', 'assets/gallery/photo/seria-4/06.jpg',
      'assets/gallery/photo/seria-4/07.jpg', 'assets/gallery/photo/seria-4/08.jpg'
    ],
  },
  {
    cover: 'assets/gallery/photo/seria-5/01.jpg',
    title: 'Seria 5',
    images: [
      'assets/gallery/photo/seria-5/01.jpg', 'assets/gallery/photo/seria-5/02.jpg',
      'assets/gallery/photo/seria-5/03.jpg', 'assets/gallery/photo/seria-5/04.jpg',
      'assets/gallery/photo/seria-5/05.jpg', 'assets/gallery/photo/seria-5/06.jpg',
      'assets/gallery/photo/seria-5/07.jpg', 'assets/gallery/photo/seria-5/08.jpg',
      'assets/gallery/photo/seria-5/09.jpg', 'assets/gallery/photo/seria-5/10.jpg',
      'assets/gallery/photo/seria-5/11.jpg', 'assets/gallery/photo/seria-5/12.jpg',
      'assets/gallery/photo/seria-5/13.jpg'
    ],
  },
  {
    cover: 'assets/gallery/photo/seria-6/01.jpg',
    title: 'Seria 6',
    images: [
      'assets/gallery/photo/seria-6/01.jpg', 'assets/gallery/photo/seria-6/02.jpg',
      'assets/gallery/photo/seria-6/03.jpg', 'assets/gallery/photo/seria-6/04.jpg',
      'assets/gallery/photo/seria-6/05.jpg', 'assets/gallery/photo/seria-6/06.jpg',
      'assets/gallery/photo/seria-6/07.jpg', 'assets/gallery/photo/seria-6/08.jpg',
      'assets/gallery/photo/seria-6/09.jpg', 'assets/gallery/photo/seria-6/10.jpg'
    ],
  },
  {
    cover: 'assets/gallery/photo/seria-7/01.jpg',
    title: 'Seria 7',
    images: [
      'assets/gallery/photo/seria-7/01.jpg', 'assets/gallery/photo/seria-7/02.jpg',
      'assets/gallery/photo/seria-7/03.jpg', 'assets/gallery/photo/seria-7/04.jpg',
      'assets/gallery/photo/seria-7/05.jpg', 'assets/gallery/photo/seria-7/06.jpg',
      'assets/gallery/photo/seria-7/07.jpg', 'assets/gallery/photo/seria-7/08.jpg',
      'assets/gallery/photo/seria-7/09.jpg', 'assets/gallery/photo/seria-7/10.jpg',
      'assets/gallery/photo/seria-7/11.jpg', 'assets/gallery/photo/seria-7/12.jpg'
    ],
  },
  {
    cover: 'assets/gallery/photo/seria-8/01.jpg',
    title: 'Seria 8',
    images: [
      'assets/gallery/photo/seria-8/01.jpg', 'assets/gallery/photo/seria-8/02.jpg',
      'assets/gallery/photo/seria-8/03.jpg', 'assets/gallery/photo/seria-8/04.jpg',
      'assets/gallery/photo/seria-8/05.jpg', 'assets/gallery/photo/seria-8/06.jpg',
      'assets/gallery/photo/seria-8/07.jpg', 'assets/gallery/photo/seria-8/08.jpg',
      'assets/gallery/photo/seria-8/09.jpg'
    ],
  },
  {
    cover: 'assets/gallery/photo/seria-9/01.jpg',
    title: 'Seria 9',
    images: [
      'assets/gallery/photo/seria-9/01.jpg', 'assets/gallery/photo/seria-9/02.jpg',
      'assets/gallery/photo/seria-9/03.jpg', 'assets/gallery/photo/seria-9/04.jpg',
      'assets/gallery/photo/seria-9/05.jpg', 'assets/gallery/photo/seria-9/06.jpg',
      'assets/gallery/photo/seria-9/07.jpg', 'assets/gallery/photo/seria-9/08.jpg',
      'assets/gallery/photo/seria-9/09.jpg', 'assets/gallery/photo/seria-9/10.jpg',
      'assets/gallery/photo/seria-9/11.jpg'
    ],
  },
];

/* ─── GALERIA EBRU ─── */
const GALLERY_EBRU = [
  {
    cover: 'assets/gallery/ebru/seria-1/01.jpg',
    title: 'Seria 1',
    images: [
      'assets/gallery/ebru/seria-1/01.jpg', 'assets/gallery/ebru/seria-1/02.jpg',
      'assets/gallery/ebru/seria-1/03.jpg', 'assets/gallery/ebru/seria-1/04.jpg',
      'assets/gallery/ebru/seria-1/05.jpg', 'assets/gallery/ebru/seria-1/06.jpg',
      'assets/gallery/ebru/seria-1/07.jpg', 'assets/gallery/ebru/seria-1/08.jpg',
      'assets/gallery/ebru/seria-1/09.jpg', 'assets/gallery/ebru/seria-1/10.jpg',
      'assets/gallery/ebru/seria-1/11.jpg', 'assets/gallery/ebru/seria-1/12.jpg',
      'assets/gallery/ebru/seria-1/13.jpg', 'assets/gallery/ebru/seria-1/14.jpg',
      'assets/gallery/ebru/seria-1/15.jpg',
    ],
  },
  {
    cover: 'assets/gallery/ebru/seria-2/01.jpg',
    title: 'Seria 2',
    images: [
      'assets/gallery/ebru/seria-2/01.jpg', 'assets/gallery/ebru/seria-2/02.jpg',
      'assets/gallery/ebru/seria-2/03.jpg', 'assets/gallery/ebru/seria-2/04.jpg',
      'assets/gallery/ebru/seria-2/05.jpg', 'assets/gallery/ebru/seria-2/06.jpg',
      'assets/gallery/ebru/seria-2/07.jpg', 'assets/gallery/ebru/seria-2/08.jpg',
      'assets/gallery/ebru/seria-2/09.jpg', 'assets/gallery/ebru/seria-2/10.jpg',
      'assets/gallery/ebru/seria-2/11.jpg', 'assets/gallery/ebru/seria-2/12.jpg',
      'assets/gallery/ebru/seria-2/13.jpg', 'assets/gallery/ebru/seria-2/14.jpg',
      'assets/gallery/ebru/seria-2/15.jpg',
    ],
  },
  {
    cover: 'assets/gallery/ebru/seria-3/01.jpg',
    title: 'Seria 3',
    images: [
      'assets/gallery/ebru/seria-3/01.jpg', 'assets/gallery/ebru/seria-3/02.jpg',
      'assets/gallery/ebru/seria-3/03.jpg', 'assets/gallery/ebru/seria-3/04.jpg',
      'assets/gallery/ebru/seria-3/05.jpg', 'assets/gallery/ebru/seria-3/06.jpg',
      'assets/gallery/ebru/seria-3/07.jpg', 'assets/gallery/ebru/seria-3/08.jpg',
      'assets/gallery/ebru/seria-3/09.jpg', 'assets/gallery/ebru/seria-3/10.jpg',
      'assets/gallery/ebru/seria-3/11.jpg', 'assets/gallery/ebru/seria-3/12.jpg',
      'assets/gallery/ebru/seria-3/13.jpg', 'assets/gallery/ebru/seria-3/14.jpg',
      'assets/gallery/ebru/seria-3/15.jpg',
    ],
  },
];

/* ─── KONTAKT ─── */
const CONTACT = {
  intro:'Chętnie porozmawiam o współpracy, instalacjach, muzyce do filmów i spektakli.',
  links:[
    {label:'Email',    val:'kontakt@example.com', href:'mailto:kontakt@example.com'},
    {label:'Instagram',val:'@nazwa',               href:'https://instagram.com'},
  ],
};
