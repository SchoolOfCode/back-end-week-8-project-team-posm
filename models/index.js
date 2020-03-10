const { query } = require("../db/index");
const bcrypt = require("bcrypt");

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

module.exports = {
  registerProvider,
  registerUser,
  loginUser
};

// STEP 1 - CREATE FUNCTIONS TO POPULATE EACH INDIVIDUAL TABLE
// provider POPULATE TABLE FUNCTION
// destructure fields for provider table
// make a variable called data, await query INSERT INTO providers, VALUES $1, $2 ETC...
// match these too array with destructured variables
// console.log(`success, you have added a .... to ....`)
// REPEAT FOR OTHER 3 TABLES

// STEP 2 -
