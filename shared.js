/* ============================================
   LearnQuranwords — Shared Logic
   Extracted from inline scripts for reuse
   ============================================ */

// ========== CLEAN URL NORMALIZATION ==========
// Keep .html out of the address bar when pages are opened directly.
function normalizeExtensionlessUrl() {
  try {
    if (window.location.protocol !== 'http:' && window.location.protocol !== 'https:') return;
    const path = window.location.pathname;
    if (!/\.html$/i.test(path)) return;

    let cleanPath = path.replace(/index\.html$/i, '');
    cleanPath = cleanPath.replace(/\.html$/i, '');
    if (cleanPath === '') cleanPath = '/';

    const current = path + window.location.search + window.location.hash;
    const target = cleanPath + window.location.search + window.location.hash;
    if (current !== target) {
      window.history.replaceState({}, '', target);
    }
  } catch(e) {}
}

normalizeExtensionlessUrl();

// ========== GA4 EVENT TRACKING ==========
const GA_MEASUREMENT_ID = 'G-7PB10R3FZK';
const ANALYTICS_CONSENT_KEY = 'lqw_analytics_consent';
let analyticsScriptLoaded = false;

function getAnalyticsConsent() {
  try {
    return localStorage.getItem(ANALYTICS_CONSENT_KEY);
  } catch(e) {
    return null;
  }
}

function hasAnalyticsConsent() {
  return getAnalyticsConsent() === 'granted';
}

function loadGoogleAnalytics() {
  if (analyticsScriptLoaded || !hasAnalyticsConsent()) return;
  analyticsScriptLoaded = true;
  window['ga-disable-' + GA_MEASUREMENT_ID] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted'
  });
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA_MEASUREMENT_ID);
  document.head.appendChild(script);
}

function deleteAnalyticsCookies() {
  const hostParts = window.location.hostname.split('.');
  const domains = [window.location.hostname];
  if (hostParts.length > 2) domains.push('.' + hostParts.slice(-2).join('.'));
  if (hostParts.length > 1) domains.push('.' + window.location.hostname);

  document.cookie.split(';').forEach(function(cookie) {
    const name = cookie.split('=')[0].trim();
    if (!/^_ga($|_)|^_gid$|^_gat/.test(name)) return;
    document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax';
    domains.forEach(function(domain) {
      document.cookie = name + '=; Max-Age=0; path=/; domain=' + domain + '; SameSite=Lax';
    });
  });
}

function setAnalyticsConsent(status) {
  try {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, status);
  } catch(e) {}

  if (status === 'granted') {
    window['ga-disable-' + GA_MEASUREMENT_ID] = false;
    loadGoogleAnalytics();
    trackEvent('analytics_consent_update', { analytics_consent: 'granted' });
  } else {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }
    window['ga-disable-' + GA_MEASUREMENT_ID] = true;
    deleteAnalyticsCookies();
  }

  renderConsentControls();
}

function trackEvent(eventName, params) {
  try {
    if (!hasAnalyticsConsent()) return;
    loadGoogleAnalytics();
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, Object.assign({
      page_path: window.location.pathname
    }, params || {}));
  } catch(e) {}
}

function getSavedWordCount() {
  try {
    return JSON.parse(localStorage.getItem('qv_bookmarked') || '[]').length;
  } catch(e) {
    return 0;
  }
}

function getWordTrackingParams(word, extraParams) {
  if (!word) return extraParams || {};
  return Object.assign({
    word_id: word.id,
    transliteration: word.transliteration,
    meaning: word.meaning,
    frequency: word.frequency
  }, extraParams || {});
}

function initSharedAnalytics() {
  if (hasAnalyticsConsent()) loadGoogleAnalytics();
  renderConsentControls();

  document.addEventListener('click', function(event) {
    const link = event.target.closest('a');
    if (!link || !link.href) return;

    if (link.href.indexOf('docs.google.com/forms') > -1) {
      trackEvent('feedback_click', {
        link_url: link.href,
        link_text: link.textContent.trim()
      });
    }

    if (link.hostname === 'quran.com') {
      trackEvent('verse_link_click', {
        link_url: link.href,
        verse_label: link.textContent.trim()
      });
    }

    if (link.hash === '#quiz') {
      trackEvent('quiz_link_click', {
        link_url: link.href,
        source_page: window.location.pathname
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', initSharedAnalytics);

function renderConsentControls(forceOpen) {
  let banner = document.getElementById('cookie-consent-banner');
  let prefsButton = document.getElementById('cookie-preferences-button');
  const consent = getAnalyticsConsent();
  const shouldShowBanner = forceOpen || !consent;

  if (!banner) {
    banner = document.createElement('section');
    banner.id = 'cookie-consent-banner';
    banner.className = 'cookie-consent';
    banner.setAttribute('aria-labelledby', 'cookie-consent-title');
    banner.innerHTML = `
      <div class="cookie-consent__content">
        <div>
          <h2 id="cookie-consent-title">Analytics preferences</h2>
          <p>We use Google Analytics to understand which Quran vocabulary features help learners. Choose whether analytics data can be collected. Necessary site features still work either way.</p>
        </div>
        <div class="cookie-consent__actions">
          <button type="button" class="cookie-consent__btn cookie-consent__btn--secondary" id="cookie-consent-reject">Reject analytics</button>
          <button type="button" class="cookie-consent__btn cookie-consent__btn--primary" id="cookie-consent-accept">Accept analytics</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);
    document.getElementById('cookie-consent-reject').addEventListener('click', function() {
      setAnalyticsConsent('denied');
    });
    document.getElementById('cookie-consent-accept').addEventListener('click', function() {
      setAnalyticsConsent('granted');
    });
  }

  if (!prefsButton) {
    prefsButton = document.createElement('button');
    prefsButton.type = 'button';
    prefsButton.id = 'cookie-preferences-button';
    prefsButton.className = 'cookie-preferences-button';
    prefsButton.textContent = 'Privacy choices';
    prefsButton.addEventListener('click', function() {
      renderConsentControls(true);
    });
    document.body.appendChild(prefsButton);
  }

  banner.classList.toggle('visible', shouldShowBanner);
  banner.setAttribute('aria-hidden', shouldShowBanner ? 'false' : 'true');
  prefsButton.classList.toggle('visible', Boolean(consent) && !shouldShowBanner);
}

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
