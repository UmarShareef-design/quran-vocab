/* ============================================
   LearnQuranwords — Shared Logic
   Extracted from inline scripts for reuse
   ============================================ */

// ========== SURAH NAME LOOKUP (1–114) ==========
const SURAH_NAMES = {
  1:'Al-Fatihah',2:'Al-Baqarah',3:'Ali \'Imran',4:'An-Nisa',5:'Al-Ma\'idah',
  6:'Al-An\'am',7:'Al-A\'raf',8:'Al-Anfal',9:'At-Tawbah',10:'Yunus',
  11:'Hud',12:'Yusuf',13:'Ar-Ra\'d',14:'Ibrahim',15:'Al-Hijr',
  16:'An-Nahl',17:'Al-Isra',18:'Al-Kahf',19:'Maryam',20:'Taha',
  21:'Al-Anbya',22:'Al-Hajj',23:'Al-Mu\'minun',24:'An-Nur',25:'Al-Furqan',
  26:'Ash-Shu\'ara',27:'An-Naml',28:'Al-Qasas',29:'Al-\'Ankabut',30:'Ar-Rum',
  31:'Luqman',32:'As-Sajdah',33:'Al-Ahzab',34:'Saba',35:'Fatir',
  36:'Ya-Sin',37:'As-Saffat',38:'Sad',39:'Az-Zumar',40:'Ghafir',
  41:'Fussilat',42:'Ash-Shuraa',43:'Az-Zukhruf',44:'Ad-Dukhan',45:'Al-Jathiyah',
  46:'Al-Ahqaf',47:'Muhammad',48:'Al-Fath',49:'Al-Hujurat',50:'Qaf',
  51:'Adh-Dhariyat',52:'At-Tur',53:'An-Najm',54:'Al-Qamar',55:'Ar-Rahman',
  56:'Al-Waqi\'ah',57:'Al-Hadid',58:'Al-Mujadila',59:'Al-Hashr',60:'Al-Mumtahanah',
  61:'As-Saf',62:'Al-Jumu\'ah',63:'Al-Munafiqun',64:'At-Taghabun',65:'At-Talaq',
  66:'At-Tahrim',67:'Al-Mulk',68:'Al-Qalam',69:'Al-Haqqah',70:'Al-Ma\'arij',
  71:'Nuh',72:'Al-Jinn',73:'Al-Muzzammil',74:'Al-Muddaththir',75:'Al-Qiyamah',
  76:'Al-Insan',77:'Al-Mursalat',78:'An-Naba',79:'An-Nazi\'at',80:'\'Abasa',
  81:'At-Takwir',82:'Al-Infitar',83:'Al-Mutaffifin',84:'Al-Inshiqaq',85:'Al-Buruj',
  86:'At-Tariq',87:'Al-A\'la',88:'Al-Ghashiyah',89:'Al-Fajr',90:'Al-Balad',
  91:'Ash-Shams',92:'Al-Layl',93:'Ad-Duhaa',94:'Ash-Sharh',95:'At-Tin',
  96:'Al-\'Alaq',97:'Al-Qadr',98:'Al-Bayyinah',99:'Az-Zalzalah',100:'Al-\'Adiyat',
  101:'Al-Qari\'ah',102:'At-Takathur',103:'Al-\'Asr',104:'Al-Humazah',105:'Al-Fil',
  106:'Quraysh',107:'Al-Ma\'un',108:'Al-Kawthar',109:'Al-Kafirun',110:'An-Nasr',
  111:'Al-Masad',112:'Al-Ikhlas',113:'Al-Falaq',114:'An-Nas'
};

// ========== VERSE FORMATTING ==========
function formatVerseRef(verse) {
  const [surah, ayah] = verse.split(':');
  const name = SURAH_NAMES[parseInt(surah)] || `Surah ${surah}`;
  return `Surah ${name}, Verse ${ayah}`;
}

// Short format for compact grid items (drops "Surah" prefix and "Verse" label)
function formatVerseRefShort(verse) {
  const [surah, ayah] = verse.split(':');
  const name = SURAH_NAMES[parseInt(surah)] || `Surah ${surah}`;
  return `${name}, ${ayah}`;
}

