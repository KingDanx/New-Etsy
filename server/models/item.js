const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");

const itemSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
})

const Item = mongoose.model("Item", itemSchema);


exports.Item = Item;
exports.itemSchema = itemSchema