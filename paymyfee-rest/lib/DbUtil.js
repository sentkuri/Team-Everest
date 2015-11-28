var Promise = require('bluebird');
var _ = require('lodash');
var mysql = require('mysql');
var ErrCodes = require('./ErrCodes');
var Err = require('./Err');
var logger = require('./../Logger');

var SEPARATOR = "_";
var AS = " as "; //Space padding is mandatory , otherwise query will fail to execute

var executeQuery = function(dbcp, query, values) {
    return new Promise(function(resolve, reject) {
        dbcp.getConnection(function(err, conn) {
            var options = {
                sql: formatQuery(query, values),
                nestTables: true
            };
            logger.debug('Executing query: %s', options.sql);
            conn.query(options, function(err, results) {
                if (err) {
                    logger.error('err =>', err);
                    reject(Err(ErrCodes.DB_ERROR, '', err));
                } else {
                    logger.debug('results =>', JSON.stringify(results));
                    resolve(results);
                }
                conn.release();
            });

        });
    });
};

var formatQuery = function(query, values) {
    if (_.isArray(values)) {
        return mysql.format(query, values);
    } else {
        return formatNamedQuery(query, values);
    }
};

var formatNamedQuery = function(query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function(txt, key) {
        if (values.hasOwnProperty(key)) {
            return mysql.escape(values[key]);
        }
        return txt;
    });
};


var _getSelectFields = function(table) {
    var fields = _.map(table.tableData.columns, function(col) {
        return table.prependWith + col + AS + table.tableData.name + SEPARATOR + col;
    });
    return fields.join();
};


/**
   To get comma seprated fields which can be used in SELECT statement.
   
   input: Array of maps where each should have tableData and prependWith as keys, and their corresponding values.
*/
var getSelectFields = function(tables) {
    var fields = _.map(tables, _getSelectFields);
    return fields.join();
};

var getFieldNames = function(tableData) {
    return _.map(tableData.columns, function(col) {
        return tableData.name + SEPARATOR + col;
    });
};

var pickFields = function(rows, tableData) {
    var fields = _.pick(rows, getFieldNames(tableData));
    return _.mapKeys(fields, function(value, key) {
        return key.replace(tableData.name + SEPARATOR, "");
    });
};

module.exports = {
    executeQuery: executeQuery,
    getSelectFields: getSelectFields,
    pickFields: pickFields
};
