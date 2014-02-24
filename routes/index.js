var db = require('../models');
var _ = require('lodash');

/*
 * GET home page.
 */

exports.view = function(req, res){
  res.render('index');
};

exports.splash = function(req, res) {
  res.render('splash');
};

// AJAX call to this endpoint
exports.search = function(req, res) {
	var query = req.query.query;
	db.Item
  .find({ where: { name: query }})
  .success(function(item) {
  	if (!item) {
  		res.json({
	      'query': query,
				'results': []
	    });
  	} else {
      db.InventoryItem
		    .findAll({ where: { ItemId: item.id } }) 

		    // pre-fetching Users with include does not work here
		    .success(function(inventoryItems) {
		    	var userIds = _.pluck(inventoryItems, 'UserId');
          _.remove(userIds, function(id) { return id === req.user.id });

          db.User
		    		.findAll({ where: { id: userIds } })
		    		.success(function(users) {
					    res.json({
					      'query': query,
								'results': users
					    });
		    		});
		    });
    }
  });		
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




