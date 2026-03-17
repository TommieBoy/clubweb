<?php
header('Content-Type: application/json');

$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);

if (!is_array($payload) || !isset($payload['html']) || !is_string($payload['html'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid payload']);
  exit;
}

$aboutFile = '/home/tom/clubweb/docs/about.html';

if (!is_writable($aboutFile)) {
  http_response_code(500);
  echo json_encode(['error' => 'Cannot write about.html']);
  exit;
}

if (file_put_contents($aboutFile, $payload['html']) === false) {
  http_response_code(500);
  echo json_encode(['error' => 'Failed to save about.html']);
  exit;
}

echo json_encode(['success' => true]);
?>
