// connect to db
// insert seed data into db
// make HTTP requests to API using the test client
// inspect the state of the db after request is made
// tear down the db

// using ES6 promises

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
// requiring in the js files from this app
const User = require('./models/user');
const Nutrition = require('./models/nutrition');
const Workout = require('./models/workout');
const Progress = require('./models/progress');
const {
    app,
    runServer,
    closeServer
} = require('../server');
// import TEST_DATABASE_URL from ('../config');
const {
    DATABASE_URL,
    TEST_DATABASE_URL
} = require('../config');
console.log(TEST_DATABASE_URL);

// chai
const should = chai.should();
chai.use(chaiHttp);

//POST
describe('Nutrition create', function () {
    before(function () {
        return runServer(DATABASE_URL);
    });
    it('should create a new nutrition text', function () {
        return chai.request(app).post('/nutrition/create').then(function (res) {
            res.should.be.json;
        });
    });

    after(function () {
        return closeServer();
    });
});

//GET
describe('Nutrition get user', function () {
    before(function () {
        return runServer(DATABASE_URL);
    });
    it('should get info about user and nutrition', function () {
        return chai.request(app).get('/nutrition/get/demo@email.com').then(function (res) {
            res.should.be.json;
            res.body.should.be.a('object');

        });
    });

    after(function () {
        return closeServer();
    });
});

//DELETE
describe('Nutrition id', function () {
    before(function () {
        return runServer(DATABASE_URL);
    });
    it('should delete text with nutrition', function () {
        return chai.request(app).get('/nutrition/:id').then(function (res) {
            res.should.have.status(204);
        });
    });
    after(function () {
        return closeServer();
    });
});
