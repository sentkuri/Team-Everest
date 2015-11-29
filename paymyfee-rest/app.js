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
var ngoService = require('./lib/ngoService')(config.dbcp);

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
    RecipientService.getRecipients(options)
        .then(function(recipient) {
            res.setHeader("Access-Control-Allow-Origin","*");
            res.json({"students":recipient});
        })
        .catch(function(err) {
            res.setHeader("Access-Control-Allow-Origin","*");
            res.json(err);
        });
});



app.get('/v1/recipients/:id', function(req, res) {
    var options = _.pick(req.params,['id']);
    logger.info('Options =>', options);
    RecipientService.getRecipientById(options)

        .then(function(recipient) {
            res.setHeader("Access-Control-Allow-Origin","*");
            res.json({"student":recipient[0]});
        })
        .catch(function(err) {
            res.setHeader("Access-Control-Allow-Origin","*");
            res.json(err);
        });

});


app.post('/v1/recipients', function(req, res) {

    var options = _.pick(req.body, ['firstname', 'lastname', 'email','contactnumber','address_line1','address_line2','city','state','pincode','verified','moneyrequired','singleparent','marks','picture']);
    logger.info('Options =>', options);

    RecipientService.createReceipient(options)
        .then(function(results) {
            res.setHeader("Access-Control-Allow-Origin","*");
            res.json(results);
        })
        .catch(function(err) {
            res.setHeader("Access-Control-Allow-Origin","*");
            res.json(err);
        });
});


app.post('/v1/recipients/batch', function(req, res) {
    req.body.forEach(function (entry) {
        var options = _.pick(entry, ['firstname', 'lastname', 'email', 'contactnumber', 'address_line1', 'address_line2', 'city', 'state', 'pincode', 'verified', 'moneyrequired', 'singleparent', 'marks', 'picture']);
        logger.info('Options =>', options);

        RecipientService.createReceipient(options)
            .then(function (results) {
              //  res.setHeader("Access-Control-Allow-Origin", "*");
              //  res.json(results);
            })
            .catch(function (err) {
             //   res.setHeader("Access-Control-Allow-Origin", "*");
              //  res.json(err);
            });
    });
    res.json({success:true});
});

app.post('/v1/ngos', function(req, res) {
    var options = _.pick(req.body, ['ngoname', 'fundinglimit', 'category']);
    logger.info('Options =>', options);
    ngoService.createNGO(options)
        .then(function(results) {
            res.setHeader("Access-Control-Allow-Origin","*");
            res.json(results);
        })
        .catch(function(err) {
            res.setHeader("Access-Control-Allow-Origin","*");
            res.json(err);
        });
});

app.post('/v1/register', function(req, res) {
    var options = _.pick(req.body, ['userType', 'username','password']);
    logger.info('Options =>', options);
    ngoService.registerUser(options)
        .then(function(results) {
            res.setHeader("Access-Control-Allow-Origin","*");
            res.json(results);
        })
        .catch(function(err) {
            res.setHeader("Access-Control-Allow-Origin","*");
            res.json(err);
        });
});


app.post('/v1/login',function(req,res){
    var options= _.pick(req.body,['username','password']);
    logger.info(options);
    ngoService.loginUser(options)
        .then(function(results) {
            res.setHeader("Access-Control-Allow-Origin","*");
            console.log('results at tend'+results);
            res.json(results);
        })
        .catch(function(err) {
            res.setHeader("Access-Control-Allow-Origin","*");
            res.json(err);
        });
});

app.post('/v1/interests',function(req,res){
    var options= _.pick(req.body,['studentid','ngoid']);
    logger.info('option==>'+options);
   // ngoService.addIntrests(options);
});

module.exports = app;
