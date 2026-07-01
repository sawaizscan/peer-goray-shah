#!/usr/bin/env python3
"""News Aggregator — fetches news, weather, dates and outputs news.json"""

import json, os, requests, sys
from datetime import datetime, timezone, timedelta

NEWS_API_KEY = os.environ.get("NEWS_API_KEY")
OUTPUT = "news.json"

WMO_CODES = {
    0: ("Clear", "صاف"), 1: ("Mainly Clear", "زیادہ تر صاف"),
    2: ("Partly Cloudy", "جزوی ابر آلود"), 3: ("Overcast", "ابر آلود"),
    45: ("Foggy", "دھند"), 48: ("Foggy", "دھند"),
    51: ("Light Drizzle", "ہلکی بوندا باندی"), 53: ("Drizzle", "بوندا باندی"),
    55: ("Heavy Drizzle", "تیز بوندا باندی"),
    61: ("Light Rain", "ہلکی بارش"), 63: ("Rain", "بارش"), 65: ("Heavy Rain", "تیز بارش"),
    71: ("Light Snow", "ہلکی برف"), 73: ("Snow", "برف"), 75: ("Heavy Snow", "تیز برف"),
    80: ("Light Showers", "ہلکی بارش"), 81: ("Showers", "بارش"), 82: ("Heavy Showers", "تیز بارش"),
    95: ("Thunderstorm", "گرج چمک"), 96: ("Thunderstorm", "گرج چمک"), 99: ("Thunderstorm", "گرج چمک")
}

WEEKDAYS = {
    0: "پیر", 1: "منگل", 2: "بدھ", 3: "جمعرات", 4: "جمعہ", 5: "ہفتہ", 6: "اتوار"
}

BUSINESS_POOL = [
    {"quote": "The best investment you can make is in yourself.", "author": "Warren Buffett",
     "quote_ur": "سب سے بہتر سرمایہ کاری جو آپ کر سکتے ہیں وہ اپنے آپ میں ہے۔"},
    {"quote": "Risk comes from not knowing what you're doing.", "author": "Warren Buffett",
     "quote_ur": "خطرہ اس بات سے آتا ہے کہ آپ نہیں جانتے کہ آپ کیا کر رہے ہیں۔"},
    {"quote": "Don't put all your eggs in one basket.", "author": "Miguel de Cervantes",
     "quote_ur": "تمام انڈے ایک ٹوکری میں مت رکھو۔"},
    {"quote": "The stock market is a device for transferring money from the impatient to the patient.", "author": "Warren Buffett",
     "quote_ur": "اسٹاک مارکیٹ بے صبروں سے صبر کرنے والوں کو رقم منتقل کرنے کا ایک آلہ ہے۔"},
    {"quote": "An investment in knowledge pays the best interest.", "author": "Benjamin Franklin",
     "quote_ur": "علم میں سرمایہ کاری سب سے بہتر سود دیتی ہے۔"},
    {"quote": "Opportunities come infrequently. When it rains gold, put out a bucket, not a thimble.", "author": "Warren Buffett",
     "quote_ur": "موقعے کبھی کبھی آتے ہیں۔ جب سونے کی بارش ہو تو بالٹی نکالو، انگوٹھا نہیں۔"},
    {"quote": "Do not save what is left after spending, but spend what is left after saving.", "author": "Warren Buffett",
     "quote_ur": "خرچ کرنے کے بعد جو بچے اسے مت بچاؤ، بلکہ بچانے کے بعد جو بچے اسے خرچ کرو۔"},
    {"quote": "It's not how much money you make, but how much money you keep.", "author": "Robert Kiyosaki",
     "quote_ur": "یہ نہیں کہ آپ کتنا کماتے ہیں، بلکہ یہ ہے کہ آپ کتنا رکھتے ہیں۔"},
    {"quote": "In the middle of difficulty lies opportunity.", "author": "Albert Einstein",
     "quote_ur": "مشکل کے بیچ میں موقع چھپا ہوتا ہے۔"},
    {"quote": "Success usually comes to those who are too busy to be looking for it.", "author": "Henry David Thoreau",
     "quote_ur": "کامیابی عام طور پر ان لوگوں کو ملتی ہے جو اس کی تلاش میں مصروف رہنے سے زیادہ مصروف ہوتے ہیں۔"},
    {"quote": "The way to get started is to quit talking and begin doing.", "author": "Walt Disney",
     "quote_ur": "شروع کرنے کا طریقہ یہ ہے کہ باتیں کرنا چھوڑ دو اور کام شروع کر دو۔"},
    {"quote": "A business that makes nothing but money is a poor business.", "author": "Henry Ford",
     "quote_ur": "وہ کاروبار جو پیسے کے سوا کچھ نہیں بناتا، ایک غریب کاروبار ہے۔"},
    {"quote": "If everyone is moving forward together, then success takes care of itself.", "author": "Henry Ford",
     "quote_ur": "اگر سب ایک ساتھ آگے بڑھ رہے ہیں تو کامیابی خود بخود آ جاتی ہے۔"},
    {"quote": "Price is what you pay. Value is what you get.", "author": "Warren Buffett",
     "quote_ur": "قیمت وہ ہے جو آپ ادا کرتے ہیں۔ قدر وہ ہے جو آپ کو ملتی ہے۔"},
    {"quote": "The biggest risk is not taking any risk.", "author": "Mark Zuckerberg",
     "quote_ur": "سب سے بڑا خطرہ کوئی خطرہ نہ اٹھانا ہے۔"},
    {"quote": "Dream big. Start small. Act now.", "author": "Robin Sharma",
     "quote_ur": "بڑا خواب دیکھو۔ چھوٹا شروع کرو۔ ابھی عمل کرو۔"},
    {"quote": "Your most unhappy customers are your greatest source of learning.", "author": "Bill Gates",
     "quote_ur": "آپ کے سب سے ناخوش گاہک سیکھنے کا سب سے بڑا ذریعہ ہوتے ہیں۔"},
    {"quote": "Time is more valuable than money. You can get more money, but you cannot get more time.", "author": "Jim Rohn",
     "quote_ur": "وقت پیسے سے زیادہ قیمتی ہے۔ آپ مزید پیسے حاصل کر سکتے ہیں، لیکن مزید وقت نہیں۔"}
]

