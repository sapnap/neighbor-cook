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