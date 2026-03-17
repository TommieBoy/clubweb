<?php
// Save events to JSON file
header('Content-Type: application/json');

// Get the JSON data from request body
$data = file_get_contents('php://input');
$events = json_decode($data, true);

if (!is_array($events)) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid data']);
  exit;
}

// Path to events.json
$eventsFile = '/home/tom/clubweb/docs/events.json';

// Ensure file is writable
if (!is_writable($eventsFile)) {
  http_response_code(500);
  echo json_encode(['error' => 'Cannot write to events.json']);
  exit;
}

// Write the JSON file with pretty formatting
if (file_put_contents($eventsFile, json_encode($events, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES))) {
  echo json_encode(['success' => true]);
} else {
  http_response_code(500);
  echo json_encode(['error' => 'Failed to save events']);
}
?>
