const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../models/department.model.js');
chai.use(chaiHttp);
const request = chai.request;
const expect = chai.expect;

describe('DELETE api/departments', () => {
  before(async () => {
    const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
    await testDepOne.save();
  });
  
  after(async () => {
    await Department.deleteMany();
  });

  it('should remove one department by :id', async () => {
    const res = await request(server).delete('/api/departments/5d9f1140f10a81216cfd4408');
    const removedDepartment = await Department.findOne({ name: 'Department #1'});
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(removedDepartment).to.be.null;
  });
});