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
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));


/*----------------------------------------------------------------------------
 Below routes are REST API
----------------------------------------------------------------------------*/

app.get('/v1/recipients', function(req, res) {
    //TODO Do request parames validation [srini]

    RecipientService.getRecipients()
        .then(function(recipient) {
            res.json(recipient);
        })
        .catch(function(err) {
            res.json(err);
        });
});
app.get('/v1/recipientById', function(req, res) {
    //TODO Do request parames validation [srini]
    var options = _.pick(req.query, ['id']);
    logger.info('Options =>', options);
    RecipientService.getRecipientById(options)
        .then(function(recipient) {
            res.json(recipient);
        })
        .catch(function(err) {
            res.json(err);
        });
});
module.exports = app;
