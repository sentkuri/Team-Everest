var Promise = require('bluebird');
var _ = require('lodash');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var logger = require('./Logger');
var config = require('./config');
var Err = require('./lib/Err');
var ErrCodes = require('./lib/ErrCodes');
var RecipientService = require('./lib/RecipientService')(config.dbcp);
var dust = require('express-dustjs');
var path = require('path');


// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

/*
app.engine('dust', dust.engine({
    // Use dustjs-helpers
    useHelpers: true
}));

app.set('view engine', 'dust');
app.set('views', path.resolve(__dirname, './views'));
*/
app.set('views', __dirname + '/www');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use("/www", express.static(__dirname + '/www'));
/*----------------------------------------------------------------------------
 Below routes are REST API
----------------------------------------------------------------------------*/
app.get('/students', function(req, res){
    console.log('Request');
    res.render('index.html');
});

app.get('/v1/recipients', function(req, res) {
    var options = _.pick(req.query, ['singleparent','moneyrequired','marks','city']);
    logger.info('Options =>', options); 
    RecipientService.getRecipientById(options)
        .then(function(recipient) {
            res.json(recipient);
        })
        .catch(function(err) {
            res.json(err);
        });
});



app.get('/v1/recipients/:id', function(req, res) {
    var options = _.pick(req.params,['id']);
    logger.info('Options =>', options);
    RecipientService.getRecipientById(options)

        .then(function(recipient) {

            res.json({"student":recipient[0]});
        })
        .catch(function(err) {
            res.json(err);
        });

});


// Below API makes merchant to place one order request.
app.post('/v1/recipients', function(req, res) {
    var options = _.pick(req.body, ['firstname', 'lastname', 'email','contactnumber','address_line1','address_line2','city','state','pincode','verified','moneyrequired','singleparent','marks','picture']);
    logger.info('Options =>', options);
    RecipientService.createReceipient(options)
        .then(function(results) {
            res.json(results);
        })
        .catch(function(err) {
            res.json(err);
        });
});


module.exports = app;
