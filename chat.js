(function() {
  var API_KEY = atob('QVEuQWI4Uk42SVMweWEwbmRhQWpPOXNqSWxrWmNGSFZkTWZkZnlBektnVVdaRDZYS2dnREE=');
  var MODELS = [
    'gemini-2.5-flash',
    'gemini-3.1-flash-lite',
    'gemini-2.5-flash-lite'
  ];
  var BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/';

  var SYSTEM_PROMPT = `# Karbala Content Engine v3.0

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
      font-size: 0.82rem; line-height: 1.6; word-wrap: break-word;
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
      callGemini('🔍 VAULT SEARCH: ' + query).then(function(reply) {
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

    function tryModel(modelIdx, userText, fullContext) {
      if (modelIdx >= MODELS.length) {
        return Promise.reject(new Error('All models unavailable.'));
      }
      var url = BASE_URL + MODELS[modelIdx] + ':generateContent?key=' + API_KEY;
      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullContext }] }],
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
          ]
        })
      }).then(function(res) {
        if (!res.ok) {
          return res.json().then(function(e) {
            var msg = e.error.message;
            var isRetryable = msg.indexOf('high demand') !== -1 || msg.indexOf('429') !== -1 || msg.indexOf('500') !== -1 || msg.indexOf('503') !== -1 || msg.indexOf('quota') !== -1;
            if (isRetryable) {
              return tryModel(modelIdx + 1, userText, fullContext);
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

    function callGemini(userText) {
      var fullContext = SYSTEM_PROMPT + '\n\n---\n' + chatHistory.map(function(m) { return m.role + ': ' + m.text; }).join('\n') + '\n---\n\nUser: ' + userText + '\nAI BABA J:';
      return tryModel(0, userText, fullContext);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createChatUI);
  } else {
    createChatUI();
  }
})();
