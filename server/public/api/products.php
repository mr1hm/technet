<?php
require_once 'functions.php';
set_exception_handler('error_handler');
require_once 'db_connection.php';

startUp();
$bodyData = getBodyData();


$whereClause = '';
$id = false;

if (!empty($_GET['id'])) {
  if (!is_numeric($_GET['id'])) {
    throw new Exception('id must be an integer');
  }
  $id = intval($_GET['id']);
  $whereClause = " WHERE p.`id` = $id";
}

switch ($_GET['filter']) {
  case 'computers':
    $query = "SELECT p.`id`, p.`name`, p.`price`, p.`shortDescription`, p.`longDescription`, p.`specs`, p.`image` AS mainImage, p.`category`,
            GROUP_CONCAT(i.`url`) AS images
            FROM `products` AS p
            JOIN `images` AS i ON p.`id` = i.`productId`
            $whereClause AND p.`category` = 'computers'
            GROUP BY p.`id`";
    break;
  case 'hardware':
    $query = "SELECT p.`id`, p.`name`, p.`price`, p.`shortDescription`, p.`longDescription`, p.`specs`, p.`image` AS mainImage, p.`category`,
          GROUP_CONCAT(i.`url`) AS images
          FROM `products` AS p
          JOIN `images` AS i ON p.`id` = i.`productId`
          $whereClause AND p.`category` = 'hardware'
          GROUP BY p.`id`";
    break;
  case 'misc':
    $query = "SELECT p.`id`, p.`name`, p.`price`, p.`shortDescription`, p.`longDescription`, p.`specs`, p.`image` AS mainImage, p.`category`,
          GROUP_CONCAT(i.`url`) AS images
          FROM `products` AS p
          JOIN `images` AS i ON p.`id` = i.`productId`
          $whereClause AND p.`category` = 'misc'
          GROUP BY p.`id`";
    break;
  case 'accessories':
    $query = "SELECT p.`id`, p.`name`, p.`price`, p.`shortDescription`, p.`longDescription`, p.`specs`, p.`image` AS mainImage, p.`category`,
          GROUP_CONCAT(i.`url`) AS images
          FROM `products` AS p
          JOIN `images` AS i ON p.`id` = i.`productId`
          $whereClause AND p.`category` = 'accessories'
          GROUP BY p.`id`";
    break;
  case 'featured':
    $query = "SELECT p.`id`, p.`name`, p.`price`, p.`shortDescription`, p.`longDescription`, p.`specs`, p.`image` AS mainImage, p.`category`,
            GROUP_CONCAT(i.`url`) AS images
            FROM `products` AS p
            JOIN `images` AS i ON p.`id` = i.`productId`
            $whereClause AND p.`featured` = 1
            GROUP BY p.`id`";
    break;
}

$result = mysqli_query($conn, $query);

if (!$result) {
  throw new Exception('error in query' . mysqli_error($conn));
}

$output = [];

if (mysqli_num_rows($result) === 0 && $id !== false) {
  throw new Exception("error id: $id\nquery: $query");
} else {
  while ($row = mysqli_fetch_assoc($result)) {
    $row['id'] = intval($row['id']);
    $row['price'] = intval($row['price']);
    $row['price'] = number_format(($row['price'] / 100), 2);
    $createImageArray = explode(',', $row['images']);
    $row['images'] = $createImageArray;
    $row['specs'] = explode(',', $row['specs']);
    $output[] = $row;
  }
}

if ($id !== false) {
  print(json_encode($output[0]));
} else {
  print(json_encode($output));
}

?>
