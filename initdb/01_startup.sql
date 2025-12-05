-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql-soutadejulien.alwaysdata.net
-- Generation Time: Sep 16, 2025 at 09:02 PM
-- Server version: 10.11.13-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medi_flow`
--
CREATE DATABASE IF NOT EXISTS `medi_flow` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `medi_flow`;

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE IF NOT EXISTS `doctors` (
  `doctor_id` int(11) NOT NULL AUTO_INCREMENT,
  `doctor_firstname` varchar(30) NOT NULL,
  `doctor_secondname` varchar(30) NOT NULL,
  `doctor_institute` varchar(100) DEFAULT NULL,
  `doctor_address` varchar(100) DEFAULT NULL,
  `doctor_email` varchar(100) DEFAULT NULL,
  `doctor_phone_number` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Truncate table before insert `doctors`
--

TRUNCATE TABLE `doctors`;
--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`doctor_id`, `doctor_firstname`, `doctor_secondname`, `doctor_institute`, `doctor_address`, `doctor_email`, `doctor_phone_number`) VALUES
(1, 'Jean', 'Martin', 'Clinique du Soleil', '12 Rue des Lilas, Paris', 'jean.martin@mediflow.fr', '0612345678'),
(2, 'Claire', 'Durand', 'Centre Médical Saint-Pierre', '22 Avenue Victor Hugo, Lyon', 'claire.durand@mediflow.fr', '0623456789'),
(3, 'Antoine', 'Lemoine', 'Polyclinique Rivière', '5 Rue du Rhône, Marseille', 'antoine.lemoine@mediflow.fr', '0634567890'),
(4, 'Sophie', 'Bernard', 'Hôpital Les Oliviers', '19 Bd Jean Jaurès, Nice', 'sophie.bernard@mediflow.fr', '0645678901'),
(5, 'Nicolas', 'Fabre', 'Clinique Mont Blanc', '87 Rue des Alpes, Annecy', 'nicolas.fabre@mediflow.fr', '0656789012'),
(6, 'Elise', 'Perrin', 'Centre de Santé Lumière', '66 Avenue des Lumières, Toulouse', 'elise.perrin@mediflow.fr', '0667890123'),
(7, 'Hugo', 'Roux', 'Clinique du Lac', '21 Quai du Lac, Bordeaux', 'hugo.roux@mediflow.fr', '0678901234'),
(8, 'Camille', 'Morel', 'Institut Médical Pasteur', '33 Rue Pasteur, Lille', 'camille.morel@mediflow.fr', '0689012345'),
(9, 'Julien', 'Marchand', 'Centre Soins & Vie', '11 Rue de la République, Strasbourg', 'julien.marchand@mediflow.fr', '0690123456'),
(10, 'Manon', 'Guillot', 'Clinique Saint-Michel', '9 Rue St Michel, Rennes', 'manon.guillot@mediflow.fr', '0601234567'),
(11, 'Thomas', 'Barbier', 'Centre Médical Horizon', '102 Route du Sud, Montpellier', 'thomas.barbier@mediflow.fr', '0611122233'),
(12, 'Emma', 'Leroy', 'Hôpital du Centre', '73 Place de la Gare, Dijon', 'emma.leroy@mediflow.fr', '0622233344'),
(13, 'Lucas', 'Masson', 'Clinique du Parc', '45 Rue du Parc, Grenoble', 'lucas.masson@mediflow.fr', '0633344455'),
(14, 'Julie', 'Noël', 'Institut Santé Plus', '12 Allée des Pins, Nantes', 'julie.noel@mediflow.fr', '0644455566'),
(15, 'Adrien', 'Renard', 'Centre Vitalis', '6 Chemin Vert, Limoges', 'adrien.renard@mediflow.fr', '0655566677'),
(16, 'Chloé', 'Giraud', 'Polyclinique Sud', '8 Rue de la Liberté, Reims', 'chloe.giraud@mediflow.fr', '0666677788'),
(17, 'Mathieu', 'Leclerc', 'Clinique Saint-Antoine', '17 Rue Antoine, Metz', 'mathieu.leclerc@mediflow.fr', '0677788899'),
(18, 'Sarah', 'Faure', 'Centre Santé Grand Est', '24 Boulevard Clémenceau, Nancy', 'sarah.faure@mediflow.fr', '0688899900'),
(19, 'Romain', 'Blanc', 'Hôpital Médinord', '99 Rue du Nord, Roubaix', 'romain.blanc@mediflow.fr', '0699900011'),
(20, 'Alice', 'Gomez', 'Clinique des Violettes', '4 Impasse des Violettes, Perpignan', 'alice.gomez@mediflow.fr', '0610011223');


-- --------------------------------------------------------

--
-- Table structure for table `doctor_relation`
--

CREATE TABLE IF NOT EXISTS `doctor_relation` (
  `doctor_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `end_date` timestamp NULL DEFAULT NULL,
  KEY `patient_id` (`patient_id`),
  KEY `doctor_id` (`doctor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Truncate table before insert `doctor_relation`
--

TRUNCATE TABLE `doctor_relation`;
--
-- Dumping data for table `doctor_relation`
--



-- --------------------------------------------------------

--
-- Table structure for table `institutes`
--

CREATE TABLE IF NOT EXISTS `institutes` (
  `inst_id` int(11) NOT NULL AUTO_INCREMENT,
  `institute_name` varchar(30) NOT NULL,
  `institute_address` varchar(100) NOT NULL,
  `institute_phone_number` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`inst_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Truncate table before insert `institutes`
--

TRUNCATE TABLE `institutes`;
--
-- Dumping data for table `institutes`
--

INSERT INTO `institutes` (`inst_id`, `institute_name`, `institute_address`, `institute_phone_number`) VALUES
(1, 'Clinique du Soleil', '12 Rue des Lilas, Paris', '0145789652'),
(2, 'Centre Médical Saint-Pierre', '22 Avenue Victor Hugo, Lyon', '0478564321'),
(3, 'Polyclinique Rivière', '5 Rue du Rhône, Marseille', '0491512311'),
(4, 'Hôpital Les Oliviers', '19 Bd Jean Jaurès, Nice', '0493871123'),
(5, 'Clinique Mont Blanc', '87 Rue des Alpes, Annecy', '0450331122'),
(6, 'Centre de Santé Lumière', '66 Avenue des Lumières, Toulouse', '0562987345'),
(7, 'Clinique du Lac', '21 Quai du Lac, Bordeaux', '0556478912'),
(8, 'Institut Médical Pasteur', '33 Rue Pasteur, Lille', '0320101111'),
(9, 'Centre Soins & Vie', '11 Rue de la République, Strasbourg', '0388124433'),
(10, 'Clinique Saint-Michel', '9 Rue St Michel, Rennes', '0299781234'),
(11, 'Centre Médical Horizon', '102 Route du Sud, Montpellier', '0467128945'),
(12, 'Hôpital du Centre', '73 Place de la Gare, Dijon', '0380607070'),
(13, 'Clinique du Parc', '45 Rue du Parc, Grenoble', '0476764521'),
(14, 'Institut Santé Plus', '12 Allée des Pins, Nantes', '0240786655'),
(15, 'Centre Vitalis', '6 Chemin Vert, Limoges', '0555332211'),
(16, 'Polyclinique Sud', '8 Rue de la Liberté, Reims', '0326789944'),
(17, 'Clinique Saint-Antoine', '17 Rue Antoine, Metz', '0387501020'),
(18, 'Centre Santé Grand Est', '24 Boulevard Clémenceau, Nancy', '0383292211'),
(19, 'Hôpital Médinord', '99 Rue du Nord, Roubaix', '0320903456'),
(20, 'Clinique des Violettes', '4 Impasse des Violettes, Perpignan', '0468542211'),
(21, 'testHere', 'azedzaezae', '0685478541');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE IF NOT EXISTS `patients` (
  `patient_id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_firstname` varchar(300) DEFAULT NULL,
  `patient_secondname` varchar(300) DEFAULT NULL,
  `gender` varchar(300) DEFAULT NULL,
  `birth_date` varchar(300) DEFAULT NULL,
  `address` varchar(300) DEFAULT NULL,
  `email` varchar(300) DEFAULT NULL,
  `insurance_number` varchar(300) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `institute_id` int(11) DEFAULT NULL,
  `created_at` varchar(300) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`patient_id`),
  KEY `institute_id` (`institute_id`)
) ENGINE=InnoDB AUTO_INCREMENT=223 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Truncate table before insert `patients`
--

