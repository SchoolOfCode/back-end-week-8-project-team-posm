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

async function getProviderById(providerId) {
  const data = await query(
    `
    SELECT * FROM providers WHERE id = $1`,
    [providerId]
  );
  return data.rows[0];
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
  console.log(data);
  return data.rows[0].person;
}
//Contract
async function registerContracts({
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
            start_date,
            end_date,
            number_of_learners,
            skill_level,
            summary,
            complete,
            budget,
            company_id 
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING start_date`,
    [
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
  getProviderById
};

// STEP 1 - CREATE FUNCTIONS TO POPULATE EACH INDIVIDUAL TABLE
// provider POPULATE TABLE FUNCTION
// destructure fields for provider table
// make a variable called data, await query INSERT INTO providers, VALUES $1, $2 ETC...
// match these too array with destructured variables
// console.log(`success, you have added a .... to ....`)
// REPEAT FOR OTHER 3 TABLES

// STEP 2 -
