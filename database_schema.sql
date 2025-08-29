--
-- The `users` table stores all user accounts, including their name, email,
-- hashed password, and role (Admin, Employer, or Applicant).
--
CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('Admin','Employer','Applicant') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
);

--
-- The `jobs` table stores all job postings.
-- It has a foreign key `createdBy` that links to the `id` of the user
-- who created the job, establishing a relationship.
--
CREATE TABLE `jobs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `createdBy` INT NOT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `createdBy` (`createdBy`),
  CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

--
-- The `applications` table stores all job applications.
-- It has foreign keys to link an application to a `jobId` and a `userId`.
-- This creates the relationship between jobs and applicants.
--
CREATE TABLE `applications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `jobId` INT NOT NULL,
  `userId` INT NOT NULL,
  `status` ENUM('applied','shortlisted','rejected') DEFAULT 'applied',
  `resumePath` VARCHAR(255) DEFAULT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `jobId` (`jobId`,`userId`),
  KEY `userId` (`userId`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`jobId`) REFERENCES `jobs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
);