function verseLink(verse) {
  const [surah, ayah] = verse.split(':');
  return `https://quran.com/${surah}/${ayah}`;
}

// ========== VOCALIZED ARABIC DISPLAY ==========
function displayArabic(word) {
  return (typeof VOCALIZED !== 'undefined' && VOCALIZED[word.id]) || word.arabic;
}

// ========== MEANING LETTER GROUPING ==========
const STOP_WORDS = ['the', 'a', 'an', 'he', 'she', 'they', 'you', 'his', 'her', 'its', 'and', 'or', 'from', 'in', 'of', 'to', 'is', 'was', 'were', 'most', 'very', 'that', 'this', 'those', 'these'];

function getMeaningLetter(word) {
  let text = word.meaning.toLowerCase().replace(/[^a-z ]/g, '').trim();
  const words = text.split(/\s+/);
  let i = 0;
  while (i < words.length && STOP_WORDS.includes(words[i])) i++;
  const key = words[i] || words[0] || ' ';
  return key.charAt(0).toUpperCase();
}

// ========== EXAMPLE PARSING ==========
function parseExample(example) {
  const parts = example.split(' — ');
  if (parts.length === 2) {
    return { arabic: parts[0], english: parts[1] };
  }
  return { arabic: '', english: example };
}

// ========== SAVED COUNT SYNC ==========
// Counts: individual bookmarked words + unique words from saved similar pairs
function syncSavedCount() {
  try {
    const bookmarked = JSON.parse(localStorage.getItem('qv_bookmarked') || '[]');
    const savedPairs = JSON.parse(localStorage.getItem('qv_saved_pairs') || '[]');
    
    // Count words from saved pairs (words derived from pair keys)
    const pairWordIds = new Set();
    if (savedPairs.length > 0 && typeof SIMILAR_PAIRS !== 'undefined') {
      savedPairs.forEach(function(key) {
        SIMILAR_PAIRS.forEach(function(p) {
          const pairKey = p.arabic1 + '|' + p.arabic2;
          if (pairKey === key) {
            // Find word IDs for both words in the pair
            if (typeof quranVocabulary !== 'undefined') {
              quranVocabulary.forEach(function(w) {
                if (w.arabic === p.arabic1 || w.arabic === p.arabic2) {
                  pairWordIds.add(w.id);
                }
              });
            }
          }
        });
      });
    }
    
    // Exclude pair words that are already individually bookmarked
    const bookmarkedSet = new Set(bookmarked);
    const uniquePairWordIds = [...pairWordIds].filter(function(id) {
      return !bookmarkedSet.has(id);
    });
    
    const totalCount = bookmarked.length + uniquePairWordIds.length;
    
    ['saved-count', 'saved-count-mobile'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const prev = el.dataset.count;
        el.textContent = totalCount;
        el.dataset.count = totalCount;
        if (prev !== String(totalCount) && typeof el.offsetWidth !== 'undefined') {
          el.classList.remove('pop');
          void el.offsetWidth; // reflow
          el.classList.add('pop');
        }
      }
    });
  } catch(e) {}
}

// ========== MOBILE MENU ==========
function toggleMobileMenu() {
  const menu = document.getElementById('nav-mobile-menu');
  const hamburger = document.getElementById('nav-hamburger');
  if (!menu || !hamburger) return;
  const isOpen = menu.classList.contains('open');
  menu.classList.toggle('open');
  hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

function closeMobileMenu() {
  const menu = document.getElementById('nav-mobile-menu');
  const hamburger = document.getElementById('nav-hamburger');
  if (menu) menu.classList.remove('open');
  if (hamburger) {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
  document.body.style.overflow = '';
}

// ========== SCROLL TO TOP VISIBILITY ==========
function initScrollToTop() {
  var btn = document.getElementById('scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', function() {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

// ========== KEYBOARD NAV FOR GRID ITEMS ==========
function initGridKeyboardNav() {
  document.addEventListener('keydown', function(e) {
    if ((e.code === 'Enter' || e.code === 'Space') && e.target.classList.contains('word-grid-item')) {
      e.preventDefault();
      e.target.click();
    }
  });
}
