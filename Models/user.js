const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isAlphanumeric(value, "pl-PL")) {
        throw new Error("Name cannot contain special characters.");
      }
    },
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true,"Email address is required"],
    validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email',
      },
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Passwords is too short. At least 8 characters."],
    // match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]$/,
    //  'Password must have at least:1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character']
  },

  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],

  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  user_id: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    match: [
      /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
      "Mobile number is invalid",
    ],
  },
  countryCode: {
    type: String,
  },
  time: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
