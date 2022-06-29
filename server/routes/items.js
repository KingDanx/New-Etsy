const { Item, validateItem } = require("../models/item");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

//Creates a new item
router.post("/registerItem", async (req, res) => {
    try {
      const { error } = validateItem(req.body);
      if (error) return res.status(400).send(error.details[0].message);
  
      
      let item = new Item({
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
      });
      await item.save();
  
      return res
        .send({
          _id: item._id,
          title: item.title,
          price: item.price,
          description: item.description,
        });
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });

module.exports = router;