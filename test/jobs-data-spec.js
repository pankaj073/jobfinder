var expect = require('chai').expect;
var mongoose = require('mongoose');
var jobsModel = require('../models/job.js')
var Promise = require('bluebird');
// turn it into a promise so we dont need call back
function resetJobs() {
    return new Promise(function(resolve, reject) {
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    })
}
describe("get jobs", function() {
    it("should never be empty since jobs are seeded", function(done) {
        mongoose.connect('mongodb://localhost/jobfinder', function() {
            resetJobs()
            .then(jobsModel.seedJobs)
            .then(function() {
                mongoose.model('Job').find({}).exec(function(error, jobsList) {
                    expect(jobsList.length).to.be.at.least(1);
                    done();
                });
            });
        });
    });
});