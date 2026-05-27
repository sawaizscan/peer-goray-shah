#!/usr/bin/env python3
"""
Merge all scraped duas.org section JSONs into unified das_pool.json
Usage: python3 scripts/merge_duas.py
"""

import json, os, glob
from datetime import datetime

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data_v2")

def main():
    all_entries = []
    
    for fpath in sorted(glob.glob(os.path.join(DATA_DIR, "duas_*.json"))):
        if "combined" in fpath or "pool" in fpath:
            continue
        try:
            with open(fpath) as f:
                data = json.load(f)
            if isinstance(data, list):
                all_entries.extend(data)
                print(f"  {os.path.basename(fpath)}: {len(data)} entries")
            else:
                print(f"  {os.path.basename(fpath)}: skip (not a list)")
        except Exception as e:
            print(f"  {os.path.basename(fpath)}: Error - {e}")

    # Deduplicate by URL
    seen_urls = set()
    deduped = []
    for entry in all_entries:
        url = entry.get("url", "")
        if url and url in seen_urls:
            continue
        if url:
            seen_urls.add(url)
        deduped.append(entry)

    print(f"\n  Total unique: {len(deduped)} entries across {len(seen_urls)} URLs")

    # Organize by category
    by_category = {}
    for entry in deduped:
        cat = entry.get("category", "Uncategorized")
        if cat not in by_category:
            by_category[cat] = []
        by_category[cat].append(entry)

    pool = {
        "meta": {
            "source": "Duas.org",
            "generated": datetime.utcnow().isoformat() + "Z",
            "total_entries": len(deduped),
            "categories": list(by_category.keys()),
        },
        "by_category": by_category,
        "all": deduped
    }

    outpath = os.path.join(DATA_DIR, "duas_pool.json")
    with open(outpath, "w", encoding="utf-8") as f:
        json.dump(pool, f, ensure_ascii=False, indent=2)
    print(f"\n  ✓ Written: {outpath}")

if __name__ == "__main__":
    main()
