-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: moviewebsitedb
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `commentuseroffilm`
--

DROP TABLE IF EXISTS `commentuseroffilm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentuseroffilm` (
  `filmId` char(36) NOT NULL,
  `userId` int NOT NULL,
  `episode` int NOT NULL,
  `content` varchar(720) NOT NULL,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `episode` (`episode`,`filmId`),
  KEY `userId` (`userId`),
  CONSTRAINT `commentuseroffilm_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentuseroffilm`
--

LOCK TABLES `commentuseroffilm` WRITE;
/*!40000 ALTER TABLE `commentuseroffilm` DISABLE KEYS */;
INSERT INTO `commentuseroffilm` VALUES ('TNCS2',4,0,'hay vcl','2023-11-07 14:11:54',97),('TCPS1',6,1,'f','2023-11-18 12:15:16',98),('TCPS1',6,1,'haha','2023-11-18 12:24:31',99),('TCPS1',6,1,'ga mo','2023-11-18 12:39:35',100);
/*!40000 ALTER TABLE `commentuseroffilm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `episodeoffilm`
--

DROP TABLE IF EXISTS `episodeoffilm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `episodeoffilm` (
  `episode` int NOT NULL,
  `filmId` char(36) NOT NULL,
  `videoLink` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `timeUpLoad` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `source_link` varchar(32) NOT NULL,
  PRIMARY KEY (`episode`,`filmId`,`source_link`),
  UNIQUE KEY `videoLink` (`videoLink`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `episodeoffilm`
--

LOCK TABLES `episodeoffilm` WRITE;
/*!40000 ALTER TABLE `episodeoffilm` DISABLE KEYS */;
INSERT INTO `episodeoffilm` VALUES (0,'TNCS2','https://hdbo.opstream5.com/share/b22f0cfa73e7cba241ffc3bd30e99208',0,'2023-11-07 13:23:46','ophim'),(1,'TCPS1','https://hdbo.opstream5.com/share/2910d1ad8c41edfda403263d973b0ae1',0,'2023-11-07 13:10:30','ophim'),(1,'TCPS1','https://short.ink/lZlkpWYzG',0,'2023-11-08 13:54:37','phimgiff'),(1,'TNCS1','https://aa.opstream6.com/share/0d1f9ed41c577b9ad97ebe248806ca70',0,'2023-11-07 13:19:44','ophim'),(1,'TNCS2','https://hdbo.opstream5.com/share/54f3fa6166fe3b6fbc596defb3ebd78b',0,'2023-11-07 13:23:46','ophim'),(1,'TTLDCN','https://hd1080.opstream2.com/share/a69b9ecf4cf7f3f9b68464232048c737',0,'2023-11-07 13:26:50','ophim'),(2,'TCPS1','https://hdbo.opstream5.com/share/a11bda17f8522e39a9bcf3cad3794341',0,'2023-11-07 13:10:30','ophim'),(2,'TNCS1','https://aa.opstream6.com/share/6a62253c673325a7be239b84a9f879d2',0,'2023-11-07 13:19:44','ophim'),(2,'TNCS2','https://hdbo.opstream5.com/share/8cf4ff2dc2db6902d222b0c7dcc98d04',0,'2023-11-07 13:23:46','ophim'),(2,'TTLDCN','https://hd1080.opstream2.com/share/1d656ca6611216968c7c89914031e043',0,'2023-11-07 13:26:50','ophim'),(3,'TCPS1','https://hdbo.opstream5.com/share/fff38493f5a1643ee8ef247750540ee2',0,'2023-11-07 13:10:30','ophim'),(3,'TNCS1','https://aa.opstream6.com/share/616996895f8fbde61cf176ee9e7aecfd',0,'2023-11-07 13:19:44','ophim'),(3,'TTLDCN','https://hd1080.opstream2.com/share/b62db8fadd1b177cc5ed1d239d6e2f1e',0,'2023-11-07 13:26:50','ophim'),(10000,'TTLDCNM21','https://aa.opstream6.com/share/5b3b3e573becfa5d7fac4916f8bc0fed',1,'2023-11-07 13:29:37','ophim');
/*!40000 ALTER TABLE `episodeoffilm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluates`
--

DROP TABLE IF EXISTS `evaluates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluates` (
  `id` char(8) NOT NULL,
  `point` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `point` (`point`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluates`
--

LOCK TABLES `evaluates` WRITE;
/*!40000 ALTER TABLE `evaluates` DISABLE KEYS */;
INSERT INTO `evaluates` VALUES ('1',1),('2',2),('3',3),('4',4),('5',5),('6',6),('7',7),('8',8),('9',9),('10',10);
/*!40000 ALTER TABLE `evaluates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluateuseroffilm`
--

DROP TABLE IF EXISTS `evaluateuseroffilm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluateuseroffilm` (
  `filmId` char(36) NOT NULL,
  `userId` int NOT NULL,
  `evaluateId` char(8) NOT NULL,
  PRIMARY KEY (`filmId`,`userId`),
  KEY `userId` (`userId`),
  KEY `evaluateId` (`evaluateId`),
  CONSTRAINT `evaluateuseroffilm_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `evaluateuseroffilm_ibfk_2` FOREIGN KEY (`filmId`) REFERENCES `films` (`id`),
  CONSTRAINT `evaluateuseroffilm_ibfk_3` FOREIGN KEY (`evaluateId`) REFERENCES `evaluates` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluateuseroffilm`
--

LOCK TABLES `evaluateuseroffilm` WRITE;
/*!40000 ALTER TABLE `evaluateuseroffilm` DISABLE KEYS */;
INSERT INTO `evaluateuseroffilm` VALUES ('TTLDCNM21',6,'4');
/*!40000 ALTER TABLE `evaluateuseroffilm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `films`
--

DROP TABLE IF EXISTS `films`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `films` (
  `id` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `oddFilmLength` int DEFAULT NULL,
  `seriesFilmLength` int DEFAULT NULL,
  `year` int NOT NULL,
  `image` varchar(256) NOT NULL,
  `part` varchar(32) DEFAULT NULL,
  `movie` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `films`
--

LOCK TABLES `films` WRITE;
/*!40000 ALTER TABLE `films` DISABLE KEYS */;
INSERT INTO `films` VALUES ('TCPS1','Toàn Chức Pháp Sư (Phần 1)','Toàn Chức Pháp Sư\": kể về quá trình nhân vật chính Mạc Phàm học trong trường trung học ma pháp và muốn trở thành một pháp sư xuất sắc. Thế giới tôn sùng khoa học nay đã trở thành tôn sùng ma pháp, nhưng trong thế giới đó vẫn có những giáo viên coi trọng thành tích, vẫn có những ánh mắt kì thị của các bạn học, vẫn có một người cha lăn lộn dưới đáy xã hội, vẫn có một cô em gái tật nguyền xinh đẹp thơ ngây không cùng huyết thống…',NULL,12,2019,'https://img.ophim9.cc/uploads/movies/toan-chuc-phap-su-phan-1-thumb.jpg',NULL,NULL),('TNCS2','THẤT NGHIỆP CHUYỂN SINH: SANG THẾ GIỚI KHÁC TÔI SẼ NGHIÊM TÚC - MÙA 2','Tôi sẽ nghiêm túc ở cái dị giới này!\"\nCó một người đàn ông 34 tuổi vẫn là giai tân, thất nghiệp, một NEET chính hiệu. Vào đúng ngày tang lễ của cha mẹ mình, anh bị họ hàng đuổi ra khỏi nhà, rồi bị xe tải tông chết mà qua đời. Khi tỉnh lại, anh nhận ra mình đã đầu thai vào một đứa bé ở một thế giới xa lạ với kiếm và ma pháp!\nTừng sống như một kẻ cặn bã của xã hội, nay anh quyết tâm làm lại cuộc đời dưới dưới cái tên Rudeus!\nĐón đợi anh là một cô nàng ma thuật sĩ bé nhỏ, một cô bé xinh đẹp mang đôi tai Elf, một tiểu thư Tsundere hung dữ và biết bao nhân vật khác...\nHành trình cùng những cuộc chiến khốc liệt bắt đầu.\n\"Câu chuyện kỳ ảo về hành trình làm lại cuộc đời bắt đầu!',NULL,12,2023,'https://img.ophim9.cc/uploads/movies/that-nghiep-chuyen-sinh-sang-the-gioi-khac-toi-se-nghiem-tuc-mua-2-thumb.jpg','2',NULL),('TTLDCN','THÁM TỬ LỪNG DANH CONAN','* NỘI DUNG DÀNH CHO KHÁN GIẢ TUỔI THANH THIẾU NIÊN\nThám tử lừng danh Conan xoay quanh câu chuyện về chàng thám tử Kudo Shinichi, trong một lần đang điều tra đã bị Tổ chức Áo Đen ép uống thuốc độc, khiến cho cơ thể bị teo nhỏ. Sau đó, Shinichi chuyển đến sống ở nhà của người bạn thuở niên thiếu Ran Mori cùng người bố Kogoro Mori. Tại đây, cậu dùng văn phòng thám tử của ông Kogoro để truy tìm tung tích của tổ chức Áo Đen đồng thời giúp ông phá nhiều vụ án dưới một thân phận mới là Conan Edogawa.',NULL,NULL,2020,'https://img.ophim9.cc/uploads/movies/tham-tu-lung-danh-conan-thumb.jpg','Chính',NULL),('TTLDCNM21','THÁM TỬ LỪNG DANH CONAN 21: BẢN TÌNH CA MÀU ĐỎ THẪM','* NỘI DUNG DÀNH CHO KHÁN GIẢ TUỔI THANH THIẾU NIÊN\nĐoạn trailer The story of Ai Haibara: Black iron mystery train cũng cho chúng ta biết được vị trí xảy ra vụ án chính trong tập phim này sẽ là trên một chuyến tàu tốc hành. Kẻ thủ ác thậm chí còn cho nổ tung cả chuyến tàu để đạt được mục đích của mình, quả thật là quá sức manh động và hung hãn. Đối phó với một đối thủ như vậy liệu có quá sức của Haibara Ai và Conan hay không?',129,NULL,2020,'https://img.ophim9.cc/uploads/movies/tham-tu-lung-danh-conan-21-ban-tinh-ca-mau-do-tham-thumb.jpg',NULL,'1');
/*!40000 ALTER TABLE `films` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followedfilm`
--

DROP TABLE IF EXISTS `followedfilm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followedfilm` (
  `filmId` char(36) NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`filmId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `followedfilm_ibfk_1` FOREIGN KEY (`filmId`) REFERENCES `films` (`id`),
  CONSTRAINT `followedfilm_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followedfilm`
--

LOCK TABLES `followedfilm` WRITE;
/*!40000 ALTER TABLE `followedfilm` DISABLE KEYS */;
INSERT INTO `followedfilm` VALUES ('TCPS1',4),('TTLDCNM21',6);
/*!40000 ALTER TABLE `followedfilm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genreoffilm`
--

DROP TABLE IF EXISTS `genreoffilm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genreoffilm` (
  `filmId` char(36) NOT NULL,
  `genreId` char(6) NOT NULL,
  PRIMARY KEY (`filmId`,`genreId`),
  KEY `genreId` (`genreId`),
  CONSTRAINT `genreoffilm_ibfk_1` FOREIGN KEY (`filmId`) REFERENCES `films` (`id`),
  CONSTRAINT `genreoffilm_ibfk_2` FOREIGN KEY (`genreId`) REFERENCES `genres` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genreoffilm`
--

LOCK TABLES `genreoffilm` WRITE;
/*!40000 ALTER TABLE `genreoffilm` DISABLE KEYS */;
/*!40000 ALTER TABLE `genreoffilm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` char(6) NOT NULL,
  `genre` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `genre` (`genre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES ('ACT','Action'),('AMN','Âm nhạc'),('ANM','Anime'),('BIA','Bí ẩn'),('BIk','Bi kịch'),('CHS','Chuyển sinh'),('CNA','CN Animation'),('CNHH','CNA Hài hước'),('CNNT','CNA Ngôn tình'),('COMD','Comedy'),('DAM','Đam mỹ'),('DEM','Demon'),('DIG','Dị giới'),('DOT','Đời thường'),('DRAM','Drama'),('ECH','Echi'),('FATS','Fantsy'),('GIT','Giả tưởng'),('HAH','Hài hước'),('HAD','Hành độnh'),('HAR','Harem'),('HOD','Học đường'),('HUA','Huyền ảo'),('KHH','Khoa huyễn'),('KIH','Kiếm hiệp'),('KID','Kinh dị'),('LIS','Lịch sử'),('LIA','Live Action'),('MACR','Ma cà rồng'),('MAH','Manhua'),('MEC','Mechar'),('MYTR','Mystery'),('PHL','Phiêu lưu'),('PSCLGC','Psychological'),('QUD','Quân đội'),('SAMR','Samurai'),('SEN','Seinen'),('SHJ','Shoujo'),('SHJA','Shoujo AI'),('SHN','Shounen'),('SHNA','Shounen AI'),('SINL','Siêu năng lực'),('SIN','Siêu nhiên'),('THT','Thám tử'),('THTH','Thể thao'),('THRL','Thriller'),('TiH','Tiên hiệp'),('TIC','Tình cảm'),('TOKSS','Tokusatsu'),('TRC','Trò chơi'),('TRS','Trùng sinh'),('VIT','Viễn tưởng'),('VOT','Võ thuật'),('XUK','Xuyên không');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `historyoffilm`
--

DROP TABLE IF EXISTS `historyoffilm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historyoffilm` (
  `filmId` char(36) NOT NULL,
  `episode` int NOT NULL,
  `userId` int NOT NULL,
  `timeView` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`filmId`,`userId`,`episode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historyoffilm`
--

LOCK TABLES `historyoffilm` WRITE;
/*!40000 ALTER TABLE `historyoffilm` DISABLE KEYS */;
INSERT INTO `historyoffilm` VALUES ('TCPS1',1,4,'2023-11-15 10:16:19'),('TCPS1',2,4,'2023-11-08 15:37:13'),('TCPS1',3,4,'2023-11-08 15:38:49'),('TCPS1',1,6,'2023-11-18 12:43:08'),('TNCS2',0,4,'2023-11-08 14:51:17'),('TNCS2',1,4,'2023-11-08 14:51:03'),('TNCS2',2,4,'2023-11-08 13:49:56'),('TTLDCN',1,4,'2023-11-15 10:14:47'),('TTLDCNM21',10000,4,'2023-11-07 14:32:43');
/*!40000 ALTER TABLE `historyoffilm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `relatedfilm`
--

DROP TABLE IF EXISTS `relatedfilm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `relatedfilm` (
  `filmId` char(36) NOT NULL,
  `relatedfilmId` char(36) NOT NULL DEFAULT '',
  PRIMARY KEY (`filmId`,`relatedfilmId`),
  KEY `relatedfilmId` (`relatedfilmId`),
  CONSTRAINT `relatedfilm_ibfk_1` FOREIGN KEY (`filmId`) REFERENCES `films` (`id`),
  CONSTRAINT `relatedfilm_ibfk_2` FOREIGN KEY (`relatedfilmId`) REFERENCES `films` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `relatedfilm`
--

LOCK TABLES `relatedfilm` WRITE;
/*!40000 ALTER TABLE `relatedfilm` DISABLE KEYS */;
INSERT INTO `relatedfilm` VALUES ('TNCS2','TNCS'),('TNCS','TNCS2'),('ttldcnm1','ttldcn'),('ttldcn','ttldcnm1');
/*!40000 ALTER TABLE `relatedfilm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `repcomment`
--

DROP TABLE IF EXISTS `repcomment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `repcomment` (
  `userId` int DEFAULT NULL,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `content` varchar(720) DEFAULT NULL,
  `idCommentFilm` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `commentUser` (`userId`),
  KEY `idCommentFilm` (`idCommentFilm`),
  CONSTRAINT `repcomment_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `repcomment_ibfk_4` FOREIGN KEY (`idCommentFilm`) REFERENCES `commentuseroffilm` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repcomment`
--

LOCK TABLES `repcomment` WRITE;
/*!40000 ALTER TABLE `repcomment` DISABLE KEYS */;
INSERT INTO `repcomment` VALUES (6,'2023-11-18 12:15:36','@null g',98,42),(6,'2023-11-18 12:39:54','@null dep rr?',98,43);
/*!40000 ALTER TABLE `repcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(120) NOT NULL,
  `password` char(30) DEFAULT NULL,
  `avatar` varchar(256) DEFAULT NULL,
  `lever` int DEFAULT '1',
  `account` varchar(30) DEFAULT NULL,
  `nickname` varchar(72) DEFAULT NULL,
  `experience` int DEFAULT '0',
  `registrationDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `coint` int DEFAULT '0',
  `maXim` varchar(72) DEFAULT NULL,
  `id_google` varchar(256) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `account` (`account`),
  UNIQUE KEY `account_2` (`account`),
  UNIQUE KEY `account_3` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Nguyễn Anh Hùng','nguyenanhhung0123456@gmail.com','Bothienha@123','http://127.0.0.1:4000/public/avatar/uploaded_file-1699703686748-750775923OIP.jpg',4,'hung1234','hungdeptrai',0,'2023-09-21 11:00:28',0,NULL,NULL,0),(2,'Võ Đức Luân','voducluan@gmail.com','Voducluan@1234',NULL,1,'luan1234','luandeptrai',0,'2023-09-21 11:00:28',0,NULL,NULL,0),(3,NULL,'truonggiahoang0123456@gmail.com','Hung@1234',NULL,0,'hung12345',NULL,0,'2023-11-03 15:22:15',0,NULL,NULL,0),(4,'Hoàng Trương','truonggiahoang0123456@gmail.com',NULL,'http://127.0.0.1:4000/public/avatar/uploaded_file-1699703606871-252827580tong-hop-nhung-hinh-anh-meme-dep-08.jpg',1,NULL,NULL,0,'2023-11-04 09:24:13',0,NULL,'111020925096785841626',0),(5,'Hùng Nguyễn','nguyenanhhung0123456@gmail.com',NULL,'https://lh3.googleusercontent.com/a/ACg8ocLIZyxaRa-cWFhy0sus0Y-j9wVFIgAqxuo3AU4lxWFZEw=s96-c',1,NULL,NULL,0,'2023-11-04 09:26:44',0,NULL,'104909315046107243521',0),(6,NULL,'nguyenanhhung0123456@gmail.com','Dangkymkam@12','http://127.0.0.1:4000/public/avatar/uploaded_file-1700282354709-393623127tong-hop-nhung-hinh-anh-meme-dep-08.jpg',0,'thoimaemx9',NULL,0,'2023-11-15 11:06:22',0,NULL,NULL,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viewsoffilm`
--

DROP TABLE IF EXISTS `viewsoffilm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viewsoffilm` (
  `id` int NOT NULL AUTO_INCREMENT,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `filmId` char(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `filmId` (`filmId`),
  CONSTRAINT `viewsoffilm_ibfk_1` FOREIGN KEY (`filmId`) REFERENCES `films` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viewsoffilm`
--

LOCK TABLES `viewsoffilm` WRITE;
/*!40000 ALTER TABLE `viewsoffilm` DISABLE KEYS */;
INSERT INTO `viewsoffilm` VALUES (42,'2023-11-07 13:50:40','TCPS1'),(43,'2023-11-07 14:00:49','TCPS1'),(44,'2023-11-07 14:01:38','TCPS1'),(45,'2023-11-07 14:03:08','TCPS1'),(46,'2023-11-07 14:04:36','TCPS1'),(47,'2023-11-07 14:04:56','TCPS1'),(48,'2023-11-07 14:09:24','TCPS1'),(49,'2023-11-07 14:09:47','TCPS1'),(50,'2023-11-07 14:10:29','TCPS1'),(51,'2023-11-07 14:11:42','TNCS2'),(52,'2023-11-07 14:17:50','TNCS2'),(53,'2023-11-07 14:20:15','TNCS2'),(54,'2023-11-07 14:21:01','TNCS2'),(55,'2023-11-07 14:21:13','TNCS2'),(56,'2023-11-07 14:21:23','TNCS2'),(57,'2023-11-07 14:32:25','TTLDCN'),(58,'2023-11-07 14:32:43','TTLDCNM21'),(59,'2023-11-08 12:45:54','TNCS2'),(60,'2023-11-08 12:47:38','TNCS2'),(61,'2023-11-08 13:33:28','TNCS2'),(62,'2023-11-08 13:33:55','TNCS2'),(63,'2023-11-08 13:34:11','TNCS2'),(64,'2023-11-08 13:34:51','TNCS2'),(65,'2023-11-08 13:41:07','TNCS2'),(66,'2023-11-08 13:42:09','TNCS2'),(67,'2023-11-08 13:42:26','TNCS2'),(68,'2023-11-08 13:43:51','TNCS2'),(69,'2023-11-08 13:44:50','TNCS2'),(70,'2023-11-08 13:45:39','TNCS2'),(71,'2023-11-08 13:46:03','TNCS2'),(72,'2023-11-08 13:46:31','TNCS2'),(73,'2023-11-08 13:46:46','TNCS2'),(74,'2023-11-08 13:47:08','TNCS2'),(75,'2023-11-08 13:47:37','TNCS2'),(76,'2023-11-08 13:47:53','TNCS2'),(77,'2023-11-08 13:48:04','TNCS2'),(78,'2023-11-08 13:49:56','TNCS2'),(79,'2023-11-08 13:50:02','TNCS2'),(80,'2023-11-08 13:50:41','TNCS2'),(81,'2023-11-08 13:51:24','TNCS2'),(82,'2023-11-08 13:51:35','TNCS2'),(83,'2023-11-08 13:52:12','TNCS2'),(84,'2023-11-08 14:39:02','TNCS2'),(85,'2023-11-08 14:40:46','TNCS2'),(86,'2023-11-08 14:40:59','TNCS2'),(87,'2023-11-08 14:41:23','TNCS2'),(88,'2023-11-08 14:45:47','TNCS2'),(89,'2023-11-08 14:46:17','TNCS2'),(90,'2023-11-08 14:48:12','TNCS2'),(91,'2023-11-08 14:49:24','TNCS2'),(92,'2023-11-08 14:50:46','TNCS2'),(93,'2023-11-08 14:50:52','TNCS2'),(94,'2023-11-08 14:51:03','TNCS2'),(95,'2023-11-08 14:51:17','TNCS2'),(96,'2023-11-08 14:51:29','TCPS1'),(97,'2023-11-08 14:52:00','TCPS1'),(98,'2023-11-08 14:52:08','TCPS1'),(99,'2023-11-08 14:53:22','TCPS1'),(100,'2023-11-08 14:59:13','TCPS1'),(101,'2023-11-08 15:06:31','TCPS1'),(102,'2023-11-08 15:06:44','TCPS1'),(103,'2023-11-08 15:06:55','TCPS1'),(104,'2023-11-08 15:07:06','TCPS1'),(105,'2023-11-08 15:07:19','TCPS1'),(106,'2023-11-08 15:08:17','TCPS1'),(107,'2023-11-08 15:08:31','TCPS1'),(108,'2023-11-08 15:09:23','TCPS1'),(109,'2023-11-08 15:09:56','TCPS1'),(110,'2023-11-08 15:13:27','TCPS1'),(111,'2023-11-08 15:14:16','TCPS1'),(112,'2023-11-08 15:14:21','TCPS1'),(113,'2023-11-08 15:14:39','TCPS1'),(114,'2023-11-08 15:14:50','TCPS1'),(115,'2023-11-08 15:15:14','TCPS1'),(116,'2023-11-08 15:15:20','TCPS1'),(117,'2023-11-08 15:19:08','TCPS1'),(118,'2023-11-08 15:23:47','TCPS1'),(119,'2023-11-08 15:24:24','TCPS1'),(120,'2023-11-08 15:24:53','TCPS1'),(121,'2023-11-08 15:26:23','TCPS1'),(122,'2023-11-08 15:26:51','TCPS1'),(123,'2023-11-08 15:27:45','TCPS1'),(124,'2023-11-08 15:27:54','TCPS1'),(125,'2023-11-08 15:28:04','TCPS1'),(126,'2023-11-08 15:28:35','TCPS1'),(127,'2023-11-08 15:28:42','TCPS1'),(128,'2023-11-08 15:28:51','TCPS1'),(129,'2023-11-08 15:30:48','TCPS1'),(130,'2023-11-08 15:35:18','TCPS1'),(131,'2023-11-08 15:35:24','TCPS1'),(132,'2023-11-08 15:35:30','TCPS1'),(133,'2023-11-08 15:35:38','TCPS1'),(134,'2023-11-08 15:37:13','TCPS1'),(135,'2023-11-08 15:37:21','TCPS1'),(136,'2023-11-08 15:38:42','TCPS1'),(137,'2023-11-08 15:38:49','TCPS1'),(138,'2023-11-15 10:14:47','TTLDCN'),(139,'2023-11-15 10:15:22','TCPS1'),(140,'2023-11-15 10:16:19','TCPS1'),(141,'2023-11-18 12:40:04','TCPS1'),(142,'2023-11-18 12:42:27','TCPS1'),(143,'2023-11-18 12:43:08','TCPS1');
/*!40000 ALTER TABLE `viewsoffilm` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-21 22:26:30
