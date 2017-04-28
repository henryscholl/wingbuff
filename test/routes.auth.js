process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const passportStub = require('passport-stub');
const server = require('../app');
const knex = require('../db/connection');

const should = chai.should();

chai.use(chaiHttp);
passportStub.install(server);

describe('Auth Routes', function() {

	beforeEach(() => {
		return knex.migrate.rollback()
		.then(() => { return knex.migrate.latest(); })
		.then(() => { return knex.seed.run(); });
	});

	afterEach(() => {
		passportStub.logout();
		return knex.migrate.rollback();
	});

	describe('POST /auth/register', () => {
		it('should register a new user', (done) => {
			chai.request(server)
			.post('/auth/register')
			.send({
				username: 'henry',
				password: 'scholl'
			})
			.end((err, res) => {
				should.not.exist(err);
				res.redirects.length.should.eql(0);
				res.status.should.eql(200);
				done();
			});
		});
	});

	describe('POST /auth/login', () => {
		it('should login a user', (done) => {
			chai.request(server)
			.post('/auth/login')
			.send({
				username: 'firstuser',
				password: 'testpass'
			})
			.end((err, res) => {
				should.not.exist(err);
				res.redirects.length.should.eql(0);
				res.status.should.eql(200);
				done();
			});
		});

		it('should not login an unregistered user', (done) => {
			chai.request(server)
			.post('/auth/login')
			.send({
				username: 'nonuser',
				password: 'fakepass'
			})
			.end((err, res) => {
				should.exist(err);
				res.redirects.length.should.eql(0);
				res.status.should.eql(404);
				done();
			});
		});
	});

	describe('GET /auth/logout', () => {
		it('should logout a user', (done) => {
			passportStub.login({
				username: 'firstuser',
				password: 'testpass'
			});
			chai.request(server)
			.get('/auth/logout')
			.end((err, res) => {
				should.not.exist(err);
				res.redirects.length.should.eql(0);
				res.status.should.eql(200);
				done();
			});
		});

	});

});