const { query } = require("../index");
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const path = require("path");

async function uploadContract() {
  try {
    const data = await readFile(
      path.join(__dirname, "..", "..", "contracts.json")
    );
    const contracts = JSON.parse(data);
    console.log(contracts[0]);
    for (let i = 0; i < contracts.length; i++) {
      const {
        provider_name,
        start_date,
        end_date,
        number_of_learners,
        skill_level,
        summary,
        complete,
        budget,
        company_id
      } = contracts[i];
      const res = query(
        `
  INSERT INTO contracts (
    provider_name,
    start_date,
    end_date,
    number_of_learners,
    skill_level,
    summary,
    complete,
    budget,
    company_id
  ) VALUES ($1,$2,$3,$4,$5,$6, $7, $8, $9)
   `,
        [
          provider_name,
          start_date,
          end_date,
          number_of_learners,
          skill_level,
          summary,
          complete,
          budget,
          company_id
        ]
      );
      console.log(provider_name);
    }
  } catch (err) {
    console.log(err);
  }
}
uploadContract();
