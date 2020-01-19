<?php

header('Content-Type: application/json');
require_once 'functions.php';
session_start();
set_exception_handler('error_handler');
require_once 'db_connection.php';

$body = getBodyData();

$method = $_SERVER['REQUEST_METHOD'];
$order = file_get_contents('php://input');

if ($method === 'POST') {
  $cartId = $_SESSION['cartId'];
  $name = htmlentities($body['name'], ENT_QUOTES | ENT_HTML5, 'UTF-8');
  $address = htmlentities($body['address'], ENT_QUOTES | ENT_HTML5, 'UTF-8');
  $stmt = $conn->prepare("INSERT INTO `orders` (`name`, `address`, `cartID`) VALUES (?, ?, ?)");
  $stmt->bind_param('sss', $name, $address, $cartId);
  $status = $stmt->execute();
  if (!$status) throw new Exception('order execution failed ' . mysqli_error($conn));
  $stmt->close();
}

if ($method != 'POST') {
  http_response_code(404);
  print(json_encode([
    'error' => 'Not Found',
    'message' => "Cannot $method /api/orders.php"
  ]));
} else {
  http_response_code(201);
  print($order);
}

?>
