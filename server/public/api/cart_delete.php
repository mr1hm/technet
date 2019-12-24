<?php

if (!defined('INTERNAL')) {
  exit('will not allow direct access');
}

$bodyData = getBodyData();

if (empty($bodyData['id'])) {
  throw new Exception('did not receive ID from bodyData');
}

$id = intval($bodyData['id']);

if ($id <= 0) {
  throw new Exception('id is not greater 0');
}

if (!empty($_SESSION['cartId'])) {
  $cartId = $_SESSION['cartId'];
} else {
  $cartId = false;
}

$query = "DELETE FROM `cartItems` WHERE `cartItems`.`productID` = $id AND `cartItems`.`cartID` = $cartId";
$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception('delete query error ' . mysqli_error($conn));
}

print(json_encode($result));

?>
