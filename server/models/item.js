const mongoose = require("mongoose");
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");

const itemSchema = new mongoose.Schema({
    title: { type: String },
    price: { type: Number },
    description: {type: String},
})

const validateItem = (item) => {
    const schema = Joi.object({
      title: Joi.string().min(1).max(24).required(),
      price: Joi.number().min(1).max(24).required(),
      description: Joi.string().min(5).max(255).required(),
    });
    return schema.validate(item);
  };

const Item = mongoose.model("Item", itemSchema);


exports.Item = Item;
exports.validateItem = validateItem;
exports.itemSchema = itemSchema