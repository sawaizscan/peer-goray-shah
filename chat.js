(function() {
  // Address of the private proxy that holds the API key (see proxy/worker.js).
  var PROXY_URL = 'PROXY_URL_HERE';
  var MODELS = [
    'gemini-2.5-flash',
    'gemini-3.1-flash-lite',
    'gemini-2.5-flash-lite'
  ];

  var GUIDE_PROMPT = `You are AI BABA J (اے آئی بابا جی), the compassionate spiritual companion of the website pirgorayshah.live (Syed Saleem Raza Kazmi, Pir Goray Shah). You walk beside people through anxiety, grief, money worries, family strain and loss of meaning, using the Qur'an, the Prophet's ﷺ guidance, the Ahl al-Bayt عليهم السلام, and sound psychology. You are warm, calm and honest. You are a companion, not a doctor, not a mufti, not a miracle-worker.

LANGUAGE
Reply in the language the user writes in (Urdu, Roman Urdu, English, Arabic, Persian, Hindi, Punjabi, Sindhi, Saraiki). Roman Urdu gets Roman Urdu. Quote Arabic text of verses and duas in Arabic script, then explain in the user's language. Keep Urdu simple and warm, not heavy classical prose.

HOW TO ANSWER A PERSONAL PROBLEM (follow this order, in plain text, no markdown symbols, no asterisks, no hashes)
1. One or two sentences that show you heard them. Name the feeling. Never start with a lecture or a ruling.
2. Something to do in the next 3 minutes: a slow-breath step, grounding, a glass of water, wudu, sitting down. Calm the body first.
3. One spiritual practice, small and doable: a short verse, a dua, or a dhikr, with its source named plainly (surah and verse number, or the hadith book). Give the Arabic and the meaning. Never pile on a long wazifa list.
4. One practical step from psychology or daily life: writing the worry down, a walk, a sleep routine, one honest conversation, a budget.
5. Only when it fits: when to see a doctor or counsellor. Then a soft closing line or a short question that invites them to continue.
Keep it short: 120 to 220 words unless the user asks for detail. One clarifying question at most, and only when it truly changes the advice. Do not interrogate.
If the user only wants to talk, just listen and reflect; skip the steps.

NON-NEGOTIABLE SAFETY
- If someone mentions suicide, wanting to die, self-harm, abuse, or being in danger: drop the routine. Respond with warmth and seriousness, say their pain matters, urge them to contact a trusted person or local emergency services right now, and point to findahelpline.com for helplines in their country. Do not give wazaif as a substitute for help. Do not debate or shame. Stay gentle.
- Chest pain, fainting, breathlessness, or a first-ever panic episode: say a doctor should check the heart and body first.
- Symptoms lasting more than two weeks, or harming sleep, work or relationships: encourage seeing a doctor or psychologist, framed as using the means Allah placed in the world. Seeking treatment does not contradict tawakkul. Never tell anyone to stop or change medication; that is for their doctor.
- Children and teenagers: keep it gentle and encourage involving a trusted adult.
- Never promise a guaranteed cure, result, marriage, wealth or revenge. Say dua and effort go together and the outcome is with Allah.
- Never give wazaif or amal intended to harm, separate, control or curse anyone, to force love, or to practise black magic. Decline kindly and offer a healthy alternative.
- Jalali or dangerous practices (raj'at, strict forty-day isolations, fasting extremes): do not prescribe; advise consulting a qualified scholar in person and note that health comes first.
- Suspected jinn, sihr or nazar: first ask gently about physical and mental health and suggest a medical check. Give protective recitations (Ayat al-Kursi, al-Falaq, an-Nas, the last two verses of al-Baqarah) as comfort. Warn against paying anyone for exorcisms or amulets; that is how people get exploited.

AUTHENTICITY (very important)
- Never invent a hadith, a verse, a wazifa, a number of repetitions, or a source. If you are unsure, say so plainly: "I am not certain of the exact source."
- Say what kind of source it is: Qur'an; a hadith in the Sahihayn or another recognised book; a narration from the Ahl al-Bayt (name the book, such as Nahj al-Balagha, al-Kafi or Sahifa Sajjadiyya, only when confident); or a practice of scholars and experience. For reports whose chains scholars dispute, say "narrated, with scholarly disagreement on the chain" and present it as a comfort practice, not a medical claim.
- Hawqala (la hawla wa la quwwata illa billah) is a treasure of Paradise per the Sahihayn. Recommend it as dhikr for steadiness. Do not claim it cures ninety-nine diseases as established fact.
- Do not present fixed repetition counts as if the Qur'an or hadith set them unless that is known. Say a number is only a suggestion to keep the practice steady.
- Cite psychology honestly: CBT, slow breathing, exercise, sleep hygiene and behavioural activation have strong evidence; mindfulness and prayer-based coping have good supporting evidence; aromatherapy has weak evidence. Do not oversell any method.

BRIDGES BETWEEN TRADITIONS
Where it helps, offer parallels from other wisdom without mixing up beliefs: pranayama and breathing practice from the Vedic tradition, mindfulness from Buddhist practice, CBT and logotherapy from modern psychology, Stoic reflection. Present them as tools for the body and mind that sit beside faith, never as replacements for it, and never claim they are Islamic rulings. Respect the user's own madhhab. Where Shia and Sunni sources both carry the same teaching, say so; unity is a gift.

TONE AND LIMITS
- Gentle, dignified, never preachy, never fear-mongering about Hell for people who are suffering. Mercy leads: Allah's mercy encompasses all things (7:156).
- No fatwa. For legal rulings (halal and haram, fiqh), say you can share general guidance and the person should ask their marja' or scholar.
- Sectarian polemics, politics, and attacks on any group: decline politely and return to the person's need.
- Do not ask for or store names, phone numbers, addresses or other private details. If the user shares them, do not repeat them.
- Do not encourage dependence on you. Encourage family, friends, community, a counsellor, and prayer in congregation where possible.
- If asked something outside your scope or beyond your knowledge, say so honestly.

SIGNATURE
The website adds a short closing prayer to your replies, so do not add your own long closing prayer. A brief "Allah aap ka haami o nasir ho" style line is enough when natural.

IDENTITY
You are an AI. If asked, say so plainly and kindly: you are an AI companion built to share guidance from the Qur'an, the Prophet ﷺ, the Ahl al-Bayt عليهم السلام and psychology, and you are not Pir Goray Shah himself.`;

  // Used only for the 'Search Karbala vault' box.
  var VAULT_PROMPT = `# Karbala Content Engine v3.0

🎯 PRIMARY STRATEGIC OBJECTIVES
1. Formation of an Ideal Shia Character — one rooted in Fada'il, Akhlaq, and 'Aql.
2. Pro-Ahlul Bayt Awakening (Bidari) — for every Muslim, irrespective of madhhab.

📚 EXPANDED SOURCE LIBRARY

CORE SHIA SOURCES:
• Qur'an al-Karim (with Tafsir al-Mizan, Tafsir al-Qummi)
• Nahj al-Balaghah (Imam Ali عليه السلام)
• Sahifa al-Sajjadiyya (Imam Zayn al-Abidin عليه السلام)
• al-Kafi (Shaykh al-Kulayni) — Usul, Furu', Rawda
• Man La Yahduruhu al-Faqih (Shaykh al-Saduq)
• Tahdhib al-Ahkam & al-Istibsar (Shaykh al-Tusi)
• Bihar al-Anwar (Allamah al-Majlisi)
• Wasa'il al-Shi'a (Shaykh al-Hurr al-Amili)
• Mustadrak al-Wasa'il (Mirza al-Nuri)
• al-Ghadir (Allamah al-Amini)
• 'Abaqat al-Anwar (Mir Hamid Husayn)
• al-Muraja'at (Sayyid Abd al-Husayn Sharaf al-Din al-Musawi)
• Peshawar Nights (Sultan al-Wa'izin)

SUNNI / DEOBANDI SOURCES (for Tabligh & Proximity):
• Sahih al-Bukhari, Sahih Muslim, Sunan Abu Dawud, Sunan al-Tirmidhi, Sunan al-Nasa'i, Sunan Ibn Majah
• Musnad Ahmad ibn Hanbal, Musnad Abi Ya'la, Musnad al-Tayalisi
• al-Mustadrak 'ala al-Sahihayn (al-Hakim)
• al-Isaba fi Tamyiz al-Sahaba (Ibn Hajar)
• Usd al-Ghaba (Ibn al-Athir)
• Dhakha'ir al-'Uqba (al-Tabari)
• Kanz al-'Ummal (al-Muttaqi al-Hindi)
• Muntakhab Kanz al-'Ummal (al-Hindi)
• Fada'il al-Sahaba (Ahmad ibn Hanbal)
• Sawaiq al-Muhriqa (Ibn Hajar al-Haytami)
• Yanabi' al-Mawadda (al-Qunduzi)
• Tafsir al-Kabir (Fakhr al-Razi)
• Tafsir al-Durr al-Manthur (al-Suyuti)
• al-Bidaya wa al-Nihaya (Ibn Kathir)
• Tarikh al-Umam wa al-Muluk (al-Tabari)
• al-Kamil fi al-Tarikh (Ibn al-Athir)
• Mir'at al-Zaman (Sibt ibn al-Jawzi)
• Tadhkirat al-Khawass (Sibt ibn al-Jawzi)
• al-Fusul al-Muhimma (Ibn al-Sabbagh al-Maliki)
• Nur al-Absar (al-Shablanji)

CLASSICAL PERSIAN & URDU POETRY:
• Divan-e-Mirza Ghalib
• Kulliyat-e-Allama Iqbal (Persian & Urdu)
• Kulliyat-e-Mir Taqi Mir
• Musaddas-e-Hali (Altaf Husain Hali)
• Kulliyat-e-Josh Malihabadi
• Salam-o-Nawha collections of Mirza Dabeer, Mir Anees
• Marsiya of Anees, Dabeer

📅 7 DAILY CONTENT CATEGORIES (1st Muharram–20th Safar)
1. Fada'il (Excellences of Ahl al-Bayt) — 15 pieces/day
2. Akhlaq (Spiritual & Moral Teachings) — 10 pieces/day
3. Classical Poetry (Nasheed, Marsiya, Salam, Qasida) — 5 pieces/day
4. Pre-Ashura (Events 1st–9th Muharram) — 10 pieces/day
5. Maqtal (10th Muharram) — 15 pieces/day
6. Captivity & Court Events (11th Muharram–1st Safar) — 10 pieces/day
7. Arbaeen (20th Safar) — 10 pieces/day

🔬 THREE ANALYTICAL LENSES
Apply all three to every piece:
• ISHRAQ (إشراق) — Illumination: What moral, spiritual, or intellectual light does this reveal?
• TANAQUZ (تناقض) — Contradiction / Tension: Where does it challenge dominant narratives?
• RAMZ (رمز) — Symbolism: What deeper meaning lies beyond the literal text?

📐 STRICT FORMATTING RULES
• Classical Urdu prose ONLY (no bullet points, no bold/italics, no headings, no markdown)
• 200–300 words per piece (always in Urdu)
• Continuous flowing paragraph(s) — no lists, no numbers, no sections
• Begin with بسم اللہ الرحمن الرحیم
• Format: [Source] >> [Content] >> [3-line analytic summary]
• Include exact source reference in-line, not as footnote
• Never repeat content across days

📊 DAILY GENERATION TARGET
• Total: 75 pieces/day across 7 categories
• Each piece: 200–300 words, strict format
• Source variety: at least 3 different sources per category per day

✅ PRE-SUBMISSION QA CHECKLIST
• Is source mentioned inline?
• Is every piece between 200–300 words?
• Is formatting strictly classical Urdu prose?
• Are all three lenses applied?
• Is category label correct?
• Is content fully in Urdu?
• Has this exact content appeared before?

🔍 VAULT SEARCH MODE
When user searches the vault:
• Search internal knowledge across all 7 categories
• Return structured results with: exact sources, category, Ishraq/Tanaquz/Ramz analysis
• Format results in classical Urdu prose
• If topic spans multiple categories, show all relevant results
• Never fabricate sources — say "not found in vault" if unknown

🌑 FINAL IDENTITY
You are the Karbala Content Engine — generating, organizing, and retrieving classical Islamic knowledge about Ahl al-Bayt with scholarly rigor and poetic beauty.

Respond in the language the user asks in (Urdu, English, Arabic, Persian).`;

  // Deterministic safety net: never leave a person in crisis to the model alone.
  var CRISIS_RE = /(خودکشی|خود کشی|خود کو (ختم|نقصان)|مر جانا چاہتا|مرجانا چاہتا|مر جانا چاہتی|جان دے دوں|جینا نہیں چاہتا|جینا نہیں چاہتی|زندگی ختم|suicid|kill myself|end my life|want to die|self[- ]?harm|marna chahta|marna chahti|khudkushi)/i;
  var CRISIS_REPLY = 'آپ کا درد میرے لیے بہت اہم ہے، اور آپ اس وقت اکیلے نہ رہیں۔ براہِ کرم ابھی کسی قریبی بھروسے مند شخص (گھر والے، دوست) کو اپنے پاس بلائیں یا اپنے ملک کی ایمرجنسی سروس سے رابطہ کریں۔ اپنے ملک کی ہیلپ لائن یہاں مل سکتی ہے: findahelpline.com\n\nاللہ تعالیٰ آپ کے ساتھ ہے، اور مدد مانگنا کمزوری نہیں، بہادری ہے۔ جب آپ کچھ سنبھل جائیں تو میں یہاں ہوں، آپ مجھ سے بات کر سکتے ہیں۔\n\nYou are not alone. Please contact someone you trust or your local emergency number right now, and find a helpline for your country at findahelpline.com.';
  var chatHistory = [];
  var isOpen = false;

  var chatCSS = document.createElement('style');
  chatCSS.textContent = `
    .ai-chat-btn {
      position: fixed; bottom: 100px; right: 24px; z-index: 9999;
      width: 56px; height: 56px; border-radius: 50%;
      background: linear-gradient(135deg, var(--gold, #d4a843), #b8922e);
      border: none; cursor: pointer; box-shadow: 0 4px 20px rgba(212,168,67,0.4);
      display: flex; align-items: center; justify-content: center;
      transition: all 0.3s ease; font-size: 1.4rem; color: #0d1117;
    }
    .ai-chat-btn:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(212,168,67,0.6); }
    .ai-chat-btn.active { display: none; }

    .ai-chat-panel {
      position: fixed; bottom: 90px; right: 24px; z-index: 9998;
      width: 380px; height: 560px; background: #161b22;
      border: 1px solid rgba(212,168,67,0.2); border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.6);
      display: none; flex-direction: column; overflow: hidden;
      animation: chatSlideUp 0.3s ease;
    }
    @keyframes chatSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .ai-chat-panel.open { display: flex; }

    .ai-chat-header {
      background: linear-gradient(135deg, #0a4a2a, #031a0c);
      padding: 14px 18px; display: flex; align-items: center; gap: 10px;
      border-bottom: 1px solid rgba(212,168,67,0.15); flex-shrink: 0;
    }
    .ai-chat-avatar {
      width: 40px; height: 40px; border-radius: 50%;
      background: linear-gradient(135deg, var(--gold), #b8922e);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem; font-weight: 700; color: #0d1117; flex-shrink: 0;
    }
    .ai-chat-info { flex: 1; }
    .ai-chat-title {
      font-family: 'Playfair Display', serif; font-size: 0.9rem;
      color: var(--gold, #d4a843); font-weight: 600;
    }
    .ai-chat-status {
      font-size: 0.65rem; color: var(--primary, #1db954); display: flex; align-items: center; gap: 4px;
    }
    .ai-chat-status .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--primary); display: inline-block; animation: pulse 1.5s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    .ai-chat-close {
      background: none; border: none; color: var(--text-muted); font-size: 1.2rem;
      cursor: pointer; padding: 4px; transition: color 0.2s;
    }
    .ai-chat-close:hover { color: var(--text); }

    .ai-chat-messages {
      flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 12px;
      scroll-behavior: smooth;
    }
    .ai-chat-messages::-webkit-scrollbar { width: 4px; }
    .ai-chat-messages::-webkit-scrollbar-track { background: transparent; }
    .ai-chat-messages::-webkit-scrollbar-thumb { background: rgba(212,168,67,0.3); border-radius: 2px; }

    .ai-msg {
      max-width: 85%; padding: 10px 14px; border-radius: 12px;
      font-size: 0.82rem; line-height: 1.6; word-wrap: break-word; white-space: pre-wrap;
      font-family: 'Noto Nastaliq Urdu', 'Inter', sans-serif;
      animation: msgIn 0.3s ease;
    }
    @keyframes msgIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    .ai-msg.user {
      align-self: flex-end; background: linear-gradient(135deg, #0a4a2a, #0d2a1a);
      color: #e6edf3; border-bottom-right-radius: 4px;
    }
    .ai-msg.bot {
      align-self: flex-start; background: rgba(255,255,255,0.04);
      color: #e6edf3; border: 1px solid rgba(212,168,67,0.1); border-bottom-left-radius: 4px;
    }
    .ai-msg.bot .msg-label {
      font-size: 0.6rem; color: var(--gold, #d4a843); margin-bottom: 4px;
      font-family: 'Inter', sans-serif; font-weight: 500;
    }
    .ai-msg .msg-prayer {
      font-size: 0.72rem; color: var(--gold-light, #f0d98a); margin-top: 8px; padding-top: 8px;
      border-top: 1px solid rgba(212,168,67,0.15); font-family: 'Amiri', serif;
      direction: rtl; text-align: center;
    }
    .ai-msg.typing { align-self: flex-start; background: transparent; border: none; padding: 8px 10px; }
    .ai-msg.typing .dots { display: flex; gap: 4px; align-items: center; }
    .ai-msg.typing .dots span {
      width: 8px; height: 8px; border-radius: 50%; background: var(--gold, #d4a843);
      animation: dotBounce 1.4s infinite ease-in-out both;
    }
    .ai-msg.typing .dots span:nth-child(1) { animation-delay: -0.32s; }
    .ai-msg.typing .dots span:nth-child(2) { animation-delay: -0.16s; }
    .ai-msg.typing .dots span:nth-child(3) { animation-delay: 0s; }
    @keyframes dotBounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

    .ai-chat-input-area {
      padding: 10px 14px; border-top: 1px solid rgba(255,255,255,0.06);
      display: flex; gap: 8px; align-items: center; flex-shrink: 0; background: #0d1117;
    }
    .ai-chat-input {
      flex: 1; padding: 10px 14px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.1);
      background: rgba(255,255,255,0.04); color: #e6edf3; font-size: 0.82rem;
      outline: none; transition: border-color 0.2s;
      font-family: 'Noto Nastaliq Urdu', 'Inter', sans-serif;
    }
    .ai-chat-input:focus { border-color: var(--gold, #d4a843); }
    .ai-chat-input::placeholder { color: var(--text-muted); }
    .ai-chat-send {
      width: 38px; height: 38px; border-radius: 50%;
      background: linear-gradient(135deg, var(--gold), #b8922e); border: none;
      color: #0d1117; cursor: pointer; font-size: 0.9rem;
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s; flex-shrink: 0;
    }
    .ai-chat-send:hover { transform: scale(1.1); }
    .ai-chat-send:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

    .ai-chat-welcome {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      height: 100%; text-align: center; padding: 20px; gap: 10px;
    }
    .ai-chat-welcome .w-icon {
      width: 72px; height: 72px; border-radius: 50%;
      background: linear-gradient(135deg, var(--gold), #b8922e);
      display: flex; align-items: center; justify-content: center;
      font-size: 2rem; font-weight: 700; color: #0d1117; margin-bottom: 6px;
    }
    .ai-chat-welcome h3 {
      font-family: 'Playfair Display', serif; color: var(--gold); font-size: 1.1rem;
    }
    .ai-chat-welcome p {
      color: var(--text-muted); font-size: 0.78rem; line-height: 1.6;
      font-family: 'Noto Nastaliq Urdu', serif;
    }
    .ai-chat-welcome .suggestions {
      display: flex; flex-wrap: wrap; gap: 6px; justify-content: center; margin-top: 6px;
    }
    .ai-chat-welcome .suggestions button {
      padding: 6px 14px; border-radius: 20px; border: 1px solid rgba(212,168,67,0.2);
      background: rgba(212,168,67,0.08); color: var(--text-light); font-size: 0.72rem;
      cursor: pointer; transition: all 0.2s; font-family: 'Noto Nastaliq Urdu', serif;
    }
    .ai-chat-welcome .suggestions button:hover {
      border-color: var(--gold); background: rgba(212,168,67,0.15); color: var(--gold);
    }

    .ai-chat-search {
      display: flex; align-items: center; gap: 6px;
      padding: 6px 12px; border-bottom: 1px solid rgba(255,255,255,0.06);
      background: rgba(0,0,0,0.2); flex-shrink: 0;
    }
    .ai-chat-search-input {
      flex: 1; padding: 6px 10px; border-radius: 16px; border: 1px solid rgba(212,168,67,0.2);
      background: rgba(255,255,255,0.04); color: #e6edf3; font-size: 0.75rem;
      outline: none; font-family: 'Noto Nastaliq Urdu', 'Inter', sans-serif;
      direction: auto;
    }
    .ai-chat-search-input:focus { border-color: var(--gold, #d4a843); }
    .ai-chat-search-input::placeholder { color: rgba(255,255,255,0.3); font-size: 0.7rem; }
    .ai-chat-search-btn {
      width: 28px; height: 28px; border-radius: 50%;
      background: linear-gradient(135deg, var(--gold), #b8922e); border: none;
      color: #0d1117; cursor: pointer; font-size: 0.7rem; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s;
    }
    .ai-chat-search-btn:hover { transform: scale(1.1); }

    @media (max-width: 500px) {
      .ai-chat-panel { width: calc(100vw - 32px); right: 16px; height: 500px; bottom: 80px; }
      .ai-chat-btn { bottom: 90px; right: 16px; }
    }
  `;
  document.head.appendChild(chatCSS);

  function createChatUI() {
    var container = document.createElement('div');
    container.innerHTML = [
      '<button class="ai-chat-btn" id="aiChatBtn"><i class="fas fa-hand-sparkles"></i></button>',
      '<div class="ai-chat-panel" id="aiChatPanel">',
        '<div class="ai-chat-header">',
          '<div class="ai-chat-avatar">AJ</div>',
          '<div class="ai-chat-info">',
            '<div class="ai-chat-title">AI BABA J <span style="font-family:\'Noto Nastaliq Urdu\',serif;font-size:0.7rem;">· AI بابا جی</span></div>',
            '<div class="ai-chat-status"><span class="dot"></span> Your Spiritual Guide · مرشد</div>',
          '</div>',
          '<button class="ai-chat-close" id="aiChatClose"><i class="fas fa-times"></i></button>',
        '</div>',
        '<div class="ai-chat-search">',
          '<i class="fas fa-search" style="color:var(--gold,#d4a843);font-size:0.75rem;flex-shrink:0;"></i>',
          '<input class="ai-chat-search-input" id="aiChatSearchInput" placeholder="Search Karbala vault... خزانے میں تلاش کریں" />',
          '<button class="ai-chat-search-btn" id="aiChatSearchBtn"><i class="fas fa-arrow-right"></i></button>',
        '</div>',
        '<div class="ai-chat-messages" id="aiChatMessages">',
          '<div class="ai-chat-welcome" id="aiWelcome">',
            '<div class="w-icon">AJ</div>',
            '<h3>AI BABA J</h3>',
            '<p>آپ کا روحانی راہنما۔ کسی بھی زبان میں سوال کریں، میں آپ کی رہنمائی کروں گا۔<br><span style="font-family:\'Inter\',sans-serif;font-size:0.7rem;">Your spiritual guide. Ask in any language.</span></p>',
            '<div class="suggestions">',
              '<button data-q="مجھے بہت گھبراہٹ اور پینک ہو رہا ہے، کیا کروں؟">گھبراہٹ / پینک</button>',
              '<button data-q="مجھے نیند نہیں آتی، رات بھر سوچتا رہتا ہوں">نیند نہیں آتی</button>',
              '<button data-q="رزق میں تنگی اور قرض کی پریشانی ہے">رزق و قرض</button>',
              '<button data-q="میں بہت تنہا اور اداس محسوس کر رہا ہوں">تنہائی / اداسی</button>',
              '<button data-q="امام حسینؑ کے فضائل و مناقب بتائیں">فضائلِ حسینؑ</button>',
              '<button data-q="10 محرم کا مکمل مقتل سنائیں">مقتل عاشورا</button>',
              '<button data-q="حضرت عباسؑ کی وفاداری اور سقایت کا واقعہ">عباسؑ و وفا</button>',
              '<button data-q="حضرت زینبؑ کا خطبہ شام میں">خطبہ زینبؑ</button>',
            '</div>',
          '</div>',
        '</div>',
        '<div class="ai-chat-input-area">',
          '<input class="ai-chat-input" id="aiChatInput" placeholder="اپنا سوال لکھیں... Ask your question..." dir="auto">',
          '<button class="ai-chat-send" id="aiChatSend"><i class="fas fa-paper-plane"></i></button>',
        '</div>',
      '</div>'
    ].join('');
    document.body.appendChild(container);

    var btn = document.getElementById('aiChatBtn');
    var panel = document.getElementById('aiChatPanel');
    var closeBtn = document.getElementById('aiChatClose');
    var messages = document.getElementById('aiChatMessages');
    var input = document.getElementById('aiChatInput');
    var sendBtn = document.getElementById('aiChatSend');
    var welcome = document.getElementById('aiWelcome');

    function togglePanel(open) {
      isOpen = open;
      btn.classList.toggle('active', open);
      panel.classList.toggle('open', open);
      if (open) { setTimeout(function() { input.focus(); }, 300); }
    }

    btn.addEventListener('click', function() { togglePanel(true); });
    closeBtn.addEventListener('click', function() { togglePanel(false); });

    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
    sendBtn.addEventListener('click', sendMessage);
    window.askBabaJ = function(q) { togglePanel(true); if (q && !sendBtn.disabled) { input.value = q; sendMessage(); } };

    document.querySelectorAll('.ai-chat-welcome .suggestions button').forEach(function(b) {
      b.addEventListener('click', function() {
        input.value = b.dataset.q;
        sendMessage();
      });
    });

    var searchInput = document.getElementById('aiChatSearchInput');
    var searchBtn = document.getElementById('aiChatSearchBtn');

    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') { e.preventDefault(); searchVault(); }
    });
    searchBtn.addEventListener('click', searchVault);

    function searchVault() {
      var query = searchInput.value.trim();
      if (!query) return;
      welcome && (welcome.style.display = 'none');
      addMessage('🔍 **Vault Search:** ' + query, 'user');
      searchInput.value = '';
      sendBtn.disabled = true;
      var typingId = showTyping();
      callGemini('🔍 VAULT SEARCH: ' + query, 'vault').then(function(reply) {
        removeTyping(typingId);
        addMessage(reply, 'bot');
        sendBtn.disabled = false;
      }).catch(function(err) {
        removeTyping(typingId);
        var msg = err.message || '';
        if (msg.indexOf('429') !== -1 || msg.indexOf('quota') !== -1 || msg.indexOf('RESOURCE_EXHAUSTED') !== -1) {
          msg = '🔴 API quota exhausted. Search unavailable.\n\n' +
                'Current error: ' + msg;
        } else if (msg) {
          msg = 'Search error: ' + msg;
        } else {
          msg = 'Search unavailable. Please try again.';
        }
        addMessage(msg, 'bot');
        sendBtn.disabled = false;
      });
    }

    function sendMessage() {
      var text = input.value.trim();
      if (!text) return;
      input.value = '';
      welcome && (welcome.style.display = 'none');
      addMessage(text, 'user');
      if (CRISIS_RE.test(text)) {
        addMessage(CRISIS_REPLY, 'bot');
        return;
      }
      sendBtn.disabled = true;
      var typingId = showTyping();
      callGemini(text).then(function(reply) {
        removeTyping(typingId);
        addMessage(reply, 'bot');
        sendBtn.disabled = false;
      }).catch(function(err) {
        removeTyping(typingId);
        var msg = err.message || '';
        if (msg.indexOf('429') !== -1 || msg.indexOf('quota') !== -1 || msg.indexOf('RESOURCE_EXHAUSTED') !== -1) {
          msg = '🔴 API quota exhausted. The daily free limit has been reached.\n\n' +
                'To fix:\n' +
                '1. Go to https://console.cloud.google.com/apis/credentials\n' +
                '2. Enable billing for the project (projects/580236750173)\n' +
                '3. Or wait until the quota resets (midnight PT)\n\n' +
                'Current error: ' + msg;
        } else if (msg.indexOf('All models unavailable') !== -1) {
          msg = '🔴 All AI models are currently busy or at capacity. Please wait a moment and try again.\n\n' +
                'تمام AI ماڈلز اس وقت مصروف ہیں۔ براہ کرم تھوڑی دیر بعد دوبارہ کوشش کریں۔';
        } else if (msg) {
          msg = 'معاف کیجیے، ایک تکنیکی مسئلہ ہے۔\n\nError: ' + msg;
        } else {
          msg = 'معاف کیجیے، میں فی الحال دستیاب نہیں ہوں۔ براہ کرم تھوڑی دیر بعد پوچھیں۔\n\nSorry, I am currently unavailable. Please try again shortly.';
        }
        addMessage(msg, 'bot');
        sendBtn.disabled = false;
      });
    }

    function addMessage(text, role) {
      var div = document.createElement('div');
      div.className = 'ai-msg ' + role;
      if (role === 'bot') {
        var prayer = 'الله تعالیٰ آپ کو خوش، خوشحال، کامیاب، صحت مند، سلامت اور حفظ و امان میں رکھے آمین۔ ربنا تقبل منا إنك أنت السميع العليم';
        var hasPrayer = text.indexOf('الله تعالیٰ') !== -1;
        div.innerHTML = '<div class="msg-label"><i class="fas fa-robot"></i> AI BABA J</div>' +
          '<div style="direction:auto;">' + (hasPrayer ? text : text + '<div class="msg-prayer">🤲 ' + prayer + '</div>') + '</div>';
      } else {
        div.innerHTML = '<div style="direction:auto;">' + text + '</div>';
      }
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }

    function showTyping() {
      var id = 'typing-' + Date.now();
      var div = document.createElement('div');
      div.className = 'ai-msg bot typing';
      div.id = id;
      div.innerHTML = '<div class="dots"><span></span><span></span><span></span></div>';
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
      return id;
    }

    function removeTyping(id) {
      var el = document.getElementById(id);
      el && el.remove();
    }

    function tryModel(modelIdx, userText, systemText) {
      if (modelIdx >= MODELS.length) {
        return Promise.reject(new Error('All models unavailable.'));
      }
      return fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: MODELS[modelIdx], payload: {
          systemInstruction: { parts: [{ text: systemText }] },
          contents: chatHistory.map(function(m) {
            return { role: m.role === 'User' ? 'user' : 'model', parts: [{ text: m.text }] };
          }).concat([{ role: 'user', parts: [{ text: userText }] }]),
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
          ]
        } })
      }).then(function(res) {
        if (!res.ok) {
          return res.json().then(function(e) {
            var msg = e.error.message;
            var isRetryable = msg.indexOf('high demand') !== -1 || msg.indexOf('429') !== -1 || msg.indexOf('500') !== -1 || msg.indexOf('503') !== -1 || msg.indexOf('quota') !== -1;
            if (isRetryable) {
              return tryModel(modelIdx + 1, userText, systemText);
            }
            throw new Error(msg);
          });
        }
        return res.json();
      }).then(function(data) {
        var reply = '';
        try { reply = data.candidates[0].content.parts[0].text; } catch(e) { reply = 'No response received.'; }
        chatHistory.push({ role: 'User', text: userText });
        chatHistory.push({ role: 'AI BABA J', text: reply });
        if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);
        return reply;
      });
    }

    function callGemini(userText, mode) {
      return tryModel(0, userText, mode === 'vault' ? VAULT_PROMPT : GUIDE_PROMPT);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createChatUI);
  } else {
    createChatUI();
  }
})();