COUNTRIES = {
    "pakistan": "Pakistan", "imran khan": "Pakistan", "shehbaz": "Pakistan", "nawaz": "Pakistan",
    "army chief": "Pakistan", "pti": "Pakistan", "punjab": "Pakistan", "islamabad": "Pakistan",
    "iran": "Iran", "tehran": "Iran", "khamenei": "Iran", "raisi": "Iran",
    "iraq": "Iraq", "baghdad": "Iraq", "karbala": "Iraq", "najaf": "Iraq",
    "israel": "Israel", "tel aviv": "Israel", "netanyahu": "Israel", "gaza": "Israel",
    "india": "India", "modi": "India", "delhi": "India",
    "russia": "Russia", "putin": "Russia", "moscow": "Russia",
    "china": "China", "beijing": "China", "xi jinping": "China",
    "uk": "UK", "britain": "UK", "london": "UK", "british": "UK",
    "us": "US", "united states": "US", "america": "US", "biden": "US", "trump": "US", "washington": "US",
    "ukraine": "Ukraine", "kyiv": "Ukraine", "zelensky": "Ukraine",
    "turkey": "Turkey", "erdogan": "Turkey", "istanbul": "Turkey",
    "afghanistan": "Afghanistan", "kabul": "Afghanistan",
    "saudi": "Saudi Arabia", "riyadh": "Saudi Arabia", "mbs": "Saudi Arabia",
    "syria": "Syria", "damascus": "Syria",
    "yemen": "Yemen", "houthi": "Yemen",
    "lebanon": "Lebanon", "beirut": "Lebanon", "hezbollah": "Lebanon",
    "egypt": "Egypt", "cairo": "Egypt",
    "europe": "Europe", "eu": "Europe", "germany": "Germany", "france": "France"
}


def translate_to_urdu(text):
    if not text or len(text) < 3:
        return text or ""
    try:
        url = "https://translate.googleapis.com/translate_a/single"
        params = {"client": "gtx", "sl": "en", "tl": "ur", "dt": "t", "q": text[:4500]}
        r = requests.get(url, params=params, timeout=8, headers={"User-Agent": "Mozilla/5.0"})
        r.raise_for_status()
        result = r.json()
        translated = "".join(p[0] for p in result[0] if p and p[0])
        return translated
    except Exception:
        return text


def detect_country(title, desc):
    combined = (title + " " + desc).lower()
    for kw, country in COUNTRIES.items():
        if kw in combined:
            return country
    return "International"


