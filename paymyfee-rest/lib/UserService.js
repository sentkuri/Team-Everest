var _ = require('lodash');
var Promise = require('bluebird');
var logger = require('./../Logger');
var Err = require('./Err');
var ErrCodes = require('./ErrCodes');
var dbUtil = require('./DbUtil');
var FETCH_USER = 'select * from user where phonenumber=?';



module.exports = function(dbcp) {
    return {
        fetchUser: _.partial(fetchUserByPhone, dbcp)
    };
};

//Fetches a merchant object based on given name
function fetchUserByPhone(dbcp, phonenumber) {

    return new Promise(function(resolve, reject) {
        dbUtil.executeQuery(dbcp, FETCH_USER, [phonenumber])
            .then(function(users) {
                if (users.length === 0) {
                    reject(Err(ErrCodes.DB_RECORD_NOT_FOUND, 'No matching user record found for ' + phonenumber));
                } else {
                    resolve(user[0]);
                }
            })
            .catch(function(err) {
                reject(err);
            });
    });

}