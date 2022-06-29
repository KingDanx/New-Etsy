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

  //Get all items
router.get("/", async (req, res) => {
    try {
      const items = await Item.find();
      return res.send(items);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });

  //Get a single item
router.get("/:itemId", async (req, res) => {
    try {
      const item = await Item.findById(req.params.itemId);
      if (!item)
        return res
          .status(400)
          .send(`Item with id ${req.params.itemId} does not exist!`);
      return res.send(item);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });

  //Updates an item's info
router.put("/:itemId/", async (req, res) => {
    try {
      const { error } = validateItem(req.body);
      if (error) return res.status(400).send(error);
  
      const item = await Item.findById(req.params.itemId);
      if (!item)
        return res
          .status(400)
          .send(`The item with id: "${req.params.itemId}" does not exist.`);
  
        item.title = req.body.title;
        item.price = req.body.price;
        item.description = req.body.description;
  
      await item.save();
      return res.send(item);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });

module.exports = router;