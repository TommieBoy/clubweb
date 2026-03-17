<?php
header('Content-Type: application/json');

$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);

if (!is_array($payload) || !isset($payload['html']) || !is_string($payload['html'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid payload']);
  exit;
}

$joinFile = '/home/tom/clubweb/docs/join.html';

if (!is_writable($joinFile)) {
  http_response_code(500);
  echo json_encode(['error' => 'Cannot write join.html']);
  exit;
}

if (file_put_contents($joinFile, $payload['html']) === false) {
  http_response_code(500);
  echo json_encode(['error' => 'Failed to save join.html']);
  exit;
}

echo json_encode(['success' => true]);
?>
