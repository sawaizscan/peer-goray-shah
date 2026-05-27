#!/usr/bin/env python3
"""
Deep dua page parser — extracts Arabic + transliteration + English
from duas.org mobile pages. Handles the triplet pattern used across
most Fajr/Maghrib/dua pages.

Usage:
  python3 scripts/deep_parse_duas.py          # parse all famous duas
  python3 scripts/deep_parse_duas.py --url https://www.duas.org/dua-kumayl.html
"""

import requests, json, os, re, sys, time
from datetime import datetime

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data_v2")
os.makedirs(DATA_DIR, exist_ok=True)

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; PirGorayShahBot/1.0; +https://pirgorayshah.live)"}

# Target URLs for deep parsing (most valuable pages)
TARGETS = {
    "dua_kumayl": {
        "title": "Dua Kumayl",
        "url": "https://www.duas.org/dua-kumayl.html",
        "category": "Supplication",
        "subcategory": "Famous"
    },
    "dua_tawassul": {
        "title": "Dua Tawassul",
        "url": "https://www.duas.org/mobile/dua-tawassul.html",
        "category": "Supplication",
        "subcategory": "Famous"
    },
    "dua_nudba": {
        "title": "Dua Nudba",
        "url": "https://www.duas.org/dua-nudba.html",
        "category": "Supplication",
        "subcategory": "Famous"
    },
    "dua_mashlool": {
        "title": "Dua Mashlool",
        "url": "https://www.duas.org/dua-mashlool.html",
        "category": "Supplication",
        "subcategory": "Famous"
    },
    "dua_sabah": {
        "title": "Dua Sabah",
        "url": "https://www.duas.org/dua-sabah.html",
        "category": "Supplication",
        "subcategory": "Famous"
    },
    "dua_faraj": {
        "title": "Dua Faraj",
        "url": "https://www.duas.org/mobile/dua-faraj.html",
        "category": "Supplication",
        "subcategory": "Famous"
    },
    "ziyarat_jamia": {
        "title": "Ziyarat Jamia Kabira",
        "url": "https://www.duas.org/mobile/ziyarat-jamia-kabira.html",
        "category": "Ziyarat",
        "subcategory": "General"
    },
    "ziyarat_warith": {
        "title": "Ziyarat Warith",
        "url": "https://www.duas.org/mobile/ziyarat-imam-hussain-waritha.html",
        "category": "Ziyarat",
        "subcategory": "General"
    },
    "ziyarat_ashura": {
        "title": "Ziyarat Ashura",
        "url": "https://www.duas.org/mobile/ziyarat-imam-hussain-ashura.html",
        "category": "Ziyarat",
        "subcategory": "General"
    },
    "ziyarat_nahiya": {
        "title": "Ziyarat Nahiya",
        "url": "https://www.duas.org/mobile/ziyarat-nahiya.html",
        "category": "Ziyarat",
        "subcategory": "General"
    },
    "ziyarat_ameenullah": {
        "title": "Ziyarat Ameenullah",
        "url": "https://www.duas.org/mobile/ziyarat-ameenullah.html",
        "category": "Ziyarat",
        "subcategory": "General"
    },
    "fajr_taqibat": {
        "title": "Fajr Taqibat",
        "url": "https://www.duas.org/mobile/fajr-taqibat.html",
        "category": "Worship",
        "subcategory": "Daily"
    },
    "common_taqibat": {
        "title": "Common Taqibat",
        "url": "https://www.duas.org/mobile/common-taqibat.html",
        "category": "Worship",
        "subcategory": "Daily"
    }
}


