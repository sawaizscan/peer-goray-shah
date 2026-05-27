#!/usr/bin/env python3
"""
duas.org content scraper — extracts duas, ziyarat, amal, routines
Outputs structured JSON pools organized by category/subcategory.

Usage:
  python3 scripts/scrape_duas.py                    # scrape all sections
  python3 scripts/scrape_duas.py --section ziyarat  # scrape one section
  python3 scripts/scrape_duas.py --dry-run          # list URLs without scraping
"""

import requests, json, os, re, sys, time, hashlib
from urllib.parse import urljoin
from datetime import datetime

BASE_URL = "https://www.duas.org"
MOBILE_URL = "https://www.duas.org/mobile"
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data_v2")
os.makedirs(OUTPUT_DIR, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; PirGorayShahBot/1.0; +https://pirgorayshah.live)"
}

SECTIONS = {
    "daily_taqibat": {
        "label": "Daily Taqibat", "category": "Worship", "subcategory": "Daily",
        "urls": [
            f"{MOBILE_URL}/common-taqibat.html", f"{MOBILE_URL}/fajr-taqibat.html",
            f"{MOBILE_URL}/zuhr-asr-taqibat.html", f"{MOBILE_URL}/magrib-isha-taqibat.html",
            f"{MOBILE_URL}/sajda-shukr.html", f"{MOBILE_URL}/salaat-ghufaylah.html",
            f"{MOBILE_URL}/tahajjud-salat-shab.html", f"{MOBILE_URL}/after-azaan-duas.html",
            f"{BASE_URL}/wadhu.htm",
        ]
    },
    "weekday": {
        "label": "Weekday Duas", "category": "Worship", "subcategory": "Weekday",
        "urls": [
            f"{MOBILE_URL}/saturday-duas-ziyarat.html", f"{MOBILE_URL}/sunday-duas-ziyarat.html",
            f"{MOBILE_URL}/monday-duas-ziyarat.html", f"{MOBILE_URL}/tuesday-duas-ziyarat.html",
            f"{MOBILE_URL}/wednesday-duas-ziyarat.html", f"{MOBILE_URL}/thursday-duas-ziyarat.html",
            f"{MOBILE_URL}/friday-duas-ziyarat.html", f"{MOBILE_URL}/thursday-night-duas.html",
        ]
    },
    "ziyarat": {
        "label": "Ziyarat", "category": "Ziyarat", "subcategory": "General",
        "urls": [
            f"{MOBILE_URL}/ziyarat-jamia-kabira.html", f"{MOBILE_URL}/ziarat-aleyasin.html",
            f"{MOBILE_URL}/ziarat-aleyasindua.html", f"{MOBILE_URL}/ziyarat-ameenullah.html",
            f"{MOBILE_URL}/ziyarat-imam-mahdi-as-after-fajr.html",
            f"{MOBILE_URL}/ziyarat-imam-hussain-waritha.html",
            f"{MOBILE_URL}/ziyarat-imam-hussain-ashura.html", f"{MOBILE_URL}/ziyarat-nahiya.html",
            f"{MOBILE_URL}/salawaat-list.html", f"{MOBILE_URL}/salat-masumeen.html",
            f"{MOBILE_URL}/ziyarat-lady-zainab.html", f"{MOBILE_URL}/ziyarat-masuma-qom.html",
            f"{MOBILE_URL}/ziyarat-hazrat-abbas.html", f"{MOBILE_URL}/ziyarat-khadija.html",
            f"{MOBILE_URL}/ziyarat-arbaeen.html", f"{MOBILE_URL}/ziyarat-shah-abdul-azeem.html",
            f"{MOBILE_URL}/ziyarat-ahad-imam-mahdi-as-after-fajr.html",
        ]
    },
    "sahifa_sajjadiya": {
        "label": "Sahifa Sajjadiya", "category": "Sahifa", "subcategory": "Sajjadiya",
        "urls": [f"{MOBILE_URL}/sahifa-sajjadia-index.html"],
    },
    "sahifa_alawiya": {
        "label": "Sahifa Alawiya", "category": "Sahifa", "subcategory": "Alawiya",
        "urls": [f"{MOBILE_URL}/sahifa-alawia-index.html"],
    },
    "specific_needs": {
        "label": "Specific Needs", "category": "Supplication", "subcategory": "Needs",
        "urls": [
            f"{MOBILE_URL}/hajaat-general-duas.html", f"{MOBILE_URL}/rizq-duas.html",
            f"{BASE_URL}/debt.html", f"{MOBILE_URL}/curing-ailments-duas.html",
            f"{MOBILE_URL}/corona.html", f"{MOBILE_URL}/worries-hardships.html",
            f"{MOBILE_URL}/duas-grief-fear.html", f"{MOBILE_URL}/seeking-forgiveness-duas.html",
            f"{BASE_URL}/marriage-family.html", f"{BASE_URL}/death.htm",
            f"{MOBILE_URL}/visit-graveyard.html", f"{BASE_URL}/magic.htm",
            f"{BASE_URL}/enemy.htm", f"{MOBILE_URL}/evil-repelling-duas.html",
            f"{BASE_URL}/freedom.htm", f"{BASE_URL}/istikhara.htm",
            f"{BASE_URL}/memory.htm", f"{BASE_URL}/student.htm",
        ]
    },
    "routines": {
        "label": "Routines", "category": "Worship", "subcategory": "Routine",
        "urls": [
            f"{MOBILE_URL}/bedtime-duas.html", f"{BASE_URL}/eating.htm",
            f"{MOBILE_URL}/routine-leaving-home-duas.html", f"{BASE_URL}/travel.htm",
            f"{MOBILE_URL}/morning-evening-duas.html", f"{MOBILE_URL}/dua-sunset.html",
            f"{MOBILE_URL}/duas-hourly.html", f"{MOBILE_URL}/dua-quran.html",
        ]
    },
    "monthly_muharram": {
        "label": "Muharram", "category": "Monthly", "subcategory": "Muharram",
        "urls": [f"{MOBILE_URL}/muharram-home.html", f"{MOBILE_URL}/muharram-first.html", f"{MOBILE_URL}/Ashura.html"]
    },
    "monthly_safar": {
        "label": "Safar", "category": "Monthly", "subcategory": "Safar",
        "urls": [f"{MOBILE_URL}/safar-home.html", f"{MOBILE_URL}/safar-daily-dua.html"]
    },
    "monthly_rajab": {
        "label": "Rajab", "category": "Monthly", "subcategory": "Rajab",
        "urls": [f"{MOBILE_URL}/rajab-first.html", f"{MOBILE_URL}/rajab-amaal-13-14-15.html", f"{MOBILE_URL}/rajab-15.html"]
    },
    "monthly_shaban": {
        "label": "Shaban", "category": "Monthly", "subcategory": "Shaban",
        "urls": [f"{MOBILE_URL}/shaban-first.html"]
    },
    "monthly_ramadan": {
        "label": "Ramadan", "category": "Monthly", "subcategory": "Ramadan",
        "urls": [
            f"{MOBILE_URL}/ramadan-dua-first-night.html", f"{MOBILE_URL}/ramadan-amaal-first.html",
            f"{MOBILE_URL}/ramadan-dua-mujeer.html", f"{MOBILE_URL}/ramadan-laylatul-qadr.html",
            f"{MOBILE_URL}/ramadan-laylatul-qadr-19.html", f"{MOBILE_URL}/ramadan-laylatul-qadr-21.html",
            f"{MOBILE_URL}/ramadan-laylatul-qadr-23.html", f"{MOBILE_URL}/ramadan-dua-eid.html",
        ]
    },
    "famous_duas": {
        "label": "Famous Duas", "category": "Supplication", "subcategory": "Famous",
        "urls": [
            f"{BASE_URL}/dua-kumayl.html", f"{MOBILE_URL}/dua-tawassul.html",
            f"{BASE_URL}/dua-nudba.html", f"{BASE_URL}/dua-mashlool.html",
            f"{BASE_URL}/dua-sabah.html", f"{MOBILE_URL}/dua-faraj.html",
            f"{BASE_URL}/dua-jawshan-kabir.html",
        ]
    }
}


