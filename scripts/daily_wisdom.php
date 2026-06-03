<?php
/**
 * Daily Wisdom Engine v1.0
 * 
 * Reads wisdom/quran/hadith pools and selects 30 entries per day
 * using date-based deterministic rotation. Follows the 7-day
 * source rotation schedule with category distribution rules.
 * 
 * Usage:
 *   CLI:   php scripts/daily_wisdom.php [--date 2026-06-03] [--json]
 *   Web:   Include via daily.php endpoint
 */

class DailyWisdomEngine {
  private $pools = [];
  private $state_file;
  private $today;
  private $rotation_day;

  private $schedule = [
    1 => [
      'label' => 'ابن حزم · ماوردی · ابو حیان · اہلبیت · عطار',
      'sources' => ['Ibn Hazm', 'Mawardi', 'Abu Hayyan', 'Imam', 'Attar'],
      'practical_min' => 12,
    ],
    2 => [
      'label' => 'ابن المقفع · ابن الجوزی · سنائی · ناصر خسرو · شیعہ فلسفی',
      'sources' => ['Ibn al-Muqaffa', 'Ibn al-Jawzi', 'Sanai', 'Nasir Khusraw'],
      'practical_min' => 10,
    ],
    3 => [
      'label' => 'خیام · بیہقی · فیض کاشانی · ابن قتیبہ · جاحظ',
      'sources' => ['Khayyam', 'Bayhaqi', 'Fayd Kashani', 'Ibn Qutayba', 'Jahiz'],
      'practical_min' => 12,
    ],
    4 => [
      'label' => 'نصیرالدین طوسی · قابوس نامہ · ابن سبعین · سید حیدر آملی',
      'sources' => ['Nasir al-Din Tusi', 'Qabusnama', 'Ibn Sab'in', 'Sayyid Haydar Amuli'],
      'practical_min' => 10,
    ],
    5 => [
      'label' => 'راغب اصفہانی · ابن ابی الدنیا · ابن عبد ربہ · قاضی سعید قمی',
      'sources' => ['Raghib Isfahani', 'Ibn Abi al-Dunya', 'Ibn Abd Rabbih', 'Qadi Sa'id Qummi'],
      'practical_min' => 12,
    ],
    6 => [
      'label' => 'کاتب چلبی · ابن طفیل · نظام الملک · ابن ابی جمہور احسائی',
      'sources' => ['Katib Çelebi', 'Ibn Tufayl', 'Nizam al-Mulk', 'Ibn Abi Jumhur'],
      'practical_min' => 10,
    ],
    7 => [
      'label' => 'متنوع — پچھلے ایام کی مقبول اقسام کے نئے اقوال',
      'sources' => ['Rumi', 'Ghazali', 'Ibn Sina', 'Shirazi', 'Mulla Sadra'],
      'practical_min' => 14,
    ],
  ];

  public function __construct($base_dir = null) {
    if (!$base_dir) $base_dir = dirname(__DIR__);
    $this->state_file = $base_dir . '/daily_wisdom_state.json';
    $this->today = date('Y-m-d');
    $this->rotation_day = $this->calcRotationDay();
    $this->loadPools($base_dir);
  }

  public function setDate($date_str) {
    $this->today = $date_str;
    $this->rotation_day = $this->calcRotationDay();
  }

  private function calcRotationDay() {
    $base = new DateTime('2026-01-01');
    $now = new DateTime($this->today);
    $diff = (int) $base->diff($now)->format('%a');
    return ($diff % 7) + 1;
  }

  private function loadPools($base_dir) {
    $files = [
      'wisdom' => '/wisdom_pool.json',
      'quran'  => '/quran_pool.json',
      'hadith' => '/hadith_pool.json',
    ];
    foreach ($files as $key => $path) {
      $full = $base_dir . $path;
      if (!file_exists($full)) {
        $this->pools[$key] = [];
        continue;
      }
      $data = json_decode(file_get_contents($full), true);
      $this->pools[$key] = is_array($data) ? $data : [];
    }
  }

  public function generate() {
    $state = $this->loadState();
    $used_ids = $state['used_ids'] ?? [];
    $today = $this->today;
    $rotation = $this->schedule[$this->rotation_day];
    $seed = crc32($today . '|wisdom-v1');

    // 1. Select 20 wisdom sayings (categories A-D) with diversity
    $wisdom_pool = $this->filterAvailable($this->pools['wisdom'], $used_ids, 'wisdom_');
    $selected_wisdom = $this->selectWisdom($wisdom_pool, 20, $rotation, $seed);

    // 2. Select 5 Quran verses (category E)
    $quran_pool = $this->filterAvailable($this->pools['quran'], $used_ids, 'quran_');
    $selected_quran = $this->selectDeterministic($quran_pool, 5, $seed + 1);

    // 3. Select 5 Hadiths (category F)
    $hadith_pool = $this->filterAvailable($this->pools['hadith'], $used_ids, 'hadith_');
    $selected_hadith = $this->selectDeterministic($hadith_pool, 5, $seed + 2);

    // Track used IDs for 72-hour no-repeat
    $new_used = $used_ids;
    foreach ($selected_wisdom as $e) $new_used['wisdom_' . $e['id']] = $today;
    foreach ($selected_quran as $e) $new_used['quran_' . $e['id']] = $today;
    foreach ($selected_hadith as $e) $new_used['hadith_' . $e['id']] = $today;
    $this->saveState($new_used);

    // Count practical wisdom
    $practical_count = 0;
    foreach ($selected_wisdom as $e) {
      if (!empty($e['practical'])) $practical_count++;
    }

    // Count poetry-influenced entries
    $poetic_count = 0;
    foreach ($selected_wisdom as $e) {
      if (!empty($e['poetic'])) $poetic_count++;
    }

    return [
      'date' => $today,
      'rotation_day' => $this->rotation_day,
      'rotation_label' => $rotation['label'],
      'generated_at' => gmdate('Y-m-d\TH:i:s\Z'),
      'source_library' => 'lib.eshia.ir / noorlib.ir',
      'stats' => [
        'total' => count($selected_wisdom) + count($selected_quran) + count($selected_hadith),
        'wisdom' => count($selected_wisdom),
        'quran_verses' => count($selected_quran),
        'hadiths' => count($selected_hadith),
        'practical_wisdom' => $practical_count,
        'poetic_entries' => $poetic_count,
      ],
      'wisdom_section' => $this->formatWisdom($selected_wisdom),
      'quran_section' => $this->formatQuran($selected_quran),
      'hadith_section' => $this->formatHadith($selected_hadith),
    ];
  }

  private function filterAvailable($pool, $used_ids, $prefix) {
    $three_days_ago = date('Y-m-d', strtotime($this->today . ' -3 days'));
    $result = [];
    foreach ($pool as $item) {
      $key = $prefix . $item['id'];
      if (isset($used_ids[$key]) && $used_ids[$key] > $three_days_ago) {
        continue;
      }
      $result[] = $item;
    }
    return $result;
  }

  private function selectWisdom($pool, $count, $rotation, $seed) {
    if (count($pool) <= $count) return $this->selectDeterministic($pool, min($count, count($pool)), $seed);

    // Distribute across categories for diversity
    $cats = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3', 'C4', 'D1', 'D2', 'D3'];
    $by_cat = [];
    foreach ($pool as $item) {
      $cat = $item['category'] ?? 'A1';
      if (!isset($by_cat[$cat])) $by_cat[$cat] = [];
      $by_cat[$cat][] = $item;
    }

    $selected = [];
    $per_cat = max(1, intval($count / count($cats)));

    // First pass: pick from each category
    $remaining = [];
    foreach ($cats as $cat) {
      if (!isset($by_cat[$cat])) continue;
      $cat_pool = $by_cat[$cat];
      $picked = $this->selectDeterministic($cat_pool, $per_cat, $seed + crc32($cat));
      foreach ($picked as $p) $selected[$p['id']] = $p;
      // Track unpicked for second pass
      $picked_ids = array_map(function($p) { return $p['id']; }, $picked);
      foreach ($cat_pool as $p) {
        if (!in_array($p['id'], $picked_ids)) $remaining[] = $p;
      }
    }

    // Second pass: fill remaining slots
    $needed = $count - count($selected);
    if ($needed > 0 && count($remaining) > 0) {
      $extra = $this->selectDeterministic($remaining, $needed, $seed + 999);
      foreach ($extra as $e) {
        if (!isset($selected[$e['id']])) $selected[$e['id']] = $e;
      }
    }

    // Third pass: ensure practical minimum
    $practical_min = $rotation['practical_min'] ?? 10;
    $practical_selected = [];
    $non_practical = [];
    foreach ($selected as $e) {
      if (!empty($e['practical'])) $practical_selected[] = $e;
      else $non_practical[] = $e;
    }

    if (count($practical_selected) < $practical_min && count($non_practical) > 0) {
      // Swap non-practical for practical wherever possible
      $practical_avail = [];
      foreach ($this->pools['wisdom'] as $e) {
        if (!empty($e['practical']) && !isset($selected[$e['id']])) {
          $practical_avail[] = $e;
        }
      }
      shuffle($practical_avail);
      $need = $practical_min - count($practical_selected);
      for ($i = 0; $i < $need && $i < count($practical_avail) && count($non_practical) > 0; $i++) {
        $swap = array_shift($non_practical);
        unset($selected[$swap['id']]);
        $selected[$practical_avail[$i]['id']] = $practical_avail[$i];
      }
    }

    // Re-index and limit
    $result = array_values($selected);
    if (count($result) > $count) $result = array_slice($result, 0, $count);
    return $result;
  }

  private function selectDeterministic($pool, $count, $seed) {
    if (count($pool) == 0 || $count <= 0) return [];
    srand($seed);
    $indices = range(0, count($pool) - 1);
    shuffle($indices);
    $result = [];
    for ($i = 0; $i < min($count, count($pool)); $i++) {
      $result[] = $pool[$indices[$i]];
    }
    return $result;
  }

  private function formatWisdom($entries) {
    $result = [];
    $idx = 1;
    foreach ($entries as $e) {
      $result[] = [
        'id' => $idx++,
        'category' => $e['category'] ?? 'A1',
        'subcategory' => $e['subcategory'] ?? '',
        'text' => $e['text'] ?? '',
        'urdu' => $e['urdu'] ?? '',
        'source_person' => $e['source_person'] ?? '',
        'source_book' => $e['source_book'] ?? '',
        'ishraqat' => $e['ishraqat'] ?? '',
        'tanaquz' => $e['tanaquz'] ?? '',
        'practical' => !empty($e['practical']),
        'rarity' => $e['rarity'] ?? 'Khas',
      ];
    }
    return $result;
  }

  private function formatQuran($entries) {
    $result = [];
    $idx = 1;
    foreach ($entries as $e) {
      $result[] = [
        'id' => $idx++,
        'surah' => $e['surah'] ?? '',
        'surah_num' => $e['surah_num'] ?? 0,
        'ayah' => $e['ayah'] ?? 0,
        'text' => $e['text'] ?? '',
        'urdu' => $e['urdu'] ?? '',
        'tafsir_shia' => $e['tafsir_shia'] ?? '',
        'tafsir_sunni' => $e['tafsir_sunni'] ?? '',
        'tafsir_ahl' => $e['tafsir_ahl'] ?? '',
      ];
    }
    return $result;
  }

  private function formatHadith($entries) {
    $result = [];
    $idx = 1;
    foreach ($entries as $e) {
      $result[] = [
        'id' => $idx++,
        'text' => $e['text'] ?? '',
        'urdu' => $e['urdu'] ?? '',
        'source_book' => $e['source_book'] ?? '',
        'source_page' => $e['source_page'] ?? '',
        'source_library' => $e['source_library'] ?? '',
        'practical' => !empty($e['practical']),
      ];
    }
    return $result;
  }

  private function loadState() {
    if (!file_exists($this->state_file)) {
      return ['used_ids' => [], 'last_updated' => null];
    }
    $data = json_decode(file_get_contents($this->state_file), true);
    return is_array($data) ? $data : ['used_ids' => [], 'last_updated' => null];
  }

  private function saveState($used_ids) {
    // Prune entries older than 5 days
    $cutoff = date('Y-m-d', strtotime($this->today . ' -5 days'));
    foreach ($used_ids as $key => $date) {
      if ($date < $cutoff) unset($used_ids[$key]);
    }
    $data = [
      'used_ids' => $used_ids,
      'last_updated' => $this->today,
    ];
    file_put_contents($this->state_file, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
  }
}

// CLI mode
if (PHP_SAPI === 'cli' && !isset($GLOBALS['OPTS']['no_run'])) {
  $date = null;
  $json_output = false;
  foreach ($argv as $arg) {
    if (strpos($arg, '--date=') === 0) $date = substr($arg, 7);
    if ($arg === '--json') $json_output = true;
  }

  $engine = new DailyWisdomEngine();
  if ($date) $engine->setDate($date);
  $output = $engine->generate();

  if ($json_output) {
    echo json_encode($output, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . "\n";
  } else {
    echo "── Daily Wisdom — {$output['date']} ──\n";
    echo "Rotation Day: {$output['rotation_day']} — {$output['rotation_label']}\n";
    echo "Total: {$output['stats']['total']} entries ";
    echo "({$output['stats']['wisdom']} wisdom + {$output['stats']['quran_verses']} Quran + {$output['stats']['hadiths']} Hadith)\n";
    echo "Practical: {$output['stats']['practical_wisdom']} | Poetic: {$output['stats']['poetic_entries']}\n";
    echo "\n── Wisdom Section ──\n";
    foreach (array_slice($output['wisdom_section'], 0, 5) as $w) {
      echo "  [{$w['category']}] {$w['source_person']}: " . mb_substr($w['text'], 0, 60) . "...\n";
    }
    echo "  ... and " . (count($output['wisdom_section']) - 5) . " more\n";
    echo "\n── Quran Section ──\n";
    foreach ($output['quran_section'] as $q) {
      echo "  {$q['surah']} {$q['ayah']}: " . mb_substr($q['text'], 0, 60) . "...\n";
    }
    echo "\n── Hadith Section ──\n";
    foreach ($output['hadith_section'] as $h) {
      echo "  [{$h['source_book']}] " . mb_substr($h['text'], 0, 60) . "...\n";
    }
  }
}
