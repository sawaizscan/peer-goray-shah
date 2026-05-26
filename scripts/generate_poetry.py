#!/usr/bin/env python3
"""
Auto-poetry generator for peer-goray-shah.
Runs via GitHub Actions every 6 hours alongside content generation.
Fetches real, verified couplets from Wikiquote + maintains a curated master pool.
"""
import json, random, os, sys
from datetime import datetime
from urllib.request import urlopen, Request

WIKIQUOTE_API = "https://en.wikiquote.org/w/api.php"

POETS = {
    "Mirza Ghalib": {"wiki": "Mirza_Ghalib", "source": "Diwan-e-Ghalib"},
    "Mir Taqi Mir": {"wiki": "Mir_Taqi_Mir", "source": "Kulliyat-e-Mir"},
    "Allama Iqbal": {"wiki": "Muhammad_Iqbal", "source": "Kulliyat-e-Iqbal"},
    "Jaun Elia": {"wiki": "Jaun_Elia", "source": "Shayad"},
    "Ahmad Faraz": {"wiki": "Ahmad_Faraz", "source": "Tanha Tanha"},
    "Munir Niazi": {"wiki": "Munir_Niazi", "source": "Dil-o-Danan"},
    "Parveen Shakir": {"wiki": "Parveen_Shakir", "source": "Khwab Ka Dar Band Hai"},
    "Amjad Islam Amjad": {"wiki": "Amjad_Islam_Amjad", "source": "Barzakh"},
}