def deep_parse(html, url):
    """
    Extract structured dua content: segments of Arabic + transliteration + English.
    Returns a list of verse objects.
    """
    if not html:
        return []

    verses = []
    current_arabic = ""
    current_translit = ""
    current_english = ""

    # Remove scripts and styles
    html = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.DOTALL)
    html = re.sub(r'<style[^>]*>.*?</style>', '', html, flags=re.DOTALL)

    # Extract blocks containing Arabic lines followed by transliteration and translation
    # Pattern: Look for <div> blocks or <p> blocks with Arabic+translit+trans
    # The mobile pages use a consistent format:
    # Arabic line (in arabic script)
    # Transliteration line (latin)
    # Translation line (English)
    
    # Approach: Find all text nodes, group by proximity patterns
    lines = html.split('\n')

    arabic_pattern = re.compile(r'[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]{3,}')

    i = 0
    while i < len(lines):
        line = lines[i].strip()
        # Remove HTML tags for analysis
        text = re.sub(r'<[^>]+>', '', line).strip()

        if not text:
            i += 1
            continue

        # Check if this line contains Arabic
        has_arabic = arabic_pattern.search(text)

        # Check next 1-2 lines for transliteration and translation
        next_text = ""
        next_next_text = ""
        if i + 1 < len(lines):
            next_text = re.sub(r'<[^>]+>', '', lines[i+1]).strip()
        if i + 2 < len(lines):
            next_next_text = re.sub(r'<[^>]+>', '', lines[i+2]).strip()

        # If current line has Arabic and next line is latin script (transliteration)
        # and the line after that is English (translation)
        if has_arabic and next_text and not arabic_pattern.search(next_text):
            # Check if next_next looks like translation (English sentence)
            if next_next_text and len(next_next_text) > 10 and not arabic_pattern.search(next_next_text):
                verses.append({
                    "arabic": text[:500],
                    "transliteration": next_text[:500],
                    "translation": next_next_text[:500]
                })
                i += 3
                continue
            else:
                # Arabic + transliteration only
                verses.append({
                    "arabic": text[:500],
                    "transliteration": next_text[:500] if next_text and not arabic_pattern.search(next_text) else "",
                    "translation": ""
                })
                i += 2
                continue
        elif has_arabic:
            verses.append({
                "arabic": text[:500],
                "transliteration": "",
                "translation": ""
            })

        i += 1

    # Deduplicate verses
    seen = set()
    unique_verses = []
    for v in verses:
        key = v["arabic"][:50]
        if key not in seen:
            seen.add(key)
            unique_verses.append(v)

    return unique_verses


def deep_parse_target(target_key, target):
    """Fetch and deep-parse a single target page."""
    url = target["url"]
    print(f"\n  Deep parsing: {target['title']}")
    print(f"  URL: {url}")

    time.sleep(0.5)
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        if resp.status_code != 200:
            print(f"  ⚠ HTTP {resp.status_code}")
            return None
    except Exception as e:
        print(f"  ⚠ Error: {e}")
        return None

    verses = deep_parse(resp.text, url)
    print(f"  → {len(verses)} verses extracted")

    # Also extract full text for display
    body = re.sub(r'<script[^>]*>.*?</script>', '', resp.text, flags=re.DOTALL)
    body = re.sub(r'<style[^>]*>.*?</style>', '', body, flags=re.DOTALL)
    body = re.sub(r'<[^>]+>', ' ', body)
    body = re.sub(r'\s+', ' ', body).strip()

    return {
        "key": target_key,
        "title": target["title"],
        "url": url,
        "category": target["category"],
        "subcategory": target["subcategory"],
        "verses": verses,
        "text": body[:5000],
        "verse_count": len(verses),
        "scraped": datetime.utcnow().isoformat() + "Z"
    }


def main():
    single_url = None
    for arg in sys.argv[1:]:
        if arg.startswith("--url="):
            single_url = arg.split("=", 1)[1]

    all_results = []

    if single_url:
        # Parse a single arbitrary URL
        print(f"Deep parsing single URL: {single_url}")
        time.sleep(0.5)
        try:
            resp = requests.get(single_url, headers=HEADERS, timeout=15)
            if resp.status_code == 200:
                verses = deep_parse(resp.text, single_url)
                result = {
                    "key": "custom",
                    "title": single_url.split("/")[-1].replace(".html", "").replace("-", " ").title(),
                    "url": single_url,
                    "category": "Custom",
                    "subcategory": "",
                    "verses": verses,
                    "verse_count": len(verses),
                }
                all_results.append(result)
                print(f"  → {len(verses)} verses")
            else:
                print(f"  ⚠ HTTP {resp.status_code}")
        except Exception as e:
            print(f"  ⚠ Error: {e}")
    else:
        for key, target in TARGETS.items():
            result = deep_parse_target(key, target)
            if result:
                all_results.append(result)

    if all_results:
        outpath = os.path.join(DATA_DIR, "duas_deep.json")
        with open(outpath, "w", encoding="utf-8") as f:
            json.dump(all_results, f, ensure_ascii=False, indent=2)
        total_verses = sum(r["verse_count"] for r in all_results)
        print(f"\n  ✓ Saved {len(all_results)} deep-parsed pages ({total_verses} total verses) → {outpath}")


if __name__ == "__main__":
    main()
