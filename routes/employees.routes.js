const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const Employees = require('../models/employees.model');
const { route } = require('./products.routes');

router.get('/employees', async (req, res) => {
  try {
    res.json(await Employees.find());
  }
  catch(err) {
    res.status(500).json({message: err});
  }
});

router.get('/employees/random', async (req, res) => {
  try {
    const count = await Employees.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const emp = await Employees.findOne().skip(rand);
    if(!emp) res.status(404).json({message: 'Not found'});
    else res.json(emp); 
  }
  catch(err){
    res.status(500).json({message: err});
  }
});

router.get('/employees/:id', async (req, res) => {
  try {
    const emp = await Employees.findById(req.params.id);
    if(!emp) res.status(404).json({ message: 'Not found' });
    else res.json(emp);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.post('/employees', async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployees = new Employees({ firstName: firstName, lastName: lastName, department: department });
    await newEmployees.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName, department } = req.body;
  try {
    const emp = await Employees.findById(req.params.id);
    if(emp) {
      await Employees.updateOne({ _id: req.params.id }, { $set: { firstName: firstName, lastName: lastName, department: department } });
      res.json({ message: 'OK' });
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/employees/:id', async (req, res) => {
  try {
    const emp = await Employees.findById(req.params.id);
    if(emp) {
      await Employees.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
