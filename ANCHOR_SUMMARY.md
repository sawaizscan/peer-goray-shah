# Peer Goray Shah — Anchoring Summary

## Project
Website for **Syed Saleem Raza Kazmi (Pir Goray Shah)** — a spiritual guide/teacher.
Domain: `pirgorayshah.live` (GitHub Pages, custom domain via DO droplet 142.93.59.101)

## Tech Stack
- **Static site** on GitHub Pages (auto-deploy from `main` branch)
- **PHP backend** on DigitalOcean droplet (142.93.59.101): `daily.php` for Daily Treasury content rotation, `scripts/daily_wisdom.php` for generation
- **GitHub Actions**: daily auto-update workflow (`.github/workflows/auto-update.yml`) that regenerates pool JSON data daily
- **Analytics**: Google Analytics G-EB6K1V6L5J

## Site Pages
| Page | Content |
|------|---------|
| `index.html` | Hero, AI Baba J section, daily carousel (sayings/poetry/amal/duas), explore grid |
| `daily.html` | Daily Treasury: 30 couplets + 30 wazaif, rotated daily |
| `wisdom.html` | Sayings (Ashraqat, Tanaquzat, Ramuz), Poetry, Fun Facts with tabs & filters |
| `discover.html` | Facts, Wit, Poetry sections with category tabs |
| `amal.html` | Daily A'mal (practices) categorized: Worship, Sustenance, Protection, Health, Hereafter |
| `duas.html` | Supplications with categories: Worship, Supplication, Sahifa, Monthly, Ziyarat |
| `ziyarat.html` | Sacred visitations |
| `contact.html` | Social links (Facebook, Instagram, WhatsApp) |

## Data Structure
- **JSON files**: `data.json` (sayings), `poetry.json`, `amal.json`, `duas_daily.json`, `discover.json`
- **Pool files** (for daily rotation): `wisdom_pool.json`, `poetry_pool.json`, `amal_pool.json`, `quran_pool.json`, `hadith_pool.json`
- `data_v2/`: Deep dua data (famous, daily, monthly, sahifas, routines, specific needs, ziyarat)

## AI BABA J Chatbot (NEW)
- **File**: `chat.js` — floating widget on all pages
- **Backend**: Google Gemini 2.0 Flash API
- **System prompt**: Multilingual spiritual guide persona answering in user's language
- **Capabilities**: Authentic wazaif from Shams al-Ma'arif, Khazinat al-Asrar, Mujarrabat al-Dayrabi, etc.; refuses non-authentic surface-level content; includes safety disclaimers for jalali/raj'at amal
- **Languages**: Urdu, English, Arabic, Persian, Turkish, Hindi, Punjabi, Sindhi, Saraiki
- **UI**: Floating gold button → slide-up panel, welcome screen with suggestion chips, typing indicator, scroll-to-bottom, auto-focus
- **Features**: Chat history (last 20 messages), RTL support, prayer appended to each response
