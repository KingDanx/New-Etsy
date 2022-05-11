const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const {itemSchema} = require("../models/items")

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 1, maxLength: 24 },
  lastName: { type: String, required: true, minlength: 1, maxLength: 24 },
  email: {
    type: String,
    unique: true,
    required: true,
    minLength: 5,
    maxLength: 255,
    lowercase: true,
  },
  password: { type: String, required: true, maxLength: 1024, minLength: 5 },
  items: [{ type: itemSchema }],
  image: { type: String, default: "" },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      image: this.image,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    },
    config.get("jwtSecret")
  );
};

const User = mongoose.model("User", userSchema);

const validateUser = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(1).max(24).required(),
    lastName: Joi.string().min(1).max(24).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    image: Joi.string(),
  });
  return schema.validate(user);
};

const validateLogin = (req) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(req);
};

exports.User = User;
exports.validateUser = validateUser;
exports.validateLogin = validateLogin;
