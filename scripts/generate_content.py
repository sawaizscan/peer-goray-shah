#!/usr/bin/env python3
"""
Auto-content generator for peer-goray-shah.
Runs via GitHub Actions every 6 hours.
Fetches fresh spiritual content from Wikipedia API + curated pools.
"""
import json, random, os, sys
from datetime import datetime
from urllib.request import urlopen, Request
from urllib.error import URLError

WIKI_API = "https://en.wikipedia.org/api/rest_v1/page/summary/"

TOPICS = [
    "Rumi", "Ibn_Arabi", "Mulla_Sadra", "Ayn_al-Qudat_Hamadani",
    "Al-Ghazali", "Imam_Khomeini", "Bulleh_Shah", "Mansur_al-Hallaj",
    "Shaykh_Bahai", "Mulla_Husayn_Quli_Hamadani", "Shah_Abdul_Latif_Bhittai",
    "Jami", "Hafez", "Al-Farabi", "Avicenna", "Suhrawardi",
    "Imam_Husayn", "Imam_Ali", "Fatima_al-Zahra", "Imam_al-Mahdi",
    "Kaaba", "Isra_and_Mi'raj", "Barzakh", "Qiyamah",
    "Tawhid", "Nafs", "Ruh", "Ishq", "Fana_(Sufism)",
    "Baqaa", "Dhikr", "Muraqaba", "Tafsir", "Hadith",
    "Al-Kafi", "Bihar_al-Anwar", "Nahj_al-Balagha",
    "Al-Sahifa_al-Sajjadiyya", "Tuhaf_al-Uqul",
    "Masnavi", "Futuhat_al-Makkiyya", "Tamhidat",
    "Mirsad_al-Ibad", "Kashf_al-Mahjub",
    "Quran", "Al-Fatiha", "Ayat_al-Kursi", "Surah_al-Ikhlas",
    "Alchemy", "Jabir_ibn_Hayyan", "Islamic_astronomy",
    "Shia_Islam", "Sufism", "Irfan", "Kalam",
    "Mulla_Nasruddin", "Islamic_ethics", "Spiritual_healing"
]

