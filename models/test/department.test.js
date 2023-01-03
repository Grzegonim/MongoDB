const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

after(() => {
  mongoose.models = {};
});

describe('Department', () => {
  it('should throw an error if no "name" arg', () => {
    const dep = new Department({}); // create new Department, but don't set `name` attr value
    dep.validate(err => {
      expect(err.errors.name).to.exist;
    });
  });
});

describe('Department', () => {
  it('should throw an error if name is not a string', () => {
    const cases = [{}, []];
    for(let name of cases) {
      const dep = new Department({ name });
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });
});

describe('Department', () => {
  it('should throw an error if name < 5 or name > 20', () => {
    const cases = ['lore', 'loremipsumloremipsumlorem']
    for(let name of cases) {
      const dep = new Department({ name });
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    };
  });
});

describe('Department', () => {
  it('should pass test if name arg is correct', () => {
    const cases = ['Lorem', 'Lorem Ipsum'];
    for(let name of cases) {
      const dep = new Department({name});
      dep.validate(err => {
        expect(err).to.not.exist;
      })
    }
  })
})