import runSQLQuery from "./query.js";

const QUERY = `
  INSERT INTO patients 
  (patient_firstname, patient_secondname, age, adress, insurance_number, gender, email) 
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;

const users = [
  ['Robert', 'Duchamp', 65, '1 Rue de je sais pas', 'FR1234567890', 'male', 'robert.duchamp@gmail.com'],
  ['Marie', 'Lemoine', 42, '12 Rue Victor Hugo', 'FR9876543210', 'female', 'marie.lemoine@gmail.com'],
  ['Luc', 'Moreau', 37, '5 Boulevard Haussmann', 'FR1928374650', 'male', 'luc.moreau@gmail.com'],
  ['Sophie', 'Durand', 29, '88 Avenue des Champs', 'FR1122334455', 'female', 'sophie.durand@gmail.com'],
  ['Paul', 'Giraud', 51, '3 Rue des Lilas', 'FR6677889900', 'male', 'paul.giraud@gmail.com'],
  ['Claire', 'Petit', 46, '15 Place Bellecour', 'FR5566778899', 'female', 'claire.petit@gmail.com'],
  ['Julien', 'Leroux', 33, '77 Rue Nationale', 'FR4433221100', 'male', 'julien.leroux@gmail.com'],
  ['Emma', 'Benoit', 39, '10 Rue de la République', 'FR3344556677', 'female', 'emma.benoit@gmail.com'],
  ['Hugo', 'Martel', 58, '21 Rue de la Paix', 'FR2211003344', 'male', 'hugo.martel@gmail.com'],
  ['Camille', 'Noir', 27, '8 Rue Molière', 'FR9900112233', 'female', 'camille.noir@gmail.com']
];

for (const user of users) {
  runSQLQuery(QUERY, user);
}
