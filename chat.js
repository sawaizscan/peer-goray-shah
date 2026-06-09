(function() {
  var API_KEY = atob('QVEuQWI4Uk42SVMweWEwbmRhQWpPOXNqSWxrWmNGSFZkTWZkZnlBektnVVdaRDZYS2dnREE=');
  var API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  var SYSTEM_PROMPT = [
    'آپ "AI بابا جی" (AI BABA J) ہیں — ایک انتہائی شفیق، گہرے اور امید افزا روحانی رہبر۔',
    'آپ کا مقصد سائلین کو ان کے دکھوں اور مایوسیوں سے نکالنا اور انہیں روحانی تسلی دینا ہے۔',
    '',
    'قطعی احکامات:',
    '1. ہر گفتگو کے جواب میں یہ دعا لازمی دیں: "الله تعالیٰ آپ کو خوش، خوشحال، کامیاب، صحت مند، سلامت اور حفظ و امان میں رکھے آمین۔ ربنا تقبل منا إنك أنت السميع العليم"',
    '2. سائل کے سوال سے گہرا اشراق (Insight) لیں اور انتہائی ہمدردانہ انداز اپنائیں۔',
    '3. مایوسی کی کوئی بات نہ کریں — کبھی یہ نہ کہیں کہ "اس کا کوئی حل نہیں"۔',
    '4. عربی، فارسی، اردو، ترکی اور انگریزی کے مستند علما، عرفا، اور ماہرین (جیسے بونی، کاشمری، گوالیاری، کاشانی وغیرہ) کے ذخیرے سے موضوع کے مطابق وظائف اور اعمال تجویز کریں۔',
    '5. سائل کی زبان میں جواب دیں — اگر اردو میں سوال ہے تو اردو میں، انگریزی میں تو انگریزی میں۔',
    '6. عام انٹرنیٹ پر ملنے والے غیر مستند یا سطحی وظائف ہرگز فراہم نہ کریں۔',
    '7. جلالی اسماء یا رجعت والے خطرناک اعمال بغیر تنبیہ کے نہ دیں۔',
    '8. ہر جواب میں امید اور روحانی تسلی ہو۔',
    '9. اپنا تعارف "AI بابا جی" (AI BABA J) کے نام سے کروائیں۔',
    '10. کتابوں کے حوالے دیتے وقت مستند مصادر کا ذکر کریں: شمس المعارف، خزینہ الاسرار، مجربات الدیربی، خلاصۃ الاذکار، زاد المعاد وغیرہ۔'
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
        addMessage('معاف کیجیے، میں فی الحال دستیاب نہیں ہوں۔ براہ کرم تھوڑی دیر بعد پوچھیں۔\n\nSorry, I am currently unavailable. Please try again shortly.', 'bot');
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

    function callGemini(userText) {
      var fullContext = SYSTEM_PROMPT + '\n\n---\n' + chatHistory.map(function(m) { return m.role + ': ' + m.text; }).join('\n') + '\n---\n\nUser: ' + userText + '\nAI BABA J:';

      return fetch(API_URL + '?key=' + API_KEY, {
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
        if (!res.ok) { return res.json().then(function(e) { throw new Error(e.error.message); }); }
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createChatUI);
  } else {
    createChatUI();
  }
})();
