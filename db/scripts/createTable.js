const { query } = require("../index");

// create education provider table
async function createProvider() {
  const res = await query(
    `CREATE TABLE IF NOT EXISTS providers (
         id SERIAL PRIMARY KEY,
         provider_id INTEGER,
         provider_name TEXT,
         UKPRN TEXT,
         sort_code TEXT,
         account_number INTEGER,
         main_contact TEXT,
         contracts TEXT)`
  );
  console.log(res);
}
createProvider();

// create main contact for provider table
async function createPerson() {
  const res = await query(
    `CREATE TABLE IF NOT EXISTS person (
      id SERIAL PRIMARY KEY,
      person_id INTEGER,
      first_name TEXT,
      last_name TEXT,
      phone_number INTEGER,
      email TEXT,
      job_title TEXT,
      company_id INTEGER
    )`
  );
  console.log(res);
}
createPerson();

// create contract table
async function createContracts() {
  const res = await query(
    `CREATE TABLE IF NOT EXISTS contracts (
      contract_id SERIAL PRIMARY KEY,
      provider_name TEXT,
      start_date TEXT,
      end_date TEXT,
      number_of_learners INTEGER,
      skill_level TEXT,
      summary TEXT,
      complete TEXT,
      budget TEXT,
      company_id INTEGER
    )`
  );
  console.log(res);
}
createContracts();

// create users table to WMCA staff to login
async function createUsers() {
  const res = await query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, 
    email TEXT,
    password TEXT
    )`);
  console.log(res);
}
createUsers();

// make a database with scripts - createTable
// table will store data on providers
// test with dummy data
// create a db folder with a scipts folder
// make a create table script
// make an index.js file within db, require pg
// require query from index.js
// await query to create a table

// create a .env file with username, host and password

// make routes folder, with routes.js file

// make models folder, with models.js file

// create a midleware folder, require pg, express session & pg simple
