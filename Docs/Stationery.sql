-- phpMyAdmin SQL Dump
-- version 4.0.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 23, 2019 at 08:19 AM
-- Server version: 5.1.57-community
-- PHP Version: 5.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `Stationery`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_group`
--

DROP TABLE IF EXISTS `tbl_group`;
CREATE TABLE IF NOT EXISTS `tbl_group` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `order` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `tbl_group`
--

INSERT INTO `tbl_group` (`id`, `name`, `order`) VALUES
(1, 'GLUE STICK', 1),
(2, 'SCHOOL STATIONARY', 2),
(3, 'WRITING MARKER PEN', 3),
(4, 'CORRECTION MATERIAL', 4);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_item`
--

DROP TABLE IF EXISTS `tbl_item`;
CREATE TABLE IF NOT EXISTS `tbl_item` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `sub_group_id` int(6) unsigned DEFAULT NULL,
  `available` int(9) unsigned DEFAULT NULL,
  `ordered` int(9) unsigned DEFAULT NULL,
  `sold` int(9) unsigned DEFAULT NULL,
  `misc` int(9) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sub_group_id` (`sub_group_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=28 ;

--
-- Dumping data for table `tbl_item`
--

INSERT INTO `tbl_item` (`id`, `name`, `sub_group_id`, `available`, `ordered`, `sold`, `misc`) VALUES
(1, '5 GM', 1, 1000, 0, 0, 0),
(2, '8 GM', 1, 1000, 0, 0, 0),
(3, '15 GM', 1, 1000, 0, 0, 0),
(4, '25 GM', 1, 1000, 0, 0, 0),
(5, '35 GM', 1, 1000, 0, 0, 0),
(6, '25 GM', 2, 1000, 0, 0, 0),
(7, '35 GM', 2, 1000, 0, 0, 0),
(8, 'SMALL', 3, 1000, 0, 0, 0),
(9, 'BIG', 3, 1000, 0, 0, 0),
(10, 'MAGNETS', 3, 1000, 0, 0, 0),
(11, 'SMALL WITH WBM PEN', 3, 1000, 0, 0, 0),
(12, ' ', 4, 1000, 0, 0, 0),
(13, '(1 DUSTER + 4 WBM + 1 WCS KIT)', 5, 1000, 0, 0, 0),
(14, 'BLUE', 6, 1000, 0, 0, 0),
(15, 'BLACK', 6, 1000, 0, 0, 0),
(16, 'RED', 6, 1000, 0, 0, 0),
(17, 'GREEN', 6, 1000, 0, 0, 0),
(18, 'BLUE', 7, 1000, 0, 0, 0),
(19, 'BLACK', 7, 1000, 0, 0, 0),
(20, 'RED', 7, 1000, 0, 0, 0),
(21, 'Special colors', 8, 1000, 0, 0, 0),
(22, '(SET OF 8)', 8, 1000, 0, 0, 0),
(23, 'FLU', 9, 1000, 0, 0, 0),
(24, 'YELLOW', 9, 1000, 0, 0, 0),
(25, '(SET OF 6)', 9, 1000, 0, 0, 0),
(26, '7 ML RED PKG.', 10, 1000, 0, 0, 0),
(27, '7 ML BLUE PKG. ROLLER TIP', 10, 1000, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order`
--

DROP TABLE IF EXISTS `tbl_order`;
CREATE TABLE IF NOT EXISTS `tbl_order` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `other_detail` varchar(255) DEFAULT NULL,
  `retailer_id` int(6) unsigned NOT NULL,
  `status` enum('CREATED','EDITED','BILLED','SEND','CLOSED','CANCELLED') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `retailer_id` (`retailer_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `tbl_order`
--

INSERT INTO `tbl_order` (`id`, `other_detail`, `retailer_id`, `status`) VALUES
(1, 'Please send soon', 1, 'EDITED'),
(2, 'Please pack well', 2, 'CREATED');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order_item`
--

DROP TABLE IF EXISTS `tbl_order_item`;
CREATE TABLE IF NOT EXISTS `tbl_order_item` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(6) unsigned DEFAULT NULL,
  `item_id` int(6) unsigned DEFAULT NULL,
  `qty` int(9) unsigned DEFAULT NULL,
  `is_deleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `item_id` (`item_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `tbl_order_item`
--

INSERT INTO `tbl_order_item` (`id`, `order_id`, `item_id`, `qty`, `is_deleted`) VALUES
(1, 1, 1, 10, 0),
(2, 1, 2, 5, 0),
(3, 1, 9, 15, 0),
(4, 1, 10, 15, 1),
(5, 2, 3, 17, 0),
(6, 2, 4, 16, 0),
(7, 2, 6, 16, 0),
(8, 2, 7, 61, 0),
(9, 2, 18, 34, 0),
(10, 2, 26, 54, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order_log`
--

DROP TABLE IF EXISTS `tbl_order_log`;
CREATE TABLE IF NOT EXISTS `tbl_order_log` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(6) unsigned DEFAULT NULL,
  `user_id` int(6) unsigned DEFAULT NULL,
  `date` timestamp NULL DEFAULT NULL,
  `action` enum('CREATE_ORDER','EDIT_ORDER','BILL_ORDER','SEND_ORDER','CLOSE_ORDER','CANCEL_ORDER') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `tbl_order_log`
--

INSERT INTO `tbl_order_log` (`id`, `order_id`, `user_id`, `date`, `action`) VALUES
(1, 1, 2, '2019-01-21 18:30:00', 'CREATE_ORDER'),
(2, 2, 2, '2019-01-22 18:30:00', 'CREATE_ORDER'),
(3, 1, 1, '2019-01-22 18:30:00', 'EDIT_ORDER');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_retailer`
--

DROP TABLE IF EXISTS `tbl_retailer`;
CREATE TABLE IF NOT EXISTS `tbl_retailer` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_no` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `tbl_retailer`
--

INSERT INTO `tbl_retailer` (`id`, `name`, `address`, `phone_no`) VALUES
(1, 'Murugappan', '29, Perumal kovil street,;saravanampatti,;coimbatore,;pincode - 641035', '8489907032'),
(2, 'Viswanthan', '29, Perumal kovil street,;saravanampatti,;coimbatore,;pincode - 641035', '9443366955');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sub_group`
--

DROP TABLE IF EXISTS `tbl_sub_group`;
CREATE TABLE IF NOT EXISTS `tbl_sub_group` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `group_id` int(6) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id` (`group_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `tbl_sub_group`
--

INSERT INTO `tbl_sub_group` (`id`, `name`, `group_id`) VALUES
(1, 'GLUE STICK', 1),
(2, 'BLISTER PACK GLUE STICK', 1),
(3, 'DUSTER', 2),
(4, 'COLOR PALLETS', 2),
(5, 'BLISTER PACK', 2),
(6, 'OHP MARKER PEN', 3),
(7, 'PERMANENT MARKER PEN', 3),
(8, 'WHITE BOARD MARKER PEN', 3),
(9, 'HIGHLIGHTER PEN', 3),
(10, 'CORRECTION PEN', 4);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE IF NOT EXISTS `tbl_user` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `type` enum('ADMIN','SELLER','MANAGER') NOT NULL DEFAULT 'MANAGER',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `user_name`, `password`, `email`, `type`) VALUES
(1, 'admin', 'abcd123', 'murugappanviswanathan@gmail.com', 'ADMIN'),
(2, 'seller', 'officematemv', 'new@gmail.com', 'SELLER');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_item`
--
ALTER TABLE `tbl_item`
  ADD CONSTRAINT `tbl_item_ibfk_1` FOREIGN KEY (`sub_group_id`) REFERENCES `tbl_sub_group` (`id`);

--
-- Constraints for table `tbl_order`
--
ALTER TABLE `tbl_order`
  ADD CONSTRAINT `retailer_id` FOREIGN KEY (`retailer_id`) REFERENCES `tbl_retailer` (`id`);

--
-- Constraints for table `tbl_order_item`
--
ALTER TABLE `tbl_order_item`
  ADD CONSTRAINT `tbl_order_item_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `tbl_order` (`id`),
  ADD CONSTRAINT `tbl_order_item_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `tbl_item` (`id`);

--
-- Constraints for table `tbl_order_log`
--
ALTER TABLE `tbl_order_log`
  ADD CONSTRAINT `tbl_order_log_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `tbl_order` (`id`),
  ADD CONSTRAINT `tbl_order_log_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`);

--
-- Constraints for table `tbl_sub_group`
--
ALTER TABLE `tbl_sub_group`
  ADD CONSTRAINT `tbl_sub_group_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `tbl_group` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
