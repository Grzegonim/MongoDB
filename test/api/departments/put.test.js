const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../models/department.model.js');
chai.use(chaiHttp);
const request = chai.request;
const expect = chai.expect;

describe('PUT /api/departments', () => {
  before(async () => {
    const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
    await testDepOne.save();
  });
  
  after(async () => {
    await Department.deleteMany();
  });

  it('/:id should update chosen document and return success', async () => {
    const res = await request(server).put('/api/departments/5d9f1140f10a81216cfd4408').send({ name: '#Marketing' });
    const newDepartment = await Department.findOne({ name: '#Marketing' });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(newDepartment).to.not.be.null;
  });
});
