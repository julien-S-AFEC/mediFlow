CREATE DATABASE  IF NOT EXISTS `medi_flow` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `medi_flow`;
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
INSERT INTO `doctor_relation` VALUES (14,114,'2025-07-21 09:17:13',NULL),(14,127,'2025-07-21 14:14:11',NULL),(22,126,'2025-07-23 13:04:01',NULL),(27,126,'2025-07-24 09:36:47',NULL),(26,147,'2025-07-24 11:27:49',NULL);
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
INSERT INTO `institutes` VALUES (24,'EHPAD pas cool lol','1 Rue de je sais apa','0658789520'),(25,'EHPAD encore moins cool','11 rue de la mort',''),(26,'Clinique du Soleil','12 Rue des Lilas, Paris','0145789652'),(27,'Centre Médical Saint-Pierre','22 Avenue Victor Hugo, Lyon','0478564321'),(28,'Polyclinique Rivière','5 Rue du Rhône, Marseille','0491512311'),(29,'Hôpital Les Oliviers','19 Bd Jean Jaurès, Nice','0493871123'),(30,'Clinique Mont Blanc','87 Rue des Alpes, Annecy','0450331122'),(31,'Centre de Santé Lumière','66 Avenue des Lumières, Toulouse','0562987345'),(32,'Clinique du Lac','21 Quai du Lac, Bordeaux','0556478912'),(33,'Institut Médical Pasteur','33 Rue Pasteur, Lille','0320101111'),(34,'Centre Soins & Vie','11 Rue de la République, Strasbourg','0388124433'),(35,'Clinique Saint-Michel','9 Rue St Michel, Rennes','0299781234'),(36,'Centre Médical Horizon','102 Route du Sud, Montpellier','0467128945'),(37,'Hôpital du Centre','73 Place de la Gare, Dijon','0380607070'),(38,'Clinique du Parc','45 Rue du Parc, Grenoble','0476764521'),(39,'Institut Santé Plus','12 Allée des Pins, Nantes','0240786655'),(40,'Centre Vitalis','6 Chemin Vert, Limoges','0555332211'),(41,'Polyclinique Sud','8 Rue de la Liberté, Reims','0326789944'),(42,'Clinique Saint-Antoine','17 Rue Antoine, Metz','0387501020'),(43,'Centre Santé Grand Est','24 Boulevard Clémenceau, Nancy','0383292211'),(44,'Hôpital Médinord','99 Rue du Nord, Roubaix','0320903456'),(45,'Clinique des Violettes','4 Impasse des Violettes, Perpignan','0468542211'),(46,'azeaze','eazeaze','azeaz');
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
  `patient_firstname` varchar(30) DEFAULT NULL,
  `patient_secondname` varchar(30) DEFAULT NULL,
  `gender` varchar(6) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `address` varchar(300) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `insurance_number` varchar(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `institute_id` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`patient_id`),
  KEY `institute_id` (`institute_id`),
  CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`institute_id`) REFERENCES `institutes` (`inst_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (114,'Moi','Lol','Male','1988-10-26','azeazeaeaz','eazeazeazeaz@gmail.com','',NULL,25,'2025-07-21 09:17:03',0),(125,'Marie','Dubois','female','1985-03-12','12 Rue Lafayette, Paris','marie.dubois@example.fr','123456789012345',NULL,NULL,'2025-07-21 09:57:04',0),(126,'Jean','Moreau','male','1978-11-04','azeazeazeaze','jean.moreau@example.fr','234567890123456',NULL,40,'2025-07-21 09:57:04',1),(127,'Claire','Leroy','female','1992-06-21','5 Rue de la République, Marseille','claire.leroy@example.fr','345678901234567',NULL,24,'2025-07-21 09:57:04',1),(128,'Luc','Martin','male','1980-09-17','78 Boulevard Haussmann, Paris','luc.martin@example.fr','456789012345678',NULL,NULL,'2025-07-21 09:57:04',0),(129,'Sophie','Garnier','female','1988-02-10','23 Rue des Lilas, Lille','sophie.garnier@example.fr','567890123456789',NULL,NULL,'2025-07-21 09:57:04',1),(130,'Thomas','Robert','male','1990-12-04','18 Rue Nationale, Bordeaux','thomas.robert@example.fr','678901234567890',NULL,NULL,'2025-07-21 09:57:04',1),(131,'Émilie','Blanc','female','1995-07-19','33 Rue Saint-Honoré, Paris','emilie.blanc@example.fr','789012345678901',NULL,NULL,'2025-07-21 09:57:04',1),(132,'Julien','Faure','male','1983-04-26','56 Rue de Metz, Toulouse','julien.faure@example.fr','890123456789012',NULL,NULL,'2025-07-21 09:57:04',1),(133,'Camille','Lopez','female','1991-10-08','3 Allée des Champs, Nantes','camille.lopez@example.fr','901234567890123',NULL,NULL,'2025-07-21 09:57:04',1),(134,'Antoine','Petit','male','1986-08-30','10 Place Bellecour, Lyon','antoine.petit@example.fr','012345678901234',NULL,NULL,'2025-07-21 09:57:04',1),(135,'Nathalie','Perrot','female','1982-01-15','7 Rue du Faubourg, Strasbourg','nathalie.perrot@example.fr','112233445566778',NULL,NULL,'2025-07-21 09:59:01',1),(136,'Hugo','Renard','male','1993-05-09','25 Rue Oberkampf, Paris','hugo.renard@example.fr','223344556677889',NULL,NULL,'2025-07-21 09:59:01',1),(137,'Isabelle','Benoit','female','1975-12-22','14 Rue du Port, Bordeaux','isabelle.benoit@example.fr','334455667788990',NULL,NULL,'2025-07-21 09:59:01',1),(138,'Maxime','Chevalier','male','1987-03-18','9 Rue Saint-Michel, Rennes','maxime.chevalier@example.fr','445566778899001',NULL,NULL,'2025-07-21 09:59:01',1),(139,'Elodie','Fernandez','female','1996-07-30','42 Avenue des Vosges, Strasbourg','elodie.fernandez@example.fr','556677889900112',NULL,NULL,'2025-07-21 09:59:01',1),(140,'Vincent','Lemoine','male','1991-02-14','16 Rue des Écoles, Marseille','vincent.lemoine@example.fr','667788990011223',NULL,NULL,'2025-07-21 09:59:01',1),(141,'Manon','Marchand','female','1989-09-03','8 Place du Marché, Dijon','manon.marchand@example.fr','778899001122334',NULL,NULL,'2025-07-21 09:59:01',1),(142,'Alexandre','Roux','male','1979-11-27','21 Boulevard Gambetta, Nice','alexandre.roux@example.fr','889900112233445',NULL,NULL,'2025-07-21 09:59:01',1),(143,'Chloé','Noël','female','1994-04-07','10 Rue de la Gare, Grenoble','chloe.noel@example.fr','990011223344556',NULL,NULL,'2025-07-21 09:59:01',1),(144,'Bastien','Philippe','male','1984-06-11','35 Rue de la Liberté, Montpellier','bastien.philippe@example.fr','101112131415161',NULL,NULL,'2025-07-21 09:59:01',1),(145,'aaa','aa','Male','2025-07-20','dkzkdzkdzkdzk','','',NULL,NULL,'2025-07-21 10:41:41',1),(146,'bbb','bbb','Male','2025-07-21',NULL,NULL,NULL,NULL,NULL,'2025-07-21 12:33:08',1),(147,'zezezeze','ezezeze','Male','2025-07-03','ezez',NULL,NULL,NULL,35,'2025-07-24 11:27:23',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription_commentary`
--

LOCK TABLES `prescription_commentary` WRITE;
/*!40000 ALTER TABLE `prescription_commentary` DISABLE KEYS */;
INSERT INTO `prescription_commentary` VALUES (22,'Loxazépram livré mais pas encore livré lol','2025-07-17 09:55:13','2025-07-17 09:55:13',2,'a'),(23,':k:k:kk:kk:k:k<div>mm</div>','2025-07-17 10:26:32','2025-07-17 10:26:32',10,'a'),(24,'dzdzdzdzdz','2025-07-17 10:32:22','2025-07-17 10:32:22',10,'a'),(25,'aaaaa','2025-07-17 10:32:31','2025-07-17 10:32:31',10,'a'),(26,'5','2025-07-17 10:33:14','2025-07-17 10:33:14',10,'a'),(27,'5aze','2025-07-17 10:34:30','2025-07-17 10:34:30',10,'a'),(28,'azdazdazdaz livré','2025-07-17 10:37:14','2025-07-17 10:37:14',10,'a'),(29,'gg','2025-07-17 10:39:58','2025-07-17 10:39:58',9,'a'),(30,'aaa','2025-07-21 08:19:11','2025-07-21 08:19:11',11,'a'),(31,'BETA livré','2025-07-21 08:35:21','2025-07-21 08:35:21',12,'a'),(32,'BETA livréaaaaa','2025-07-21 08:35:25','2025-07-21 08:35:25',12,'a'),(33,'BETA livréaaaaa','2025-07-21 08:35:26','2025-07-21 08:35:26',12,'a'),(34,'BETA livréaaaaa','2025-07-21 08:35:26','2025-07-21 08:35:26',12,'a'),(35,'BETA livréaaaaa','2025-07-21 08:35:27','2025-07-21 08:35:27',12,'a'),(36,'BETA livréaaaaa','2025-07-21 08:35:27','2025-07-21 08:35:27',12,'a'),(37,'111','2025-07-21 09:17:47','2025-07-21 09:17:47',13,'b'),(38,'a','2025-07-21 09:35:36','2025-07-21 09:35:36',14,'a'),(39,'a','2025-07-21 09:35:37','2025-07-21 09:35:37',14,'a'),(40,'a','2025-07-21 09:35:37','2025-07-21 09:35:37',14,'a'),(41,'a','2025-07-21 09:35:37','2025-07-21 09:35:37',14,'a'),(43,'BETAMAZONE livré mais sans ordo','2025-07-23 13:17:01','2025-07-23 13:17:01',27,'a'),(44,'a','2025-07-24 07:19:48','2025-07-24 07:19:48',27,'a'),(45,'a','2025-07-24 07:19:48','2025-07-24 07:19:48',27,'a'),(46,'a','2025-07-24 07:19:52','2025-07-24 07:19:52',27,'a'),(47,'a','2025-07-24 07:20:22','2025-07-24 07:20:22',27,'a'),(49,'aaa','2025-07-24 09:38:35','2025-07-24 09:38:35',31,'z'),(50,'fini','2025-07-24 09:49:13','2025-07-24 09:49:13',31,'a'),(51,'Doliprane livré','2025-07-24 11:29:37','2025-07-24 11:29:37',34,'z'),(52,'a','2025-07-24 11:29:58','2025-07-24 11:29:58',34,'z'),(53,'a','2025-07-24 11:30:02','2025-07-24 11:30:02',34,'z'),(54,'a','2025-07-24 11:30:04','2025-07-24 11:30:04',34,'z'),(55,'a','2025-07-24 11:30:05','2025-07-24 11:30:05',34,'z'),(90,'kzkzk','2025-07-24 13:41:46','2025-07-24 13:41:46',38,'a'),(91,'salut','2025-07-24 13:43:16','2025-07-24 13:43:16',38,'a'),(92,'salut','2025-07-24 13:43:19','2025-07-24 13:43:19',38,'a'),(93,'salut','2025-07-24 13:43:31','2025-07-24 13:43:31',39,'a');
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription_dosage`
--

LOCK TABLES `prescription_dosage` WRITE;
/*!40000 ALTER TABLE `prescription_dosage` DISABLE KEYS */;
INSERT INTO `prescription_dosage` VALUES (10,21,'[{\"col1\": \"\", \"col2\": \"\", \"col3\": \"\", \"col4\": \"\", \"col5\": \"\"}]','2025-07-22 09:14:28'),(11,22,'[{\"col1\": \"\", \"col2\": \"\", \"col3\": \"\", \"col4\": \"\", \"col5\": \"\"}]','2025-07-23 12:21:54'),(12,23,'[{\"col1\": \"\", \"col2\": \"\", \"col3\": \"\", \"col4\": \"\", \"col5\": \"\"}]','2025-07-23 12:21:58'),(13,24,'[{\"col1\": \"\", \"col2\": \"\", \"col3\": \"\", \"col4\": \"\", \"col5\": \"\"}]','2025-07-23 12:21:59'),(14,25,'[{\"col1\": \"\", \"col2\": \"\", \"col3\": \"\", \"col4\": \"\", \"col5\": \"\"}]','2025-07-23 12:21:59'),(15,26,'[{\"col1\": \"\", \"col2\": \"\", \"col3\": \"\", \"col4\": \"\", \"col5\": \"\"}]','2025-07-23 12:21:59'),(16,27,'[{\"col1\": \"doliprane\", \"col2\": \"1\", \"col3\": \"\", \"col4\": \"\", \"col5\": \"1\"}, {\"col1\": \"azeazea\", \"col2\": \"\", \"col3\": \"1/2\", \"col4\": \"\"}, {\"col1\": \"\", \"col2\": \"jjjjj\", \"col3\": \"\", \"col4\": \"\"}]','2025-07-23 12:23:51'),(17,28,'[{\"col1\": \"\", \"col2\": \"\", \"col3\": \"\", \"col4\": \"\", \"col5\": \"\"}]','2025-07-24 11:20:20'),(18,29,'[{\"col1\": \"\", \"col2\": \"\", \"col3\": \"\", \"col4\": \"\", \"col5\": \"\"}]','2025-07-24 11:32:41'),(19,30,'[{\"col1\": \"\", \"col2\": \"\", \"col3\": \"\", \"col4\": \"\", \"col5\": \"\"}]','2025-07-24 11:32:59'),(20,31,'[{\"col1\": \"Doliprane\", \"col2\": \"1\", \"col3\": \"\", \"col4\": \"\", \"col5\": \"1\"}, {\"col1\": \"\", \"col2\": \"\", \"col3\": \"\", \"col4\": \"\"}, {\"col1\": \"\", \"col2\": \"\", \"col3\": \"\", \"col4\": \"\"}]','2025-07-24 11:34:19'),(21,32,'[{\"col1\": \"\", \"col2\": \"\", \"col3\": \"\", \"col4\": \"\", \"col5\": \"\"}]','2025-07-24 12:29:15'),(22,33,'[{\"col1\": \"\", \"col2\": \"\", \"col3\": \"\", \"col4\": \"\", \"col5\": \"\"}]','2025-07-24 12:31:42'),(23,34,'[{\"col1\": \"Doliprane\", \"col2\": \"1\", \"col3\": \"\", \"col4\": \"\", \"col5\": \"1\"}, {\"col1\": \"BETHAMETHASONE\", \"col2\": \"\", \"col3\": \"1\", \"col4\": \"1/2\"}]','2025-07-24 13:28:53'),(24,35,'[{\"col1\": \"\", \"col2\": \"\", \"col3\": \"\", \"col4\": \"\", \"col5\": \"\"}]','2025-07-24 13:29:03'),(25,36,'[{\"col1\": \"\", \"col2\": \"\", \"col3\": \"\", \"col4\": \"\", \"col5\": \"\"}]','2025-07-24 14:01:32'),(26,37,'[{\"col1\": \"\", \"col2\": \"\", \"col3\": \"\", \"col4\": \"\", \"col5\": \"\"}]','2025-07-24 14:01:46'),(27,38,'[{\"col1\": \"\", \"col2\": \"\", \"col3\": \"\", \"col4\": \"\", \"col5\": \"\"}]','2025-07-24 14:01:58'),(28,39,'[{\"col1\": \"\", \"col2\": \"\", \"col3\": \"\", \"col4\": \"\", \"col5\": \"\"}]','2025-07-24 15:43:26');
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescriptions`
--

LOCK TABLES `prescriptions` WRITE;
/*!40000 ALTER TABLE `prescriptions` DISABLE KEYS */;
INSERT INTO `prescriptions` VALUES (21,'uploads\\fb7042f4-32f7-4a71-8e47-5253523dcb49.jpeg','2025-07-22 07:14:28',NULL,'2025-07-22 07:14:28',NULL,126),(22,'uploads\\378e9c68-a73b-4d6d-aa2f-9e62fdef07b0.jpeg','2025-07-23 10:21:54',NULL,'2025-07-23 10:21:54',NULL,126),(23,'uploads\\5e1f3002-5f27-488e-ae5e-bf0c63b63f50.jpeg','2025-07-23 10:21:58',NULL,'2025-07-23 10:21:58',NULL,126),(24,'uploads\\7dd560d2-6243-415c-8d73-09a49a743299.jpeg','2025-07-23 10:21:59',NULL,'2025-07-23 10:21:59',NULL,126),(25,'uploads\\ce34ac02-2edc-4664-9c3c-07bde4f5be78.jpeg','2025-07-23 10:21:59',NULL,'2025-07-23 10:21:59',NULL,126),(26,'uploads\\dea5c41d-d857-4600-9835-8cea72d326dc.jpeg','2025-07-23 10:21:59',NULL,'2025-07-23 10:21:59',NULL,126),(27,'uploads\\5f9a2efd-04bf-4e69-a795-ff1fc04f6b14.jpeg','2025-07-23 10:23:51',NULL,'2025-07-23 10:23:51',NULL,126),(28,'uploads\\5281acb9-671d-4f70-bda2-6ec21cb7c15d.jpeg','2025-07-24 09:20:20',NULL,'2025-07-24 09:20:20',NULL,126),(29,'uploads\\9a0b8cd2-ebf2-45ae-9f4f-30fd8de2b071.jpeg','2025-07-24 09:32:41',NULL,'2025-07-24 09:32:41',NULL,138),(30,'uploads\\bf9f95f3-5ed5-4bb9-add6-2e18bef3bc90.jpeg','2025-07-24 09:32:59',NULL,'2025-07-24 09:32:59',NULL,130),(31,'uploads\\1c0963f5-8b6a-426b-b762-77c129912c6f.jpeg','2025-07-24 09:34:19',NULL,'2025-07-24 09:34:19',NULL,126),(32,'uploads\\4c27e879-7df7-4fe8-89ef-3174496cbc9f.jpeg','2025-07-24 10:29:15',NULL,'2025-07-24 10:29:15',NULL,146),(33,'uploads\\c70bd50f-f9e8-4487-8225-9041d07908e1.jpeg','2025-07-24 10:31:42',NULL,'2025-07-24 10:31:42',NULL,146),(34,'uploads\\39e0f666-27e0-4da6-ba9c-41f1491dff17.jpeg','2025-07-24 11:28:53',NULL,'2025-07-24 11:28:53',NULL,147),(35,'uploads\\e14eeeeb-01a2-4fe3-8b4b-bf7958544d56.jpeg','2025-07-24 11:29:03',NULL,'2025-07-24 11:29:03',NULL,147),(36,'uploads\\de37d3a4-aee0-463f-a2ef-2015f5e4b3e8.jpeg','2025-07-24 12:01:32',NULL,'2025-07-24 12:01:32',NULL,147),(37,'uploads\\b626f6ae-07e9-4c07-b3e7-b2d1971e7557.jpeg','2025-07-24 12:01:46',NULL,'2025-07-24 12:01:46',NULL,147),(38,'uploads\\165454e7-3e78-4ce6-b474-b31c71982c7d.jpeg','2025-07-24 12:01:58',NULL,'2025-07-24 12:01:58',NULL,147),(39,'uploads\\52e8cff4-dd87-4aa1-af16-76d1a073d81e.jpeg','2025-07-24 13:43:26',NULL,'2025-07-24 13:43:26',NULL,137);
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

-- Dump completed on 2025-07-24 17:00:54
