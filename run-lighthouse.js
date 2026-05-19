const lighthouse = require('lighthouse/core/index.js').default;
const chromeLauncher = require('chrome-launcher');

const BASE_URL = 'https://www.learnquranwords.com';
const PAGES = ['/', '/about', '/saved', '/similar'];
const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu'],
  });

  try {
    const options = {
      logLevel: 'error',
      output: 'json',
      onlyCategories: CATEGORIES,
      port: chrome.port,
    };

    const runnerResult = await lighthouse(url, options);
    const reportJson = runnerResult.lhr;

    const scores = {};
    for (const cat of CATEGORIES) {
      const category = reportJson.categories[cat];
      if (category) scores[cat] = Math.round(category.score * 100);
    }

    const failedAudits = [];
    for (const [auditKey, audit] of Object.entries(reportJson.audits)) {
      if (audit.score !== null && audit.score < 1) {
        for (const cat of CATEGORIES) {
          const catAuditRefs = reportJson.categories[cat]?.auditRefs || [];
          if (catAuditRefs.some((ref) => ref.id === auditKey)) {
            failedAudits.push({
              category: cat,
              id: auditKey,
              title: audit.title,
              score: audit.score,
              description: audit.description?.substring(0, 120) || '',
            });
            break;
          }
        }
      }
    }

    return { url, scores, failedAudits };
  } finally {
    try {
      await chrome.kill();
    } catch (e) {
      console.log('  (Chrome cleanup skipped - non-fatal)');
    }
  }
}

async function main() {
  const results = [];

  for (const page of PAGES) {
    const url = BASE_URL + page;
    console.log(`\nAuditing: ${url}`);
    try {
      const result = await runLighthouse(url);
      results.push(result);
      console.log(`  Performance: ${result.scores.performance}/100`);
      console.log(`  Accessibility: ${result.scores.accessibility}/100`);
      console.log(`  Best Practices: ${result.scores['best-practices']}/100`);
      console.log(`  SEO: ${result.scores.seo}/100`);
    } catch (err) {
      console.log(`  Error: ${err.message}`);
      results.push({ url, error: err.message });
    }
  }

  console.log('\n\n========== LIGHTHOUSE AUDIT SUMMARY ==========\n');

  for (const result of results) {
    if (result.error) {
      console.log(`${result.url}: ERROR - ${result.error}`);
      continue;
    }
    console.log(`${result.url}`);
    console.log(`  Performance:    ${result.scores.performance}/100`);
    console.log(`  Accessibility:  ${result.scores.accessibility}/100`);
    console.log(`  Best Practices: ${result.scores['best-practices']}/100`);
    console.log(`  SEO:            ${result.scores.seo}/100`);

    const failedByCat = {};
    for (const audit of result.failedAudits) {
      if (!failedByCat[audit.category]) failedByCat[audit.category] = [];
      failedByCat[audit.category].push(audit);
    }

    for (const [cat, audits] of Object.entries(failedByCat)) {
      console.log(`\n  ${cat.toUpperCase()} failures:`);
      for (const audit of audits) {
        console.log(`    - [${audit.id}] ${audit.title} (score: ${audit.score})`);
      }
    }
    console.log('');
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
