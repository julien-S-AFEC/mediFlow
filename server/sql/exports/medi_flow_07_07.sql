-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 07 juil. 2025 à 17:01
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
  `doctor_phone_number` varchar(15) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `doctors`
--

INSERT INTO `doctors` (`doctor_id`, `doctor_firstname`, `doctor_secondname`, `doctor_institute`, `doctor_address`, `doctor_email`, `doctor_phone_number`, `created_at`) VALUES
(1, 'Émilie', 'Dubois', 'CHU Lyon Sud', '165 Chemin du Grand Revoyet, 69310 Pierre-Bénite', 'emilie.dubois@chu-lyon.fr', '+33 4 72 67 89 ', '2025-07-07 12:13:45'),
(2, 'Julien', 'Moreau', 'Hôpital Européen Georges-Pompidou', '20 Rue Leblanc, 75015 Paris', 'julien.moreau@hegp.fr', '+33 1 56 09 20 ', '2025-07-07 12:13:45'),
(3, 'Claire', 'Lemoine', 'CHU de Toulouse', '2 Rue du Dr Marfan, 31059 Toulouse', 'claire.lemoine@chu-toulouse.fr', '+33 5 61 77 22 ', '2025-07-07 12:13:45'),
(4, 'Antoine', 'Bernard', 'Hôpital de la Timone', '264 Rue Saint-Pierre, 13005 Marseille', 'antoine.bernard@ap-hm.fr', '+33 4 91 38 80 ', '2025-07-07 12:13:45'),
(5, 'Sophie', 'Renaud', 'CHU de Lille', '2 Avenue Oscar Lambret, 59000 Lille', 'sophie.renaud@chu-lille.fr', '+33 3 20 44 59 ', '2025-07-07 12:13:45'),
(6, 'a', 'a', 'a', 'a', 'a', 'a', '2025-07-07 12:15:01'),
(7, 'zzzz', 'aaaa', '777', 'azzz', 'zzz', NULL, '2025-07-07 12:15:23');

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
(3, 61, '2025-07-03 12:46:49', NULL),
(1, 62, '2025-07-03 12:57:00', NULL),
(3, 63, '2025-07-03 13:57:23', NULL),
(1, 61, '2025-07-07 08:11:15', '2025-07-07 14:29:39'),
(7, 61, '2025-07-07 12:15:33', NULL),
(1, 61, '2025-07-07 12:17:43', '2025-07-07 14:29:39'),
(2, 61, '2025-07-07 13:06:04', '2025-07-07 14:45:51'),
(1, 61, '2025-07-07 14:29:39', NULL),
(1, 65, '2025-07-07 14:37:13', NULL),
(2, 61, '2025-07-07 14:45:51', NULL),
(6, 61, '2025-07-07 14:46:06', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `institutes`
--

CREATE TABLE `institutes` (
  `inst_id` int(11) NOT NULL,
  `institute_name` varchar(30) NOT NULL,
  `institute_address` varchar(100) NOT NULL,
  `institute_phone_number` varchar(15) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `institutes`
--

INSERT INTO `institutes` (`inst_id`, `institute_name`, `institute_address`, `institute_phone_number`, `created_at`) VALUES
(1, 'EHPAD Les Chênes Verts', '12 Rue des Lilas, 75012 Paris', '01 45 67 89 00', '2025-07-07 10:18:17'),
(2, 'EHPAD Résidence du Parc', '45 Avenue du Général Leclerc, 69003 Lyon', '04 78 12 34 56', '2025-07-07 10:18:17'),
(3, 'EHPAD Le Clos Fleuri', '98 Boulevard Saint-Michel, 13005 Marseille', '04 91 23 45 67', '2025-07-07 10:18:17'),
(4, 'EHPAD Les Jardins d’Automne', '23 Rue des Tilleuls, 31000 Toulouse', '05 61 89 78 45', '2025-07-07 10:18:17'),
(5, 'EHPAD La Belle Vie', '5 Allée des Cerisiers, 44000 Nantes', '02 40 56 78 90', '2025-07-07 10:18:17'),
(6, 'aze', 'aze', 'aze', '2025-07-07 10:31:56'),
(7, 'aze', 'aze', 'aze', '2025-07-07 10:32:04'),
(8, 'aze', 'ezaeaz', '', '2025-07-07 12:06:03');

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
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `patients`
--

INSERT INTO `patients` (`patient_id`, `patient_firstname`, `patient_secondname`, `gender`, `birth_date`, `address`, `email`, `insurance_number`, `deleted_at`, `institute_id`, `created_at`) VALUES
(61, 'zzzzz', 'a', 'Male', '2025-06-30 22:00:00', 'a', 'aeaze', 'a', NULL, 2, '2025-07-03 12:46:49'),
(62, 'az', 'zzz', 'Male', '2025-07-23 22:00:00', 'zeaze', 'azeaze', 'azezae', NULL, 3, '2025-07-03 12:57:00'),
(63, 'azeaze', 'azeaze', 'Male', '2025-07-02 22:00:00', 'zaeezae', 'zaeaze', 'zaeaze', NULL, 5, '2025-07-03 13:57:23'),
(64, 'zz', 'zzz', 'Male', '2025-07-06 22:00:00', NULL, NULL, NULL, NULL, 4, '2025-07-07 14:34:45'),
(65, 'a', 'e', 'Male', '2025-07-06 22:00:00', NULL, NULL, NULL, NULL, 5, '2025-07-07 14:36:27');

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
(0, 0, 0, 0, 0, 0, 0, 0, 0, 41);

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
(42, 'z', 'z', '$2b$05$L4PF8kAihY4k3yP6t.YN9O..1H5/ONR.qTZA.gwgaKq0P6fE9UAci', 1, 1, 40),
(43, 'e', 'e', '$2b$05$DSJi4fBwqp1SFC/ao3XKuee/cvPNCe/aA5TGy0ghumZ5ZbgXefkgK', 1, 1, 41);

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
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `institutes`
--
ALTER TABLE `institutes`
  MODIFY `inst_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `patients`
--
ALTER TABLE `patients`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT pour la table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

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
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

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
