-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 08 juil. 2025 à 16:56
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
(6, 'a', 'Duchamp', 'aaaa', '', '', ''),
(7, 'aa', 'aa', 'aa', '', '', ''),
(8, 'aaaaaazeaze', 'duchampeu', 'aze', '', '', '');

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
(6, 91, '2025-07-08 13:53:03', NULL),
(6, 89, '2025-07-08 13:58:30', NULL),
(6, 89, '2025-07-08 13:58:50', NULL),
(7, 89, '2025-07-08 13:59:18', NULL),
(6, 89, '2025-07-08 14:00:47', NULL);

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
(6, 'a', 'ghbv', 'e'),
(7, 'azeaze', 'azeaze', '555'),
(8, 'ee', 'aze', 'aze'),
(9, 'eeee', 'eeeee', 'eeee'),
(10, 'e', 'e', 'e'),
(11, 'e', 'e', 'e'),
(12, 'b', 'b', 'b'),
(13, 'azeazeazeaze', 'azeazeazeazeaz', 'azeazeazeeee');

-- --------------------------------------------------------

--
-- Structure de la table `patients`
--

CREATE TABLE `patients` (
  `patient_id` int(11) NOT NULL,
  `patient_firstname` varchar(30) DEFAULT NULL,
  `patient_secondname` varchar(30) DEFAULT NULL,
  `gender` varchar(6) DEFAULT NULL,
  `birth_date` timestamp NULL DEFAULT NULL,
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
(89, 'a', 'eeeeeee', 'Male', '2025-07-05 22:00:00', 'zezezeze', 'Not provided', 'Not provided', NULL, 6, '2025-07-08 13:48:51', 0),
(90, 'bbbbbe', 'bbbb', 'Male', '2025-07-06 22:00:00', 'Not provided', 'Not provided', 'Not provided', NULL, NULL, '2025-07-08 13:51:49', 1),
(91, 'www', 'www', 'Male', '2025-07-06 22:00:00', 'zzzz', '', '', NULL, NULL, '2025-07-08 13:53:03', 0);

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
(0, 0, 0, 0, 0, 0, 0, 0, 0, 36),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 37),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 38),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 39),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 40),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 41),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 42),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 43),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 44),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 45),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 46),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 47),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 48),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 49),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 50),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 51),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 52),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 53),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 54),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 55),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 56),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 57),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 58),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 59),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 60),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 61),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 62),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 63),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 64),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 65),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 66),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 67),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 68),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 69),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 70),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 71),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 72),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 73),
(0, 0, 0, 0, 0, 0, 0, 0, 0, 74);

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
  `doctor_id` int(11) DEFAULT NULL,
  `patient_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

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
(68, 'z', 'z', '$2b$05$rlGia9ZCF4dh.eZFbVI1EOP3409WQhU4ozvYmAYRPPgJXxyO8DVX2', 1, 1, 70),
(69, 'e', 'e', '$2b$05$Ygs8nWDdpgrXVtgLlUJ/Pe9dO84YIiY6aQM54LVFHV36vg16GMBfC', 1, 1, 71),
(70, 'r', 'r', '$2b$05$emZr7F0djTWb9ijL8RI47.7kG7D7hIWIfsacZ1KRPV/t8TfGrFE/y', 1, 1, 72),
(71, 'h', 'h', '$2b$05$Ci7d8OvRL9o.elnNbHNYmujk5FGPnJTLZ.25d0xA8s/ussTMvwyW.', 1, 1, 73),
(72, 'nb', 'nb', '$2b$05$i0cuIUbElynEcPINawih0.TAev/kpIthWro.bE6f3VY0HIjUgZ7Y6', 1, 1, 74);

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
  ADD KEY `doctor_id` (`doctor_id`),
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
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `institutes`
--
ALTER TABLE `institutes`
  MODIFY `inst_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `patients`
--
ALTER TABLE `patients`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT pour la table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT pour la table `prescriptions`
--
ALTER TABLE `prescriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `prescription_commentary`
--
ALTER TABLE `prescription_commentary`
  MODIFY `commentary_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

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
  ADD CONSTRAINT `prescriptions_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`doctor_id`) ON DELETE SET NULL ON UPDATE CASCADE,
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