WIT_POOL = [
    {"text": "A mureed asked his Pir: 'Master, how long have I been in your company?' The Pir replied: 'Son, you haven't even asked when you arrived. If the question hasn't arisen, how can the answer come?'", "urdu": "ایک مرید نے اپنے پیر سے پوچھا: 'مولانا، میں آپ کی صحبت میں کب سے ہوں؟' پیر نے جواب دیا: 'بیٹا، تم نے ابھی یہ بھی نہیں پوچھا کہ کب آئے تھے۔ جب سوال ہی نہیں اٹھا تو جواب کیسے آئے گا؟'", "source": "Popular Lutfia", "type": "Pir-Mureed"},
    {"text": "A man asked Ibn Arabi: 'How do I know God?' Ibn Arabi said: 'Do you know who is asking?'", "urdu": "ایک شخص نے ابن عربی سے پوچھا: 'اللہ کو کیسے پہچانوں؟' ابن عربی نے کہا: 'کیا تم جانتے ہو کہ پوچھنے والا کون ہے؟'", "source": "Futuhat, Adapted", "type": "Scholarly Humor"},
    {"text": "Mulla Nasruddin was asked: 'What happens after death?' The Mulla said: 'Forget about after death — first see what this life before death is, then ask.'", "urdu": "ملا نصرالدین سے پوچھا گیا: 'موت کے بعد کیا ہوتا ہے؟' ملا نے کہا: 'موت کے بعد کو چھوڑو — پہلے دیکھو موت سے پہلے کی یہ زندگی کیا ہے، پھر پوچھو۔'", "source": "Mulla Nasruddin", "type": "Mulla Nasruddin"},
    {"text": "A student asked Allamah Tabatabai: 'How did you write such a massive tafsir?' He smiled: 'You read each verse — I asked each verse.'", "urdu": "ایک طالب علم نے علامہ طباطبائی سے پوچھا: 'اتنی بڑی تفسیر کیسے لکھی؟' وہ مسکرائے: 'تم نے آیت پڑھی — میں نے آیت سے پوچھا۔'", "source": "Popular Lutfia", "type": "Scholarly Humor"},
    {"text": "Shaykh Ansari was asked: 'What is the most difficult ruling in fiqh?' He said: 'To stop giving your own opinion when the truth has already been spoken.'", "urdu": "شیخ انصاری سے پوچھا گیا: 'فقہ میں سب سے مشکل حکم کیا ہے؟' فرمایا: 'اپنی رائے دینا چھوڑ دینا جب حقیقت پہلے ہی بیان ہو چکی ہو۔'", "source": "Shaykh Ansari", "type": "Scholarly Humor"},
    {"text": "Imam al-Ghazali was asked: 'You mastered the outward sciences — why did you then abandon them?' He said: 'The outward told me where the door was; the inward let me enter.'", "urdu": "امام غزالی سے پوچھا گیا: 'آپ نے ظاہری علوم میں مہارت حاصل کی — پھر انہیں کیوں چھوڑ دیا؟' کہا: 'ظاہر نے مجھے بتایا کہ دروازہ کہاں ہے، باطن نے اندر داخل کیا۔'", "source": "Ihya al-Ulum", "type": "Pir-Mureed"},
    {"text": "A man went to a sage: 'I want to see God.' The sage said: 'Close your eyes and look inward.' The man closed his eyes. 'I see nothing.' 'Then you looked with eyes — not with the heart.'", "urdu": "ایک شخص ایک عارف کے پاس گیا: 'میں اللہ کو دیکھنا چاہتا ہوں۔' عارف نے کہا: 'آنکھیں بند کرو اور اندر دیکھو۔' اس نے آنکھیں بند کیں۔ 'کچھ نہیں دیکھتا۔' 'تو نے آنکھوں سے دیکھا — دل سے نہیں۔'", "source": "Popular Tale", "type": "Pir-Mureed"},
    {"text": "Mulla Nasruddin sat by a river. A scholar asked: 'Mulla, can you read Arabic?' The Mulla said: 'I can read water — it says: Flow, for stagnation is death.'", "urdu": "ملا نصرالدین دریا کے کنارے بیٹھے تھے۔ ایک عالم نے پوچھا: 'ملا، کیا آپ عربی پڑھ سکتے ہیں؟' ملا نے کہا: 'میں پانی پڑھ سکتا ہوں — وہ کہتا ہے: بہتے رہو، کیونکہ جمنا موت ہے۔'", "source": "Mulla Nasruddin", "type": "Mulla Nasruddin"},
    {"text": "A philosopher asked Rumi: 'You speak of love — but what is its proof?' Rumi replied: 'The proof of fire is that it burns. Come closer.'", "urdu": "ایک فلسفی نے رومی سے پوچھا: 'تم محبت کی بات کرتے ہو — مگر اس کی دلیل کیا ہے؟' رومی نے جواب دیا: 'آگ کی دلیل یہ ہے کہ جلاتی ہے۔ قریب آؤ۔'", "source": "Masnavi, Adapted", "type": "Spiritual"},
    {"text": "Mulla Nasruddin saw a group arguing about God's essence. He laughed: 'You remind me of blind men describing an elephant — each touching a different part, each sure he alone is right.'", "urdu": "ملا نصرالدین نے ایک گروہ کو اللہ کی ذات پر بحث کرتے دیکھا۔ وہ ہنسے: 'تم مجھے اندھوں کی یاد دلاتے ہو جو ہاتھی کو بیان کر رہے ہوں — ہر ایک ایک مختلف حصہ چھو رہا ہے، ہر ایک کو یقین ہے کہ وہی صحیح ہے۔'", "source": "Mulla Nasruddin", "type": "Mulla Nasruddin"},
    {"text": "A faqih was explaining proofs of God's existence. A simple man interrupted: 'You speak as if He is lost. I speak as if He is here and needs to be felt.'", "urdu": "ایک فقیہ اللہ کے وجود کی دلیلیں بیان کر رہے تھے۔ ایک سادہ آدمی نے ٹوکا: 'آپ ایسے بول رہے ہیں جیسے وہ گم ہو گیا ہے۔ میں ایسے بولتا ہوں جیسے وہ حاضر ہے اور محسوس کرنے کی ضرورت ہے۔'", "source": "Popular Tale", "type": "Pir-Mureed"},
    {"text": "Shaykh Baha'i dreamt of Imam al-Zaman (AJ) and asked: 'Master, what is the shortest path?' The Imam replied: 'Start walking and the path will rise beneath your feet.'", "urdu": "شیخ بہائی نے حضرت امام زمانہ (عج) کا خواب دیکھا اور پوچھا: 'مولا، سب سے چھوٹا راستہ کیا ہے؟' امام نے جواب دیا: 'چلنا شروع کرو، راستہ تمہارے پاؤں کے نیچے سے اٹھے گا۔'", "source": "Kashkul", "type": "Spiritual"},
    {"text": "A scholar cornered Rumi: 'Define love precisely — no poetry.' Rumi laughed: 'You might as well ask a fish to define water precisely — no wetness.'", "urdu": "ایک عالم نے رومی کو گھیر لیا: 'محبت کی بالکل درست تعریف کرو — کوئی شاعری نہیں۔' رومی ہنسے: 'تم مچھلی سے کہہ سکتے ہو کہ پانی کی بالکل درست تعریف کرے — گیلاپن کے بغیر۔'", "source": "Mathnawi, Adapted", "type": "Scholarly Humor"},
    {"text": "Someone asked Mulla Sadra: 'Why is your philosophy so hard to understand?' He said: 'The sun is not hard to see — it's the eyes that need preparation.'", "urdu": "کسی نے ملا صدرا سے پوچھا: 'آپ کا فلسفہ اتنا مشکل کیوں ہے؟' انہوں نے کہا: 'سورج کو دیکھنا مشکل نہیں — آنکھیں ہیں جنہیں تیاری کی ضرورت ہے۔'", "source": "Asfar, Adapted", "type": "Scholarly Humor"}
]

