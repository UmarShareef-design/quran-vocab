# LearnQuranwords

A free, responsive web app to learn the 600 most common words in the Quran. It includes Arabic text, English meanings, transliterations, and verse references.

Live site: [www.learnquranwords.com](https://www.learnquranwords.com)

## Features

- 600 essential Quran words with Arabic, transliteration, and meaning
- Search and filter by category or frequency
- Save words for later review
- Fully responsive layout with mobile navigation
- Works without accounts or sign-up

## Local Run

Open `index.html` in a browser. No build step is required.

## Validation

- Lighthouse audit: `npm run audit:lighthouse`

## Core Files

- `index.html`: main app (daily word, explore grid, quiz)
- `saved.html`: saved words view
- `similar.html`: similar-sounding words view
- `about.html`: product context and learning rationale
- `data.js`: Quran vocabulary dataset
- `shared.js`: shared behavior (analytics, nav, parsing helpers)
- `styles.css`: shared styling

## Author

Built by [Umar Shareef](https://umarshareef.framer.website)