def fetch_page(url):
    """Fetch a page with rate limiting and retry."""
    time.sleep(0.5)
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        if resp.status_code == 200:
            return resp.text
        print(f"  ⚠ HTTP {resp.status_code} for {url}")
        return None
    except Exception as e:
        print(f"  ⚠ Error fetching {url}: {e}")
        return None


def extract_text(html):
    """Extract meaningful text content from HTML, stripping markup."""
    if not html:
        return ""
    html = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.DOTALL)
    html = re.sub(r'<style[^>]*>.*?</style>', '', html, flags=re.DOTALL)
    text = re.sub(r'<[^>]+>', ' ', html)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def extract_arabic_segments(html):
    """Extract Arabic script segments from HTML."""
    if not html:
        return []
    arabic_pattern = re.compile(r'[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]+')
    segments = arabic_pattern.findall(html)
    return list(set(segments))


def extract_title(html, url):
    """Extract page title."""
    m = re.search(r'<title>(.*?)</title>', html, re.DOTALL)
    if m:
        return m.group(1).strip()
    return os.path.splitext(os.path.basename(url))[0].replace('-', ' ').title()


def crawl_section(section_name, section_config, dry_run=False):
    """Crawl all URLs in a section and extract content."""
    urls = section_config["urls"]
    category = section_config["category"]
    subcategory = section_config["subcategory"]
    label = section_config["label"]

    print(f"\n{'='*60}")
    print(f"  Section: {label} ({len(urls)} URLs)")
    print(f"{'='*60}")

    results = []

    for idx, url in enumerate(urls, 1):
        if dry_run:
            print(f"  [{idx}/{len(urls)}] {url}")
            continue

        print(f"  [{idx}/{len(urls)}] Fetching {url} ...", end=" ")
        html = fetch_page(url)
        if not html:
            print("skipped")
            continue

        title = extract_title(html, url)
        arabic_segments = extract_arabic_segments(html)
        body_text = extract_text(html)

        entry = {
            "id": hashlib.md5(url.encode()).hexdigest()[:8],
            "title": title,
            "url": url,
            "category": category,
            "subcategory": subcategory,
            "source": "Duas.org",
            "arabic": arabic_segments[:20],
            "text": body_text[:2000],
            "scraped": datetime.utcnow().isoformat() + "Z"
        }
        results.append(entry)
        print(f"✓ ({len(arabic_segments)} Arabic segments, {len(body_text)} chars)")

        # Follow sub-pages for index pages
        if section_name == "sahifa_sajjadiya" and "sahifa-sajjadia-index" in url:
            sub_urls = re.findall(r'href=["\']([^"\']*sahifasajjadia[^"\']*)["\']', html)
            for sub_url in set(sub_urls):
                full_url = urljoin(url, sub_url)
                print(f"    → Sub-page: {full_url} ...", end=" ")
                sub_html = fetch_page(full_url)
                if sub_html:
                    sub_title = extract_title(sub_html, full_url)
                    sub_arabic = extract_arabic_segments(sub_html)
                    sub_body = extract_text(sub_html)
                    results.append({
                        "id": hashlib.md5(full_url.encode()).hexdigest()[:8],
                        "title": sub_title,
                        "url": full_url,
                        "category": "Sahifa",
                        "subcategory": "Sajjadiya",
                        "source": "Duas.org",
                        "arabic": sub_arabic[:20],
                        "text": sub_body[:2000],
                        "scraped": datetime.utcnow().isoformat() + "Z"
                    })
                    print(f"✓ ({len(sub_arabic)} Arabic segments)")
                else:
                    print("skipped")

    return results


