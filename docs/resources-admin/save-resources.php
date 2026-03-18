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

$resourcesFile = '/home/tom/clubweb/docs/resources.html';

if (!is_writable($resourcesFile)) {
  http_response_code(500);
  echo json_encode(['error' => 'Cannot write resources.html']);
  exit;
}

$current = file_get_contents($resourcesFile);

if ($current === false) {
  http_response_code(500);
  echo json_encode(['error' => 'Failed to read resources.html']);
  exit;
}

$content = extractPageContent($payload['html']);
if ($content === null) {
  $content = trim($payload['html']);
}

$updated = replacePageContent($current, $content);

if ($updated === null) {
  http_response_code(500);
  echo json_encode(['error' => 'Failed to update the editable Resources page content']);
  exit;
}

if (file_put_contents($resourcesFile, $updated) === false) {
  http_response_code(500);
  echo json_encode(['error' => 'Failed to save resources.html']);
  exit;
}

echo json_encode(['success' => true]);
?>
