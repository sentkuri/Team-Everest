var _ = require('lodash');
var Promise = require('bluebird');
var logger = require('../Logger');
var dbUtil = require('./DbUtil');

// As we allow partial orders, Open orders are fetched based on status of each line_item.
var GET_RECIPIENTS = ' select id,firstname,lastname,city,verified,picture from receipient r';
var GET_RECIPIENTSBYID='select * from receipient r,family f   ';

var PREFIXES = {
    receipient: "r"
};


module.exports = function(dbcp) {
    return {
        getRecipients: _.partial(getAllRecipients, dbcp),
        getRecipientById: _.partial(getRecipientByID,dbcp)

    };
};

/**
 * Gets All Recipients
 */
function getAllRecipients(dbcp, options) {
    return new Promise(function(resolve, reject) {
        dbUtil.executeQuery(dbcp, getRecipientsQuery(options), options)
            .then(function(rows) {
                resolve( _.pluck(rows, PREFIXES.receipient));
            })
            .catch(function(err) {
                reject(err);
            });
    });
}

function getRecipientByID(dbcp, options) {
    return new Promise(function(resolve, reject) {
        dbUtil.executeQuery(dbcp, getRecipientByIdQuery(options), options)
            .then(function(rows) {
                resolve( _.pluck(rows, PREFIXES.receipient));
            })
            .catch(function(err) {
                reject(err);
            });
    });
}

function getRecipientsQuery(options) {

    var query = GET_RECIPIENTS;
console.log(options+' is options');
    if (!_.isUndefined(options.singleparent||options.moneyrequired||options.city||options.marks)) {
        query += ' where ';
    }
    if (!_.isUndefined(options.singleparent)) {
        query += " r.singleparent = :singleparent";

    }
    if (!_.isUndefined(options.moneyrequired)) {
        query += " and r.moneyrequired <= :moneyrequired";
    }
    if (!_.isUndefined(options.city)) {
        query += " and r.city = :city";
    }
    if (!_.isUndefined(options.marks)) {
        query += " and r.marks > :marks";
    }
    return query;
}

function getRecipientByIdQuery(options){
    var query = GET_RECIPIENTSBYID;

    if (!_.isUndefined(options.id)) {
        query += "where  r.id = :id";
        query += " and r.id = f.receipientid";
    }
    return query;
}
function mapOrderRows(rows, prefixes) {
    var finalResult = _.pluck(rows, prefixes.receipient);
    console.log(JSON.stringify(finalResult));
    return finalResult;

}


