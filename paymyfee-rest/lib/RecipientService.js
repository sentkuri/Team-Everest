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



function pushNotification(options) {
    console.log('called noti');
    var Client = require('node-rest-client').Client;

    var client = new Client();

    // set content-type header and data as json in args parameter
    var args = {
        data: { "channels": ["PayMyFee"],"data": {
            "alert": "A new student looking for Education Assistance. Tap here to view the details of "+options.firstname+" from "+options.city}
        },
        headers:{"Content-Type": "application/json",
            "X-Parse-Application-Id": "wnM1uE4ZoQsdHA7NZYF0TPDVuM259eAEnWMaaZkA",
            "X-Parse-REST-API-Key":"a3Nwz1kxgWF5Im9zj5zKpUwMHGiAziTu3wAi6cjL"}
    };

    client.post("https://api.parse.com/1/push", args, function(data,response) {
        // parsed response body as js object
        console.log(data);
        // raw response
        console.log(response);
    });
}

function createReceipient(dbcp, options) {

    var orderReqId = 0;
    logger.info("receipient info -------> ", options);

    return new Promise(function(resolve, reject) {
        dbUtil.executeQuery(dbcp, INSERT_RECIPIENT, options)
            .then(function(results) {
                pushNotification(options);
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
    console.log('options is'+options   );
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
    var needAnd = false;
    if (!_.isUndefined(options.singleparent) || !_.isUndefined(options.moneyrequired) || !_.isUndefined(options.city) || !_.isUndefined(options.marks)) {
        query += ' where ';
    }
    if (!_.isUndefined(options.singleparent)) {
        query += " lower(r.singleparent) = lower(:singleparent)";
        needAnd = true;
    }
    if (!_.isUndefined(options.moneyrequired)) {
        if(needAnd){
            query += ' and ';
        }
        query += " r.moneyrequired <= :moneyrequired";
        needAnd = true;
    }
    if (!_.isUndefined(options.city)) {
        if(needAnd){
            query += ' and ';
        }
        query += " lower(r.city) = lower(:city)";
        needAnd = true;
    }
    if (!_.isUndefined(options.marks)) {
        if(needAnd){
            query += ' and ';
        }
        query += " r.marks > :marks";
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


