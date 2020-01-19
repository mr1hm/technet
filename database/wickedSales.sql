-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 19, 2020 at 07:50 AM
-- Server version: 5.7.27-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wickedSales`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `created` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `created`) VALUES
(1, '2020-01-06 05:47:13'),
(2, '2020-01-06 20:03:27'),
(3, '2020-01-13 20:02:45'),
(4, '2020-01-19 04:14:00'),
(5, '2020-01-19 06:00:20');

-- --------------------------------------------------------

--
-- Table structure for table `cartItems`
--

CREATE TABLE `cartItems` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `productID` mediumint(8) UNSIGNED NOT NULL,
  `count` smallint(5) UNSIGNED NOT NULL,
  `price` mediumint(8) UNSIGNED NOT NULL,
  `added` datetime NOT NULL,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cartID` mediumint(8) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cartItems`
--

INSERT INTO `cartItems` (`id`, `productID`, `count`, `price`, `added`, `updated`, `cartID`) VALUES
(1, 7, 1, 119999, '2020-01-06 05:47:13', '2020-01-13 20:27:47', 1),
(10, 10, 1, 159999, '2020-01-06 06:06:46', '2020-01-06 06:06:46', 1),
(17, 12, 1, 10300, '2020-01-06 20:28:37', '2020-01-19 05:15:04', 2),
(44, 9, 1, 399999, '2020-01-06 21:31:17', '2020-01-06 21:31:27', 2),
(51, 2, 1, 2595, '2020-01-06 21:33:24', '2020-01-06 21:33:24', 2),
(52, 11, 2, 7799, '2020-01-06 21:33:40', '2020-01-06 21:33:45', 2),
(66, 8, 3, 355900, '2020-01-13 20:13:21', '2020-01-13 20:31:10', 3),
(67, 11, 4, 7799, '2020-01-13 20:13:28', '2020-01-13 20:31:29', 3),
(79, 7, 3, 119999, '2020-01-13 20:30:17', '2020-01-13 20:45:22', 3),
(80, 12, 2, 10300, '2020-01-19 04:14:00', '2020-01-19 05:37:53', 4),
(158, 12, 1, 10300, '2020-01-19 06:00:20', '2020-01-19 06:36:36', 5),
(171, 7, 1, 119999, '2020-01-19 06:36:40', '2020-01-19 06:36:40', 5);

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `url` varchar(1000) NOT NULL,
  `productId` mediumint(8) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `url`, `productId`) VALUES
(1, 'images/shakeWeight.jpg', 1),
(2, 'images/shakeweight2.jpeg', 1),
(3, 'images/shamWow.jpg', 2),
(4, 'images/shamwow2.jpg', 2),
(7, 'images/snuggie.jpg', 3),
(8, 'images/snuggie2.jpg', 3),
(11, 'images/waxVac.jpeg', 4),
(12, 'images/waxvac2.jpeg', 4),
(13, 'images/ostrichPillow.jpg', 5),
(14, 'images/ostrichpillow2.jpg', 5),
(15, 'images/taterMitts.jpg', 6),
(16, 'images/tatermitts2.jpg', 6),
(21, 'images/abs-mage-m.jpg', 7),
(23, 'images/abs-mage-m-red.jpg', 7),
(24, 'images/abs-mage-m-green.jpg', 7),
(25, 'images/abs-mage-m-blue.jpg', 7),
(26, 'images/abs-mage-m-top.jpg', 7),
(27, 'images/velztrom-brii2.png', 8),
(28, 'images/velztrom-brii3.png', 8),
(29, 'images/velztrom-brii4.png', 8),
(30, 'images/velztrom-brii5.png', 8),
(32, 'images/alienware2.jpg', 9),
(33, 'images/alienware3.jpg', 9),
(34, 'images/alienware4.jpg', 9),
(35, 'images/alienware5.jpg', 9),
(36, 'images/alienware6.jpg', 9),
(37, 'images/abs-mage-m-plus2.jpg', 10),
(38, 'images/abs-mage-m-plus3.jpg', 10),
(39, 'images/abs-mage-m-plus4.jpg', 10),
(40, 'images/abs-mage-m-plus5.jpg', 10),
(41, 'images/gskill-tridentz2.jpg', 11),
(42, 'images/gskill-tridentz3.jpg', 11),
(43, 'images/gskill-tridentz4.jpeg', 11),
(44, 'images/gskill-tridentz5.jpg', 11),
(49, 'images/corsair-fans.jpg', 12),
(50, 'images/corsair-fans3.jpg', 12),
(51, 'images/corsair-fans4.jpg', 12);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(62) NOT NULL,
  `address` varchar(500) NOT NULL,
  `cartID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(62) NOT NULL,
  `price` mediumint(5) UNSIGNED NOT NULL,
  `image` varchar(1000) NOT NULL,
  `shortDescription` varchar(255) NOT NULL,
  `longDescription` varchar(2000) NOT NULL,
  `category` varchar(20) NOT NULL,
  `specs` varchar(300) NOT NULL,
  `featured` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `image`, `shortDescription`, `longDescription`, `category`, `specs`, `featured`) VALUES
