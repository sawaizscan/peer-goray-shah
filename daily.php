<?php
/**
 * Daily Wisdom — PHP Web Endpoint
 * 
 * Serves today's curated wisdom as JSON.
 * Call: GET /daily.php
 *       GET /daily.php?date=2026-06-03
 *       GET /daily.php?html (renders as simple HTML page)
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/scripts/daily_wisdom.php';

$engine = new DailyWisdomEngine(__DIR__);

if (isset($_GET['date']) && preg_match('/^\d{4}-\d{2}-\d{2}$/', $_GET['date'])) {
  $engine->setDate($_GET['date']);
}

$output = $engine->generate();

// Optional: serve directly as static JSON file for GitHub Pages cache
if (isset($_GET['save'])) {
  $filename = __DIR__ . '/data_v2/daily_wisdom_' . $output['date'] . '.json';
  file_put_contents($filename, json_encode($output, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}

// HTML render mode for browsers
if (isset($_GET['html'])) {
  header('Content-Type: text/html; charset=utf-8');
  renderHTML($output);
  exit;
}

echo json_encode($output, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

/**
 * Simple HTML render for direct browsing
 */
function renderHTML($data) {
  $date = $data['date'];
  $label = $data['rotation_label'];
  $day = $data['rotation_day'];
  $stats = $data['stats'];
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daily Wisdom — <?= $date ?> — Pir Goray Shah</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&family=Noto+Nastaliq+Urdu:wght@400;600;700&family=Amiri:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <link rel="stylesheet" href="style.css">
  <style>
    body { background: var(--bg); }
    .dw-container { max-width: 800px; margin: 0 auto; padding: 40px 20px; }
    .dw-header { text-align: center; margin-bottom: 40px; }
    .dw-header h1 { font-family: var(--font-display); font-size: 32px; color: var(--gold); margin-bottom: 8px; }
    .dw-header .dw-meta { color: var(--text-secondary); font-size: 14px; }
    .dw-header .dw-label { color: var(--text-secondary); font-size: 12px; margin-top: 4px; opacity: 0.7; }
    .dw-section { margin-bottom: 40px; }
    .dw-section-title { font-family: var(--font-display); font-size: 20px; color: var(--gold); border-bottom: 1px solid var(--border); padding-bottom: 10px; margin-bottom: 20px; }
    .dw-section-title span { font-size: 13px; color: var(--text-secondary); font-family: var(--font-body); font-weight: 400; }
    .dw-entry { background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; padding: 20px 24px; margin-bottom: 16px; }
    .dw-entry:hover { border-color: rgba(212,168,67,0.3); }
    .dw-entry .dw-badge { display: inline-block; font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 10px; margin-bottom: 8px; }
    .dw-entry .dw-badge.practical { background: rgba(29,185,84,0.1); color: var(--primary); }
    .dw-entry .dw-badge.rare { background: rgba(212,168,67,0.1); color: var(--gold); }
    .dw-entry .dw-text { font-family: 'Amiri', serif; font-size: 20px; line-height: 2; direction: rtl; text-align: right; color: var(--text); margin-bottom: 12px; }
    .dw-entry .dw-urdu { font-family: 'Noto Nastaliq Urdu', serif; font-size: 15px; line-height: 1.9; color: var(--text-secondary); direction: rtl; text-align: right; padding: 12px 16px; background: rgba(0,0,0,0.15); border-radius: 8px; border-right: 2px solid var(--gold); }
    .dw-entry .dw-source { font-size: 12px; color: var(--text-secondary); margin-top: 10px; }
    .dw-entry .dw-tafsir { font-size: 13px; color: var(--text-secondary); line-height: 1.7; margin: 8px 0; padding-left: 12px; border-left: 2px solid rgba(212,168,67,0.2); }
    .dw-entry .dw-tafsir strong { color: var(--gold); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
    .dw-tabs { display: flex; gap: 0; justify-content: center; margin-bottom: 30px; border-bottom: 1px solid var(--border); }
    .dw-tab { background: transparent; border: none; color: var(--text-secondary); padding: 10px 20px; font-family: var(--font-body); font-size: 13px; font-weight: 500; cursor: pointer; border-bottom: 2px solid transparent; }
    .dw-tab.active { color: var(--gold); border-bottom-color: var(--gold); }
    .dw-tab .count { display: inline-block; background: var(--border); color: var(--text-secondary); font-size: 10px; padding: 1px 6px; border-radius: 8px; margin-left: 4px; }
    .dw-tab.active .count { background: rgba(212,168,67,0.15); color: var(--gold); }
    .dw-panel { display: none; }
    .dw-panel.active { display: block; }
    @media (max-width: 640px) { .dw-entry { padding: 16px; } .dw-entry .dw-text { font-size: 17px; } }
    .dw-stats { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin: 20px 0 30px; }
    .dw-stat { text-align: center; padding: 12px 20px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; min-width: 100px; }
    .dw-stat .num { font-size: 24px; font-weight: 700; color: var(--gold); }
    .dw-stat .label { font-size: 11px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px; }
  </style>
</head>
<body>
  <nav id="navbar"><?php /* navbar is in each page */ ?></nav>
  <div class="dw-container">
    <div class="dw-header">
      <h1><i class="fas fa-quote-left"></i> Daily Wisdom</h1>
      <div class="dw-meta"><?= $date ?> · Rotation Day <?= $day ?></div>
      <div class="dw-label"><?= htmlspecialchars($label) ?></div>
      <div class="dw-stats">
        <div class="dw-stat"><div class="num"><?= $stats['total'] ?></div><div class="label">Total</div></div>
        <div class="dw-stat"><div class="num"><?= $stats['wisdom'] ?></div><div class="label">Wisdom</div></div>
        <div class="dw-stat"><div class="num"><?= $stats['quran_verses'] ?></div><div class="label">Quran</div></div>
        <div class="dw-stat"><div class="num"><?= $stats['hadiths'] ?></div><div class="label">Hadith</div></div>
        <div class="dw-stat"><div class="num"><?= $stats['practical_wisdom'] ?></div><div class="label">Practical</div></div>
      </div>
    </div>

    <div class="dw-tabs">
      <button class="dw-tab active" data-panel="wisdom">Wisdom <span class="count"><?= $stats['wisdom'] ?></span></button>
      <button class="dw-tab" data-panel="quran">Quran <span class="count"><?= $stats['quran_verses'] ?></span></button>
      <button class="dw-tab" data-panel="hadith">Hadith <span class="count"><?= $stats['hadiths'] ?></span></button>
    </div>

    <div class="dw-panel active" id="panel-wisdom">
      <div class="dw-section-title">Sayings <span>Category A–D</span></div>
      <?php foreach ($data['wisdom_section'] as $w): ?>
      <div class="dw-entry">
        <?php if ($w['practical']): ?><span class="dw-badge practical"><i class="fas fa-check-circle"></i> Practical</span><?php endif; ?>
        <div class="dw-text"><?= htmlspecialchars($w['text']) ?></div>
        <div class="dw-urdu"><?= htmlspecialchars($w['urdu']) ?></div>
        <div class="dw-source">— <?= htmlspecialchars($w['source_person']) ?> · <?= htmlspecialchars($w['source_book']) ?> [<?= $w['category'] ?>]</div>
      </div>
      <?php endforeach; ?>
    </div>

    <div class="dw-panel" id="panel-quran">
      <div class="dw-section-title">Quran Verses <span>3 Tafsirs Each</span></div>
      <?php foreach ($data['quran_section'] as $q): ?>
      <div class="dw-entry">
        <div class="dw-text"><?= htmlspecialchars($q['text']) ?></div>
        <div class="dw-urdu"><?= htmlspecialchars($q['urdu']) ?></div>
        <div class="dw-source"><?= $q['surah'] ?> · <?= $q['surah_num'] ?>:<?= $q['ayah'] ?></div>
        <div class="dw-tafsir"><strong>شیعہ — المیزان</strong><br><?= htmlspecialchars($q['tafsir_shia']) ?></div>
        <div class="dw-tafsir"><strong>سنی — ابن کثیر / قرطبی</strong><br><?= htmlspecialchars($q['tafsir_sunni']) ?></div>
        <div class="dw-tafsir"><strong>اہلحدیث — سعدی / عثیمین</strong><br><?= htmlspecialchars($q['tafsir_ahl']) ?></div>
      </div>
      <?php endforeach; ?>
    </div>

    <div class="dw-panel" id="panel-hadith">
      <div class="dw-section-title">Hadith <span>Rare Sources</span></div>
      <?php foreach ($data['hadith_section'] as $h): ?>
      <div class="dw-entry">
        <?php if ($h['practical']): ?><span class="dw-badge practical"><i class="fas fa-check-circle"></i> Practical</span><?php endif; ?>
        <div class="dw-text"><?= htmlspecialchars($h['text']) ?></div>
        <div class="dw-urdu"><?= htmlspecialchars($h['urdu']) ?></div>
        <div class="dw-source"><?= htmlspecialchars($h['source_book']) ?> · <?= htmlspecialchars($h['source_page']) ?> · <a href="https://<?= htmlspecialchars($h['source_library']) ?>" target="_blank"><?= $h['source_library'] ?></a></div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>

  <script src="app.js"></script>
  <script>
    document.querySelectorAll('.dw-tab').forEach(function(tab) {
      tab.addEventListener('click', function() {
        document.querySelectorAll('.dw-tab').forEach(function(t) { t.classList.remove('active'); });
        tab.classList.add('active');
        document.querySelectorAll('.dw-panel').forEach(function(p) { p.classList.remove('active'); });
        document.getElementById('panel-' + tab.dataset.panel).classList.add('active');
      });
    });
  </script>
</body>
</html>
<?php
} // end renderHTML
