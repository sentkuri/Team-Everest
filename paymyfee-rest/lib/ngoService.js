var _ = require('lodash');
var Promise = require('bluebird');
var logger = require('../Logger');
var dbUtil = require('./DbUtil');


var GET_RECIPIENTS = ' select id,firstname,lastname,city,verified,picture from receipient r';
var GET_RECIPIENTSBYID='select * from receipient r,family f   ';
var INSERT_NGO='INSERT INTO ngo (ngoname, fundinglimit, category) values (:ngoname, :fundinglimit, :category)';
var REGISTER_USER='insert into user(userType,username,password) values(:userType,:username,:password)';
var LOGIN_USER='select userid from user where username=:username and password=:password';
var PREFIXES = {
    receipient: "r",
    user:"user"
};


module.exports = function(dbcp) {
    return {
        getRecipients: _.partial(getAllRecipients, dbcp),
        getRecipientById: _.partial(getRecipientByID,dbcp),
        createNGO: _.partial(createNGO,dbcp),
        registerUser: _.partial(registerUser,dbcp),
        loginUser: _.partial(loginUser,dbcp)
    };
};


function loginUser(dbcp, options) {
    logger.info("user info -------> ", options);
    return new Promise(function(resolve, reject) {
        dbUtil.executeQuery(dbcp, LOGIN_USER, options)
            .then(function(results) {
                console.log('ans came');
                console.log('results are'+ JSON.stringify(results ) );
                console.log('------------------------------------------');
                console.log('Sent:'+ _.pluck(results, PREFIXES.user));
                console.log('------------------------------------------');
              //  res.json(results);
                resolve( _.pluck(results, PREFIXES.user));
            })
            .catch(function(err) {
                reject(err);
            });
    });
}


function registerUser(dbcp, options) {
    logger.info("user info -------> ", options);
    return new Promise(function(resolve, reject) {
        dbUtil.executeQuery(dbcp, REGISTER_USER, options)
            .then(function(results) {
                res.json(results);
            })
            .catch(function(err) {
                reject(err);
            });
    });
}
function createNGO(dbcp, options) {
    logger.info("NGO info -------> ", options);
    return new Promise(function(resolve, reject) {
        dbUtil.executeQuery(dbcp, INSERT_NGO, options)
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
        query += " and r.id = f.receipientid";
    }
    return query;
}
function mapOrderRows(rows, prefixes) {
    var finalResult = _.pluck(rows, prefixes.receipient);
    console.log(JSON.stringify(finalResult));
    return finalResult;

}