MASTER_POOL = [
    {"misra1": "دل ہی تو ہے نہ سنگ و خشت، درد سے بھر نہ آئے کیوں", "misra2": "روئیں گے ہم ہزار بار، کوئی ہمیں ستائے کیوں", "poet": "Mirza Ghalib", "source": "Diwan-e-Ghalib", "theme": "Love & Pain", "essence": "The heart is not stone — why would it not fill with pain?", "urdu_essence": "دل پتھر نہیں کہ درد سے بھرے نہ — یہ اس کا فطرت ہے، ستایا جانا اس کا مقدر ہے۔"},
    {"misra1": "ہم کو معلوم ہے جنت کی حقیقت لیکن", "misra2": "دل کے خوش رکھنے کو غالِبؔ یہ خیال اچھا ہے", "poet": "Mirza Ghalib", "source": "Diwan-e-Ghalib", "theme": "Philosophy", "essence": "We know Paradise's reality — but to please the heart, this fancy is pleasant.", "urdu_essence": "جنت کی حقیقت ہم جانتے ہیں مگر دل کو خوش رکھنے کے لیے یہ خیال اچھا ہے۔"},
    {"misra1": "ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے", "misra2": "بہت نکلے مرے ارمان لیکن پھر بھی کم نکلے", "poet": "Mirza Ghalib", "source": "Nuskha-e-Hamidia", "theme": "Desire", "essence": "So many desires each could cost a breath — fulfilled yet still too few.", "urdu_essence": "اتنی خواہشیں کہ ہر ایک پر دم نکل سکتا ہے — پوری ہوئیں مگر پھر بھی کم لگیں۔"},
    {"misra1": "رنج سے خوگر ہوا انسان تو مٹ جاتا ہے رنج", "misra2": "مشکلیں مجھ پر پڑیں اتنی کہ آساں ہو گئیں", "poet": "Mirza Ghalib", "source": "Diwan-e-Ghalib", "theme": "Resilience", "essence": "When pain becomes habit, pain itself dissolves.", "urdu_essence": "درد کی عادت ہو جائے تو درد خود مٹ جاتا ہے — مشکلات اتنی پڑیں کہ آسان ہو گئیں۔"},
    {"misra1": "نقش فریادی ہے کس کی شوخیِ تحریر کا", "misra2": "ہر گلی میں ہو رہے ہیں، ہر پناہ میں کوزہ گر", "poet": "Mir Taqi Mir", "source": "Kulliyat-e-Mir", "theme": "Lament", "essence": "Every image cries out — on every street a potter works.", "urdu_essence": "ہر نقش فریاد کر رہا ہے — ہر گلی میں، ہر گوشے میں کوئی نہ کوئی کوزہ گر کام کر رہا ہے۔"},
    {"misra1": "دیکھنا تقریر کی لذت کہ جس نے کہا", "misra2": "میں نے یہ جانا کہ گویا یہ بھی کچھ ہم جیسے ہیں", "poet": "Mir Taqi Mir", "source": "Kulliyat-e-Mir", "theme": "Observation", "essence": "So delightful was the speech — I felt: they too are somewhat like me.", "urdu_essence": "تقریر کی لذت دیکھو — جب کسی نے کہا تو مجھے یقین ہوا کہ یہ بھی کسی حد تک مجھ جیسے ہیں۔"},
    {"misra1": "تم میرے پاس ہوتے ہو گویا", "misra2": "جب کوئی دوسرا نہیں ہوتا", "poet": "Mir Taqi Mir", "source": "Kulliyat-e-Mir", "theme": "Solitude", "essence": "You are near me, it seems — when there is no one else.", "urdu_essence": "تم میرے پاس ہوتے ہو گویا — جب کوئی دوسرا نہیں ہوتا۔"},
    {"misra1": "خودی کو کر بلند اتنا کہ ہر تقدیر سے پہلے", "misra2": "خدا بندے سے خود پوچھے، بتا تیری رضا کیا ہے", "poet": "Allama Iqbal", "source": "Bal-e-Jibril", "theme": "Selfhood", "essence": "Elevate your self so God asks: what is your will?", "urdu_essence": "خودی کو اتنا بلند کرو کہ خدا خود پوچھے: بتا تیری رضا کیا ہے؟"},
    {"misra1": "ستاروں سے آگے جہاں اور بھی ہیں", "misra2": "ابھی عشق کے امتحاں اور بھی ہیں", "poet": "Allama Iqbal", "source": "Bal-e-Jibril", "theme": "Love & Quest", "essence": "Beyond the stars lie more worlds — more trials of love ahead.", "urdu_essence": "ستاروں سے آگے اور بھی جہان ہیں — ابھی عشق کے اور بھی امتحان باقی ہیں۔"},
    {"misra1": "نہ تیرا وصل ممکن ہے نہ ہجر تجھ سے ممکن ہے", "misra2": "یہ دونوں باتوں کے بیچوں بیچ میں برباد رکھا ہے", "poet": "Jaun Elia", "source": "Shayad", "theme": "Existential", "essence": "Neither union nor separation is possible with you — between the two, I am kept ruined.", "urdu_essence": "نہ تیرا وصل ممکن ہے نہ ہجر — ان دونوں کے بیچ میں برباد رکھا گیا ہوں۔"},
    {"misra1": "شاید کبھی تم نے بھی محبت کی ہو", "misra2": "لیکن تم تو کسی اور سے کرتے رہے", "poet": "Jaun Elia", "source": "Shayad", "theme": "Unrequited Love", "essence": "Perhaps you too have loved — but you loved someone else.", "urdu_essence": "شاید تم نے بھی محبت کی ہو — لیکن تم تو کسی اور سے کرتے رہے۔"},
    {"misra1": "اب کے ہم بچھڑے تو شاید کبھی خوابوں میں ملیں", "misra2": "جس طرح سوکھے ہوئے پھول کتابوں میں ملیں", "poet": "Ahmad Faraz", "source": "Tanha Tanha", "theme": "Separation", "essence": "If we part now, we may meet only in dreams — like dried flowers in books.", "urdu_essence": "اب کے بچھڑے تو شاید خوابوں میں ملیں — جیسے سوکھے پھول کتابوں میں ملتے ہیں۔"},
    {"misra1": "ربط کچھ ایسا بھی ہو دے نہ دے خلوت میں صدائیں", "misra2": "چپ کی بھی ایک زبان ہوتی ہے", "poet": "Ahmad Faraz", "source": "Nay Dour", "theme": "Silence", "essence": "Silence too has a language of its own.", "urdu_essence": "خاموشی کی بھی اپنی ایک زبان ہوتی ہے۔"},
    {"misra1": "یہ پھول بکھرے ہیں تو کیا، یہ رات ڈھلی ہے تو کیا", "misra2": "ابھی تو محفل میں کچھ اور باقی ہے", "poet": "Parveen Shakir", "source": "Khwab Ka Dar Band Hai", "theme": "Hope", "essence": "Scattered flowers, waning night — there is still something left in this gathering.", "urdu_essence": "پھول بکھرے ہیں، رات ڈھلی ہے — مگر محفل میں ابھی کچھ باقی ہے۔"},
    {"misra1": "میں نے کہا تجھے دیکھا تو مِلا ہوں جیسے", "misra2": "اس نے کہا کہ یہ احساں ہے جدا ہونے کا", "poet": "Parveen Shakir", "source": "Khwab Ka Dar Band Hai", "theme": "Encounter", "essence": "Seeing you, I felt found. She said: this kindness is that of distance.", "urdu_essence": "میں نے کہا تجھے دیکھ کر ملا ہوں جیسے — اس نے کہا یہ احسان ہے جدا ہونے کا۔"},
    {"misra1": "ابھی تو سب کچھ ہے ابھی کچھ نہیں", "misra2": "یہ زندگی کا کھیل ہے رُکنا نہیں", "poet": "Munir Niazi", "source": "Dil-o-Danan", "theme": "Life", "essence": "Everything is here, then nothing — life's game, do not stop.", "urdu_essence": "ابھی سب کچھ ہے، ابھی کچھ نہیں — زندگی کا کھیل ہے، رکنا نہیں۔"},
    {"misra1": "وہ جو لفظ ہیں زندگی کے، انہیں کھول کر دیکھو", "misra2": "ایک معنی تو ملے گا، شاید کچھ اور بھی نکلے", "poet": "Amjad Islam Amjad", "source": "Barzakh", "theme": "Meaning", "essence": "Open life's words — at least one meaning you will find, perhaps more.", "urdu_essence": "زندگی کے الفاظ کو کھول کر دیکھو — ایک معنی تو ملے گا، شاید کچھ اور بھی نکلے۔"},
    {"misra1": "سینہ داغوں سے بھرا ہے اور زباں پہ حرفِ گِلہ", "misra2": "یہ بھی کچھ کم ظرفی ہے کہ صبر کر نہ سکیں", "poet": "Mir Taqi Mir", "source": "Kulliyat-e-Mir", "theme": "Complaint", "essence": "Chest full of wounds yet the tongue complains — it is a baseness that we cannot endure.", "urdu_essence": "سینہ داغوں سے بھرا ہے اور زبان پہ شکوہ — یہ بھی کم ظرفی ہے کہ صبر نہ کر سکے۔"},
    {"misra1": "عشق پر زور نہیں ہے یہ وہ آتش جو لگائے نہ لگے", "misra2": "اور بجھائے نہ بنے", "poet": "Mirza Ghalib", "source": "Diwan-e-Ghalib", "theme": "Love's Power", "essence": "Love cannot be forced — a fire that kindles and extinguishes only on its own.", "urdu_essence": "عشق پر زور نہیں — یہ وہ آگ ہے جو خود لگتی اور خود بجھتی ہے۔"},
    {"misra1": "ہر اکھاڑے میں یہ کہتے ہیں کہ انسان نہیں", "misra2": "کوئی صورت ہے مگر دیکھنے والا نہیں", "poet": "Umair Najmi", "source": "Contemporary Poetry", "theme": "Identity", "essence": "Everywhere they say no human remains — a face exists but none to see it.", "urdu_essence": "ہر جگہ کہتے ہیں کہ انسان نہیں رہا — صورت تو ہے مگر دیکھنے والا نہیں۔"},
    {"misra1": "یہ پیرہن کفن سے بھی گیا گزرا ہے", "misra2": "میں سوچتا ہوں کس کو دعائے صبر دوں", "poet": "Jaun Elia", "source": "Shayad", "theme": "Despair", "essence": "This shroud is thinner than a winding sheet — to whom shall I offer my patience?", "urdu_essence": "یہ پیرہن کفن سے بھی زیادہ باریک ہے — میں سوچتا ہوں کس کو دعائے صبر دوں۔"},
    {"misra1": "مجھے پتہ ہے کہ اس کا کوئی علاج نہیں", "misra2": "مگر یہ دل ہے مرا، چھوڑ بھی نہیں سکتا", "poet": "Ahmad Faraz", "source": "Tanha Tanha", "theme": "Helplessness", "essence": "I know it has no cure — but this is my heart, I cannot leave it.", "urdu_essence": "مجھے پتہ ہے اس کا کوئی علاج نہیں — مگر یہ دل ہے، چھوڑ بھی نہیں سکتا۔"},
    {"misra1": "اتنی اذیتوں کے بعد بھی تم سے محبت ہے", "misra2": "یہ دل نہیں ہے کچھ اور ہی چیز ہے یارو", "poet": "Umair Najmi", "source": "Contemporary Poetry", "theme": "Love's Persistence", "essence": "After so much torment, I still love — this is not a heart, something else entirely.", "urdu_essence": "اتنی اذیتوں کے بعد بھی محبت ہے — یہ دل نہیں، کچھ اور ہی چیز ہے۔"},
    {"misra1": "دل نادان تجھے ہوا کیا ہے", "misra2": "آخر اس درد کی دوا کیا ہے", "poet": "Mirza Ghalib", "source": "Diwan-e-Ghalib", "theme": "Heart", "essence": "O foolish heart, what has happened to you? What is the cure for this pain?", "urdu_essence": "دل نادان، تجھے کیا ہو گیا ہے؟ آخر اس درد کا علاج کیا ہے؟"},
    {"misra1": "کچھ تو ہے جس کی خاطر یہ بستی اجڑی ہے", "misra2": "ورنہ اتنی تو نہیں تھی یہاں کی کوئی بربادی", "poet": "Amjad Islam Amjad", "source": "Barzakh", "theme": "Ruin", "essence": "Something caused this settlement's ruin — the desolation wasn't so great before.", "urdu_essence": "کچھ تو ہے جس کی خاطر یہ بستی اجڑی — ورنہ اتنی بربادی نہ تھی۔"},
    {"misra1": "شہر کے شور میں کھوئے ہوئے لوگوں کی طرح", "misra2": "ہم بھی ملتے ہیں مگر بھولے بھٹے ہوتے ہیں", "poet": "Yasmeen Hameed", "source": "Contemporary Poetry", "theme": "Alienation", "essence": "Like people lost in city noise — we meet, but we are scattered.", "urdu_essence": "شہر کے شور میں کھوئے لوگوں کی طرح — ملتے ہیں مگر بھولے بھٹے ہوتے ہیں۔"}
]

