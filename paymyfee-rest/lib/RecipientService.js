var _ = require('lodash');
var Promise = require('bluebird');
var logger = require('../Logger');
var dbUtil = require('./DbUtil');

// As we allow partial orders, Open orders are fetched based on status of each line_item.
var GET_RECIPIENTS = ' select * from receipient r';


var PREFIXES = {
    receipient: "r"
};


module.exports = function(dbcp) {
    return {
        getRecipients: _.partial(getAllRecipients, dbcp)

    };
};

/**
 * Gets orders based on given options such as order_status, start_date and end_date. 
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


function getRecipientsQuery(options) {
    var query = GET_RECIPIENTS;
    return query;
}


/**
   Maps given order rows based on given column maps and return orders array in below format.  
  
 [
   {
      "id":1,
      "date":"2015-10-28T18:30:00.000Z",
      "status_id":1,
      "lineItems":[
         {
            "id":1,
            "product_id":1,
            "quantity":1,
            "status_id":1
         },
         ....         
      ]
   },
   {
      "id":2,
      "date":"2015-10-09T18:30:00.000Z",
      "status_id":1,
      "lineItems":[
        ...
      ]
   }
] 
**/
/*function mapOrderRows(rows, prefixes) {
    var orderMap = _.reduce(rows, function(map, row) {
        console.log('row is '+row);
        console.log('row is '+JSON.stringify(row));
        _.get(map, row[prefixes.receipient]);

        /!*if (_.isUndefined(o)) {
            //Create new order object if it does not exist.
            o = _.get(row, prefixes.order);
            o.address = _.get(row, prefixes.address);
            o.line_items = [];
            map[o.id] = o;
        }
*!/      return map.push(row[prefixes.receipient]);
        //return map;
    }/!*, {}*!/);
    //return _.values(orderMap);
    return orderMap;
}*/
function mapOrderRows(rows, prefixes) {
    var finalResult = _.pluck(rows, prefixes.receipient);
    /*var finalResult = _.takeWhile(rows, function(row){
        console.log(":::"+JSON.stringify(row[prefixes.receipient]));
       return row[prefixes.receipient];
    });*/
    console.log(JSON.stringify(finalResult));
    return finalResult;
    /*var orderMap = _.reduce(rows, function(map, row) {
        var o = _.get(map, row[prefixes.r]);

          return map;
    }, {});
    return _.values(orderMap);*/
}