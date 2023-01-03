const Employees = require('../employees.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

after(() => {
  mongoose.models = {};
});

describe('Employees', () => {
  it('should throw an error if no args', () => {
    const emp = new Employees({});
    emp.validate(err => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
    })
  })
})

describe('Employees', () => {
  it('should throw an error if arg are not a string', () => {
    const cases = [{}, []];
    for(let test of cases) {
      const emp = new Employees({test});
      emp.validate(err => {
        expect(err.errors.firstName).to.exist;
        expect(err.errors.lastName).to.exist;
        expect(err.errors.department).to.exist;
      })
    }
  })
})

describe('Employees', () => {
  it('should pass test if args are correct', () => {
    const emp = new Employees({firstName: 'John', lastName: 'Doe', department: 'Marketing'});
    emp.validate(err => {
      expect(err).to.not.exist;
    })
  })
})