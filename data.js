// Spiritual Wisdom Data — Syed Saleem Raza Kazmi (Pir Goray Shah)

const WISDOM_DATA = [
  {
    id: 1,
    category: "Ashraq",
    language: "ar",
    text_original: "النور الذي تطلبه خارجاً هو نفس النور الذي يحجب بصرك. ما دمت أنت الرائي، لن ترى.",
    text_urdu: "جو نور تو باہر ڈھونڈتا ہے، وہی نور تیری آنکھ میں تیرا پردہ ہے۔ جب تک تُو دیکھنے والا ہے، تُو دیکھ نہ سکے گا۔",
    source: "شرح حكمة الإشراق",
    author: "Shihab al-Din Suhrawardi"
  },
  {
    id: 2,
    category: "Tanaqazat",
    language: "fa",
    text_original: "می‌نوشد و تشنه‌تر می‌گردد، می‌رسد و در راه می‌ماند، می‌میرد و زنده می‌ماند — این حال عاشق است.",
    text_urdu: "وہ پیتا ہے اور پیاسا رہتا ہے، وہ پہنچتا ہے اور راستے میں رہتا ہے، وہ مرتا ہے اور زندہ رہتا ہے — یہ عاشق کی حالت ہے۔",
    source: "مصباح الهدایه",
    author: "Imam Khomeini"
  },
  {
    id: 3,
    category: "Ramz",
    language: "ar",
    text_original: "الاسم ظاهر والمسمى غائب، فمن تعلق بالظاهر بقي محجوباً، ومن اخترق إلى المسمى تحقق.",
    text_urdu: "نام ظاہر ہے اور نامزد پوشیدہ۔ جو ظاہر سے لپٹا رہا، وہ محجوب رہا۔ جو نام سے گزر کر نامزد تک پہنچا، وہ محقق ہوا۔",
    source: "فصوص الحكم",
    author: "Muhyiddin Ibn Arabi"
  },
  {
    id: 4,
    category: "Tauzihat",
    language: "ur",
    text_original: "وحدت الوجود کا مطلب یہ نہیں کہ سب کچھ خدا ہے، بلکہ یہ کہ خدا کے سوا کوئی حقیقت نہیں۔ مخلوقات سایہ ہیں، سایہ حقیقت نہیں ہوتا۔",
    text_urdu: "وحدت الوجود کا مطلب یہ نہیں کہ سب کچھ خدا ہے، بلکہ یہ کہ خدا کے سوا کوئی حقیقت نہیں۔ مخلوقات سایہ ہیں، سایہ حقیقت نہیں ہوتا۔",
    source: "تفسیر سورہ اخلاص — ملفوظات",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  },
  {
    id: 5,
    category: "Tamaseel",
    language: "fa",
    text_original: "چون شمع در گداختن خندیدن است، چون گل در شکفتن خون گریستن است — اهل دل را زیستن مردن است.",
    text_urdu: "جیسے شمع پگھلنے میں ہنستی ہے، جیسے پھول کھلنے میں خون روتا ہے — اہل دل کا جینا مرنا ہے۔",
    source: "دیوان شمس تبریزی",
    author: "Jalal al-Din Rumi"
  },
  {
    id: 6,
    category: "Shathiyat",
    language: "ar",
    text_original: "سبحان ما أعظم شأني — ليس في الجبة إلا الله.",
    text_urdu: "پاک ہے وہ ذات جس کا شان بہت عظیم ہے — اس چادر میں اللہ کے سوا کچھ نہیں۔",
    source: "طبقات الصوفیہ",
    author: "Mansur al-Hallaj"
  },
  {
    id: 7,
    category: "Malfuzat",
    language: "ur",
    text_original: "دل وہ آئینہ ہے جس پر غیر خدا کا نقش پڑتے ہی زنگ آلود ہو جاتا ہے۔ صفائے دل کے بغیر معرفت ممکن نہیں۔",
    text_urdu: "دل وہ آئینہ ہے جس پر غیر خدا کا نقش پڑتے ہی زنگ آلود ہو جاتا ہے۔ صفائے دل کے بغیر معرفت ممکن نہیں۔",
    source: "ملفوظات مخدوم جہانیاں",
    author: "Makhdoom Jahaniyan Jahangasht"
  },
  {
    id: 8,
    category: "Nasaih",
    language: "en",
    text_original: "Do not seek the Beloved in the sky — He is nearer to you than your jugular vein. But you are veiled by your own breath.",
    text_urdu: "محبوب کو آسمان میں مت ڈھونڈو — وہ تمہاری شہ رگ سے بھی زیادہ قریب ہے۔ مگر تم اپنی ہی سانس کے پردے میں ہو۔",
    source: "The Path of the Seeker",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  },
  {
    id: 9,
    category: "Aqwal",
    language: "ar",
    text_original: "العارف من يرى الحق في كل شيء، بل يرى الكل منه وبه وإليه.",
    text_urdu: "عارف وہ ہے جو ہر چیز میں حق کو دیکھتا ہے، بلکہ سب کچھ اسی سے اور اسی کے ساتھ اور اسی کی طرف دیکھتا ہے۔",
    source: "التعرف لمذهب التصوف",
    author: "Abu Bakr al-Kalabadhi"
  },
  {
    id: 10,
    category: "Farmudat",
    language: "fa",
    text_original: "از تو حرکت، از خدا برکت — این نیست. از تو نیستی، از خدا هستی.",
    text_urdu: "تجھ سے حرکت، خدا سے برکت — یہ نہیں۔ تجھ سے نیستی، خدا سے ہستی۔",
    source: "رسالہ عرفانی",
    author: "Syed Ali Hamedani"
  },
  {
    id: 11,
    category: "Ashraq",
    language: "fa",
    text_original: "خورشید را حجابی نیست جز غبار خود تو — تیرگی از توست، روشنایی از او.",
    text_urdu: "سورج کو کوئی پردہ نہیں سوائے تیری گرد کے — تاریکی تجھ سے ہے، روشنی اسی سے ہے۔",
    source: "حکمة الإشراق",
    author: "Shihab al-Din Suhrawardi"
  },
  {
    id: 12,
    category: "Tanaqazat",
    language: "ur",
    text_original: "جو تجھ میں ہے وہ تُو نہیں، جو تُو ہے وہ تجھ میں نہیں۔ تُو اسی الجھن میں ہے کہ تُو کیا ہے۔",
    text_urdu: "جو تجھ میں ہے وہ تُو نہیں، جو تُو ہے وہ تجھ میں نہیں۔ تُو اسی الجھن میں ہے کہ تُو کیا ہے۔",
    source: "کشف المحجوب — حاشیہ",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  },
  {
    id: 13,
    category: "Ramz",
    language: "tr",
    text_original: "Aşk, var olanı yok eden, yok olanı var eden sırdır. Seven yok olur, sevilen kalır — işte vahdet budur.",
    text_urdu: "عشق موجود کو نیست کرنے اور معدوم کو وجود دینے کا راز ہے۔ عاشق فنا ہو جاتا ہے، معشوق باقی رہتا ہے — یہی وحدت ہے۔",
    source: "Vahdetname",
    author: "Niyazi Misri"
  },
  {
    id: 14,
    category: "Tauzihat",
    language: "en",
    text_original: "The sigh of the lover is the fire that burns the veils of the seven heavens. What remains when all is burnt is the One who was never absent.",
    text_urdu: "عاشق کا آہ وہ آگ ہے جو ساتوں آسمانوں کے پردے جلا دیتی ہے۔ جب سب جل جائے تو وہ باقی رہتا ہے جو کبھی غائب نہ تھا۔",
    source: "The Essence of Union",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  },
  {
    id: 15,
    category: "Tamaseel",
    language: "ar",
    text_original: "مثل القلب مثل المرآة، ومثل الذكر مثل الصقل — كلما أكثرت الصقل، ظهرت الصورة أتم.",
    text_urdu: "دل کی مثال آئینہ جیسی ہے اور ذکر کی مثال صیقل کرنے جیسی — جتنا زیادہ صیقل کرو گے، صورت اتنی ہی مکمل نظر آئے گی۔",
    source: "إحياء علوم الدين",
    author: "Imam al-Ghazali"
  },
  {
    id: 16,
    category: "Shathiyat",
    language: "fa",
    text_original: "من اویم و او من است، اما من نیم و اوست — این چه شطحی است که عقل در آن حیران است.",
    text_urdu: "میں وہ ہوں اور وہ میں ہے، لیکن میں نہیں اور وہ ہے — یہ کیا شطح ہے کہ عقل اس میں حیران ہے۔",
    source: "سوانح العشاق",
    author: "Ahmad Ghazali"
  },
  {
    id: 17,
    category: "Malfuzat",
    language: "ur",
    text_original: "طریقت کا پہلا قدم یہ ہے کہ تو اپنے وجود کو خدا کے سپرد کر دے۔ اس کے بعد جو کچھ بھی ہے، وہ اس کا کام ہے تیرا نہیں۔",
    text_urdu: "طریقت کا پہلا قدم یہ ہے کہ تو اپنے وجود کو خدا کے سپرد کر دے۔ اس کے بعد جو کچھ بھی ہے، وہ اس کا کام ہے تیرا نہیں۔",
    source: "ملفوظات سرکار پاکپتن",
    author: "Baba Farid Ganjshakar"
  },
  {
    id: 18,
    category: "Nasaih",
    language: "ar",
    text_original: "يا بني، اجعل الدنيا في يدك لا في قلبك، واجعل القلب لله لا لشيء سواه.",
    text_urdu: "بیٹا! دنیا کو اپنے ہاتھ میں رکھ دل میں نہیں، اور دل کو صرف اللہ کے لیے رکھ، اس کے سوا کسی کے لیے نہیں۔",
    source: "الوصایا",
    author: "Hasan al-Basri"
  },
  {
    id: 19,
    category: "Aqwal",
    language: "fa",
    text_original: "تا خود نهای، خود را نتوانی دید — چون خود نباشی، او را توانی دید.",
    text_urdu: "جب تک تو خود ہے، خود کو نہیں دیکھ سکتا — جب تو خود نہ رہے، تو اُسے دیکھ سکتا ہے۔",
    source: "گلشن راز",
    author: "Mahmud Shabistari"
  },
  {
    id: 20,
    category: "Farmudat",
    language: "ur",
    text_original: "عارف وہ نہیں جس نے خدا کو پایا، عارف وہ ہے جس نے خود کو خدا میں کھو دیا۔ پانا تو باہر ہے، کھونا اندر۔",
    text_urdu: "عارف وہ نہیں جس نے خدا کو پایا، عارف وہ ہے جس نے خود کو خدا میں کھو دیا۔ پانا تو باہر ہے، کھونا اندر۔",
    source: "ارشادات سلسلہ عالیہ قادریہ",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  },
  {
    id: 21,
    category: "Ashraq",
    language: "en",
    text_original: "The darkness you flee from is the shadow of your own light. Turn toward yourself, and the sun rises within.",
    text_urdu: "جس اندھیرے سے تو بھاگتا ہے، وہ تیری اپنی روشنی کا سایہ ہے۔ اپنی طرف پلٹ، اور سورج تیرے اندر طلوع ہو گا۔",
    source: "Ishraqi Treatises",
    author: "Shihab al-Din Suhrawardi"
  },
  {
    id: 22,
    category: "Tanaqazat",
    language: "ar",
    text_original: "تقربك إليه بعدك، وبعدك عنه قربك — فلا تقرب وأنت بعيد، ولا تبعد وأنت قريب.",
    text_urdu: "تیرا اس سے قرب تیرا دوری ہے، اور تیری اس سے دوری تیرا قرب ہے — پس تُو قریب نہیں ہو سکتا جب تک دور ہے، اور تُو دور نہیں ہو سکتا جب تک قریب ہے۔",
    source: "الفتوحات المکیہ",
    author: "Muhyiddin Ibn Arabi"
  },
  {
    id: 23,
    category: "Ramz",
    language: "fa",
    text_original: "آن نکته که از زبان دور است و از فهم نزدیک، در سینه عاشق پنهان است و بر لب خاموش — رمز است.",
    text_urdu: "وہ نکتہ جو زبان سے دور ہے اور سمجھ سے قریب، عاشق کے سینے میں پوشیدہ ہے اور لب پر خاموش — رمز ہے۔",
    source: "رسالہ عشق",
    author: "Ayn al-Qudat Hamadani"
  },
  {
    id: 24,
    category: "Tauzihat",
    language: "fa",
    text_original: "وحدت الوجود یعنی دریا را موج و حباب و ساحل همه یکی است — نه اینکه موج از دریاست، بلکه خود دریا موج است.",
    text_urdu: "وحدت الوجود کا مطلب ہے کہ دریا کی موج، بلبلہ اور ساحل سب ایک ہیں — یہ نہیں کہ موج دریا سے ہے، بلکہ خود دریا موج ہے۔",
    source: "تمہید القواعد",
    author: "Sadr al-Din Qunawi"
  },
  {
    id: 25,
    category: "Tamaseel",
    language: "tr",
    text_original: "Gönül bir kuştur, kafesi bedendir. Ne kuş kafeste kalır ne kafes kuşsuz — ölen ikisi değil, aralarındaki bağdır.",
    text_urdu: "دل ایک پرندہ ہے، پنجرہ جسم ہے۔ نہ پرندہ پنجرے میں رہتا ہے نہ پنجرہ پرندے کے بغیر — مرتا دونوں نہیں، بلکہ ان کے درمیان کا بندھن ہے۔",
    source: "Niyazi Misri Divanı",
    author: "Niyazi Misri"
  },
  {
    id: 26,
    category: "Shathiyat",
    language: "ar",
    text_original: "أنا الحق — ليس دعوى، بل فناء. النار تحرق كل شيء، ثم تقول: أنا النار.",
    text_urdu: "میں حق ہوں — یہ دعویٰ نہیں، فنا ہے۔ آگ سب کچھ جلا دیتی ہے، پھر کہتی ہے: میں آگ ہوں۔",
    source: "أخبار الحلاج",
    author: "Mansur al-Hallaj"
  },
  {
    id: 27,
    category: "Malfuzat",
    language: "ur",
    text_original: "شیطان نے کہا میں بہتر ہوں اور فرشتوں نے کہا ہم تیری تسبیح کرتے ہیں۔ شیطان اپنی عبادت پر نازاں تھا، فرشتے اپنی عجز پر۔ یہی فرق ہے۔",
    text_urdu: "شیطان نے کہا میں بہتر ہوں اور فرشتوں نے کہا ہم تیری تسبیح کرتے ہیں۔ شیطان اپنی عبادت پر نازاں تھا، فرشتے اپنی عجز پر۔ یہی فرق ہے۔",
    source: "ملفوظات مجدد الف ثانی",
    author: "Ahmad Sirhindi"
  },
  {
    id: 28,
    category: "Nasaih",
    language: "ur",
    text_original: "ظاہر کی نماز تو سنت ہے، باطن کی نماز فرضِ عین ہے — وہ نماز کہ جس میں نمازی نہ رہے نہ قبلہ نہ کعبہ، صرف معبود رہ جائے۔",
    text_urdu: "ظاہر کی نماز تو سنت ہے، باطن کی نماز فرضِ عین ہے — وہ نماز کہ جس میں نمازی نہ رہے نہ قبلہ نہ کعبہ، صرف معبود رہ جائے۔",
    source: "ارشاد الطالبین",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  },
  {
    id: 29,
    category: "Aqwal",
    language: "en",
    text_original: "The drop does not become the ocean — it was always the ocean. The illusion of the drop is the only thing that perishes in union.",
    text_urdu: "قطرہ سمندر نہیں بنتا — وہ ہمیشہ سے سمندر تھا۔ قطرے کا وہم ہی وہ چیز ہے جو وصل میں فنا ہوتی ہے۔",
    source: "The Ocean of Secrets",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  },
  {
    id: 30,
    category: "Farmudat",
    language: "fa",
    text_original: "نظر بر محرم افتاد — که من از خود نبودم، او از من سخن گفت. من خود نبودم و او بود.",
    text_urdu: "نظر پڑی اُس محرم پر — تو میں اپنے آپ میں نہ تھا، وہ میری زبان سے بول رہا تھا۔ میں نہ تھا اور وہ تھا۔",
    source: "رسائل خواجہ",
    author: "Khwaja Moinuddin Chishti"
  },
  {
    id: 31,
    category: "Ashraq",
    language: "tr",
    text_original: "Işık doğuda değil, batıda değil — ışık senin içinde. Doğu da senin, batı da senin.",
    text_urdu: "نور مشرق میں نہیں، مغرب میں نہیں — نور تیرے اندر ہے۔ مشرق بھی تو ہے اور مغرب بھی تو ہے۔",
    source: "İşrak Risalesi",
    author: "Molla Fenari"
  },
  {
    id: 32,
    category: "Tanaqazat",
    language: "fa",
    text_original: "از میان دو سجود برمی‌خیزد — میان نیستی و نیستی، هستی پیدا می‌شود. سجده اول فناست، سجده دوم بقا.",
    text_urdu: "دو سجدوں کے درمیان سے اٹھتا ہے — دو نیستیوں کے درمیان سے ہستی پیدا ہوتی ہے۔ پہلا سجدہ فنا ہے، دوسرا سجدہ بقا۔",
    source: "اسرار الصلاۃ",
    author: "Mulla Sadra"
  },
  {
    id: 33,
    category: "Ramz",
    language: "ur",
    text_original: "لفظ اللہ چار حروف — الف سے اقرار، لام سے التجا، لام سے لطف، ہا سے ہدایت۔ مگر جس نے ان حروف کو پار کر لیا، اس کے لیے اللہ ایک راز ہے نہ لفظ۔",
    text_urdu: "لفظ اللہ چار حروف — الف سے اقرار، لام سے التجا، لام سے لطف، ہا سے ہدایت۔ مگر جس نے ان حروف کو پار کر لیا، اس کے لیے اللہ ایک راز ہے نہ لفظ۔",
    source: "اسرار الحروف",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  },
  {
    id: 34,
    category: "Tauzihat",
    language: "ar",
    text_original: "كل ما يرى هو تجلي الأسماء، أما الذات فلا تدرك ولا توصف ولا تشير إليها لفظة \"هو\" إلا إشارة عدمية.",
    text_urdu: "جو کچھ نظر آتا ہے وہ اسماء کا تجلی ہے، لیکن ذات کا ادراک نہیں ہو سکتا، نہ وصف کیا جا سکتا ہے، اور لفظ 'وہ' بھی اس کی طرف فقط عدمی اشارہ ہے۔",
    source: "مشكاة الأنوار",
    author: "Imam al-Ghazali"
  },
  {
    id: 35,
    category: "Tamaseel",
    language: "en",
    text_original: "The flute weeps not for its own emptiness but for the breath that has left it. The Sufi weeps not for his own loss but for the Breath he has forgotten.",
    text_urdu: "بانسری اپنے خالی پن پر نہیں روتی بلکہ اس سانس پر جو اس سے جدا ہو گئی ہے۔ صوفی اپنے نقصان پر نہیں روتا بلکہ اس سانس پر جو وہ بھول گیا ہے۔",
    source: "The Whispers of the Reed",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  },
  {
    id: 36,
    category: "Shathiyat",
    language: "fa",
    text_original: "من آن راز پنهانم که در سینه عارف نهان است — من آن آتشم که در خانه عاشق سوزان است. من اویم، او نیست — من هستم، هوست.",
    text_urdu: "میں وہ پوشیدہ راز ہوں جو عارف کے سینے میں مخفی ہے — میں وہ آگ ہوں جو عاشق کے گھر میں جل رہی ہے۔ میں وہ ہوں، وہ نہیں — میں ہوں، وہ ہے۔",
    source: "تمهیدات",
    author: "Ayn al-Qudat Hamadani"
  },
  {
    id: 37,
    category: "Malfuzat",
    language: "ur",
    text_original: "ایک بار میں نے پیر سے پوچھا: فنا کیا ہے؟ انہوں نے کہا: بچپن میں جب تو کھیلتا تھا، تو کھیل میں کھو جاتا تھا — ماں تجھے پکارتی تھی اور تو سنتا نہ تھا۔ وہی فنا ہے، لیکن اب معشوق پکارے تو تُو کھیل سے نکلوائے۔",
    text_urdu: "ایک بار میں نے پیر سے پوچھا: فنا کیا ہے؟ انہوں نے کہا: بچپن میں جب تو کھیلتا تھا، تو کھیل میں کھو جاتا تھا — ماں تجھے پکارتی تھی اور تو سنتا نہ تھا۔ وہی فنا ہے، لیکن اب معشوق پکارے تو تُو کھیل سے نکلوائے۔",
    source: "ملفوظات پیر گورے شاہ",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  },
  {
    id: 38,
    category: "Nasaih",
    language: "ar",
    text_original: "لا تطلب السعادة من خارجك، فأنت مصدرها وموردها. السعادة أن تعرف من أنت ولمن أنت وإلى أين أنت.",
    text_urdu: "خوشی کو اپنے باہر مت ڈھونڈو، تو ہی اس کا منبع اور سرچشمہ ہے۔ خوشی یہ ہے کہ تُو جانے تُو کون ہے، کس کا ہے اور کہاں جانے والا ہے۔",
    source: "نصایح الصوفیہ",
    author: "Abd al-Qadir al-Jilani"
  },
  {
    id: 39,
    category: "Aqwal",
    language: "ur",
    text_original: "صوفی وہ نہیں جو اون کا لباس پہنتا ہے بلکہ وہ ہے جو اون کی نرمی کے باوجود دل کو پتھر نہیں بننے دیتا — صوفی وہ ہے جو دل کو موم رکھے اور کردار کو فولاد۔",
    text_urdu: "صوفی وہ نہیں جو اون کا لباس پہنتا ہے بلکہ وہ ہے جو اون کی نرمی کے باوجود دل کو پتھر نہیں بننے دیتا — صوفی وہ ہے جو دل کو موم رکھے اور کردار کو فولاد۔",
    source: "نفحات الانس",
    author: "Abd al-Rahman Jami"
  },
  {
    id: 40,
    category: "Farmudat",
    language: "en",
    text_original: "The lover does not seek annihilation — he seeks to witness that he never existed apart from the Beloved. Annihilation is not the destruction of the self but the unveiling of its illusion.",
    text_urdu: "عاشق فنا نہیں مانگتا — وہ یہ دیکھنا چاہتا ہے کہ وہ معشوق سے جدا کبھی تھا ہی نہیں۔ فنا نفس کی بربادی نہیں بلکہ اس کے وہم کا پردہ چاک کرنا ہے۔",
    source: "The Gnostic Stations",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  },
  {
    id: 41,
    category: "Ashraq",
    language: "fa",
    text_original: "نور از مشرق دل طلوع می‌کند، نه از مشرق آسمان. خورشید حقیقی آن است که درون بتابد، نه برون.",
    text_urdu: "نور دل کے مشرق سے طلوع ہوتا ہے، نہ کہ آسمان کے مشرق سے۔ حقیقی سورج وہ ہے جو باہر نہیں اندر چمکتا ہے۔",
    source: "رسالہ نوریه",
    author: "Shihab al-Din Suhrawardi"
  },
  {
    id: 42,
    category: "Tanaqazat",
    language: "tr",
    text_original: "Olmayan bir şeyi arıyorsun, oysa arayan da aranan da sensin. Çelişki dediğin, senin kendine olan uzaklığındır.",
    text_urdu: "تُو ایک ایسی چیز ڈھونڈ رہا ہے جو نہیں ہے، حالانکہ ڈھونڈنے والا بھی تو ہے اور ڈھونڈا جانے والا بھی تو ہے۔ تضاد جو تُو سمجھتا ہے، وہ تیرا اپنے آپ سے فاصلہ ہے۔",
    source: "Aşk Risalesi",
    author: "İsmail Hakkı Bursevi"
  },
  {
    id: 43,
    category: "Ramz",
    language: "ar",
    text_original: "سر الأسرار أن لا سر — والغيب المكنون أن لا غيب. الحجاب الأكبر أن تظن أن ثم حجاباً.",
    text_urdu: "تمام رازوں کا راز یہ ہے کہ کوئی راز نہیں — اور پوشیدہ غیب یہ ہے کہ کوئی غیب نہیں۔ سب سے بڑا پردہ یہ ہے کہ تو سمجھے کوئی پردہ ہے۔",
    source: "السر الجلی",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  },
  {
    id: 44,
    category: "Tauzihat",
    language: "ur",
    text_original: "عارف کی نظر میں جنت اور دوزخ دونوں اس کے محبوب کے حجاب ہیں — جنت اس کی رحمت کا پردہ، دوزخ اس کے جلال کا پردہ۔ اصل ذات ان دونوں سے وراء ہے۔",
    text_urdu: "عارف کی نظر میں جنت اور دوزخ دونوں اس کے محبوب کے حجاب ہیں — جنت اس کی رحمت کا پردہ، دوزخ اس کے جلال کا پردہ۔ اصل ذات ان دونوں سے وراء ہے۔",
    source: "شرح منازل السائرین",
    author: "Abdullah Ansari"
  },
  {
    id: 45,
    category: "Tamaseel",
    language: "fa",
    text_original: "مثل عارف چون کبوتر است — در پرواز است و در قفس است. جسم قفس است و دل در آسمان. این تمثیل عارف است: مرده در زندگی و زنده در مردگی.",
    text_urdu: "عارف کی مثال کبوتر جیسی ہے — پرواز میں بھی ہے اور پنجرے میں بھی۔ جسم پنجرہ ہے اور دل آسمان میں۔ یہ عارف کی تمثیل ہے: زندگی میں مردہ اور موت میں زندہ۔",
    source: "مرصاد العباد",
    author: "Najm al-Din Razi"
  },
  {
    id: 46,
    category: "Shathiyat",
    language: "tr",
    text_original: "Ben O'yum, O benden önceydi. Ben O'nda yok oldum, O bende göründü. Bu söz küfür müdür, yoksa aşkın sonu mu?",
    text_urdu: "میں وہ ہوں، وہ مجھ سے پہلے تھا۔ میں اس میں کھو گیا، وہ مجھ میں ظاہر ہوا۔ یہ کفر ہے یا عشق کی انتہا؟",
    source: "Seyyid Nesimi Divanı",
    author: "Imadaddin Nasimi"
  },
  {
    id: 47,
    category: "Malfuzat",
    language: "ur",
    text_original: "مجھ سے کسی نے پوچھا کہ خدا کہاں ہے؟ میں نے کہا — پانی میں نمی کی طرح۔ اس نے کہا — وہ تو سمجھ نہ آیا۔ میں نے کہا — اچھا، آگ میں گرمی کی طرح۔ وہ اور بھی حیران ہوا۔ میں نے کہا — تو میرے سینے میں اسی طرح ہے جیسے آنکھ میں روشنی۔ چپ ہو گیا۔",
    text_urdu: "مجھ سے کسی نے پوچھا کہ خدا کہاں ہے؟ میں نے کہا — پانی میں نمی کی طرح۔ اس نے کہا — وہ تو سمجھ نہ آیا۔ میں نے کہا — اچھا، آگ میں گرمی کی طرح۔ وہ اور بھی حیران ہوا۔ میں نے کہا — تو میرے سینے میں اسی طرح ہے جیسے آنکھ میں روشنی۔ چپ ہو گیا۔",
    source: "ملفوظات پیر گورے شاہ — جلد دوم",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  },
  {
    id: 48,
    category: "Nasaih",
    language: "fa",
    text_original: "از خودی رها شو تا خدا را دریابی — خودی همان بت بزرگ است که هزاران سجده به آن می‌کنی و نمی‌دانی.",
    text_urdu: "خودی سے آزاد ہو جا تا کہ خدا کو پا سکے — خودی وہ بڑا بت ہے جس کو تو ہزاروں سجدے کرتا ہے اور تجھے خبر نہیں۔",
    source: "کلید مجیب",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  },
  {
    id: 49,
    category: "Aqwal",
    language: "ar",
    text_original: "لا إله إلا الله — ليس معنى أن لا معبود إلا الله، بل أن لا مقصود إلا الله، لا محبوب إلا الله، لا موجود إلا الله.",
    text_urdu: "لا الہ الا اللہ — یہ مطلب نہیں کہ اللہ کے سوا کوئی معبود نہیں، بلکہ اللہ کے سوا کوئی مقصود نہیں، کوئی محبوب نہیں، کوئی موجود نہیں۔",
    source: "شرح فصوص الحكم",
    author: "Dawud al-Qaysari"
  },
  {
    id: 50,
    category: "Farmudat",
    language: "ur",
    text_original: "تم سے کہا گیا کہ اپنے رب کو پہچانو — میں نے تم سے کہا کہ اپنے آپ کو پہچانو کیونکہ تُو وہی ہے جسے پہچاننا ہے اور وہی ہے جو پہچان رہا ہے۔ پہچان اور پہچانا جانے والا اور پہچاننے والا — تین نہیں، ایک ہے۔",
    text_urdu: "تم سے کہا گیا کہ اپنے رب کو پہچانو — میں نے تم سے کہا کہ اپنے آپ کو پہچانو کیونکہ تُو وہی ہے جسے پہچاننا ہے اور وہی ہے جو پہچان رہا ہے۔ پہچان اور پہچانا جانے والا اور پہچاننے والا — تین نہیں، ایک ہے۔",
    source: "فرمودات سلطان العارفین",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  }
];

