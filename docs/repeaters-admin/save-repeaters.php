<?php
header('Content-Type: application/json');

function extractPageContent(string $html): ?string {
  if (preg_match('/<div class="page-content">(.*)<\/div>\s*<\/main>/si', $html, $matches)) {
    return trim($matches[1]);
  }

  return null;
}

function replacePageContent(string $document, string $content): ?string {
  $replacement = "<div class=\"page-content\">\n" . rtrim($content) . "\n    </div>\n  </main>";
  $updated = preg_replace('/<div class="page-content">.*<\/div>\s*<\/main>/si', $replacement, $document, 1, $count);

  if ($updated === null || $count !== 1) {
    return null;
  }

  return $updated;
}

$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);

if (!is_array($payload) || !isset($payload['html']) || !is_string($payload['html'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid payload']);
  exit;
}

$repeatersFile = '/home/tom/clubweb/docs/repeaters.html';

if (!is_writable($repeatersFile)) {
  http_response_code(500);
  echo json_encode(['error' => 'Cannot write repeaters.html']);
  exit;
}

$current = file_get_contents($repeatersFile);

if ($current === false) {
  http_response_code(500);
  echo json_encode(['error' => 'Failed to read repeaters.html']);
  exit;
}

$content = extractPageContent($payload['html']);
if ($content === null) {
  $content = trim($payload['html']);
}

$updated = replacePageContent($current, $content);

if ($updated === null) {
  http_response_code(500);
  echo json_encode(['error' => 'Failed to update the editable Repeaters page content']);
  exit;
}

if (file_put_contents($repeatersFile, $updated) === false) {
  http_response_code(500);
  echo json_encode(['error' => 'Failed to save repeaters.html']);
  exit;
}

echo json_encode(['success' => true]);
?>