TRUNCATE TABLE `patients`;
--
-- Dumping data for table `patients`
--

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE IF NOT EXISTS `permissions` (
  `create_patient` tinyint(1) NOT NULL DEFAULT 0,
  `create_prescription` tinyint(1) NOT NULL DEFAULT 0,
  `create_prescription_commentary` tinyint(1) NOT NULL DEFAULT 0,
  `permission_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`permission_id`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Truncate table before insert `permissions`
--

TRUNCATE TABLE `permissions`;
--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`create_patient`, `create_prescription`, `create_prescription_commentary`, `permission_id`) VALUES
(1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `prescriptions`
--

CREATE TABLE IF NOT EXISTS `prescriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_path` varchar(300) DEFAULT NULL,
  `start_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `end_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `patient_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Truncate table before insert `prescriptions`
--

TRUNCATE TABLE `prescriptions`;
--
-- Dumping data for table `prescriptions`
--

-- --------------------------------------------------------

--
-- Table structure for table `prescription_commentary`
--

CREATE TABLE IF NOT EXISTS `prescription_commentary` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `edited_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `prescription_id` int(11) NOT NULL,
  `created_by` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `prescription_id` (`prescription_id`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Truncate table before insert `prescription_commentary`
--

TRUNCATE TABLE `prescription_commentary`;
--
-- Dumping data for table `prescription_commentary`
--


-- --------------------------------------------------------

--
-- Table structure for table `prescription_dosage`
--

CREATE TABLE IF NOT EXISTS `prescription_dosage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prescription_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`content`)),
  PRIMARY KEY (`id`),
  KEY `prescription_id_UNIQUE` (`prescription_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Truncate table before insert `prescription_dosage`
--

TRUNCATE TABLE `prescription_dosage`;
--
-- Dumping data for table `prescription_dosage`
--

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Truncate table before insert `roles`
--

TRUNCATE TABLE `roles`;
--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`) VALUES
(1, 'user'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_password` varchar(200) NOT NULL,
  `user_status` tinyint(1) NOT NULL DEFAULT 1,
  `role_id` int(11) NOT NULL,
  `permissions` int(11) DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`),
  KEY `role_id` (`role_id`),
  KEY `permissions` (`permissions`)
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Truncate table before insert `users`
--

TRUNCATE TABLE `users`;
--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `user_email`, `user_password`, `user_status`, `role_id`, `permissions`, `is_verified`) VALUES
(1, 'administator', 'admin@gmail.com', '$2b$10$K5bTdHwrP7p18vyOxMeNFuks9kdnn0Y98nP8nL13sAW9PobsYRIt.', 1, 2, 1, 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `doctor_relation`
--
ALTER TABLE `doctor_relation`
  ADD CONSTRAINT `doctor_relation_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `doctor_relation_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`doctor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`institute_id`) REFERENCES `institutes` (`inst_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `prescriptions`
--
ALTER TABLE `prescriptions`
  ADD CONSTRAINT `prescriptions_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `prescription_dosage`
--
ALTER TABLE `prescription_dosage`
  ADD CONSTRAINT `prescr` FOREIGN KEY (`prescription_id`) REFERENCES `prescriptions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`permissions`) REFERENCES `permissions` (`permission_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
