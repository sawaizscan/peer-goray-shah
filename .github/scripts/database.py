#!/usr/bin/env python3
"""database.py — migrate all data to unified opencode-01 format

Reads: data.json, discover.json, poetry.json
Writes: database.json
"""

import json
import os
from datetime import datetime, timezone

BASE = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# ── Category A mapping ──────────────────────────────────────────────
IMAM_KEYWORDS = [
    'Imam Ali (AS)', 'Imam Ali ibn Abi Talib (AS)', 'Imam Ali ibn al-Husayn (AS)',
    'Imam Zayn al-Abidin (AS)', 'Imam Muhammad al-Baqir (AS)', 'Imam al-Baqir (AS)',
    'Imam Ja\'far al-Sadiq (AS)', 'Imam Ja\'far al-Sadiq (AS)',
    'Imam Musa al-Kadhim (AS)', 'Imam Ali al-Rida (AS)',
]

SUFI_AUTHORS = [
    'Rumi', 'Mawlana Rumi', 'Jalal al-Din Rumi', 'Mawlana Jalal al-Din Rumi',
    'Hafiz Shirazi', 'Mirza Ghalib', 'Bedil', 'Dard',
    'Saadi Shirazi', 'Bulleh Shah', 'Baba Farid', 'Waris Shah',
    'Shah Abdul Latif Bhittai', 'Khwaja Ghulam Farid', 'Nasir Khusraw',
    'Allama Iqbal', 'Josh Malihabadi', 'Mir Anis', 'Mir Anees',
    'Ayn al-Qudat Hamadani', 'Ayn al-Qudat', 'Mansur Hallaj', 'Mansur al-Hallaj',
    'Shaykh Muhyi al-Din Ibn Arabi', 'Shaykh Shihab al-Din Suhrawardi',
    'Jami', 'Farid al-Din Attar', 'Fakhr al-Din Iraqi',
    'Khwaja Abdullah Ansari', 'Shaykh Mahmud Shabistari',
    'Aziz al-Din Nasafi', 'Najm al-Din Razi',
]

SUNNI_SCHOLARS = [
    'Imam Abu Hamid al-Ghazali',
    'Allama Sayyid Muhammad Husayn Tabatabai',
    'Ayatullah Muhammad Bahjat', 'Ayatullah Muhammad Taqi Bahjat',
    'Sayyid Bahr al-Ulum', 'Mirza Jawad Maliki Tabrizi',
    'Mulla Husayn Quli Hamadani', 'Sayyid Ahmad Karbalai',
    'Sayyid Ali Qadhi Tabatabai', 'Mulla Ahmad Naraqi', 'Mulla Mahdi Naraqi',
]

def determine_meta_category(item):
    sp = item.get('source_person', '') or ''
    poet = item.get('poet', '') or ''
    author = item.get('author', '') or ''
    name = sp or poet or author

    if name in IMAM_KEYWORDS:
        return 'A'
    for kw in IMAM_KEYWORDS:
        if kw in name:
            return 'A'

    if name in SUFI_AUTHORS:
        return 'C'
    for kw in SUFI_AUTHORS:
        if kw in name:
            return 'C'

    if name in SUNNI_SCHOLARS:
        return 'B'
    for kw in SUNNI_SCHOLARS:
        if kw in name:
            return 'B'

    return 'A'

def migrate_data_json(data):
    items = []
    for d in data:
        items.append({
            'id': d['id'],
            'meta_category': determine_meta_category(d),
            'topic_category': d.get('category', 'General'),
            'original_text': d.get('original', ''),
            'urdu_translation': d.get('urdu', ''),
            'author': d.get('source_person', ''),
            'source': d.get('makhaz', ''),
            'ishraq': d.get('ishraqat', ''),
            'subtype': 'saying',
            'related_ayah': d.get('related', ''),
            'rarity': d.get('rarity', 'Khas'),
        })
    return items

def migrate_discover_json(data):
    items = []
    for d in data:
        t = d.get('type', 'fact')
        cat = d.get('category', 'General')
        # determine meta_category
        meta = 'C'
        if cat in ('Malakut', 'Qiyamat', 'Ruh', 'Quran', 'Jinn'):
            meta = 'A'
        elif cat in ('Science', 'History'):
            meta = 'B'
        elif cat == 'Hikmah':
            meta = 'C'

        items.append({
            'id': d['id'] + 200,
            'meta_category': meta,
            'topic_category': cat,
            'original_text': d.get('text', ''),
            'urdu_translation': d.get('urdu', d.get('text', '')),
            'author': d.get('source_person', 'Islamic Tradition'),
            'source': d.get('source', ''),
            'ishraq': d.get('ishraq', ''),
            'subtype': d.get('type', 'fact'),
            'related_ayah': '',
            'rarity': 'Khas',
        })
    return items

def migrate_poetry_json(data):
    items = []
    poems = data.get('poems', []) if isinstance(data, dict) else data
    for p in poems:
        items.append({
            'id': p['id'] + 300,
            'meta_category': determine_meta_category(p),
            'topic_category': p.get('category', 'Poetry'),
            'original_text': p.get('text', ''),
            'urdu_translation': p.get('urdu', ''),
            'author': p.get('poet', ''),
            'source': p.get('source_book', ''),
            'ishraq': p.get('ishraqat', ''),
            'subtype': 'poetry',
            'related_ayah': '',
            'rarity': p.get('rarity', 'Khas'),
        })
    return items


def main():
    all_items = []

    # data.json
    with open(os.path.join(BASE, 'data.json'), 'r', encoding='utf-8') as f:
        d = json.load(f)
    all_items.extend(migrate_data_json(d))

    # discover.json
    with open(os.path.join(BASE, 'discover.json'), 'r', encoding='utf-8') as f:
        d = json.load(f)
    all_items.extend(migrate_discover_json(d))

    # poetry.json
    with open(os.path.join(BASE, 'poetry.json'), 'r', encoding='utf-8') as f:
        d = json.load(f)
    all_items.extend(migrate_poetry_json(d))

    # Re-assign sequential IDs
    for i, item in enumerate(all_items, 1):
        item['id'] = i

    output = {
        'meta': {
            'generated': datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'),
            'version': 2,
            'count': len(all_items),
            'format': 'opencode-01',
        },
        'items': all_items,
    }

    out_path = os.path.join(BASE, 'database.json')
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    # Count by category
    counts = {'A': 0, 'B': 0, 'C': 0, '2': 0}
    for item in all_items:
        mc = item['meta_category']
        if mc in counts:
            counts[mc] += 1
    print(f"Written {out_path}")
    print(f"Total: {len(all_items)} items")
    print(f"  Category A (Shia/Imams): {counts['A']}")
    print(f"  Category B (Sunni/Scholars): {counts['B']}")
    print(f"  Category C (Sufis): {counts['C']}")
    print(f"  Category 2 (Prayers): {counts['2']}")

if __name__ == '__main__':
    main()
