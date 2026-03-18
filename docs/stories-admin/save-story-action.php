<?php
header('Content-Type: application/json');

$raw = file_get_contents('php://input');
$payload = json_decode($raw, true);

if (!is_array($payload) || !isset($payload['action']) || !isset($payload['story']) || !is_array($payload['story'])) {
  http_response_code(400);
  echo json_encode(['error' => 'Invalid payload']);
  exit;
}

$action = $payload['action'];
$story = $payload['story'];
$storyId = isset($story['id']) ? preg_replace('/[^0-9]/', '', (string)$story['id']) : '';

if ($storyId === '') {
  http_response_code(400);
  echo json_encode(['error' => 'Missing story id']);
  exit;
}

$statusFile = '/home/tom/clubweb/docs/story-status.json';
$holdingsFile = '/home/tom/clubweb/docs/temporary-holdings.json';
$eventsFile = '/home/tom/clubweb/docs/events.json';

function read_json_file($path, $default) {
  if (!file_exists($path)) {
    return $default;
  }
  $contents = file_get_contents($path);
  if ($contents === false || trim($contents) === '') {
    return $default;
  }
  $decoded = json_decode($contents, true);
  return is_array($decoded) ? $decoded : $default;
}

function write_json_file($path, $data) {
  return file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

$status = read_json_file($statusFile, []);
$holdings = read_json_file($holdingsFile, []);
$events = read_json_file($eventsFile, []);

// Remove from holdings helper
$holdings = array_values(array_filter($holdings, function($item) use ($storyId) {
  return !isset($item['id']) || (string)$item['id'] !== (string)$storyId;
}));

if ($action === 'keep') {
  $status[$storyId] = 'kept';
} elseif ($action === 'reedit') {
  unset($status[$storyId]);
} elseif ($action === 'look-later') {
  $status[$storyId] = 'later';
  $holdings[] = $story;
} elseif ($action === 'restore') {
  unset($status[$storyId]);
} elseif ($action === 'move-events') {
  $status[$storyId] = 'moved-events';

  $exists = false;
  foreach ($events as $event) {
    if (isset($event['storyId']) && (string)$event['storyId'] === (string)$storyId) {
      $exists = true;
      break;
    }
  }

  if (!$exists) {
    $maxId = 0;
    foreach ($events as $event) {
      if (isset($event['id']) && is_numeric($event['id'])) {
        $maxId = max($maxId, (int)$event['id']);
      }
    }

    $newEvent = [
      'id' => $maxId + 1,
      'storyId' => (int)$storyId,
      'title' => isset($story['title']) ? $story['title'] : ('Story ' . $storyId),
      'date' => isset($story['eventDate']) ? $story['eventDate'] : date('Y-m-d'),
      'time' => isset($story['eventTime']) ? $story['eventTime'] : '19:00',
      'location' => 'TBD',
      'description' => isset($story['description']) ? $story['description'] : '',
      'category' => 'event'
    ];

    $events[] = $newEvent;
  }
} else {
  http_response_code(400);
  echo json_encode(['error' => 'Unsupported action']);
  exit;
}

if (write_json_file($statusFile, $status) === false || write_json_file($holdingsFile, $holdings) === false || write_json_file($eventsFile, $events) === false) {
  http_response_code(500);
  echo json_encode(['error' => 'Failed to save changes']);
  exit;
}

echo json_encode([
  'success' => true,
  'status' => $status,
  'holdingsCount' => count($holdings)
]);
?>
