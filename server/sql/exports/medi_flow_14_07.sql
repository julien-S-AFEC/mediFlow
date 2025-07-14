-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 14 juil. 2025 à 21:40
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `medi_flow`
--

-- --------------------------------------------------------

--
-- Structure de la table `doctors`
--

CREATE TABLE `doctors` (
  `doctor_id` int(11) NOT NULL,
  `doctor_firstname` varchar(30) NOT NULL,
  `doctor_secondname` varchar(30) NOT NULL,
  `doctor_institute` varchar(100) DEFAULT NULL,
  `doctor_address` varchar(100) DEFAULT NULL,
  `doctor_email` varchar(100) DEFAULT NULL,
  `doctor_phone_number` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `doctors`
--

INSERT INTO `doctors` (`doctor_id`, `doctor_firstname`, `doctor_secondname`, `doctor_institute`, `doctor_address`, `doctor_email`, `doctor_phone_number`) VALUES
(11, 'aaaaaaaaaaaa', 'aa', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '', 'aa', 'aa'),
(12, 'zz', 'zz', 'zz', 'zz', 'zz', 'zz'),
(13, 'ee', 'ee', 'ee', 'ee', 'ee', 'ee');

-- --------------------------------------------------------

--
-- Structure de la table `doctor_relation`
--

CREATE TABLE `doctor_relation` (
  `doctor_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `end_date` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `doctor_relation`
--

INSERT INTO `doctor_relation` (`doctor_id`, `patient_id`, `start_date`, `end_date`) VALUES
(13, 105, '2025-07-11 13:30:01', NULL),
(11, 111, '2025-07-11 14:19:01', NULL),
(12, 111, '2025-07-11 14:19:26', NULL),
(12, 112, '2025-07-11 17:46:32', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `institutes`
--

CREATE TABLE `institutes` (
  `inst_id` int(11) NOT NULL,
  `institute_name` varchar(30) NOT NULL,
  `institute_address` varchar(100) NOT NULL,
  `institute_phone_number` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `institutes`
--

INSERT INTO `institutes` (`inst_id`, `institute_name`, `institute_address`, `institute_phone_number`) VALUES
(20, 'ee', 'ee', 'ee'),
(21, 'cc', 'c', 'cc'),
(22, 'aa1', 'aaa1', 'aaa1'),
(23, 'ccc', 'ccc', 'ccc');

-- --------------------------------------------------------

--
-- Structure de la table `patients`
--

CREATE TABLE `patients` (
  `patient_id` int(11) NOT NULL,
  `patient_firstname` varchar(30) DEFAULT NULL,
  `patient_secondname` varchar(30) DEFAULT NULL,
  `gender` varchar(6) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `address` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `insurance_number` varchar(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `institute_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `patients`
--

INSERT INTO `patients` (`patient_id`, `patient_firstname`, `patient_secondname`, `gender`, `birth_date`, `address`, `email`, `insurance_number`, `deleted_at`, `institute_id`, `created_at`, `active`) VALUES
(105, 'ccc', 'ccc', 'Female', '1990-02-16', 'azeazeaz', 'zaeazeazeaz@gmail', 'zezez', NULL, 21, '2025-07-11 13:30:01', 1),
(106, 'vcc', 'cc', 'Male', '0000-00-00', NULL, NULL, NULL, NULL, NULL, '2025-07-11 13:30:52', 0),
(107, 'vv', 'vv', 'Male', '1971-01-01', NULL, NULL, NULL, NULL, NULL, '2025-07-11 13:32:25', 1),
(108, 'h', 'hh', 'Male', '1970-01-02', NULL, NULL, NULL, NULL, NULL, '2025-07-11 13:32:52', 1),
(109, 'dd', 'dd', 'Male', '2025-07-11', NULL, NULL, NULL, NULL, NULL, '2025-07-11 13:35:26', 1),
(110, '55', '5', 'Male', '1962-02-07', '', '', '', NULL, NULL, '2025-07-11 13:36:06', 1),
(111, 'OK', 'aaa', 'Female', '1909-12-31', 'aze88', 'aaaa@gmail.com', '0255455', NULL, 23, '2025-07-11 14:19:01', 1),
(112, 'test', 'test', 'Male', '2025-07-11', NULL, NULL, NULL, NULL, NULL, '2025-07-11 17:46:02', 1);

-- --------------------------------------------------------

--
-- Structure de la table `permissions`
--

CREATE TABLE `permissions` (
  `create_patient` tinyint(1) NOT NULL DEFAULT 0,
  `update_patient` tinyint(1) NOT NULL DEFAULT 0,
  `delete_patient` tinyint(1) NOT NULL DEFAULT 0,
  `create_prescription` tinyint(1) NOT NULL DEFAULT 0,
  `update_description` tinyint(1) NOT NULL DEFAULT 0,
  `delete_prescription` tinyint(1) NOT NULL DEFAULT 0,
  `create_prescription_commentary` tinyint(1) NOT NULL DEFAULT 0,
  `update_prescription_commentary` tinyint(1) NOT NULL DEFAULT 0,
  `delete_prescription_commentary` tinyint(1) NOT NULL DEFAULT 0,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `permissions`
--

INSERT INTO `permissions` (`create_patient`, `update_patient`, `delete_patient`, `create_prescription`, `update_description`, `delete_prescription`, `create_prescription_commentary`, `update_prescription_commentary`, `delete_prescription_commentary`, `permission_id`) VALUES
(1, 1, 1, 1, 1, 1, 1, 1, 1, 1),
(1, 1, 1, 1, 1, 1, 1, 1, 1, 77);

-- --------------------------------------------------------

--
-- Structure de la table `prescriptions`
--

CREATE TABLE `prescriptions` (
  `id` int(11) NOT NULL,
  `file_path` varchar(300) DEFAULT NULL,
  `start_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `end_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `commentary_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `prescriptions`
--

INSERT INTO `prescriptions` (`id`, `file_path`, `start_date`, `end_date`, `created_at`, `deleted_at`, `commentary_id`, `patient_id`) VALUES
(31, 'uploads\\d5dffddf-fb29-4178-85e5-78cb81490332.jpeg', '2025-07-11 13:39:16', NULL, '2025-07-11 13:39:16', NULL, 36, 110),
(32, 'uploads\\a0eccc8e-d6a6-4ddb-b2b1-eda549664ab0.jpeg', '2025-07-11 13:39:27', NULL, '2025-07-11 13:39:27', NULL, 37, 110),
(33, 'uploads\\2cc1ce2c-e738-4271-93b0-ae532ef6b635.jpeg', '2025-07-11 13:49:42', NULL, '2025-07-11 13:49:42', NULL, 38, 105),
(34, 'uploads\\39241992-c774-4287-acf4-e617c8ead2e4.jpeg', '2025-07-11 14:20:03', NULL, '2025-07-11 14:20:03', NULL, 39, 111),
(35, 'uploads\\4cb5eef7-f6ca-4e00-a201-fd0514c83bd0.jpeg', '2025-07-11 14:20:15', NULL, '2025-07-11 14:20:15', NULL, 40, 111),
(36, 'uploads\\1fb0744c-541d-4ddd-b699-6cc95eb577bd.png', '2025-07-11 14:20:23', NULL, '2025-07-11 14:20:23', NULL, 41, 111),
(37, 'uploads\\8f962906-f860-4087-bb3f-793abf20b68b.jpeg', '2025-07-11 15:49:46', NULL, '2025-07-11 15:49:46', NULL, 42, 111),
(38, 'uploads\\2d8edb7c-2728-4ad3-adad-94f00cd7c440.jpeg', '2025-07-11 15:50:34', NULL, '2025-07-11 15:50:34', NULL, 43, 105),
(39, 'uploads\\1b7d0b7b-e00a-4887-b771-7f6a8cc4eaf7.jpeg', '2025-07-11 15:50:49', NULL, '2025-07-11 15:50:49', NULL, 44, 105),
(40, 'uploads\\d3e4d966-5da6-4410-81d7-346245f01b81.jpeg', '2025-07-11 17:01:34', NULL, '2025-07-11 17:01:34', NULL, 45, 107),
(41, 'uploads\\f487280e-4fe2-4aad-aad0-e319c55af497.jpeg', '2025-07-11 17:32:17', NULL, '2025-07-11 17:32:17', NULL, 46, 107),
(42, 'uploads\\b609f4b2-36e1-483f-80b1-781d8bfffd3a.jpeg', '2025-07-11 17:32:20', NULL, '2025-07-11 17:32:20', NULL, 47, 107),
(43, 'uploads\\e7bc8dad-9a12-4b67-b353-67fffa57e3c8.jpeg', '2025-07-11 17:46:39', NULL, '2025-07-11 17:46:39', NULL, 48, 112),
(44, 'uploads\\aecc6e01-7184-4c9f-9fd3-eca35db42572.jpeg', '2025-07-11 17:46:47', NULL, '2025-07-11 17:46:47', NULL, 49, 112);

-- --------------------------------------------------------

--
-- Structure de la table `prescription_commentary`
--

CREATE TABLE `prescription_commentary` (
  `commentary_id` int(11) NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `edited_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `prescription_commentary`
--

INSERT INTO `prescription_commentary` (`commentary_id`, `content`, `created_at`, `edited_at`) VALUES
(36, NULL, '2025-07-11 13:39:16', '2025-07-11 13:39:16'),
(37, NULL, '2025-07-11 13:39:27', '2025-07-11 13:39:27'),
(38, NULL, '2025-07-11 13:49:42', '2025-07-11 13:49:42'),
(39, NULL, '2025-07-11 14:20:03', '2025-07-11 14:20:03'),
(40, NULL, '2025-07-11 14:20:15', '2025-07-11 14:20:15'),
(41, NULL, '2025-07-11 14:20:23', '2025-07-11 14:20:23'),
(42, NULL, '2025-07-11 15:49:46', '2025-07-11 15:49:46'),
(43, NULL, '2025-07-11 15:50:34', '2025-07-11 15:50:34'),
(44, NULL, '2025-07-11 15:50:49', '2025-07-11 15:50:49'),
(45, 'blablabla', '2025-07-11 17:01:34', '2025-07-11 17:01:34'),
(46, NULL, '2025-07-11 17:32:17', '2025-07-11 17:32:17'),
(47, NULL, '2025-07-11 17:32:20', '2025-07-11 17:32:20'),
(48, NULL, '2025-07-11 17:46:39', '2025-07-11 17:46:39'),
(49, NULL, '2025-07-11 17:46:47', '2025-07-11 17:46:47');

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `role_name`) VALUES
(1, 'user'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(30) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_password` varchar(200) NOT NULL,
  `user_status` tinyint(1) NOT NULL DEFAULT 1,
  `role_id` int(11) NOT NULL,
  `permissions` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`user_id`, `username`, `user_email`, `user_password`, `user_status`, `role_id`, `permissions`) VALUES
(20, 'a', 'a', '$2b$05$EUUz46r.Xsc8mwz.MDr/lOTkpfXkwdItXuSul0X.znda85iIcMfT2', 1, 2, 1),
(75, 'z', 'z', '$2b$05$UCRth/808hJgz5PkQHUjc.QVg1OScfIwiLXVuqznA3M0ccel1rocu', 1, 1, 77);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`doctor_id`);

--
-- Index pour la table `doctor_relation`
--
ALTER TABLE `doctor_relation`
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Index pour la table `institutes`
--
ALTER TABLE `institutes`
  ADD PRIMARY KEY (`inst_id`);

--
-- Index pour la table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`patient_id`),
  ADD KEY `institute_id` (`institute_id`);

--
-- Index pour la table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`permission_id`);

--
-- Index pour la table `prescriptions`
--
ALTER TABLE `prescriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `commentary_id` (`commentary_id`);

--
-- Index pour la table `prescription_commentary`
--
ALTER TABLE `prescription_commentary`
  ADD PRIMARY KEY (`commentary_id`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `permissions` (`permissions`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `institutes`
--
ALTER TABLE `institutes`
  MODIFY `inst_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `patients`
--
ALTER TABLE `patients`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT pour la table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT pour la table `prescriptions`
--
ALTER TABLE `prescriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT pour la table `prescription_commentary`
--
ALTER TABLE `prescription_commentary`
  MODIFY `commentary_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `doctor_relation`
--
ALTER TABLE `doctor_relation`
  ADD CONSTRAINT `doctor_relation_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `doctor_relation_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`doctor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`institute_id`) REFERENCES `institutes` (`inst_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `prescriptions`
--
ALTER TABLE `prescriptions`
  ADD CONSTRAINT `prescriptions_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `prescriptions_ibfk_3` FOREIGN KEY (`commentary_id`) REFERENCES `prescription_commentary` (`commentary_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`permissions`) REFERENCES `permissions` (`permission_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