def main():
    dry_run = "--dry-run" in sys.argv
    single_section = None
    for arg in sys.argv[1:]:
        if arg.startswith("--section="):
            single_section = arg.split("=", 1)[1]
        elif arg == "--dry-run":
            pass
        elif arg.startswith("--"):
            print(f"Unknown option: {arg}")
            sys.exit(1)

    all_results = []
    sections_to_run = [single_section] if single_section else list(SECTIONS.keys())

    for section_name in sections_to_run:
        if section_name not in SECTIONS:
            print(f"Unknown section: {section_name}")
            print(f"Available: {', '.join(SECTIONS.keys())}")
            sys.exit(1)

        section = SECTIONS[section_name]
        results = crawl_section(section_name, section, dry_run)
        all_results.extend(results)

        if not dry_run and results:
            outpath = os.path.join(OUTPUT_DIR, f"duas_{section_name}.json")
            with open(outpath, "w", encoding="utf-8") as f:
                json.dump(results, f, ensure_ascii=False, indent=2)
            print(f"  → Saved {len(results)} entries to {outpath}")

    if not dry_run and all_results:
        combined_path = os.path.join(OUTPUT_DIR, "duas_combined.json")
        output = {
            "meta": {
                "source": "Duas.org",
                "scraped": datetime.utcnow().isoformat() + "Z",
                "total_entries": len(all_results),
            },
            "all": all_results
        }
        with open(combined_path, "w", encoding="utf-8") as f:
            json.dump(output, f, ensure_ascii=False, indent=2)
        print(f"\n  ✓ Combined: {len(all_results)} entries → {combined_path}")

    if dry_run:
        total = sum(len(v["urls"]) for v in SECTIONS.values())
        print(f"\n  Dry run: {total} URLs would be scraped across {len(SECTIONS)} sections.")


if __name__ == "__main__":
    main()