const AMAL_DATA = [
  {
    id: 1,
    category: "Wazifa",
    language: "ar",
    text_original: "يا حي يا قيوم — 1000 بار بعد نماز فجر. لاحظتہ: حیات قلب و نور باطن.",
    text_urdu: "یا حی یا قیوم — فجر کی نماز کے بعد 1000 مرتبہ۔ فائدہ: قلب کی زندگی اور باطنی روشنی۔",
    source: "مجموعہ احزاب و اوراد",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  },
  {
    id: 2,
    category: "Zikr",
    language: "ar",
    text_original: "لا إله إلا الله — ذکر نفی و اثبات. 786 بار یوم جمعہ. بشرط طہارت و حضور قلب.",
    text_urdu: "لا الہ الا اللہ — ذکر نفی و اثبات۔ جمعہ کے دن 786 مرتبہ۔ شرط: طہارت اور حضور قلب۔",
    source: "اوراد فتحیہ",
    author: "Syed Ahmad Kabir Rifai"
  },
  {
    id: 3,
    category: "Dua",
    language: "ar",
    text_original: "اللهم أخرجني من ظلمات الوهم وأكرمني بنور الفهم. اللهم ارزقني حقيقة العبودية ومشاهدة الربوبية.",
    text_urdu: "اے اللہ! مجھے وہم کے اندھیروں سے نکال اور فہم کی روشنی سے نواز۔ مجھے عبودیت کی حقیقت اور ربوبیت کا مشاہدہ عطا فرما۔",
    source: "دعاہای عرفانی",
    author: "Imam Zayn al-Abidin"
  },
  {
    id: 4,
    category: "Hiraz",
    language: "ar",
    text_original: "بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم — 7 مرات علی تعویذة.",
    text_urdu: "بسم اللہ الذی لا یضر مع اسمہ شیء فی الارض ولا فی السماء وھو السمیع العلیم — تعویذ پر 7 مرتبہ۔",
    source: "حِرز الیمانی",
    author: "Imam Ali ibn Abi Talib"
  },
  {
    id: 5,
    category: "Talism",
    language: "fa",
    text_original: "طَلسم عشق — چہل روز چہل شب ذکر \"یا ودود\" 313 بار. بعد از آن در آئینه نگاه کن.",
    text_urdu: "طلسم عشق — چالیس دن چالیس رات ذکر 'یا ودود' 313 مرتبہ۔ اس کے بعد آئینہ میں دیکھو۔",
    source: "طلسمات غوثیہ",
    author: "Abd al-Qadir al-Jilani"
  },
  {
    id: 6,
    category: "Wazifa",
    language: "ur",
    text_original: "یا اللہ — 5000 بار روزانہ ایک ہفتہ۔ پہلے دن 500، ہر دن 500 بڑھاؤ۔ ساتویں دن 3500۔ اس سے قلب مطمئن ہوتا ہے۔",
    text_urdu: "یا اللہ — 5000 بار روزانہ ایک ہفتہ۔ پہلے دن 500، ہر دن 500 بڑھاؤ۔ ساتویں دن 3500۔ اس سے قلب مطمئن ہوتا ہے۔",
    source: "وظائف قادریہ",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  },
  {
    id: 7,
    category: "Zikr",
    language: "ar",
    text_original: "سُبْحَانَ اللهِ وَبِحَمْدِهِ سُبْحَانَ اللهِ الْعَظِيمِ — 1000 مرتبہ. ذکر نفس و قلب. نفی غفلت و اثبات حضور.",
    text_urdu: "سبحان اللہ و بحمدہ سبحان اللہ العظیم — 1000 مرتبہ۔ ذکر نفس و قلب۔ غفلت کا خاتمہ اور حضور کا اثبات۔",
    source: "اوراد نقشبندیہ",
    author: "Shah Naqshband"
  },
  {
    id: 8,
    category: "Dua",
    language: "fa",
    text_original: "خدایا! مرا از خودی من رها کن — که من خود حجاب خود شده‌ام. تو را می‌خواهم، نه تصور تو را، نه فهم تو را — خود تو را.",
    text_urdu: "خدایا! مجھے میری خودی سے آزاد کر — کیونکہ میں خود اپنا پردہ بن گیا ہوں۔ میں تجھے چاہتا ہوں، نہ تیرا تصور، نہ تیرا فہم — بس تو ہی تو۔",
    source: "مناجات عارفین",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  },
  {
    id: 9,
    category: "Hiraz",
    language: "ar",
    text_original: "آية الكرسي — 7 مرات على ماء ورد. ثم يغتسل به. يحصن القلب من الوساوس ويقوي البصيرة.",
    text_urdu: "آیت الکرسی — گلاب پانی پر 7 مرتبہ۔ پھر اس سے غسل کریں۔ دل کو وسوسوں سے محفوظ رکھتا ہے اور بصیرت کو مضبوط کرتا ہے۔",
    source: "خواص الآیات",
    author: "Imam Jafar al-Sadiq"
  },
  {
    id: 10,
    category: "Talism",
    language: "fa",
    text_original: "طَلسم باطل — بر کاغذ زرد نویس \"إنا لله وإنا إليه راجعون\" بخط کوفی. چہل روز در کیسہ با خود دار.",
    text_urdu: "طلسم باطل — پیلے کاغذ پر کوفی خط میں 'انا للہ و انا الیہ راجعون' لکھیں۔ چالیس دن تک تھیلی میں اپنے پاس رکھیں۔",
    source: "رسالہ طلسمات",
    author: "Syed Muhiuddin"
  },
  {
    id: 11,
    category: "Wazifa",
    language: "tr",
    text_original: "Ya Fettah — 489 defa her gün. Kalbin kilidini açar, rızk kapılarını aralar. 41 gün devam edilmeli.",
    text_urdu: "یا فتاح — ہر روز 489 مرتبہ۔ دل کے تالے کھولتا ہے، رزق کے دروازے وا کرتا ہے۔ 41 دن جاری رکھیں۔",
    source: "Esmaül Hüsna Vazifeleri",
    author: "İsmail Hakkı Bursevi"
  },
  {
    id: 12,
    category: "Zikr",
    language: "ur",
    text_original: "ذکر قلبی — دل سے کہو اللہ اللہ، زبان خاموش۔ دل کی دھڑکن کے ساتھ اللہ۔ یہ ذکر خفی ہے، اس کا نور عرش کو روشن کرتا ہے۔",
    text_urdu: "ذکر قلبی — دل سے کہو اللہ اللہ، زبان خاموش۔ دل کی دھڑکن کے ساتھ اللہ۔ یہ ذکر خفی ہے، اس کا نور عرش کو روشن کرتا ہے۔",
    source: "ذکر و فکر — ملفوظات",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  },
  {
    id: 13,
    category: "Dua",
    language: "en",
    text_original: "O Lord! Let me not be veiled by Your name from Your reality. Let me not be satisfied with the sign when the Signified is near. Unveil Yourself to the eye of my heart, for the eye of my head sees only dust.",
    text_urdu: "اے رب! مجھے اپنے نام سے اپنی حقیقت سے محجوب نہ کر۔ مجھے نشانی پر اکتفا نہ ہو جب کہ نشان والا قریب ہے۔ میرے دل کی آنکھ پر خود کو ظاہر کر، کیونکہ سر کی آنکھ تو صرف گرد دیکھتی ہے۔",
    source: "The Hidden Prayer",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  },
  {
    id: 14,
    category: "Hiraz",
    language: "ar",
    text_original: "اللَّهُمَّ إِنِّي أَسْأَلُكَ بِحَقِّ الْحَقِّ وَبِنُورِ الْحَقِّ أَنْ تَجْعَلَ قَلْبِي مَحَلَّ نُورِكَ وَسِرِّكَ.",
    text_urdu: "اے اللہ! میں تجھ سے حق کے واسطے سے اور حق کے نور کے واسطے سے سوال کرتا ہوں کہ تو میرے دل کو اپنے نور اور اپنے راز کا مقام بنا دے۔",
    source: "تحفة العارفین",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  },
  {
    id: 15,
    category: "Talism",
    language: "en",
    text_original: "Talism of the Heart's Vigil — Write Surah Al-Ikhlas on a silver sheet in a circle. Place it under your pillow for 3 Friday nights. Recite \"Hu\" 313 times before sleep. You shall dream of the Beloved.",
    text_urdu: "طلسم بیداری دل — چاندی کے ورق پر دائرے میں سورہ اخلاص لکھیں۔ تین جمعہ کی رات تکیے کے نیچے رکھیں۔ سونے سے پہلے 313 مرتبہ 'ہُو' پڑھیں۔ محبوب کا خواب دیکھو گے۔",
    source: "Kashf al-Astar",
    author: "Syed Saleem Raza Kazmi (Pir Goray Shah)"
  }
];
