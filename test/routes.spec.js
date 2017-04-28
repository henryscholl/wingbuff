process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const knex = require('../db/connection');

const should = chai.should();

chai.use(chaiHttp);

describe('API Routes', function() {

  beforeEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        knex.seed.run()
        .then(() => {
          done();
        })
      });
    });
  });

  afterEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      done();
    });
  });	

  describe('GET /', function() {

  	it('should return all wings', function(done) {
		chai.request(server)
		.get('/')
		.end(function(err, res) {
			should.not.exist(err);
			res.should.have.status(200);
			done();
		});
	});

  });

  describe('GET /places/:placeid/wings/:id', function() {

  	it('should return single wing', function(done) {
		chai.request(server)
		.get('/places/1/wings/1')
		.end(function(err, res) {
			should.not.exist(err);
			res.should.have.status(200);
			done();
		});
	});

	it('should throw error for invalid wing id', function(done) {
		chai.request(server)
		.get('/places/1/wings/asdfghj')
		.end(function(err, res) {
			should.exist(err);
			res.should.have.status(404);
			done();
		});
	});

  });

  describe('POST /places/:placeid/wings', function() {

  	it('should create new wing', function(done) {
		chai.request(server)
		.post('/places/1/wings')
		.send({
			name: 'New awesome wing'
		})
		.end(function(err, res) {
			should.not.exist(err);
			res.should.have.status(200);
			res.redirects.length.should.eql(1);
			done();
		});
	});

	it('should throw error for invalid wing creation', function(done) {
		chai.request(server)
		.post('/places/1/wings')
		.send({
			name: '  '
		})
		.end(function(err, res) {
			should.exist(err);
			res.should.have.status(500);
			res.redirects.length.should.eql(0);
			done();
		});
	});

  });

  describe('GET /places', function() {
  	it('should return all places', function(done) {
		chai.request(server)
		.get('/places')
		.end(function(err, res) {
			should.not.exist(err);
			res.should.have.status(200);
			done();
		});
	});
  });
	
});