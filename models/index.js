const { query } = require("../db/index");
const bcrypt = require("bcrypt");

//Provider

async function registerProvider({
  providerName,
  UKPRN,
  sortCode,
  accountNumber,
  mainContact,
  contracts
}) {
  const data = await query(
    `INSERT INTO providers
    (provider_name,
    UKPRN,
    sort_code,
    account_number,    
    main_contact,
    contracts) VALUES ($1, $2, $3, $4, $5, $6) RETURNING provider_name`,
    [providerName, UKPRN, sortCode, accountNumber, mainContact, contracts]
  );
  console.log(data);
  return data.rows[0].providerName;
}

async function getProvider() {
  const data = await query(`SELECT * FROM providers`);
  return data.rows;
}

async function searchProviderByName(search) {
  const data = await query(
    `
    SELECT * FROM providers WHERE provider_name ILIKE '%' || $1 || '%'`,
    [search]
  );
  return data.rows;
}

async function deleteProvider(id) {
  const res = await query(
    `DELETE from providers WHERE id=$1 RETURNING provider_name`,
    [id]
  );
  if (res.rowCount) {
    return res.rows[0].providerName;
  } else {
    return undefined;
  }
}

//Person
async function registerPerson({
  firstName,
  lastName,
  phoneNumber,
  email,
  jobTitle,
  companyId
}) {
  const data = await query(
    `INSERT INTO person
        (first_name,
        last_name,
        phone_number,
        email,
        job_title,
        company_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING first_name`,
    [firstName, lastName, phoneNumber, email, jobTitle, companyId]
  );
  return data.rows[0].person;
}
async function searchPersonByLastName(search) {
  const data = await query(
    `
      SELECT * FROM person WHERE last_name ILIKE '%' || $1 || '%'`,
    [search]
  );
  return data.rows;
}

//PUT request required incase key contact leaves.

// async function updatePerson(body) {
//   const {
//     id,
//     firstName,
//     lastName,
//     phoneNumber,
//     email,
//     jobTitle,
//     companyId
//   } = body;
//   const data = await query(
//     `UPDATE person
//   SET
//   id = COALESCE ($1, id),
//   first_name = COALESCE ($2, first_name),
//   last_name = COALESCE ($3, last_name),
//   phone_number = COALESCE ($4, phone_number),
//   email = COALESCE ($5, email),
//   job_title ($6, job_title),
//   company_id ($7, company_id)`,
//     [id, firstName, lastName, phoneNumber, email, jobTitle, companyId]
//   );
//   return data;
// }

//Contract
async function registerContracts({
  providerName,
  startDate,
  endDate,
  numberOfLearners,
  skillLevel,
  summary,
  complete,
  budget,
  companyId
}) {
  const data = await query(
    `INSERT INTO contracts (
            provider_name,
            start_date,
            end_date,
            number_of_learners,
            skill_level,
            summary,
            complete,
            budget,
            company_id 
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING start_date`,
    [
      providerName,
      startDate,
      endDate,
      numberOfLearners,
      skillLevel,
      summary,
      complete,
      budget,
      companyId
    ]
  );
  console.log(data);
  return data.rows[0].person;
}

async function searchContractsById(search) {
  const data = await query(
    `
      SELECT * FROM contracts WHERE contract_id = $1`,
    [search]
  );
  return data.rows[0];
}

//User

async function registerUser({ email, password }) {
  const hash = await bcrypt.hash(password, 10);
  const data = await query(
    `INSERT INTO users
        (email,
        password) VALUES ($1, $2) RETURNING email`,
    [email, hash]
  );
  return data.rows[0].email;
}

async function loginUser({ email, password }) {
  const data = await query(`SELECT password FROM users WHERE email = $1`, [
    email
  ]);
  // send request to db to get hashed pw
  const hash = data.rows[0].password;
  // use bcrypt to compare given pasword
  const success = await bcrypt.compare(password, hash);
  // return response suc or fail
  return success;
}

async function deleteUser({ id }) {
  const data = await query(`DELETE FROM users WHERE id = $1`, [id]);
  if (res.rowCount > 0) {
    const { id } = data.rows[0].id;
    return id;
  } else return console.log("No user by that email to delete.");
}

module.exports = {
  registerProvider,
  registerUser,
  loginUser,
  deleteUser,
  registerPerson,
  registerContracts,
  searchProviderByName,
  searchPersonByLastName,
  searchContractsById,
  deleteProvider,
  getProvider
};

// STEP 1 - CREATE FUNCTIONS TO POPULATE EACH INDIVIDUAL TABLE
// provider POPULATE TABLE FUNCTION
// destructure fields for provider table
// make a variable called data, await query INSERT INTO providers, VALUES $1, $2 ETC...
// match these too array with destructured variables
// console.log(`success, you have added a .... to ....`)
// REPEAT FOR OTHER 3 TABLES

// STEP 2 -
