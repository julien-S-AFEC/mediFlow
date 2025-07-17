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
INSERT INTO `doctor_relation` VALUES (14,113,'2025-07-15 12:35:40',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (14,'aaa','aaa','aa','aa','aaeeee','a'),(15,'zzz','zz','zz','zz','zz','zz');
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institutes`
--

LOCK TABLES `institutes` WRITE;
/*!40000 ALTER TABLE `institutes` DISABLE KEYS */;
INSERT INTO `institutes` VALUES (24,'EHPAD pas cool lol','1 Rue de je sais ap','0658789520'),(25,'EHPAD encore moins cool','11 rue de la mort','');
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
  `address` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `insurance_number` varchar(15) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `institute_id` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`patient_id`),
  KEY `institute_id` (`institute_id`),
  CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`institute_id`) REFERENCES `institutes` (`inst_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patients`
--

LOCK TABLES `patients` WRITE;
/*!40000 ALTER TABLE `patients` DISABLE KEYS */;
INSERT INTO `patients` VALUES (113,'Moiaaaa','Soutadé','Male','1988-10-26','','','',NULL,24,'2025-07-15 12:35:40',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,1,1,79),(1,0,0,80),(0,0,0,81);
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription_commentary`
--

LOCK TABLES `prescription_commentary` WRITE;
/*!40000 ALTER TABLE `prescription_commentary` DISABLE KEYS */;
INSERT INTO `prescription_commentary` VALUES (22,'Loxazépram livré mais pas encore livré lol','2025-07-17 09:55:13','2025-07-17 09:55:13',2,'a'),(23,':k:k:kk:kk:k:k<div>mm</div>','2025-07-17 10:26:32','2025-07-17 10:26:32',10,'a'),(24,'dzdzdzdzdz','2025-07-17 10:32:22','2025-07-17 10:32:22',10,'a'),(25,'aaaaa','2025-07-17 10:32:31','2025-07-17 10:32:31',10,'a'),(26,'5','2025-07-17 10:33:14','2025-07-17 10:33:14',10,'a'),(27,'5aze','2025-07-17 10:34:30','2025-07-17 10:34:30',10,'a'),(28,'azdazdazdaz livré','2025-07-17 10:37:14','2025-07-17 10:37:14',10,'a'),(29,'gg','2025-07-17 10:39:58','2025-07-17 10:39:58',9,'a');
/*!40000 ALTER TABLE `prescription_commentary` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescriptions`
--

LOCK TABLES `prescriptions` WRITE;
/*!40000 ALTER TABLE `prescriptions` DISABLE KEYS */;
INSERT INTO `prescriptions` VALUES (1,'uploads\\a63bee1f-fb9b-482c-bcf7-e50d88f5646c.jpeg','2025-07-16 20:14:31',NULL,'2025-07-16 20:14:31',NULL,113),(2,'uploads\\2f3e062d-1e69-40a7-ba8c-74ce5882d346.jpeg','2025-07-16 20:17:20',NULL,'2025-07-16 20:17:20',NULL,113),(3,'uploads\\e09cb375-91f4-432a-bf9a-e3f627ee2a90.jpeg','2025-07-17 10:11:24',NULL,'2025-07-17 10:11:24',NULL,113),(4,'uploads\\f0c11df0-1660-44e6-8bae-4f03b31c6e29.jpeg','2025-07-17 10:11:24',NULL,'2025-07-17 10:11:24',NULL,113),(5,'uploads\\a1676a9b-4378-40ed-b1a5-4e7094f114d7.jpeg','2025-07-17 10:11:25',NULL,'2025-07-17 10:11:25',NULL,113),(6,'uploads\\1f7ef7a4-4587-46bf-90e6-df1025a0bad9.jpeg','2025-07-17 10:11:25',NULL,'2025-07-17 10:11:25',NULL,113),(7,'uploads\\47b80ac2-37d3-475c-9dba-0ce007f82e31.jpeg','2025-07-17 10:11:26',NULL,'2025-07-17 10:11:26',NULL,113),(8,'uploads\\189c237d-1e30-47df-a23d-014b9520b85f.jpeg','2025-07-17 10:11:26',NULL,'2025-07-17 10:11:26',NULL,113),(9,'uploads\\bc4d1a02-83d6-4397-8da8-ab956d42d4e5.jpeg','2025-07-17 10:11:28',NULL,'2025-07-17 10:11:28',NULL,113),(10,'uploads\\5ca55330-46f8-4a21-bd12-9c012f73017a.jpeg','2025-07-17 10:11:29',NULL,'2025-07-17 10:11:29',NULL,113);
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
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (77,'a','a','$2b$05$WXhojANwxK2/lj7cGm0gv.qBID59RVVMAGryBNPr/JoEOyw1Nm2oi',1,2,79),(78,'z','z','$2b$05$MhjZWyximoP3ZZsZd/XEUOlnjn2SqcJtjE1FzY6TeRscBhr3eXks6',1,1,80),(79,'e','e','$2b$05$N9ku/nIc95zqNJMD6sycCO2Py4Dsd8P2ktMuKaMmF00osTOSkztjG',1,1,81);
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

-- Dump completed on 2025-07-17 14:25:07
