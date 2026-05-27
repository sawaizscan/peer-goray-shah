#!/usr/bin/env python3
"""
Deep dua page parser — extracts Arabic + transliteration + English
from duas.org pages. Handles both old format (Ara/Trl/Tra divs)
and new SPA format (data_v2 JSON).

Usage:
  python3 scripts/deep_scrape_duas.py          # deep scrape all pool entries
  python3 scripts/deep_scrape_duas.py --dry-run  # show what would be scraped
"""

import requests, json, os, re, sys, time, html as html_mod
from datetime import datetime
from urllib.parse import urlparse

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data_v2")
os.makedirs(DATA_DIR, exist_ok=True)

HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; PirGorayShahBot/1.0; +https://pirgorayshah.live)"}

def extract_segments_old(html):
    """Extract Arabic/transliteration/translation triplets from old-format HTML."""
    segments = []

    ara_pattern = re.compile(r'<div class="Ara"><a1>(.*?)</a1></div>', re.DOTALL)
    trl_pattern = re.compile(r'<div class="Trl"><t2>(.*?)</div></t2>', re.DOTALL)
    tra_pattern = re.compile(r'<div class="Tra"><t1>(.*?)</div></t1>', re.DOTALL)

    ara_matches = ara_pattern.findall(html)
    trl_matches = trl_pattern.findall(html)
    tra_matches = tra_pattern.findall(html)

    # Also try alternate pattern with <span> instead of <t1>/<t2>
    if not ara_matches:
        # Fallback: look for any Ara/Trl/Tra divs
        ara_pattern2 = re.compile(r'<div class="Ara">(.*?)</div>', re.DOTALL)
        trl_pattern2 = re.compile(r'<div class="Trl">(.*?)</div>', re.DOTALL)
        tra_pattern2 = re.compile(r'<div class="Tra">(.*?)</div>', re.DOTALL)
        ara_matches = ara_pattern2.findall(html)
        trl_matches = trl_pattern2.findall(html)
        tra_matches = tra_pattern2.findall(html)

    count = max(len(ara_matches), len(trl_matches), len(tra_matches))
    for i in range(count):
        arabic = ""
        translit = ""
        translation = ""

        if i < len(ara_matches):
            arabic = html_mod.unescape(ara_matches[i].strip())
            # Clean up residual tags
            arabic = re.sub(r'<[^>]+>', '', arabic)

        if i < len(trl_matches):
            translit = re.sub(r'<[^>]+>', '', trl_matches[i].strip())

        if i < len(tra_matches):
            translation = re.sub(r'<[^>]+>', '', tra_matches[i].strip())

        if arabic or translit or translation:
            segments.append({
                "arabic": arabic,
                "transliteration": translit,
                "translation": translation
            })

    return segments


def extract_segments_new(html, json_id):
    """Extract segments from SPA-style page via data_v2 JSON."""
    try:
        url = f"https://www.duas.org/data_v2/{json_id}.json"
        r = requests.get(url, headers=HEADERS, timeout=10)
        if r.status_code != 200:
            return None
        data = r.json()
        all_segments = []
        duas_list = data.get("duas", [data])
        for dua in duas_list:
            if dua.get("segments"):
                for seg in dua["segments"]:
                    all_segments.append({
                        "arabic": seg.get("arabic", ""),
                        "transliteration": seg.get("transliteration", ""),
                        "translation": seg.get("translation", "")
                    })
        return {
            "segments": all_segments,
            "audio": duas_list[0].get("audio") if duas_list else None,
            "reference": duas_list[0].get("reference") if duas_list else None,
            "tags": duas_list[0].get("tags", []) if duas_list else []
        }
    except:
        return None


def extract_full_text(html):
    """Extract clean full text from HTML."""
    text = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.DOTALL)
    text = re.sub(r'<style[^>]*>.*?</style>', '', text, flags=re.DOTALL)
    text = re.sub(r'<head>.*?</head>', '', text, flags=re.DOTALL)
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    text = html_mod.unescape(text)
    return text


def guess_json_id(url):
    """Guess the data_v2 JSON filename from a URL."""
    path = urlparse(url).path
    filename = path.split("/")[-1].replace(".html", "").replace(".htm", "")
    return filename


def deep_scrape_entry(entry):
    """Deep scrape a single pool entry."""
    url = entry["url"]
    
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        if resp.status_code != 200:
            print(f"  HTTP {resp.status_code}")
            return None
    except Exception as e:
        print(f"  Error: {e}")
        return None

    html = resp.text
    segments = []
    audio = None
    reference = None
    tags = []

    # Try old format first (covers 95%+ of pages)
    if '<div class="Ara">' in html:
        segments = extract_segments_old(html)

    # If no segments yet, try SPA JSON format
    if not segments:
        json_id = guess_json_id(url)
        result = extract_segments_new(html, json_id)
        if result:
            segments = result["segments"]
            audio = result["audio"]
            reference = result["reference"]
            tags = result["tags"]

    # Always extract full text
    full_text = extract_full_text(html)

    return {
        "id": entry["id"],
        "title": entry["title"],
        "url": url,
        "category": entry.get("category", ""),
        "subcategory": entry.get("subcategory", ""),
        "segments": segments,
        "segment_count": len(segments),
        "text": full_text[:10000],
        "audio": audio,
        "reference": reference,
        "tags": tags,
        "scraped": datetime.utcnow().isoformat() + "Z"
    }


def main():
    dry_run = "--dry-run" in sys.argv

    pool_path = os.path.join(DATA_DIR, "duas_pool.json")
    with open(pool_path) as f:
        pool = json.load(f)

    # Collect all entries
    all_entries = []
    for cat, entries in pool.get("by_category", {}).items():
        for e in entries:
            all_entries.append(e)

    print(f"Deep scraping {len(all_entries)} entries from pool...")

    if dry_run:
        for e in all_entries:
            print(f"  {e['id'][:8]}  {e['category']:15s}  {e['url']}")
        print(f"\nWould scrape {len(all_entries)} entries.")
        return

    results = []
    for i, entry in enumerate(all_entries):
        print(f"[{i+1}/{len(all_entries)}] {entry['title'][:50]:50s}...", end=" ")
        sys.stdout.flush()
        
        result = deep_scrape_entry(entry)
        if result and result["segments"]:
            print(f"✓ {result['segment_count']} segs")
        elif result:
            print(f"✓ (0 segs)")
        else:
            print(f"✗")
            continue
        
        if result:
            results.append(result)
        
        time.sleep(0.3)

    # Save results
    outpath = os.path.join(DATA_DIR, "duas_deep.json")
    with open(outpath, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    total_segs = sum(r["segment_count"] for r in results)
    with_segments = sum(1 for r in results if r["segment_count"] > 0)
    print(f"\n✓ Saved {len(results)} deep-scraped pages ({with_segments} with segments, {total_segs} total segments) → {outpath}")


if __name__ == "__main__":
    main()
