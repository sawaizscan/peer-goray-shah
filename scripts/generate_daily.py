#!/usr/bin/env python3
"""
Daily generator: picks 30 a'māl + 30 poems + daily duas from curated pools.
Uses date-based deterministic rotation so each day has a unique set.
"""
import json, os, random
from datetime import datetime, timedelta

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def load_pool(filename, subdir=""):
    path = os.path.join(REPO_ROOT, subdir, filename) if subdir else os.path.join(REPO_ROOT, filename)
    with open(path, encoding="utf-8") as f:
        return json.load(f)

def write_output(data, filename):
    path = os.path.join(REPO_ROOT, filename)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"  → {filename} ({len(data)} entries)")

def daily_selection(pool, count, date_str):
    """Deterministic daily pick from pool using date as seed."""
    random.seed(date_str)
    indices = list(range(len(pool)))
    random.shuffle(indices)
    picked = [pool[i] for i in indices[:count]]
    for idx, entry in enumerate(picked, 1):
        entry["id"] = idx
    return picked

def generate():
    date_str = datetime.utcnow().strftime("%Y-%m-%d")
    day_of_year = datetime.utcnow().timetuple().tm_yday

    print(f"── Daily Generation: {date_str} (day {day_of_year}) ──")

    # ── A'māl ──
    amal_pool = load_pool("amal_pool.json")
    daily_amal = daily_selection(amal_pool, min(30, len(amal_pool)), date_str + "amal")
    write_output(daily_amal, "amal.json")

    # ── Poetry (wrapped in meta + poems for front-end) ──
    poetry_pool = load_pool("poetry_pool.json")
    daily_poetry = daily_selection(poetry_pool, min(30, len(poetry_pool)), date_str + "poetry")
    poetry_output = {
        "meta": {
            "generated": datetime.utcnow().isoformat() + "Z",
            "version": 3,
            "count": len(daily_poetry),
            "source": "15 specified Urdu collections"
        },
        "poems": daily_poetry
    }
    poetry_path = os.path.join(REPO_ROOT, "poetry.json")
    with open(poetry_path, "w", encoding="utf-8") as f:
        json.dump(poetry_output, f, ensure_ascii=False, indent=2)
    print(f"  → poetry.json ({len(daily_poetry)} poems with meta)")

    # ── Duas (daily 10 from duas_pool, enriched with deep segments) ──
    duas_pool = load_pool("duas_pool.json", "data_v2")
    if isinstance(duas_pool, dict) and "all" in duas_pool:
        duas_list = duas_pool["all"]
    elif isinstance(duas_pool, list):
        duas_list = duas_pool
    else:
        duas_list = []

    # Load deep-scraped segments
    deep_map = {}
    try:
        deep_data = load_pool("duas_deep.json", "data_v2")
        for d in deep_data:
            deep_map[d["url"]] = d
    except (FileNotFoundError, json.JSONDecodeError):
        pass

    daily_duas = daily_selection(duas_list, min(10, len(duas_list)), date_str + "duas")
    # Enrich with segments
    for du in daily_duas:
        deep = deep_map.get(du["url"])
        if deep and deep.get("segments"):
            du["segments"] = deep["segments"]
            du["segment_count"] = len(deep["segments"])
    write_output(daily_duas, "duas_daily.json")
    print(f"  ✓ Daily set ready: {len(daily_amal)} a'māl + {len(daily_poetry)} poems + {len(daily_duas)} duas")
    return 0

if __name__ == "__main__":
    exit(generate())
