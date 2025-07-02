import runSQLQuery from './query.js';

const QUERY = `
CREATE DATABASE medi_flow
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE \`doctors\` (
  \`doctor_id\` int(11) NOT NULL,
  \`doctor_firstname\` varchar(30) NOT NULL,
  \`doctor_secondname\` varchar(30) NOT NULL,
  \`doctor_institute\` varchar(100) DEFAULT NULL,
  \`doctor_adress\` varchar(100) DEFAULT NULL,
  \`doctor_email\` varchar(100) DEFAULT NULL,
  \`doctor_phone_number\` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE \`doctor_relation\` (
  \`doctor_id\` int(11) NOT NULL,
  \`patient_id\` int(11) NOT NULL,
  \`start_date\` timestamp NOT NULL DEFAULT current_timestamp(),
  \`end_date\` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

CREATE TABLE \`institutes\` (
  \`inst_id\` int(11) NOT NULL,
  \`institute_name\` varchar(30) NOT NULL,
  \`institute_address\` varchar(100) NOT NULL,
  \`institute_phone_number\` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO \`institutes\` (\`inst_id\`, \`institute_name\`, \`institute_address\`, \`institute_phone_number\`) VALUES
(1, 'EHPAD Les Chênes Verts', '12 Rue des Lilas, 75012 Paris', '01 45 67 89 00'),
(2, 'EHPAD Résidence du Parc', '45 Avenue du Général Leclerc, 69003 Lyon', '04 78 12 34 56'),
(3, 'EHPAD Le Clos Fleuri', '98 Boulevard Saint-Michel, 13005 Marseille', '04 91 23 45 67'),
(4, 'EHPAD Les Jardins d’Automne', '23 Rue des Tilleuls, 31000 Toulouse', '05 61 89 78 45'),
(5, 'EHPAD La Belle Vie', '5 Allée des Cerisiers, 44000 Nantes', '02 40 56 78 90');

CREATE TABLE \`patient_status\` (
  \`status_id\` int(11) NOT NULL,
  \`status_label\` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO \`patient_status\` (\`status_id\`, \`status_label\`) VALUES
(1, 'Hospitalisé'),
(2, 'Soins à domicile'),
(3, 'En observation'),
(4, 'Guéri'),
(5, 'Décédé');

CREATE TABLE \`patients\` (
  \`patient_id\` int(11) NOT NULL,
  \`patient_firstname\` varchar(30) NOT NULL,
  \`patient_secondname\` varchar(30) NOT NULL,
  \`patient_institute\` varchar(100) DEFAULT NULL,
  \`patient_adress\` varchar(100) DEFAULT NULL,
  \`patient_email\` varchar(100) DEFAULT NULL,
  \`patient_phone_number\` varchar(15) DEFAULT NULL,
  \`status_id\` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

ALTER TABLE \`doctors\`
  ADD PRIMARY KEY (\`doctor_id\`);

ALTER TABLE \`doctor_relation\`
  ADD KEY \`doctor_id\` (\`doctor_id\`),
  ADD KEY \`patient_id\` (\`patient_id\`);

ALTER TABLE \`institutes\`
  ADD PRIMARY KEY (\`inst_id\`);

ALTER TABLE \`patient_status\`
  ADD PRIMARY KEY (\`status_id\`);

ALTER TABLE \`patients\`
  ADD PRIMARY KEY (\`patient_id\`),
  ADD KEY \`status_id\` (\`status_id\`);

ALTER TABLE \`doctors\`
  MODIFY \`doctor_id\` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE \`institutes\`
  MODIFY \`inst_id\` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE \`patient_status\`
  MODIFY \`status_id\` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE \`patients\`
  MODIFY \`patient_id\` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

COMMIT;
`;

runSQLQuery(QUERY, [])