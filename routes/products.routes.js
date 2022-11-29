// post.routes.js

const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const Products = require('../models/product.module');

router.get('/products', async (req, res) => {
  try {
    res.json(await Products.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/products/random', async (req, res) => {
  try {
    const count = await Products.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const pro = await Products.findOne().skip(rand);
    if(!pro) res.status(404).json({ message: 'Not found' });
    else res.json(pro);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const pro = await Products.findById(req.params.id);
    if(!pro) res.status(404).json({ message: 'Not found' });
    else res.json(pro);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.post('/products', async (req, res) => {
  try {
    const { name, client } = req.body;
    const newProducts = new Products({ name: name, client: client });
    await newProducts.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

router.put('/products/:id', async (req, res) => {
  const { name, client } = req.body;
  try {
    const pro = await Products.findById(req.params.id);
    if(pro) {
      await Products.updateOne({ _id: req.params.id }, { $set: { name: name, client: client }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});


router.delete('/products/:id', async (req, res) => {
  try {
    const pro = await Products.findById(req.params.id);
    if(pro) {
      await Products.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
