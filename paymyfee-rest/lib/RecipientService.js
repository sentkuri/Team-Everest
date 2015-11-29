var _ = require('lodash');
var Promise = require('bluebird');
var logger = require('../Logger');
var dbUtil = require('./DbUtil');


var GET_RECIPIENTS = ' select id,firstname,lastname,city,verified,picture from receipient r';
var GET_RECIPIENTSBYID=' select * from receipient r LEFT JOIN family f ON r.id = f.receipientid ';
var INSERT_RECIPIENT='INSERT INTO receipient (firstname, lastname, email, contactnumber, address_line1, address_line2, city, state, pincode, verified,moneyrequired,singleparent,marks,picture) values ' +
    '(:firstname, :lastname, :email, :contactnumber, :address_line1, :address_line2, :city, :state, :pincode, :verified,:moneyrequired,:singleparent,:marks,:picture)';
var PREFIXES = {
    receipient: "r"
};


module.exports = function(dbcp) {
    return {
        getRecipients: _.partial(getAllRecipients, dbcp),
        getRecipientById: _.partial(getRecipientByID,dbcp),
        createReceipient: _.partial(createReceipient,dbcp)
    };
};



function createReceipient(dbcp, options) {

    var orderReqId = 0;
    logger.info("receipient info -------> ", options);

    return new Promise(function(resolve, reject) {
        dbUtil.executeQuery(dbcp, INSERT_RECIPIENT, options)
            .then(function(results) {
                res.json(results);
            })

            .catch(function(err) {
                reject(err);
            });
    });
}



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
        //query += " and r.id = f.receipientid";
    }
    return query;
}
function mapOrderRows(rows, prefixes) {
    var finalResult = _.pluck(rows, prefixes.receipient);
    console.log(JSON.stringify(finalResult));
    return finalResult;

}


