var db = require('../models');
var _ = require('lodash');
var haversine = require('haversine');
var https = require('https');

/*
 * GET home page.
 */

exports.view = function(req, res){
  res.render('index');
};

exports.splash = function(req, res) {
  var data = {
    app_id: process.env.FACEBOOK_APP_ID
  };
  res.render('splash', data);
};

exports.location = function(req, res) {
  https.get('https://maps.googleapis.com/maps/api/geocode/json?' +
            'latlng=' + req.query.gps + '&' +
            'sensor=true&' +
            'result_type=political&' +
            'key=' + process.env.GOOGLE_API_KEY,
    function(response) {
      var body = '';
      response.on('data', function(chunk) {
        body += chunk;
      });
      response.on('end', function() {
        var data = JSON.parse(body);
        res.json({ foundLocation: data.results[0].formatted_address });
      });
    });
};

// AJAX call to this endpoint
exports.search = function(req, res) {
	var query = req.query.query;
	db.Item
  .find({ where: { name: query }})
  .success(function(item) {
  	if (!item) {
      // TODO error item does not exist
  		res.json({
	      'query': query,
				'results': []
	    });
  	} else {
      getItemOwners(item);
    }
  });

  var getItemOwners = function(item) {
    db.InventoryItem
      .findAll({ where: { ItemId: item.id } })
      .success(function(inventoryItems) {
        var userIds = _.pluck(inventoryItems, 'UserId');
        _.remove(userIds, function(id) { return id === req.user.id });

        db.User
          .findAll({
            where: { id: userIds },
            attributes: [ 'id', 'first_name', 'last_name', 'img_path', 'location', 'gps' ]
          })
          .success(function(users) {
            if (req.user.gps) {
              var locationlessUsers = _.remove(users, function(user) {
                return user.gps == null || user.gps === '';
              });
              var sortedUsers = _.sortBy(users, distance).reverse();
              users = sortedUsers.concat(locationlessUsers);
            }
            _.forEach(users, function(user) { delete user.values.gps });

            res.json({
              query: query,
              results: users
            });
          });
      });
  };

  var start = {};
  if (req.user.gps) {
    var coordinates = req.user.gps.split(',');
    start.latitude = parseFloat(coordinates[0]);
    start.longitude = parseFloat(coordinates[1]);
  }

  var distance = function(user) {
    // TODO store gps as lat. and long. (numbers instead of string)
    var coordinates = user.gps.split(',');
    var end = {
      latitude: parseFloat(coordinates[0]),
      longitude: parseFloat(coordinates[1])
    };

    // hacky way of returning distance to the frontend
    user.values.distance = haversine(start, end);
    return user.values.distance;
  };
};

exports.searchTypeahead = function(req, res) {

  // http://www.harryonline.net/scripts/sprintf-javascript/385
  function sprintf(format) {
    for( var i=1; i < arguments.length; i++ ) {
      format = format.replace( /%s/, arguments[i] );
    }
    return format;
  }

  var where = "name ILIKE '%s%' OR name ILIKE '% %s%' OR name ILIKE '%(%s%'";
  var query = req.query.query;

  db.Item
  .findAll({ 
    where: [ sprintf(where, query, query, query) ],
    attributes: ['name']
  })
  .success(function(items) {
    res.json(items);
  });
};




