var express = require('express');
var app = express();
var expect = require('chai').expect;
var request = require('supertest');

var dataSavedJob;
var db = {
    saveJob: function(job) {
        dataSavedJob = job;
    },
    findJobs: function() {
        var jobs = [
            {title:'Cook',description:'You will be making bagels'},
            {title:'Waiter',description:'You will be putting food on peoples table'},
            {title:'Programmer',description:'You will be mindlessly typing for hours'},
            {title:'Axe Maker',description:'We need many axes made.. so many..'}
        ];
        return new Promise(function(resolve, reject) {
            resolve(jobs);
        });
    }
};

var jobService = require('../../jobs-service.js')(db, app);

describe("get jobs", function() {
    it("should give a json list of jobs", function(done) {
        request(app).get('/api/jobs')
        .expect('Content-Type', /json/)
        .end(function(err, res) {
            expect(res.body).to.be.a('Array');
            done();
        });
    });
});

describe("save jobs", function() {
    it("should validate that title is greater than 4 characters");
    it("should validate that title is less than 40 characters");
    it("should validate that description is greater than 4 characters"); 
    it("should validate that description is less than 25=0 characters");

    var newJob = {title:'Axe Maker',description:'We need many axes made.. so many..'};
    it("should pass the job to the database save", function(done) {
        request(app).post('/api/jobs').send(newJob).end(function(err, res) {
            expect(dataSavedJob).to.deep.equal(newJob);
            done();
        });
    });
    it("should return a status of 200 to the front end if the database saved");
    it("should return a job with an id");
    it("should return an error if the database failed")
})