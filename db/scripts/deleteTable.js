const { query } = require("../index");

async function dropProviders() {
  const res = await query(`
    DROP TABLE providers`);
  console.log(res);
}
dropProviders();

async function dropPerson() {
  const res = await query(`
      DROP TABLE person`);
  console.log(res);
}
dropPerson();

async function dropContract() {
  const res = await query(`
      DROP TABLE contracts`);
  console.log(res);
}
dropContract();

async function dropUsers() {
  const res = await query(`
      DROP TABLE users`);
  console.log(res);
}
dropUsers();