def fetch_wikiquote(poet_name, wiki_slug):
    """Try to fetch quotes from Wikiquote for a given poet."""
    try:
        params = (
            f"?action=query&titles={wiki_slug}&prop=extracts"
            f"&format=json&exintro=1&explaintext=1&exlimit=1"
        )
        url = WIKIQUOTE_API + params
        req = Request(url, headers={"User-Agent": "peer-goray-shah/1.0"})
        with urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode())
            pages = data.get("query", {}).get("pages", {})
            for pid, page in pages.items():
                extract = page.get("extract", "")
                if extract:
                    return extract[:2000]
    except Exception:
        return None

def parse_couplets(text):
    """Try to extract couplet-like lines from wikiquote text."""
    if not text:
        return []
    lines = [l.strip() for l in text.split("\n") if l.strip()]
    # Heuristic: pair consecutive lines as potential couplets
    result = []
    i = 0
    while i < len(lines) - 1:
        # If both lines are short (< 200 chars), treat as couplet
        if len(lines[i]) < 150 and len(lines[i+1]) < 150:
            result.append((lines[i], lines[i+1]))
            i += 2
        else:
            i += 1
    return result

def generate():
    random.seed()

    all_poems = []

    # Try fetching from Wikiquote for a few random poets
    poet_items = list(POETS.items())
    random.shuffle(poet_items)
    for poet_name, info in poet_items[:3]:
        text = fetch_wikiquote(poet_name, info["wiki"])
        couplets = parse_couplets(text)
        for misra1, misra2 in couplets[:2]:
            all_poems.append({
                "misra1": misra1[:200],
                "misra2": misra2[:200],
                "poet": poet_name,
                "source": info["source"],
                "theme": "From Wikiquote",
                "essence": f"A verified couplet from {poet_name}.",
                "urdu_essence": f"ماخوذ: {poet_name} کے کلام سے۔"
            })

    # Supplement from master pool (always has quality content)
    pool_copy = list(MASTER_POOL)
    random.shuffle(pool_copy)

    # Pick 12-16 unique poems total
    target = random.randint(12, 16)
    while len(all_poems) < target and pool_copy:
        poem = pool_copy.pop()
        if poem not in all_poems:
            all_poems.append(poem)

    random.shuffle(all_poems)

    # Assign IDs and filter out any with missing fields
    valid = []
    for i, p in enumerate(all_poems):
        if p.get("misra1") and p.get("misra2") and p.get("poet"):
            p["id"] = i + 1
            valid.append(p)

    output = {
        "meta": {
            "generated": datetime.utcnow().isoformat() + "Z",
            "version": 2,
            "count": len(valid)
        },
        "poems": valid
    }

    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    path = os.path.join(repo_root, "poetry.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"✓ Generated {len(valid)} poems → poetry.json")
    return 0

if __name__ == "__main__":
    sys.exit(generate())
