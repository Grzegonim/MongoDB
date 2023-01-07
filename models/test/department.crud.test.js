const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

after(() => {
  mongoose.models = {};
});

describe('Department', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
      console.error(err);
    }
  })
  describe('Reading data', () => {
    it('should return all the data with "find" method', () => {
      before(async () => {
        const testDepOne = new Department({ name: 'Department #1'});
        await testDepOne.save();
        const testDepTwo = new Department({ name: 'Department #2'});
        await testDepTwo.save();
      });
  
      it('should return all data with "find" method', async () => {
        const departments = await Department.find();
        const expectLength = 2;
        expect(departments.length).to.be.equal(expectLength);
      });
  
      it('should return proper data with "findOne" method', async () => {
        const department = await Department.findOne({name: 'Department #1'});
        expect(department.name).to.be.equal('Department #1');
      });
    });
    after(async () => {
      await Department.deleteMany();
    })
  });
  
  describe('Creating data', () => {
    it('should insert new document with "insertOne" method', async () => {
      const department = await new Department({ name: 'Department #1' });
      await department.save();
      const savedDepartment = await Department.findOne({ name: 'Department #1' });
      expect(savedDepartment).to.not.be.null;
    })
    after(async () => {
      await Department.deleteMany();
    })
  });
  
  describe('Updating data', () => {
    beforeEach(async () => {
      const testDepOne = new Department({ name: 'Department #1' });
      await testDepOne.save();
      const testDepTwo = new Department({ name: 'Department #2' });
      await testDepTwo.save();
    });

    afterEach(async () => {
      await Department.deleteMany();
    });

    it('should update one document with updateOne method', async () => {
      await Department.updateOne({ name: 'Department #1'}, {$set: { name: 'Department #1=' }});
      const updatedDepartment = await Department.findOne({ name: 'Department #1=' });
      expect(updatedDepartment).to.not.be.null;
    })

    it('should update one document with save method', async () => {
      const department = await Department.findOne({ name: 'Department #1' });
      department.name = '=Department #1=';
      await department.save();
      const updatedDepartment = await Department.findOne({ name: '=Department #1=' });
      expect(updatedDepartment).to.not.be.null;
    })

    it('should update multiple document with updateMany method', async () => {
      await Department.updateMany({}, { $set: { name: 'Updated!' } });
      const updatedDepartments = await Department.find({ name: 'Updated!'});
      expect(updatedDepartments.length).to.be.equal(2);
    })
  })

  describe('Removing data', () => {
    beforeEach(async () => {
      const testDepOne = new Department({ name: 'Department #1' });
      await testDepOne.save();
      const testDepTwo = new Department({ name: 'Department #2' });
      await testDepTwo.save();
    });

    afterEach(async () => {
      await Department.deleteMany();
    });

    it('should remove one document with deleteOne method', async () => {
      await Department.deleteOne({ name: 'Department #1' });
      const removedDepartment = await Department.findOne({ name: 'Department #1' });
      expect(removedDepartment).to.be.null; 
    });

    it('should properly remove one document with "remove" method', async () => {
      const department = await Department.findOne({ name: 'Department #1' });
      await department.remove();
      const removedDepartment = await Department.findOne({ name: 'Department #1' });
      expect(removedDepartment).to.be.null;
    });
  })

  it('should remove multiple document with deleteMany method', async () => {
    await Department.deleteMany({});
    const removedDepartment = await Department.find();
    expect(removedDepartment.length).to.be.equal(0);
  });
});