def fetch_wikipedia(topic):
    try:
        url = WIKI_API + topic
        req = Request(url, headers={"User-Agent": "peer-goray-shah/1.0"})
        with urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode())
            extract = data.get("extract", "")
            if not extract:
                return None
            # Take first 2-3 sentences as a fact
            sentences = extract.replace("\n", " ").split(".")
            fact = ". ".join(s[:200] for s in sentences[:3] if s.strip())
            if len(fact) < 30:
                return None
            return {
                "text": fact.strip() + ".",
                "source": topic.replace("_", " ") + " — Wikipedia",
                "category": categorize(topic)
            }
    except Exception:
        return None

def categorize(topic):
    spiritual = ["Rumi", "Ibn_Arabi", "Ghazali", "Hallaj", "Suhrawardi", "Hafez", "Jami", "Bulleh"]
    scholars = ["Avicenna", "Farabi", "Sadra", "Bahai", "Tabatabai", "Khomeini"]
    quran = ["Quran", "Fatiha", "Ikhlas", "Ayat", "Surah"]
    hadith = ["Hadith", "Kafi", "Bihar", "Nahj", "Sahifa"]
    if any(s in topic for s in spiritual):
        return "Spiritual"
    if any(s in topic for s in scholars):
        return "Scholars"
    if any(s in topic for s in quran):
        return "Quran"
    if any(s in topic for s in hadith):
        return "Hadith"
    if "Nasruddin" in topic:
        return "Folklore"
    if "Imam" in topic or "Husayn" in topic or "Fatima" in topic:
        return "Ahl al-Bayt"
    if "Shia" in topic or "Sunni" in topic:
        return "History"
    if "Kaaba" in topic or "Isra" in topic or "Mi'raj" in topic:
        return "History"
    if "Sufism" in topic or "Irfan" in topic:
        return "Spiritual"
    if "Kalam" in topic or "ethics" in topic:
        return "Philosophy"
    return "General"

