-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 05, 2018 at 12:52 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.0.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory1`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_diagnostic`
--

CREATE TABLE `tbl_diagnostic` (
  `int_diagnosticID` int(11) NOT NULL,
  `varchar_diagnosticGenName` varchar(150) NOT NULL,
  `varchar_diagnosticPacking` varchar(100) NOT NULL,
  `date_diagnosticExpiry` date NOT NULL,
  `int_itemStockID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_diagnostic`
--

INSERT INTO `tbl_diagnostic` (`int_diagnosticID`, `varchar_diagnosticGenName`, `varchar_diagnosticPacking`, `date_diagnosticExpiry`, `int_itemStockID`) VALUES
(1, 'Nulytely', '250mL\r\n', '2019-03-31', 2);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_externalentity`
--

CREATE TABLE `tbl_externalentity` (
  `int_entityID` int(11) NOT NULL,
  `varchar_companyName` varchar(255) NOT NULL,
  `int_buildingNum` int(11) NOT NULL,
  `int_blockNum` int(11) DEFAULT NULL,
  `varchar_street` varchar(50) NOT NULL,
  `varchar_barangay` varchar(50) DEFAULT NULL,
  `varchar_city` varchar(50) NOT NULL,
  `int_zipCode` int(11) NOT NULL,
  `enum_transactionType` enum('Customer','Supplier') NOT NULL,
  `int_contactNumber` int(15) DEFAULT NULL,
  `int_telNumber` int(15) DEFAULT NULL,
  `int_fax` int(15) DEFAULT NULL,
  `int_transactionID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_externalentity`
--

INSERT INTO `tbl_externalentity` (`int_entityID`, `varchar_companyName`, `int_buildingNum`, `int_blockNum`, `varchar_street`, `varchar_barangay`, `varchar_city`, `int_zipCode`, `enum_transactionType`, `int_contactNumber`, `int_telNumber`, `int_fax`, `int_transactionID`) VALUES
(1, 'ST.RAFAEL CALLANG GEN.HOSPITAL', 4, NULL, 'Callang', NULL, 'Isabela', 3300, 'Customer', 915643675, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_itemstock`
--

CREATE TABLE `tbl_itemstock` (
  `int_itemStockID` int(11) NOT NULL,
  `varchar_itemName` varchar(50) NOT NULL,
  `varchar_itemDescription` varchar(500) NOT NULL,
  `decimal_itemPrice` float NOT NULL,
  `int_availableStock` int(11) NOT NULL,
  `enum_itemType` enum('Medicine','Diagnostic','Machine') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_itemstock`
--

INSERT INTO `tbl_itemstock` (`int_itemStockID`, `varchar_itemName`, `varchar_itemDescription`, `decimal_itemPrice`, `int_availableStock`, `enum_itemType`) VALUES
(1, 'Clamvac', 'Clamvac is used for Bacterial infections', 30, 30, 'Medicine'),
(2, 'Nulyte Cleaning Solution', 'It is used to clean out the GI (gastrointestinal) tract.\r\n', 120, 35, 'Diagnostic'),
(3, 'ELECTROLYTE ANALYZER', 'Electrolyte analyzers measure electrolyte levels in the human body to detect metabolic imbalances and measure renal and cardiac function.', 40000, 20, 'Machine'),
(4, 'Moxicon', 'Medicine for', 214, 0, 'Medicine');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_machine`
--

CREATE TABLE `tbl_machine` (
  `int_machineID` int(11) NOT NULL,
  `varchar_serialCode` varchar(30) DEFAULT NULL,
  `int_itemStockID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_machine`
--

INSERT INTO `tbl_machine` (`int_machineID`, `varchar_serialCode`, `int_itemStockID`) VALUES
(1, '035031771901', 3);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_medicine`
--

CREATE TABLE `tbl_medicine` (
  `int_itemStockID` int(11) NOT NULL,
  `int_medID` int(11) NOT NULL,
  `varchar_medGenName` varchar(50) NOT NULL,
  `varchar_medCode` varchar(30) NOT NULL,
  `varchar_medForm` varchar(20) NOT NULL,
  `date_medicineExpiry` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_medicine`
--

INSERT INTO `tbl_medicine` (`int_itemStockID`, `int_medID`, `varchar_medGenName`, `varchar_medCode`, `varchar_medForm`, `date_medicineExpiry`) VALUES
(1, 1, 'Co-amoxiclav', 'ET170026-3', 'Powder', '2019-08-31'),
(4, 2, 'Alimoxicon', 'ISALDF-12', 'Injection', '2018-04-30');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order`
--

CREATE TABLE `tbl_order` (
  `int_orderID` int(11) NOT NULL,
  `int_transactionID` int(11) NOT NULL,
  `varchar_orderDescription` varchar(50) NOT NULL,
  `int_orderQuantity` int(11) NOT NULL,
  `decimal_orderTaxRate` decimal(10,2) NOT NULL,
  `decimal_orderSubtotal` decimal(10,2) NOT NULL,
  `int_itemStockID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_order`
--

INSERT INTO `tbl_order` (`int_orderID`, `int_transactionID`, `varchar_orderDescription`, `int_orderQuantity`, `decimal_orderTaxRate`, `decimal_orderSubtotal`, `int_itemStockID`) VALUES
(1, 1, 'Machine for the hospital', 1, '0.12', '40000.00', 3);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transaction`
--

CREATE TABLE `tbl_transaction` (
  `int_transactionID` int(11) NOT NULL,
  `int_transactionDRN` int(11) NOT NULL,
  `varchar_personInvolve` varchar(150) NOT NULL,
  `enum_transactionType` enum('Supplier','Customer') NOT NULL,
  `decimal_transactionSalesTax` decimal(12,2) DEFAULT NULL,
  `decimal_transShippingHandlingFee` decimal(12,2) DEFAULT NULL,
  `decimal_total` decimal(12,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_transaction`
--

INSERT INTO `tbl_transaction` (`int_transactionID`, `int_transactionDRN`, `varchar_personInvolve`, `enum_transactionType`, `decimal_transactionSalesTax`, `decimal_transShippingHandlingFee`, `decimal_total`) VALUES
(1, 12906, 'BD Scientia', 'Customer', '0.12', '6397.00', '466397.00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `int_userID` int(11) NOT NULL,
  `char_userType` char(8) NOT NULL,
  `varchar_username` varchar(50) NOT NULL,
  `varchar_eMail` varchar(50) NOT NULL,
  `varchar_password` varchar(255) NOT NULL,
  `varchar_userFName` varchar(50) NOT NULL,
  `varchar_userMName` varchar(50) NOT NULL,
  `varchar_userLName` varchar(50) NOT NULL,
  `varchar_mobilePhone` char(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`int_userID`, `char_userType`, `varchar_username`, `varchar_eMail`, `varchar_password`, `varchar_userFName`, `varchar_userMName`, `varchar_userLName`, `varchar_mobilePhone`) VALUES
(1, 'admin', 'admin', 'admin@gmail.com', 'admin123', 'admin', 'admin', 'admin', '639093356290'),
(2, 'inStaff', 'mainstaff', 'mainstaff@gmail.com', 'main123', 'main', 'main', 'main', '639154994567'),
(3, 'offStaff', 'officestaff', 'office@gmail.com', 'office123', 'office', 'office', 'office', '632915632656');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_diagnostic`
--
ALTER TABLE `tbl_diagnostic`
  ADD PRIMARY KEY (`int_diagnosticID`),
  ADD UNIQUE KEY `int_itemStockID` (`int_itemStockID`);

--
-- Indexes for table `tbl_externalentity`
--
ALTER TABLE `tbl_externalentity`
  ADD PRIMARY KEY (`int_entityID`),
  ADD KEY `int_transactionID` (`int_transactionID`);

--
-- Indexes for table `tbl_itemstock`
--
ALTER TABLE `tbl_itemstock`
  ADD PRIMARY KEY (`int_itemStockID`);

--
-- Indexes for table `tbl_machine`
--
ALTER TABLE `tbl_machine`
  ADD PRIMARY KEY (`int_machineID`),
  ADD UNIQUE KEY `int_itemStockID` (`int_itemStockID`);

--
-- Indexes for table `tbl_medicine`
--
ALTER TABLE `tbl_medicine`
  ADD PRIMARY KEY (`int_medID`),
  ADD UNIQUE KEY `int_itemStockID` (`int_itemStockID`),
  ADD UNIQUE KEY `int_itemStockID_2` (`int_itemStockID`);

--
-- Indexes for table `tbl_order`
--
ALTER TABLE `tbl_order`
  ADD PRIMARY KEY (`int_orderID`),
  ADD KEY `fk_transaction` (`int_transactionID`);

--
-- Indexes for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  ADD PRIMARY KEY (`int_transactionID`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`int_userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_diagnostic`
--
ALTER TABLE `tbl_diagnostic`
  MODIFY `int_diagnosticID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_externalentity`
--
ALTER TABLE `tbl_externalentity`
  MODIFY `int_entityID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_itemstock`
--
ALTER TABLE `tbl_itemstock`
  MODIFY `int_itemStockID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_machine`
--
ALTER TABLE `tbl_machine`
  MODIFY `int_machineID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_medicine`
--
ALTER TABLE `tbl_medicine`
  MODIFY `int_medID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_order`
--
ALTER TABLE `tbl_order`
  MODIFY `int_orderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_transaction`
--
ALTER TABLE `tbl_transaction`
  MODIFY `int_transactionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `int_userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_externalentity`
--
ALTER TABLE `tbl_externalentity`
  ADD CONSTRAINT `tbl_externalentity_ibfk_1` FOREIGN KEY (`int_transactionID`) REFERENCES `tbl_transaction` (`int_transactionID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tbl_order`
--
ALTER TABLE `tbl_order`
  ADD CONSTRAINT `fk_transaction` FOREIGN KEY (`int_transactionID`) REFERENCES `tbl_transaction` (`int_transactionID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
