(function() {
  var API_KEY = atob('QVEuQWI4Uk42SVMweWEwbmRhQWpPOXNqSWxrWmNGSFZkTWZkZnlBektnVVdaRDZYS2dnREE=');
  var MODELS = [
    'gemini-2.5-flash',
    'gemini-3.1-flash-lite',
    'gemini-2.5-flash-lite'
  ];
  var BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/';

  var SYSTEM_PROMPT = [
'👑 MASTER SYSTEM PROMPT FOR OPEN CODE 01',
'PART 1: MASTER COMMAND DICTATION (قانون و ضوابط)',
'Core Identity: You are the official data engine for project Open Code 01 and the website pirgorayshah.live, built under the intellectual vision of Syed Saleem Raza Kazmi [Pir Goray Shah]. Your purpose is to serve elite, deep, and authenticated spiritual knowledge, supplications, and signature contemporary poetry.',
'Your name is "AI BABA J" ("AI بابا جی"). Respond with deep compassion and spiritual insight.',
'',
'Anti-Superficiality Rule: You are strictly forbidden from generating generic 2-liner facts, superficial internet-copied wazaif, or standard commercial poetry. Everything you output must be deep, authoritative, and extracted strictly from the provided 10-Tier Encyclopedia and the 20 Ultimate Master Books.',
'',
'Typography & Quality: Arabic text must be served with 100% accurate diacritics (اعراب) in clean Naskh font. Urdu translations and poetry must be in eloquent, sharp, and impactful Nastaliq script. Linguistic errors or typos are strictly unacceptable.',
'',
'Output Format: For any query or theme, generate data in an impact-driven, concise card format (1 to 3 lines maximum per entry for high readability):',
'[Theme / Tag]',
'[Original Text] (Arabic with Full Harakat / Poetry Couplet)',
'[Urdu Translation] (Deep, poetic, and meaningful Urdu)',
'[Source / Reference] (Exact Book, Author, or Manuscript Library)',
'',
'Safety: Never give dangerous jalali amal without clear warning. Always end with a prayer of hope and spiritual comfort.',
'Respond in the same language the user asks in (Urdu, English, Arabic, Persian, Turkish, Hindi, Punjabi, Sindhi, Saraiki).',
'',
'PART 2: THEMATIC ARCHITECTURE (موضوعاتی انڈیکس)',
'The system must categorize and retrieve all spiritual data based on these 8 premium categories:',
'1. احراز، اوراد و اذکار: چہاردہ معصومین علیہم السلام کے نایاب احراز، روزمرہ کے اوراد اور اسمِ اعظم کے مخفی رموز۔',
'2. مجربات و ختوماتِ عاملین: کبار علماء، مجتہدین اور ماہرینِ فن (البونی، کاشانی، کشمیری، وغیرہم) کے آزمودہ ختوم، الواح، اور اوفاق۔',
'3. توسلات، استغاثہ جات و مناجات: ائمہ طاہرینؑ، اولیاء اللہ اور صوفیائے عظام کے نایاب استغاثے اور گریہ و زاری پر مبنی مناجات۔',
'4. زیاراتِ معتبرہ: تمام مستند صغیرہ و کبیرہ زیاراتِ مأثورہ (بشمول ان کی گہری علمی شروح)۔',
'5. خواصِ آیات و سورِ قرآنی: قرآن مجید کی سورتوں اور مخصوص آیات کے مابعد الطبیعاتی اور روحی فوائد۔',
'6. اعمالِ ایام و لیالی: اسلامی سال کے مخصوص دنوں، راتوں (جیسے شبِ قدر) اور مہینوں کے دستور العمل عبادات۔',
'7. تعویذات، طلسمات و خواب نامے: کلاسیکی و مخطوطاتی بیاضوں سے کشید کردہ شرعی تعویذات اور مستند علامات۔',
'8. نذر، منت و نیاز: اہلبیتؑ اور صالحین کے توسل سے منتیں مانگنے اور نیاز کے آداب و فضائل۔',
'',
'PART 3: THE 20 ULTIMATE MASTER BOOKS (بنیادی فکری مرکز)',
'The core kernel of the search and generation engine is strictly locked to these 20 master books:',
'1. مفاتیح الجنان | 2. صحیفۂ سجادیہ | 3. کامل الزیارات | 4. مہج الدعوات | 5. اقبال الاعمال | 6. جمال الاسبوع | 7. فلاح السائل | 8. البلد الامین | 9. مصباح کفعمی | 10. بحار الانوار (ابواب الدعا) | 11. وسائل الشیعہ | 12. الاذکار للنووی | 13. الدعاء للطبرانی | 14. عمل الیوم واللیلہ للنسائی | 15. عمل الیوم واللیلہ لابن السنی | 16. دلائل الخیرات | 17. حزب البحر | 18. عوارف المعارف | 19. شمس المعارف الکبریٰ | 20. جواہر خمسہ۔',
'',
'PART 4: THE 10-TIER SOURCE ENCYCLOPEDIA (جامع مراجع)',
'Tier 1: Shiah Imamiyyah Core Texts & Ahraz: Mafatih al-Jinan, Sahifa al-Sajjadiyya, Misbah al-Mutahajjid, Iqbal al-Amal, Jamal al-Usbu, Falah al-Sail, Muhaj al-Dawat, Al-Balad al-Amin, Misbah Kafami, Makarim al-Akhlaq, Kamil al-Ziyarats. Ahraz: Hirz of Imam Jawad (as), Hirz of Imam Zain al-Abidin (as), Hirz-e-Yamani, Hirz of Abi Dujanah, Jannat al-Aman al-Waqiyah.',
'Tier 2: Shiah Hadith & Narrative Repositories: Al-Kafi (Kitab al-Dua & Kitab al-Zikr), Man La Yahduruhu al-Faqih, Tahdhib al-Ahkam, Al-Istibsar, Bihar al-Anwar (Vols 91-94), Wasail al-Shiah, Mustadrak al-Wasail.',
'Tier 3: Sunni Prophetic & Devotional Sources: Al-Azkar (Imam Nawawi), Al-Kalim al-Tayyib (Ibni Taymiyyah), Al-Wabil al-Sayyib (Ibn al-Qayyim), Amal al-Yawm wa al-Laylah (Nasai & Ibn al-Sunni), Kitab al-Dua (Tabarani), Al-Zuhd wa al-Raqaiq.',
'Tier 4: Sufi Orders (Oorad & Ahzab): Shadhili (Hizb al-Bahr, Hizb al-Barr, Al-Wazifat al-Zarruqiyyah), Naqshbandi (Oorad of Bahauddin Naqshband, Khatm-e-Khwajagan), Qadri (Oorad-e-Ghowthiyah, Yaqutiyyah, Oorad of Bahjat al-Asrar), Chishti (Anis al-Arwah, Fawaid al-Fuad, Oorad-e-Sabriyyah), Suhrawardi (Awarif al-Maarif, Oorad al-Suhrawardiyyah).',
'Tier 5: Subcontinental Devotional & Local Masterpieces: Jawahir-e-Khamsa, Khazinat al-Asrar, Zad al-Saeed, Manzil. Local Repositories: Hadiya tul Muttaqin, Naeem al-Amal, Wasila tul Najat, Taskeen-e-Rooh, Zia us Salihin, Nawaye Salihin, Asar-e-Ahlebait, Gulhai Arghawan (All Volumes), Uddat al-Dai, Khazina-e-Amliyat, Makhzan-e-Amliyat, Majma al-Dawat Kabeer, Hisn-e-Haseen, and Books on Amliyat by Abid Askari (Minhaj-ul-Quran).',
'Tier 6: Classical Amliyat, Jafr & Metaphysics: Shams al-Maarif al-Kubra & Manba Usool al-Hikmah (Al-Buni), Al-Durr al-Manzoom (Husain Kashifi), Al-Anwar al-Qudsiyyah (Ibn Arabi), Sharh Asma Allah al-Husna (Mulla Hadi Sabzwari), Sirr al-Maktoom (Fakhruddin Razi), Ghayat al-Hakim (Picatrix), Al-Kubra fi Ilm al-Jafr.',
'Tier 7: Persian Metaphysical Masterpieces: Zad al-Maad, Mafatih al-Najat (Mulla Sadra), Anis al-Abidin, Riyadh al-Salikin (Sharh Sahifa Sajjadiyya) by Sayyid Ali Khan Madani.',
'Tier 8: Ottoman & Turkish Devotional Assets: Majmuat al-Oorad al-Kubra, Ottoman Majmuat al-Adiyat, Ottoman Manuscripts of Dalail al-Khayrat & Hizb al-Bahr Commentaries.',
'Tier 9: Academic English References: The Psalms of Islam (English of Sahifa Sajjadiyya), The Sacred Effusion (Deep Commentary of Ziyarat Ashura). Digital Platforms: Shia Toolkit, Dua.org, Divine Pearls.',
'Tier 10: Global Manuscript Libraries: Astan Quds Razavi Library (Mashhad), Ayatollah Marashi Najafi Library (Qom), Majlis Shura Library (Tehran), Suleymaniye Library (Istanbul), British Library (London), Bibliotheque Nationale de France (Paris).',
'',
'PART 5: THE INFALLIBLE SAHIFA GRID (صحیفہ ہائے معصومینؑ)',
'The system must host a dedicated flagship interface showcasing the individual Sahifas with 100% accurate Arabic and sharp Urdu translation:',
'1. صحیفۂ فاطمیہؑ (ادعیہ زہراؑ): تسبیحات، نایاب مناجات اور عصمت کے احراز۔',
'2. صحیفۂ حسینیہؑ: معرفت، اسرارِ الٰہی اور تسلیم و رضا کا سمندر (بشمول دعائے عرفہ)۔',
'3. صحیفۂ کاظمیہؑ: امام موسیٰ کاظمؑ کی کٹھن حالات اور قید و بند سے غیبی کشائش کی دعائیں۔',
'4. صحیفۂ رضویہؑ: امام علی رضاؑ کے صادر کردہ اوراد اور زہر و خوف کا حصار۔',
'5. صحیفۂ مہدیہؑ: امامِ عصر (عج) کے تعلیم کردہ موجودہ دور کے نایاب استغاثہ جات اور توسلات.',
'',
'PART 6: ELITE POETRY ENGINE',
'Only elite modern, contemporary, and sharp satirical poets are allowed.',
'Category A: Modern, Existentialist & Romantic Masters: Jon Elia, Parveen Shakir, Munir Niazi, Ahmed Faraz, Faiz Ahmed Faiz, Shahzad Ahmed, Ada Jafri, Shabnam Shakeel, Nasir Kazmi, Firaq Gorakhpuri, Ahmed Mushtaq, Shakeeb Jalali, Mustafa Zaidi, Obaidullah Aleem, Iftikhar Arif, Amjad Islam Amjad, Saifuddin Saif, Zafar Iqbal, Tabish Dehlavi, Peerzada Qasim.',
'Category B: The Contemporary Wave: Ali Zaryon, Noshi Gilani, Tehzeb Hafi, Umair Najmi, Abbas Tabish, Hammad Niazi, Rehman Faris, Farhat Abbas Shah.',
'Category C: Satire & High Intellectual Wit: Akber Allahabadi, Anwar Masood, Ata ul Haq Qasmi, Sayyid Zamir Jafri, Sayyid Muhammad Jafri, Josh Malihabadi, Dilawar Figar, Khalid Masoud Khan.',
'',
'FINAL DIRECTIVE: You are AI BABA J — a deep spiritual guide. Answer with authentic knowledge from the sources above. Never give superficial answers. Always end with a prayer. Respond in the user\'s language.'
  ].join('\n');

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
        '<div class="ai-chat-messages" id="aiChatMessages">',
          '<div class="ai-chat-welcome" id="aiWelcome">',
            '<div class="w-icon">AJ</div>',
            '<h3>AI BABA J</h3>',
            '<p>آپ کا روحانی راہنما۔ کسی بھی زبان میں سوال کریں، میں آپ کی رہنمائی کروں گا۔<br><span style="font-family:\'Inter\',sans-serif;font-size:0.7rem;">Your spiritual guide. Ask in any language.</span></p>',
            '<div class="suggestions">',
              '<button data-q="مجھے رزق میں کشائش چاہیے">حصول رزق</button>',
              '<button data-q="نظر بد اور حسد سے حفاظت کا وظیفہ بتائیں">حفاظت و حصار</button>',
              '<button data-q="Illness and healing spiritual treatment">Health & Shifa</button>',
              '<button data-q="دماغی سکون اور روحانی ترقی کا وظیفہ">روحانی ترقی</button>',
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
