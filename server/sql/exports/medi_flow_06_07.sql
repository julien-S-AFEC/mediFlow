-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 06 juil. 2025 à 22:57
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
(1, 'Émilie', 'Dubois', 'CHU Lyon Sud', '165 Chemin du Grand Revoyet, 69310 Pierre-Bénite', 'emilie.dubois@chu-lyon.fr', '+33 4 72 67 89 '),
(2, 'Julien', 'Moreau', 'Hôpital Européen Georges-Pompidou', '20 Rue Leblanc, 75015 Paris', 'julien.moreau@hegp.fr', '+33 1 56 09 20 '),
(3, 'Claire', 'Lemoine', 'CHU de Toulouse', '2 Rue du Dr Marfan, 31059 Toulouse', 'claire.lemoine@chu-toulouse.fr', '+33 5 61 77 22 '),
(4, 'Antoine', 'Bernard', 'Hôpital de la Timone', '264 Rue Saint-Pierre, 13005 Marseille', 'antoine.bernard@ap-hm.fr', '+33 4 91 38 80 '),
(5, 'Sophie', 'Renaud', 'CHU de Lille', '2 Avenue Oscar Lambret, 59000 Lille', 'sophie.renaud@chu-lille.fr', '+33 3 20 44 59 ');

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
(1, 77, '2025-07-04 08:12:31', '2025-07-05 21:56:35'),
(1, 77, '2025-07-04 09:31:05', '2025-07-05 21:56:35'),
(3, 77, '2025-07-04 09:33:04', '2025-07-05 22:00:18'),
(4, 78, '2025-07-04 09:59:10', NULL),
(3, 77, '2025-07-05 21:03:08', '2025-07-05 22:00:18'),
(5, 77, '2025-07-05 21:57:44', '2025-07-05 22:00:22'),
(3, 77, '2025-07-05 22:00:18', NULL),
(5, 77, '2025-07-05 22:00:22', NULL),
(2, 77, '2025-07-06 19:21:02', NULL),
(4, 80, '2025-07-06 20:56:49', NULL);

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
(1, 'EHPAD Les Chênes Verts', '12 Rue des Lilas, 75012 Paris', '01 45 67 89 00'),
(2, 'EHPAD Résidence du Parc', '45 Avenue du Général Leclerc, 69003 Lyon', '04 78 12 34 56'),
(3, 'EHPAD Le Clos Fleuri', '98 Boulevard Saint-Michel, 13005 Marseille', '04 91 23 45 67'),
(4, 'EHPAD Les Jardins d’Automne', '23 Rue des Tilleuls, 31000 Toulouse', '05 61 89 78 45'),
(5, 'EHPAD La Belle Vie', '5 Allée des Cerisiers, 44000 Nantes', '02 40 56 78 90');

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
(77, 'aaaaaa5', 'aaaaa', 'Male', '2025-05-30 22:00:00', 'zaeza888', 'testaaaa@gmail.com', '545', NULL, 5, '2025-07-04 08:12:31'),
(78, 'test2', 'test2', 'Female', '2025-07-03 22:00:00', 'test2', 'test2@gmail.com', '456789', NULL, 1, '2025-07-04 09:59:10'),
(79, 'test3', 'test3', 'Male', '2025-07-03 22:00:00', 'test3', 'test3@gmail.com', '412', NULL, 5, '2025-07-04 10:00:06'),
(80, 'zaeaze', 'zezeze', 'Female', '2025-07-01 22:00:00', 'Not provided', 'Not provided', '151515', NULL, 1, '2025-07-04 12:44:30'),
(82, 'aze', 'aze', 'Male', '2025-07-05 22:00:00', NULL, NULL, NULL, NULL, NULL, '2025-07-06 20:45:26');

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
(0, 0, 0, 0, 0, 0, 0, 0, 0, 54);

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
(44, 'z', 'z', '$2b$05$/kCsuX/5HJ.cUV374CkCouwste//9dm7Mzk3pvDS.Q86p.LfNOjVW', 1, 1, 42),
(51, 'b', 'b', '$2b$05$YkRf6z5M7jFbCq/e0ln41.SneygA.yp/fJWa654AZGbQhrxLmUi86', 1, 1, 49),
(52, 'g', 'g', '$2b$05$Uw7dbixJeYCnby5b0OFT6eMdTHng1JBXLdCSYkjGejGY6u0j42cIG', 1, 1, 50),
(53, 'w', 'w', '$2b$05$oBbW5XiqoJ9d8O29A4d04ur3tRSiD66zIMK8U95N.F4nlzE/fihTi', 1, 1, 51),
(54, 'k', 'k', '$2b$05$..rRp5pZJ0nWYbgeRdGV/u/7z7MJEsBPnuHnvpTm2EIirxuKl7gBG', 1, 1, 52),
(55, 'm', 'm', '$2b$05$77pyKjAOh041ET6C4/X26.L.iukBi2X2YwvEP1OlTnCLt5afhxcEG', 1, 1, 53),
(56, 'j', 'j', '$2b$05$p9YMh.tlxDglsTvglMsVluNs.NaUYvK2ZW6Ji5onc0VsCTR4T/J9W', 1, 1, 54);

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
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `institutes`
--
ALTER TABLE `institutes`
  MODIFY `inst_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `patients`
--
ALTER TABLE `patients`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT pour la table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `permission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

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
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

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
