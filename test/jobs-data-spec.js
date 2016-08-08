var expect = require('chai').expect;
var mongoose = require('mongoose');
var jobsModel = require('../models/job.js')

// clear the db everytime to check for seedjobs working fine
function resetJobs(callback) {
    mongoose.connection.collections['jobs'].drop(callback);
}
describe("get jobs", function() {
    it("should never be empty since jobs are seeded", function(done) {
        mongoose.connect('mongodb://localhost/jobfinder', function() {
            resetJobs(function() {
                jobsModel.seedJobs(function() {
                    mongoose.model('Job').find({}).exec(function(error, jobsList) {
                        expect(jobsList.length).to.be.at.least(1);
                        done();
                    });
                });
            });
        });
    });
});