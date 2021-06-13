const router = require("express").Router();
const User = require("../model/user");
const { loginValidation, registerValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//validation

router.post("/register", async (req, res) => {
  //   const validation = Joi.validate(req.body, schema);
  const { error } = registerValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  //check if user already exists

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("user already exists");

  //Hash password
  const salt = await bcrypt.genSalt(10);

  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.json({ user: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  //validate the data befor login
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if user exists

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("user not exists");

  //validate password

  const validPass = await bcrypt.compare(req.body.password, user.password);

  if (!validPass) return res.status(400).send("invalid password");

  //create and assign jwt token

  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);

  res.header("auth-token", token).send(token);

  // res.send("logged in success");
});

module.exports = router;
