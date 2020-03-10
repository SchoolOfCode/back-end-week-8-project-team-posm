const express = require("express");
const router = express.Router();
const {
  registerProvider,
  registerUser,
  loginUser
} = require("../models/index");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({ message: "Index Route" });
});

// 1. providers
// POST route to populate table with provider data - DONE
// DELETE route
// GET route

router.post("/", async (req, res) => {
  const { body } = req;
  const result = await registerProvider(body);
  if (result) {
    return res.json({
      success: true,
      message: "You have registered a provider"
    });
  }
  res.json({
    success: false,
    message: "failed to register provider, please try again"
  });
});

router.post("/users", async (req, res) => {
  const { body } = req;
  const result = await registerUser(body);
  if (result) {
    return res.json({
      success: true,
      message: "You have registered a new user"
    });
  }
  res.json({
    success: false,
    message: "failed to register user, please try again"
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const success = await loginUser({
    email: email,
    password: password
  });
  if (success) {
    return res.json({
      success: true,
      message: `${email} is logged in`
    });
  }
  return res.json({ success: false, message: `no log in` });
});

module.exports = router;

// make routes to each table

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
router.post("/", async (req, res) => {
  const { body } = req;
  const result = await registerUser(body);
  if (result) {
    return res.json({
      success: true,
      message: "You have registered a new user"
    });
  }
  res.json({
    success: false,
    message: "failed to register user, please try again"
  });
});

// DELETE route
// GET route