(1, 'Shake Weight', 2999, 'https://bit.ly/2JtVNE6', 'Dynamic Inertia technology ignites muscles in arms, shoulders, and chest.', 'Shaking up the way you work out, the Shake Weight is a revolution in strength training. Boasting a legion of devotees who enthusiastically confirm the Shake Weight\'s claim that it shapes and tones the upper body, this product is hard to ignore. The way it works is this: a special pulsating dumbbell with dynamic inertia technology increases upper body muscle activity by 300 percent compared to traditional weights as you shake the 5-lb weight several different ways. This repetitive shaking stimulates muscle toning and adds shape to your upper arms, chest, and shoulders. The Upper Body Sculpting DVD shows you the proper way to use the Shake Weight so you see the most benefits. It works in only six minutes a day, though if you use it more often, you\'re likely to see results sooner.', 'misc', '', 0),
(2, 'ShamWow', 2595, 'https://bit.ly/2w9C3Nm', 'It\'s like a chamois, towel, and sponge, all in one! Soaks up to 10x it\'s weight in any liquid!', 'The world famous ORIGINAL As-Seen-On-TV Shamwow! It\'s like a Chamois (Shammy), Towel, and a Sponge, all in One. 8 piece set - 4 large towel cloths and 4 small towel cloths. The massive ShamWow towels are 20 x 23.5 inches and the minis are 15 x 15 inches You can cut the large ones in half to use as a bath mat, drain your dishes, under your crisper to keep the veggies fresh and even make smaller ones for dish rags.\r\n', 'misc', '', 0),
(3, 'Snuggie', 2900, 'https://bit.ly/2LVHYAk', 'Super-Soft Fleece with pockets! One Size fits all Adults! Keeps you Warm & Your Hands-Free!', 'THE ORIGINAL SNUGGIE blanket As Seen on TV We are proud to have kept America snug for over 10 years in our cozy fleece blanket with sleeves. SNUGGIE BLANKET is a functional wearable blanket, built for relaxation. It will keep you warm whether you are watching TV or reading a book. The built-in pockets keep your devices handy, while the sleeves leave your hands free to flip the page or change the channel!\r\n', 'misc', '', 0),
(4, 'Wax Vac', 999, 'https://bit.ly/2EjCU2a', 'Gentle way to remove ear wax. Safe and hygienic. Reduces the risk of painful infections.', 'This As Seen on TV WaxVac Ear Cleaner lets you say goodbye to cotton swabs. It uses powerful, yet gentle suction to draw out dirt, wax and moisture. A safety guard prevents the tip from entering too far into the ear canal and causing damage. It also has an examining light on the tip to provide additional visibility while cleaning. The unit dissembles quickly for cleaning to ensure a sanitary tip each time. This As Seen on TV ear cleaner is portable, making it ideal for taking with you while you travel.', 'misc', '', 0),
(5, 'Ostrich Pillow', 9900, 'https://bit.ly/2VD80b8', 'Create your own snugly space in the world and feel-good anywhere with the ultimate cocoon pillow.', 'With a durable covering that encompasses the entire head and neck, the Ostrich Pillow makes it possible to nap anywhere!\n\nCatch a quick nap against a bus window, the metal rails of a subway seat, the bark of a tree, on the desk at work, or even the back of a park bench.\n\nDesigned by seasoned siesta-takers in Spain, the Ostrich Pillow features a polystyrene filling that provides cocoon-like comfort no matter where you need to nap. The pillow\'s super-soft cloth covering is highly absorbent, comfortable, and amazingly breathable.', 'misc', '', 0),
(6, 'Tater Mitts', 830, 'https://bit.ly/2w9EmzO', '8 Seconds is All You Need with Tater Mitts Quickly and easily prepare all your favorite potato dishes with Tater Mitts.', 'Peel a potato in less than 8 seconds with no dangerous blades, nicks, cuts or hassles! Tater Mitts™ quick peeling potato gloves peel potatoes and carrots in the time it takes to rinse them! Forget hunting for the potato peeler and the tedious hand peeling - peel potatoes, carrots and more in a flash! Just slip on these comfortable waterproof Tater Mitts™, gently scrub the spud under the faucet and presto! It\'s peeled and ready to go without sharp knives or blades! Comes with deluxe vegetable slicer/French fry cutter at no extra charge!\n', 'misc', '', 0),
(7, 'ABS Mage M - Gaming Desktop', 119999, 'images/abs-mage-m.jpg', 'The mid-tier gaming desktop to deliver consistent 60FPS to your screen. Includes gaming keyboard and mouse from GAMDIAS.', 'ABS Mage M is a game-devouring beast armed with super powerful Intel processor and NVIDIA graphics to let you play popular AAA titles in unprecedented realism. A tempered-glass side panel showcases its internal components basking in chic lighting effects emitted from four RGB fans, which also maximize air flow for superior cooling efficiency. Take command in full confidence with the bundled GAMDIAS Ares M1 gaming keyboard GAMDIAS Zeus E2 gaming mouse.', 'computers', 'Intel Core i7 9th Gen 9700K (3.60GHz),NVIDIA GeForce RTX 2060 SUPER 8GB,16GB DDR4 3000MHz,512GB SSD,Windows 10 Home 64-bit,GAMDIAS Ares M1 Gaming Keyboard,GAMDIAS Zeus E2 Gaming Mouse,VR Ready', 1),
(8, 'Velztorm Br-II - Gaming Desktop', 355900, 'images/velztrom-brii.png', 'Velztrom custom gaming desktop to play current and future generation games at a consistent 144FPS+ @ 1080p or 60FPS+ @ 4K.', 'We sell computers with custom/upgraded configurations to enhance system performance. If the computer has modifications as listed above, then the manufacturer box was opened by our highly skilled technicians for testing and inspection and to install the upgrades according to the specifications as advertised. Both the computers and components are brand new for the upgraded system.\r\n', 'computers', '9th Gen Intel Core i7-9700F 3.0GHz Processor (upto 4.70 GHz - 12MB Smart Cache - 8-Cores),GeForce RTX 2080 Ti 8GB GDDR6 Dedicated Graphics,VR Ready,32GB DDR4 RAM,512GB PCIe NVMe SSD + 1TB HDD,Windows 10 Pro-64', 1),
(9, 'Alienware R5 - Gaming Desktop', 399999, 'images/alienware.jpg', 'Unleash new levels of action and intensity with powerful Alienware technology, expertly designed to give serious gamers everything they desire.', 'A gaming desktop with the Legend Industrial Design and 9th Gen Intel® Core™ processors. Featuring improved airflow and engineering fit for esports pros.', 'computers', 'Intel Core i9 9920X (12-Core : 19.25MB Cache : up to 4.5GHz with Intel® Turbo Boost Max 3.0),16GB DDR4 2666MHz,128GB M.2 SATA SSD + 1TB HDD,GeForce RTX 2080 8GB GDDR6,Windows 10 Pro', 1),
(10, 'ABS Mage M+ - Gaming Desktop', 159999, 'images/abs-mage-m-plus.jpg', 'The ABS Mage M+ gaming desktop delivers consistent 144FPS+ in all current generation games.', 'ABS Mage M+ is a game-devouring beast armed with super powerful Intel processor and NVIDIA graphics to let you play popular AAA titles in unprecedented realism. A tempered-glass side panel showcases its internal components basking in chic lighting effects emitted from four RGB fans, which also maximize air flow for superior cooling efficiency. Take command in full confidence with the bundled GAMDIAS Ares M1 gaming keyboard GAMDIAS Zeus E2 gaming mouse.', 'computers', 'Intel Core i7 9th Gen 9700K (3.60GHz),GeForce RTX 2080 SUPER 8GB,16GB DDR4 3000MHz,1TB SSD,Windows 10 Home 64-bit,GAMDIAS Ares M1 Gaming Keyboard,GAMDIAS Zeus E2 Gaming Mouse,VR Ready', 1),
(11, 'G.SKILL TridentZ RGB Series - 16GB DDR4 3200MHz', 7799, 'images/gskill-tridentz.jpg', 'Designed, and constructed with the highest quality components, the Trident Z RGB DDR4 memory kit combines the most vivid RGB lighting with uncompromised performance.', 'Trident Z RGB retains the iconic design element of the traditional Trident Z lineup; featuring luxurious hair-line finish aluminum heat-spreaders and an aggressive fin design for highly efficient heat dissipation. The top of the heatsink has been specially engineered to allow for a wider light diffuser for more extravagant lighting effects to be displayed. Look no further for a memory that combines performance and beauty for building a stylish, modern PC!', 'hardware', 'DDR4 3200 (PC4 25600),Timing 16-18-18-38,CAS Latency 16,Voltage 1.35v', 1),
(12, 'Corsair LL Series 120mm RGB LED PWM Fans', 10300, 'images/corsair-fans2.jpg', 'Dual RGB Lighting Loop: 16 Independent RGB LEDs in every fan, split between two separate light loops, allow for nearly endless customization.', 'Control, Customize and Sync: The included CORSAIR Lighting Node PRO enables stunning dynamic lighting effects with other CORSAIR LINK supported devices.\nComplete PWM Control: Dynamically control fan speed from 600 RPM to 1,500 RPM to minimize noise or maximize airflow.\nCreated for Quiet: 120mm Fan blade engineered for low-noise operation without sacrificing performance.', 'accessories', '120mm,Hydraulic Bearing,600RPM - 1500RPM,Air Flow: 43.25 CFM, Noise Level: 24.8 dBA', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cartItems`
--
ALTER TABLE `cartItems`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cartproductid` (`productID`,`cartID`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `cartItems`
--
ALTER TABLE `cartItems`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;
--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
