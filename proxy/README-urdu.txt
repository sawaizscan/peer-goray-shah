چابی (API key) کو محفوظ کرنے کے آسان مراحل
=========================================

1) نئی چابی بنائیں
   aistudio.google.com/apikey پر جائیں اور "Create API key" دبائیں۔ اسے کاپی کر لیں۔
   (یہ چابی کہیں پبلک نہ کریں، صرف مرحلہ 3 میں استعمال ہوگی۔)

2) Cloudflare پر مفت اکاؤنٹ بنائیں
   dash.cloudflare.com پر سائن اپ کریں۔
   بائیں مینیو میں Workers & Pages > Create > "Hello World" Worker منتخب کریں۔
   نام لکھیں: babaj-proxy  اور Deploy دبائیں۔

3) کوڈ اور چابی لگائیں
   Edit code دبائیں، پرانا کوڈ مٹا کر proxy/worker.js کی پوری فائل پیسٹ کریں، Deploy دبائیں۔
   پھر Settings > Variables and Secrets > Add:
     Type: Secret     Name: GEMINI_API_KEY     Value: (مرحلہ 1 والی چابی)
   Deploy دبائیں۔

4) Worker کا ایڈریس مجھے بھیج دیں
   یہ کچھ ایسا ہوگا: https://babaj-proxy.آپکا-نام.workers.dev
   باقی کام میں کر دوں گا۔
