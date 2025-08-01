-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: medi_flow
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `doctor_relation`
--

DROP TABLE IF EXISTS `doctor_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor_relation` (
  `doctor_id` int NOT NULL,
  `patient_id` int NOT NULL,
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` timestamp NULL DEFAULT NULL,
  KEY `patient_id` (`patient_id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `doctor_relation_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `doctor_relation_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`doctor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor_relation`
--

LOCK TABLES `doctor_relation` WRITE;
/*!40000 ALTER TABLE `doctor_relation` DISABLE KEYS */;
INSERT INTO `doctor_relation` VALUES (25,190,'2025-08-01 14:05:39',NULL),(27,190,'2025-08-01 14:14:23',NULL),(16,190,'2025-08-01 14:15:52',NULL);
/*!40000 ALTER TABLE `doctor_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors` (
  `doctor_id` int NOT NULL AUTO_INCREMENT,
  `doctor_firstname` varchar(30) NOT NULL,
  `doctor_secondname` varchar(30) NOT NULL,
  `doctor_institute` varchar(100) DEFAULT NULL,
  `doctor_address` varchar(100) DEFAULT NULL,
  `doctor_email` varchar(100) DEFAULT NULL,
  `doctor_phone_number` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (14,'aaa','aaa','aa','aa','aaeeee','a'),(15,'zzz','zz','zz','zz','zz','zz'),(16,'Jean','Martin','Clinique du Soleil','12 Rue des Lilas, Paris','jean.martin@mediflow.fr','0612345678'),(17,'Claire','Durand','Centre Médical Saint-Pierre','22 Avenue Victor Hugo, Lyon','claire.durand@mediflow.fr','0623456789'),(18,'Antoine','Lemoine','Polyclinique Rivière','5 Rue du Rhône, Marseille','antoine.lemoine@mediflow.fr','0634567890'),(19,'Sophie','Bernard','Hôpital Les Oliviers','19 Bd Jean Jaurès, Nice','sophie.bernard@mediflow.fr','0645678901'),(20,'Nicolas','Fabre','Clinique Mont Blanc','87 Rue des Alpes, Annecy','nicolas.fabre@mediflow.fr','0656789012'),(21,'Elise','Perrin','Centre de Santé Lumière','66 Avenue des Lumières, Toulouse','elise.perrin@mediflow.fr','0667890123'),(22,'Hugo','Roux','Clinique du Lac','21 Quai du Lac, Bordeaux','hugo.roux@mediflow.fr','0678901234'),(23,'Camille','Morel','Institut Médical Pasteur','33 Rue Pasteur, Lille','camille.morel@mediflow.fr','0689012345'),(24,'Julien','Marchand','Centre Soins & Vie','11 Rue de la République, Strasbourg','julien.marchand@mediflow.fr','0690123456'),(25,'Manon','Guillot','Clinique Saint-Michel','9 Rue St Michel, Rennes','manon.guillot@mediflow.fr','0601234567'),(26,'Thomas','Barbier','Centre Médical Horizon','102 Route du Sud, Montpellier','thomas.barbier@mediflow.fr','0611122233'),(27,'Emma','Leroy','Hôpital du Centre','73 Place de la Gare, Dijon','emma.leroy@mediflow.fr','0622233344'),(28,'Lucas','Masson','Clinique du Parc','45 Rue du Parc, Grenoble','lucas.masson@mediflow.fr','0633344455'),(29,'Julie','Noël','Institut Santé Plus','12 Allée des Pins, Nantes','julie.noel@mediflow.fr','0644455566'),(30,'Adrien','Renard','Centre Vitalis','6 Chemin Vert, Limoges','adrien.renard@mediflow.fr','0655566677'),(31,'Chloé','Giraud','Polyclinique Sud','8 Rue de la Liberté, Reims','chloe.giraud@mediflow.fr','0666677788'),(32,'Mathieu','Leclerc','Clinique Saint-Antoine','17 Rue Antoine, Metz','mathieu.leclerc@mediflow.fr','0677788899'),(33,'Sarah','Faure','Centre Santé Grand Est','24 Boulevard Clémenceau, Nancy','sarah.faure@mediflow.fr','0688899900'),(34,'Romain','Blanc','Hôpital Médinord','99 Rue du Nord, Roubaix','romain.blanc@mediflow.fr','0699900011'),(35,'Alice','Gomez','Clinique des Violettes','4 Impasse des Violettes, Perpignan','alice.gomez@mediflow.fr','0610011223');
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institutes`
--

DROP TABLE IF EXISTS `institutes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `institutes` (
  `inst_id` int NOT NULL AUTO_INCREMENT,
  `institute_name` varchar(30) NOT NULL,
  `institute_address` varchar(100) NOT NULL,
  `institute_phone_number` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`inst_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institutes`
--

LOCK TABLES `institutes` WRITE;
/*!40000 ALTER TABLE `institutes` DISABLE KEYS */;
INSERT INTO `institutes` VALUES (24,'EHPAD pas cool ','1 Rue de je sais apa','0658789520'),(25,'EHPAD encore moins cool','11 rue de la mort',''),(26,'Clinique du Soleil','12 Rue des Lilas, Paris','0145789652'),(27,'Centre Médical Saint-Pierre','22 Avenue Victor Hugo, Lyon','0478564321'),(28,'Polyclinique Rivière','5 Rue du Rhône, Marseille','0491512311'),(29,'Hôpital Les Oliviers','19 Bd Jean Jaurès, Nice','0493871123'),(30,'Clinique Mont Blanc','87 Rue des Alpes, Annecy','0450331122'),(31,'Centre de Santé Lumière','66 Avenue des Lumières, Toulouse','0562987345'),(32,'Clinique du Lac','21 Quai du Lac, Bordeaux','0556478912'),(33,'Institut Médical Pasteur','33 Rue Pasteur, Lille','0320101111'),(34,'Centre Soins & Vie','11 Rue de la République, Strasbourg','0388124433'),(35,'Clinique Saint-Michel','9 Rue St Michel, Rennes','0299781234'),(36,'Centre Médical Horizon','102 Route du Sud, Montpellier','0467128945'),(37,'Hôpital du Centre','73 Place de la Gare, Dijon','0380607070'),(38,'Clinique du Parc','45 Rue du Parc, Grenoble','0476764521'),(39,'Institut Santé Plus','12 Allée des Pins, Nantes','0240786655'),(40,'Centre Vitalis','6 Chemin Vert, Limoges','0555332211'),(41,'Polyclinique Sud','8 Rue de la Liberté, Reims','0326789944'),(42,'Clinique Saint-Antoine','17 Rue Antoine, Metz','0387501020'),(43,'Centre Santé Grand Est','24 Boulevard Clémenceau, Nancy','0383292211'),(44,'Hôpital Médinord','99 Rue du Nord, Roubaix','0320903456'),(45,'Clinique des Violettes','4 Impasse des Violettes, Perpignan','0468542211'),(46,'azeaze','eazeaze','azeaz');
/*!40000 ALTER TABLE `institutes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patients` (
  `patient_id` int NOT NULL AUTO_INCREMENT,
  `patient_firstname` varchar(300) DEFAULT NULL,
  `patient_secondname` varchar(300) DEFAULT NULL,
  `gender` varchar(300) DEFAULT NULL,
  `birth_date` varchar(300) DEFAULT NULL,
  `address` varchar(300) DEFAULT NULL,
  `email` varchar(300) DEFAULT NULL,
  `insurance_number` varchar(300) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `institute_id` int DEFAULT NULL,
  `created_at` varchar(300) NOT NULL,
  `active` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`patient_id`),
  KEY `institute_id` (`institute_id`),
  CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`institute_id`) REFERENCES `institutes` (`inst_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=191 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (189,'101]101-108)104~104[','101|101~108&104(104_','81!100.117|105%','54<51$59+57&48,49%61%47.49&51<','','','61!60!66@61!60=58>62!59+58:59&65`58[',NULL,NULL,'01-08-2025 13:49:34',1),(190,'124!100-113]118&120/','106/101:104&101|105`','79*104(114^98:112)102|','59,51&55^54,49,49;61%47]50@54|','106+101}104~101&105]','106:101/104-101(105/65}102*100!100]102^109=','58.53<56}53$57+55<60(58_58^',NULL,24,'01-08-2025 14:05:39',1);
/*!40000 ALTER TABLE `patients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `create_patient` tinyint(1) NOT NULL DEFAULT '0',
  `create_prescription` tinyint(1) NOT NULL DEFAULT '0',
  `create_prescription_commentary` tinyint(1) NOT NULL DEFAULT '0',
  `permission_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`permission_id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,1,1,79),(1,1,1,80),(0,0,0,81),(1,1,1,82),(1,1,1,83),(0,1,0,84);
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription_commentary`
--

DROP TABLE IF EXISTS `prescription_commentary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription_commentary` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `edited_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `prescription_id` int NOT NULL,
  `created_by` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `prescription_id` (`prescription_id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription_commentary`
--

LOCK TABLES `prescription_commentary` WRITE;
/*!40000 ALTER TABLE `prescription_commentary` DISABLE KEYS */;
INSERT INTO `prescription_commentary` VALUES (22,'Loxazépram livré mais pas encore livré lol','2025-07-17 09:55:13','2025-07-17 09:55:13',2,'a'),(23,':k:k:kk:kk:k:k<div>mm</div>','2025-07-17 10:26:32','2025-07-17 10:26:32',10,'a'),(24,'dzdzdzdzdz','2025-07-17 10:32:22','2025-07-17 10:32:22',10,'a'),(25,'aaaaa','2025-07-17 10:32:31','2025-07-17 10:32:31',10,'a'),(26,'5','2025-07-17 10:33:14','2025-07-17 10:33:14',10,'a'),(27,'5aze','2025-07-17 10:34:30','2025-07-17 10:34:30',10,'a'),(28,'azdazdazdaz livré','2025-07-17 10:37:14','2025-07-17 10:37:14',10,'a'),(29,'gg','2025-07-17 10:39:58','2025-07-17 10:39:58',9,'a'),(30,'aaa','2025-07-21 08:19:11','2025-07-21 08:19:11',11,'a'),(31,'BETA livré','2025-07-21 08:35:21','2025-07-21 08:35:21',12,'a'),(32,'BETA livréaaaaa','2025-07-21 08:35:25','2025-07-21 08:35:25',12,'a'),(33,'BETA livréaaaaa','2025-07-21 08:35:26','2025-07-21 08:35:26',12,'a'),(34,'BETA livréaaaaa','2025-07-21 08:35:26','2025-07-21 08:35:26',12,'a'),(35,'BETA livréaaaaa','2025-07-21 08:35:27','2025-07-21 08:35:27',12,'a'),(36,'BETA livréaaaaa','2025-07-21 08:35:27','2025-07-21 08:35:27',12,'a'),(37,'111','2025-07-21 09:17:47','2025-07-21 09:17:47',13,'b'),(38,'a','2025-07-21 09:35:36','2025-07-21 09:35:36',14,'a'),(39,'a','2025-07-21 09:35:37','2025-07-21 09:35:37',14,'a'),(40,'a','2025-07-21 09:35:37','2025-07-21 09:35:37',14,'a'),(41,'a','2025-07-21 09:35:37','2025-07-21 09:35:37',14,'a'),(43,'BETAMAZONE livré mais sans ordo','2025-07-23 13:17:01','2025-07-23 13:17:01',27,'a'),(44,'a','2025-07-24 07:19:48','2025-07-24 07:19:48',27,'a'),(45,'a','2025-07-24 07:19:48','2025-07-24 07:19:48',27,'a'),(46,'a','2025-07-24 07:19:52','2025-07-24 07:19:52',27,'a'),(47,'a','2025-07-24 07:20:22','2025-07-24 07:20:22',27,'a'),(49,'aaa','2025-07-24 09:38:35','2025-07-24 09:38:35',31,'z'),(50,'fini','2025-07-24 09:49:13','2025-07-24 09:49:13',31,'a'),(51,'Doliprane livré','2025-07-24 11:29:37','2025-07-24 11:29:37',34,'z'),(52,'a','2025-07-24 11:29:58','2025-07-24 11:29:58',34,'z'),(53,'a','2025-07-24 11:30:02','2025-07-24 11:30:02',34,'z'),(54,'a','2025-07-24 11:30:04','2025-07-24 11:30:04',34,'z'),(55,'a','2025-07-24 11:30:05','2025-07-24 11:30:05',34,'z'),(90,'kzkzk','2025-07-24 13:41:46','2025-07-24 13:41:46',38,'a'),(91,'salut','2025-07-24 13:43:16','2025-07-24 13:43:16',38,'a'),(92,'salut','2025-07-24 13:43:19','2025-07-24 13:43:19',38,'a'),(93,'salut','2025-07-24 13:43:31','2025-07-24 13:43:31',39,'a'),(94,'test','2025-08-01 14:17:41','2025-08-01 14:17:41',41,'admin');
/*!40000 ALTER TABLE `prescription_commentary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription_dosage`
--

DROP TABLE IF EXISTS `prescription_dosage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription_dosage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prescription_id` int NOT NULL,
  `content` json NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `prescription_id_UNIQUE` (`prescription_id`),
  CONSTRAINT `prescr` FOREIGN KEY (`prescription_id`) REFERENCES `prescriptions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription_dosage`
--

LOCK TABLES `prescription_dosage` WRITE;
/*!40000 ALTER TABLE `prescription_dosage` DISABLE KEYS */;
INSERT INTO `prescription_dosage` VALUES (30,41,'[{\"col1\": \"dodo\", \"col2\": \"1\", \"col3\": \"\", \"col4\": \"1\", \"col5\": \"\"}, {\"col1\": \"\", \"col2\": \"r\", \"col3\": \"\", \"col4\": \"\"}, {\"col1\": \"\", \"col2\": \"\", \"col3\": \"\", \"col4\": \"\"}]','2025-08-01 16:17:35'),(31,42,'[{\"col1\": \"\", \"col2\": \"\", \"col3\": \"\", \"col4\": \"\", \"col5\": \"\"}]','2025-08-01 16:18:28'),(32,43,'[{\"col1\": \"\", \"col2\": \"\", \"col3\": \"\", \"col4\": \"\", \"col5\": \"\"}]','2025-08-01 16:18:43');
/*!40000 ALTER TABLE `prescription_dosage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescriptions`
--

DROP TABLE IF EXISTS `prescriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescriptions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `file_path` varchar(300) DEFAULT NULL,
  `start_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `patient_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `prescriptions_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescriptions`
--

LOCK TABLES `prescriptions` WRITE;
/*!40000 ALTER TABLE `prescriptions` DISABLE KEYS */;
INSERT INTO `prescriptions` VALUES (41,'uploads\\c58bd86e-6ec2-4cc5-8673-75574df2fd6a.jpeg','2025-08-01 14:17:35',NULL,'2025-08-01 14:17:35',NULL,190),(42,'uploads\\69097ae0-6f12-4d78-ab96-b92c4c4c4720.jpeg','2025-08-01 14:18:28',NULL,'2025-08-01 14:18:28',NULL,190),(43,'uploads\\37bea9fa-f9fa-4470-8ef1-2f305c3352ff.jpeg','2025-08-01 14:18:43',NULL,'2025-08-01 14:18:43',NULL,190);
/*!40000 ALTER TABLE `prescriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'user'),(2,'admin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_password` varchar(200) NOT NULL,
  `user_status` tinyint(1) NOT NULL DEFAULT '1',
  `role_id` int NOT NULL,
  `permissions` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `role_id` (`role_id`),
  KEY `permissions` (`permissions`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`permissions`) REFERENCES `permissions` (`permission_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (81,'admin','admin@gmail.com','$2b$05$HMJV364tOZjZmhU7pEQGFeteItxpI5S734gUc0ZWm6OHQMcgR7Pj6',1,2,83),(82,'userOne','userOne@gmail.com','$2b$05$uWRgYG3LCGYg5e4DRKZJQur6vfNbyAB59bT3KKYGwlaav41DCcHAm',1,1,84);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-01 16:26:46
