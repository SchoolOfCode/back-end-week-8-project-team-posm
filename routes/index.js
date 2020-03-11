const express = require("express");
const router = express.Router();
const { query } = require("../db/index");
const {
  registerProvider,
  registerUser,
  loginUser,
  deleteUser,
  registerPerson,
  registerContracts,
  searchProviderByName,
  searchPersonByLastName,
  searchContractsById,
  updatePerson,
  deleteProvider,
  getProvider,
  updateProvider
} = require("../models/index");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({ message: "Index Route" });
});

// 1. Providers to WMCA
router.post("/providers", async (req, res) => {
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

// router.get("/providers", async (req, res) => {
//   const provider = await getProvider();
//   res.json(provider);
// });

router.get("/providers", async (req, res) => {
  const { search } = req.query;
  const data = await searchProviderByName(search);
  res.json(data);
});

router.delete("/providers/:id", async (req, res) => {
  const { id } = req.params;
  const name = await deleteProvider(id);
  if (name) {
    res
      .status(200)
      .send(`You have deleted the provider ${name} with the id of ${id}`);
  } else {
    res.status(406).send(`There are no providers with that id to delete`);
  }
});

// 2. Users & Login from WMCA
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

// router.get("/", async (req, res)=> {
//   const {} = req.params;
//   const = await ();
//   res.json();
// });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const success = await loginUser({
    email: email,
    password: password
  });
  if (success) {
    req.session.data = {
      isLoggedIn: true
    };
    return res.json({
      success: true,
      message: `${email} is logged in`
    });
  }
  return res.json({ success: false, message: `no log in` });
});

// DELETE users route - doesn't work!
router.delete("/users/:id", async (req, res) => {
  const { body } = req.params;
  const result = await deleteUser(body);
  if (result) {
    return res.send(`You have deleted a user`);
  }
});

// 3. Person or Key Contact at Provider
router.post("/persons", async (req, res) => {
  const { body } = req;
  const result = await registerPerson(body);
  console.log(result);
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
router.get("/persons", async (req, res) => {
  const { search } = req.query;
  const data = await searchPersonByLastName(search);
  res.json(data);
});

//Needs work!!
router.put("/persons", async (req, res) => {
  const { body } = req;
  const { person_id } = req.query;
  const data = await updatePerson(body);
  res.json({ message: `you have updated ${person_id}` });
});

// 4. contracts
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

router.get("/contracts", async (req, res) => {
  const { search } = req.query;
  const data = await searchContractsById(search);
  res.json(data);
});

module.exports = router;
