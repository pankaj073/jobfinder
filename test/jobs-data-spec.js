var expect = require('chai').expect;
var mongoose = require('mongoose');
var jobModel = require('../models/job.js')
var Promise = require('bluebird');
// turn it into a promise so we dont need call back
function resetJobs() {
    return new Promise(function(resolve, reject) {
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    })
}

var connectDB = Promise.promisify(mongoose.connect, {context: mongoose});

describe("get jobs", function() {
    it("should never be empty since jobs are seeded", function(done) {
        connectDB('mongodb://localhost/jobfinder')
        .then(resetJobs)
        .then(jobModel.seedJobs)
        .then(function() {
            mongoose.model('Job').find({}).exec(function(error, jobsList) {
                expect(jobsList.length).to.be.at.least(1);
                done();
            });
        });
    });
});