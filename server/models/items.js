const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");

const itemSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
})

exports.itemSchema = itemSchema