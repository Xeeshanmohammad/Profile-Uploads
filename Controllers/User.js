const User = require("../Models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const checkAuth = require('../Middleware/Authentication')

router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ 'email': req.body.email });
  if (existingUser) {
    res.status(StatusCodes.FORBIDDEN).json({
      success: false,
      message: "Email ID is already registered",
    });
  } else {

    const m = new Date();
    const bcryptPassword = bcrypt.hashSync(req.body.password)

    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var result = "";
    var charactersLength = characters.length;

    for (var i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    const obj = {
      user_id: result,
      name: req.body.name,
      username:req.body.username,
      email: req.body.email,
      password: bcryptPassword,
      mobile: req.body.mobile,
      countryCode: req.body.countryCode,
      gender: req.body.gender,
      time: m,
    };

    const user = await User.create(obj);
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

    await user.save()
    if (user) {
    return  res.status(StatusCodes.CREATED).json({ success:true, message:"Registration successfull",token });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Error during registration",
      });
    }
  }
} catch (error) {
  res.status(StatusCodes.CONFLICT).json({message:"Oops! something went wrong"});
}
});

router.get("/", async (req, res) => {
  let users;
  try {
    users = await User.find({});
  } catch (error) {
    console.log(error);
  }
  if (!users) {
    return res.status(403).json({ message: "No user found" });
  }
  return res.status(200).json({ users });
});

router.post("/login", checkAuth,async (req, res) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User cannot found" });
  }
  const isPasswordMatch = await bcrypt.compareSync(
    password,
    existingUser.password
    );
    if (!isPasswordMatch) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ _id:existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
  return res
    .status(201)
    .json({ message: "Login Successful", token });
});

module.exports = router;
