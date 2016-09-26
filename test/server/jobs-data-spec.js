var expect = require('chai').expect;
var mongoose = require('mongoose');
var jobModel = require('../../models/job.js')
var Promise = require('bluebird');
var jobsData = require('../../jobs-data.js');
mongoose.Promise = Promise;
// turn it into a promise so we dont need call back
function resetJobs() {
    return new Promise(function(resolve, reject) {
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    })
}
describe("get jobs", function() {
    var jobs;
    before(function(done) {
        jobsData.connectDB('mongodb://localhost/jobfinder')
        .then(resetJobs)
        .then(jobsData.seedJobs)
        .then(jobsData.findJobs)
        .then(function(collection) {
            jobs = collection;
            done();
        });
    });

    after(function() {
        mongoose.connection.close();
    });

    it("should never be empty since jobs are seeded", function() {
        expect(jobs.length).to.be.at.least(1);
    });
    it("should have a job with a title", function() {
        expect(jobs[0].title).to.not.be.empty;
    });
    it("should have a job with a description", function() {
        expect(jobs[0].description).to.not.be.empty;
    });
});

describe('db save jobs', function() {
    var job = {title: 'Cook', description: 'You will be making bagels'};
    var jobs;

    function saveTestJobs() {
        return jobsData.saveJob(job);
    }

    before(function(done) {
        jobsData.connectDB('mongodb://localhost/jobfinder')
        .then(resetJobs)
        .then(function() { return jobsData.saveJob(job) })
        .then(jobsData.findJobs)
        .then(function setJobs(collection) {
            jobs = collection;
            done();
        });
    });

    after(function() {
        mongoose.connection.close();
    });

    it('should have one job after saving one job', function() {
        expect(jobs).to.have.length(1);
    });
});