const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({ message: "Index Route" });
});

//router.get('/', )

module.exports = router;

// make routes to each table

// 1. providers
// POST route to populate table with provider data
// DELETE route
// GET route

// 2. person
// POST route to populate persons table
// DELETE route
// GET route
// PATCH

// 3. contracts
// POST route to populate contracts table
// DELETE route
// GET route

// 4. users
// POST route to populate users table
// DELETE route
// GET route
