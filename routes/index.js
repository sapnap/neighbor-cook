var db = require('../models');
var _ = require('lodash');

/*
 * GET home page.
 */

exports.view = function(req, res){
  var errorNotLoggedIn = false;
  if (req.query.errorNotLoggedIn) errorNotLoggedIn = true;	
  // TODO expiration times stored in UTC, convert to user time zone
  db.Bulletin
    .findAll({
      where: { status: 'open' },
      include: [ db.Item, db.User ]
    })
    .success(function(bulletins) {
      var authored = _.remove(bulletins, function(bulletin) {
        return req.isAuthenticated() && bulletin.user.id === req.user.id;
      });
      var requests = _.remove(bulletins, function(bulletin) {
        return bulletin.type === 'request'
      });

      var data = {
        offers: bulletins,
        requests: requests,
        authored: authored,
        errorNotLoggedIn: errorNotLoggedIn
      };
      res.render('index', data);
    });
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
		    	userIds = _.pluck(inventoryItems, 'UserId');
		    	// console.log(inventoryItems[0].dataValues);
		    	db.User
		    		.findAll({ where: {id: userIds} })
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