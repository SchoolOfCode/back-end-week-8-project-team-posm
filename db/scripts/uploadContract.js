const { query } = require("../index.js");
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

async function uploadContracts() {
  try {
    const data = await readFile(
      "/back-end-week-8-project-team-posm/contracts.json"
    );
    const contracts = JSON.parse(data);
    console.log(contracts[0]);
    for (let i = 0; i < contract.length; i++) {
      const {
        providerName,
        startDate,
        endDate,
        numberOfLearners,
        skillLevel,
        summary,
        complete,
        budget,
        companyId
      } = contracts[i];

      const res = query(
        `
  INSERT INTO contracts (
    providerName,
    startDate,
    endDate,
    numberOfLearners,
    skillLevel,
    summary,
    complete,
    budget,
    companyId
  ) VALUES ($1,$2,$3,$4,$5,$6, $7, $8, $9)
   `,
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
      console.log(name);
    }
  } catch (err) {
    console.log(err);
  }
}
uploadContracts();
