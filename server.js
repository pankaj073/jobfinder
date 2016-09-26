var express = require('express');
var jobModel = require('./models/job');
var jobsData = require('./jobs-data.js');
var app = express();

app.set('views', __dirname);
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'))

require("./jobs-service.js")(jobsData, app);

app.get('*', function(req, res) {
    res.render('index');
});

jobsData.ConnectDB().then(function() {
    console.log('connected to mongodb successfully');
    jobModel.seedJobs();
});

app.listen(3000);