const expect = require('chai').expect;
const mongoose = require('mongoose');
const Employees = require('../employees.model.js');

after(() => {
  mongoose.models = {};
});

describe('Employees', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {
    before(async () => {
      const testEmpOne = await new Employees({ firstName: 'John', lastName: 'Doe', department: 'Marketing' });
      testEmpOne.save();
      const testEmpTwo = await new Employees({ firstName: 'Jane', lastName: 'Doe', department: 'IT' });
      testEmpTwo.save();  
    });

    after(async () => {
      await Employees.deleteMany();
    })

    it('should return all data with find method', async () => {
      const employees = await Employees.find();
      expect(employees.length).to.be.equal(2);
    });

    it('should return proper docuemnt with findOne method', async () => {
      const foundEmployee = await Employees.findOne({ firstName: 'John' });
      expect(foundEmployee).to.not.be.null;
    });
  });

  describe('Creating data', () => {
    after(async () => {
      await Employees.deleteMany();
    })

    it('should insert document with insertOne method', async () => {
      await Employees.collection.insertOne({ firstName: 'TEST', lastName: 'TEST', department: 'TEST' });
      const insertedEmployee = await Employees.findOne({ firstName: 'TEST' });
      expect(insertedEmployee).to.not.be.null;
    }); 
  });

  describe('Updating data', () => {
    before(async () => {
      const testEmpOne = await new Employees({ firstName: 'John', lastName: 'Doe', department: 'Marketing' });
      testEmpOne.save();
      const testEmpTwo = await new Employees({ firstName: 'Jane', lastName: 'Doe', department: 'IT' });
      testEmpTwo.save();  
    });

    after(async () => {
      await Employees.deleteMany();
    });

    it('should update one document with updateOne method', async () => {
      await Employees.updateOne({ firstName: 'John'}, {$set: { firstName: '=John=' }});
      const updatedEmployee = await Employees.findOne({ firstName: '=John=' });
      expect(updatedEmployee).to.not.be.null;
    });
    
    it('should update one document with save method', async () => {
      const employee = await Employees.findOne({ firstName: 'Jane' });
      employee.firstName = 'TEST';
      await employee.save();
    
      const updatedEmployee = await Employees.findOne({ firstName: '=John=' });
      expect(updatedEmployee).to.not.be.null;
    });
    
    it('should update multiple documents with updateMany method', async () => {
      await Employees.updateMany({}, {$set: {firstName: 'TEST'}} );
      const updatedEmployees = await Employees.find({ firstName: 'TEST' });
      expect(updatedEmployees.length).to.be.equal(2);
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employees({ firstName: 'Joe', lastName: 'Doe', department: 'IT'});
      await testEmpOne.save();
      const testEmpTwo = new Employees({ firstName: 'Jane', lastName: 'Doe', department: 'Marketing' });
      await testEmpTwo.save();
    });

    afterEach(async () => {
      await Employees.deleteMany();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employees.deleteOne({ firstName: 'Joe' });
      const removedEmployee = await Employees.findOne({ firstName: 'Joe' });
      expect(removedEmployee).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = Employees.findOne({ firstName: 'Jane'});
      await employee.remove();
      const removedDocument = await Employees.findOne({ firstName: 'Jane' });
      expect(removedDocument).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employees.deleteMany({});
      const employees = await Employees.find();
      expect(employees.length).to.be.equal(0);
    });
  });
});
