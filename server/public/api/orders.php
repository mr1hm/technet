<?php

header('Content-Type: application/json');
require_once 'functions.php';
set_exception_handler('error_handler');
require_once 'db_connection.php';

$bodyData = getBodyData();

$method = $_SERVER['REQUEST_METHOD'];
$order = file_get_contents('php://input');

// if ($method === 'GET') {

// }

// if ($method === 'POST') {
//   $cartID = $bodyData['cartID'];

//   $query = "DELETE FROM `cartItems` WHERE `cartID` = $cartID";
//   $result = mysqli_query($conn, $query);

//   if (!$result) {
//     throw new Exception('error deleting from cartItems ' . mysqli_error($conn));
//   }
// }

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