def generate():
    random.seed()
    
    # Pick 10 random topics to fetch
    chosen = random.sample(TOPICS, min(10, len(TOPICS)))
    facts = []
    for topic in chosen:
        result = fetch_wikipedia(topic)
        if result:
            result["urdu"] = result.get("text", "") + " — (اردو ترجمہ دستیاب نہیں)"
            facts.append(result)
    
    # If Wikipedia gave too few, supplement from curated pool
    CURATED_FACTS = [
        {"text": "The word 'heart' (qalb) in Arabic means 'to turn' — the heart constantly turns between states.", "urdu": "عربی میں 'قلب' کا مطلب پلٹنا ہے — دل مسلسل پلٹتا رہتا ہے۔", "source": "al-Kafi, vol. 2, p. 422", "category": "Language & Spirituality"},
        {"text": "Surah al-Fatiha has 7 verses — matching the 7 heavens, 7 earths, and 7 circumambulations. Every recitation is a cosmic ascent.", "urdu": "سورہ فاتحہ میں ۷ آیات ہیں — ۷ آسمانوں، ۷ زمینوں اور ۷ طوافوں کے مطابق۔ ہر تلاوت ایک کائناتی سفر ہے۔", "source": "Tafsir al-Mizan", "category": "Quran"},
        {"text": "The Prophet (SAW) said: 'Whoever recites Qul Huwa Allahu Ahad 10 times, Allah builds a palace in Paradise.'", "urdu": "نبی (ص) نے فرمایا: 'جس نے قل ہو اللہ احد ۱۰ بار پڑھی، اللہ اس کے لیے جنت میں محل بناتا ہے۔'", "source": "Bihar al-Anwar, vol. 89", "category": "Quran"},
        {"text": "Imam Ali (AS) prayed 1000 rakats of nafilah daily. His son said: 'I never saw my father tire of worship.'", "urdu": "امام علی (ع) روزانہ ۱۰۰۰ رکعت نفل پڑھتے تھے۔ ان کے بیٹے نے کہا: 'میں نے اپنے والد کو عبادت سے تھکتے نہیں دیکھا۔'", "source": "al-Kafi, vol. 3, p. 445", "category": "Ahl al-Bayt"},
        {"text": "Ayn al-Qudat Hamadani wrote Tamhidat at 28 — a masterpiece of Sufi metaphysics. Executed at 33.", "urdu": "عین القضاہ ہمدانی نے ۲۸ سال کی عمر میں تمہیدات لکھی — تصوف کی ایک شاہکار۔ ۳۳ سال کی عمر میں شہید ہوئے۔", "source": "Tamhidat", "category": "Scholars"},
        {"text": "Imam Ja'far al-Sadiq (AS) taught Jabir ibn Hayyan, the father of chemistry — science of the soul and elements.", "urdu": "امام جعفر صادق (ع) نے جابر بن حیان کو تعلیم دی — جو کیمیا کے بانی ہیں۔ علم روح اور عناصر دونوں۔", "source": "Fihrist al-Nadim", "category": "Scholars"},
        {"text": "'Bismillah al-Rahman al-Rahim' has 19 letters. The Zabaniyah (guardians of Hell) are also 19.", "urdu": "'بسم اللہ الرحمن الرحیم' میں ۱۹ حروف ہیں۔ خازنان جہنم (زبانیہ) بھی ۱۹ ہیں۔", "source": "Tafsir al-Burhan, vol. 1", "category": "Esoteric"},
        {"text": "Mulla Sadra was exiled from Shiraz for his philosophy. He wrote his greatest works in the village of Kahak.", "urdu": "ملا صدرا اپنے فلسفے کی وجہ سے شیراز سے جلاوطن کر دیے گئے۔ انہوں نے اپنی عظیم ترین کتب قہک گاؤں میں لکھیں۔", "source": "Mulla Sadra, Asfar", "category": "Philosophy"},
        {"text": "The Kaaba has been rebuilt at least 12 times in history. Imam Ali (AS) was born inside it.", "urdu": "کعبہ تاریخ میں کم از کم ۱۲ بار تعمیر کیا گیا۔ امام علی (ع) اس کے اندر پیدا ہوئے۔", "source": "al-Irshad, p. 5", "category": "Ahl al-Bayt"},
        {"text": "Imam al-Mahdi (AJ) will emerge on the Day of Ashura — the day Imam Husayn (AS) was martyred.", "urdu": "امام مہدی (عج) یوم عاشورہ ظاہر ہوں گے — جس دن امام حسین (ع) شہید ہوئے تھے۔", "source": "Bihar al-Anwar, vol. 52", "category": "Eschatology"},
        {"text": "Mulla Husayn Quli Hamadani: 'The journey to Allah is not in miles but in breaths. Each breath takes you closer or farther.'", "urdu": "ملا حسینقلی ہمدانی: 'اللہ کا سفر میلوں میں نہیں بلکہ سانسوں میں ہے۔ ہر سانس قریب یا دور لے جاتا ہے۔'", "source": "Malfuzat", "category": "Spiritual"},
        {"text": "Jibra'il (AS) did not enter Fatima's (AS) house for 3 days after the Prophet's (SAW) death — the light had left.", "urdu": "حضرت جبرائیل (ع) وفات نبوی کے بعد ۳ دن تک حضرت فاطمہ (ع) کے گھر میں داخل نہیں ہوئے — نور چلا گیا تھا۔", "source": "Amali al-Saduq", "category": "Ahl al-Bayt"},
        {"text": "Shaykh Bahai was a grand jurist and a master of astrology, mathematics, and esoteric sciences.", "urdu": "شیخ بہائی ایک عظیم فقیہ اور علم نجوم، ریاضی اور علوم غریبہ کے ماہر تھے۔", "source": "Kashkul", "category": "Scholars"},
        {"text": "Ibn Arabi wrote 500+ works. Asked the shortest path to God: 'Know yourself.' Asked for shorter: 'Be silent.'", "urdu": "ابن عربی نے ۵۰۰+ کتب لکھیں۔ اللہ کا قریب ترین راستہ پوچھا: 'خود کو پہچان۔' مزید مختصر پوچھا: 'خاموش رہ۔'", "source": "Futuhat al-Makkiyya", "category": "Scholars"}
    ]
    
    while len(facts) < 8:
        extra = random.choice(CURATED_FACTS)
        if extra not in facts:
            facts.append(extra)
    
    random.shuffle(facts)
    
    # Assign IDs
    for i, f in enumerate(facts):
        f["id"] = i + 1
    
    # Pick 6 wit entries at random
    wit_count = min(6, len(WIT_POOL))
    wit_entries = random.sample(WIT_POOL, wit_count)
    random.shuffle(wit_entries)
    for i, w in enumerate(wit_entries):
        w["id"] = i + 1
    
    # Build output
    output = {
        "meta": {
            "generated": datetime.utcnow().isoformat() + "Z",
            "version": 2
        },
        "facts": facts,
        "wit": wit_entries
    }
    
    # Write to file
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    path = os.path.join(repo_root, "discover.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    print(f"✓ Generated {len(facts)} facts + {len(wit_entries)} wit entries → discover.json")
    return 0

if __name__ == "__main__":
    sys.exit(generate())