def fetch_news():
    if not NEWS_API_KEY:
        print("WARNING: No NEWS_API_KEY set", file=sys.stderr)
        return {"world": [], "pakistan": []}
    try:
        since = (datetime.now(timezone.utc) - timedelta(hours=48)).strftime("%Y-%m-%dT%H:%M:%S")
        url = "https://newsapi.org/v2/everything"
        params = {
            "q": "(Pakistan OR Iran OR Iraq OR Israel) OR (United States AND politics) OR (UK AND politics)",
            "from": since, "sortBy": "publishedAt", "pageSize": 40, "language": "en",
            "apiKey": NEWS_API_KEY
        }
        r = requests.get(url, params=params, timeout=20)
        r.raise_for_status()
        data = r.json()
        articles = data.get("articles", [])
    except Exception as e:
        print(f"News fetch error: {e}", file=sys.stderr)
        return {"world": [], "pakistan": []}

    world, pakistan = [], []
    seen_titles = set()
    for a in articles:
        title = (a.get("title") or "").strip()
        if not title or title in seen_titles or len(title) < 10:
            continue
        seen_titles.add(title)
        desc = (a.get("description") or "").strip()
        source = (a.get("source") or {}).get("name", "News Agency")
        url = a.get("url", "")
        pub = (a.get("publishedAt") or "")[:19]
        country = detect_country(title, desc or "")
        item = {"title": title, "desc": desc, "source": source, "url": url, "time": pub, "country": country}
        if country == "Pakistan":
            pakistan.append(item)
        else:
            world.append(item)
    return {"world": world[:15], "pakistan": pakistan[:12]}


def fetch_weather():
    try:
        url = "https://api.open-meteo.com/v1/forecast"
        params = {
            "latitude": 31.5497, "longitude": 74.3436,
            "daily": "temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max",
            "timezone": "Asia/Karachi", "forecast_days": 7
        }
        r = requests.get(url, params=params, timeout=10)
        r.raise_for_status()
        d = r.json().get("daily", {})
    except Exception as e:
        print(f"Weather error: {e}", file=sys.stderr)
        return {"city": "Lahore", "forecast": []}

    forecast = []
    dates = d.get("time", [])
    highs = d.get("temperature_2m_max", [])
    lows = d.get("temperature_2m_min", [])
    codes = d.get("weathercode", [])
    precips = d.get("precipitation_probability_max", [])
    for i in range(min(7, len(dates))):
        dt = datetime.strptime(dates[i], "%Y-%m-%d")
        wd = dt.weekday()
        en_cond, ur_cond = WMO_CODES.get(codes[i] if i < len(codes) else 0, ("Unknown", "نامعلوم"))
        forecast.append({
            "date": dates[i], "day": WEEKDAYS.get(wd, ""),
            "high": round(highs[i]) if i < len(highs) else None,
            "low": round(lows[i]) if i < len(lows) else None,
            "condition": en_cond, "condition_ur": ur_cond,
            "precip": round(precips[i]) if i < len(precips) else 0
        })
    return {"city": "Lahore", "city_ur": "لاہور", "forecast": forecast}


def fetch_dates():
    now = datetime.now(timezone.utc) + timedelta(hours=5)
    try:
        url = f"https://api.aladhan.com/v1/gToH?date={now.day:02d}-{now.month:02d}-{now.year}"
        r = requests.get(url, timeout=8)
        r.raise_for_status()
        h = r.json().get("data", {}).get("hijri", {})
        hijri = f"{h.get('day', '')} {h.get('month', {}).get('en', '')} {h.get('year', '')}"
        hijri_ur = f"{h.get('day', '')} {h.get('month', {}).get('ar', '')} {h.get('year', '')}"
    except Exception:
        hijri = hijri_ur = "—"

    months = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"]
    wd_en = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    greg = f"{wd_en[now.weekday()]}, {now.day} {months[now.month-1]} {now.year}"
    return {"gregorian": greg, "hijri": hijri, "hijri_ur": hijri_ur}


def get_business():
    day_seed = datetime.now(timezone.utc).toordinal()
    q = BUSINESS_POOL[day_seed % len(BUSINESS_POOL)]
    return q


def main():
    print("Fetching news...")
    news = fetch_news()
    print(f"  World: {len(news['world'])} | Pakistan: {len(news['pakistan'])}")

    print("Fetching weather...")
    weather = fetch_weather()
    print(f"  Days: {len(weather['forecast'])}")

    if news["world"] or news["pakistan"]:
        print("Translating titles to Urdu...")
        for item in news["world"] + news["pakistan"]:
            item["title_ur"] = translate_to_urdu(item["title"])
            item["desc_ur"] = translate_to_urdu(item["desc"])
    else:
        for item in news["world"] + news["pakistan"]:
            item["title_ur"] = item["title"]
            item["desc_ur"] = item["desc"]

    dates = fetch_dates()
    biz = get_business()
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    output = {
        "generated": ts,
        "world": news["world"],
        "pakistan": news["pakistan"],
        "business": biz,
        "weather": weather,
        "date": dates
    }

    with open(OUTPUT, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print(f"✅ Written {OUTPUT} ({len(json.dumps(output))} bytes)")


if __name__ == "__main__":
    main()
