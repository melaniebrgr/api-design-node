var app = require('./server');
var request = require('supertest');
var expect = require('chai').expect;

// Note: 
// leverage hooks to better set up and clear up code in future (https://mochajs.org/#hooks)
// Also, with the end block of requests, I can nest other requests, useful for making sure data for a particular item with ID has been updated

describe('Lions', () => {
  beforeEach(done => {
    // Create and returns a new lion using the posted object as the lion
    request(app)
      .post('/lions')
      .send({"name":"Simba","pride":"Matata","age":"4","gender":"male"})
      .set('Accept', 'application/json')
      .end(() => done());
  });

  describe('DELETE /lions/:id', () => {
    it('delete and return the matching lion', done => {
      request(app)
        .delete('/lions/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, resp) => {   
          expect(resp.body).to.be.an('object');
          done();
        });    
    });
  });

  describe('GET /lions/:id', () => {
    it('should return one lion by its id', done => {
      request(app)
        .get('/lions/2')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, resp) => {          
          expect(resp.body).to.be.an('object');
          expect(resp.body.id).equal('2');
          done();
        });
    });
  });

  describe('PUT /lions/:id', () => {
    it('should update and return the matching lion with the posted update object', done => {
      request(app)
        .put('/lions/3')
        .type('json')
        .send({"name":"Nala","pride":"Hakuna","age":"5","gender":"female"})      
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, resp) => {
          expect(resp.body).to.be.an('object');
          expect(resp.body.id).equal('3');
          expect(resp.body.name).equal('Nala');
          done();
        })
    })
  });

  describe('GET /lions', () => {
    it('should return all lions', done => {
      request(app)
        .get('/lions')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, resp) => {
          expect(resp.body).to.be.an('array');
          done();
        })
    });
  });  
});
