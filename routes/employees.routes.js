const express = require('express');
const router = express.Router();
const EmployeesController = require('../controllers/employees.controller');

router.get('/employees', EmployeesController.getAll);
router.get('/employees/random', EmployeesController.getRandom);
router.get('/employees/:id', EmployeesController.getById);
router.post('/employees', EmployeesController.postEmployee);
router.put('/employees/:id', EmployeesController.putEmployee);
router.delete('/employees/:id', EmployeesController.deleteEmployee);

module.exports = router;
