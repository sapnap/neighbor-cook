var db = require('../models');
var _ = require('lodash');

/*
 * GET home page.
 */

exports.view = function(req, res){
  res.render('index');
};

// AJAX call to this endpoint
exports.search = function(req, res) {
	var query = req.query.query;
	// TODO: normalize user input according to how query stored in db
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