const express = require("express");
const router = express.Router();
const {
  registerProvider,
  registerUser,
  loginUser,
  deleteUser,
  registerPerson,
  registerContracts, 
  getProviderById
} = require("../models/index");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({ message: "Index Route" });
});

// 1. Provider
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

router.get("/provider/:providerId", async (req, res)=> {
  const {providerId} = req.params;
  const data = await getProviderById(providerId);
  res.json(data);
});

// 2. Users
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

router.get("/", async (req, res)=> {
  const {} = req.params;
  const = await ();
  res.json();
});

//login

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

// 3. Person
router.post("/person", async (req, res) => {
  const { body } = req;
  const result = await registerPerson(body);
  if (result) {
    return res.json({
      success: true,
      message: "You have registered a Key Contact"
    });
  }
  res.json({
    success: false,
    message: "failed to register a Key Contact, please try again"
  });
});

module.exports = router;

// make routes to each table

// 3. contracts
router.post("/contracts", async (req, res) => {
  const { body } = req;
  const result = await registerContracts(body);
  if (result) {
    return res.json({
      success: true,
      message: "Contract has been registered"
    });
  }
  res.json({
    success: false,
    message: "failed to register contract, please try again"
  });
});
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
router.delete("/users/:id", async (req, res) => {
  const { body } = req.params;
  const result = await deleteUser(body);
  if (result) {
    return res.send(`You have deleted a user`);
  }
});

// GET route
