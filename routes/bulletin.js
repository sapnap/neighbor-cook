var db = require('../models');
var _ = require('lodash');

exports.view = function(req, res) {
  db.Bulletin
    .findAll({
      where: { status: 'open' },
      include: [ db.Item, db.User ]
    })
    .success(function(bulletins) {
      bulletins = _.sortBy(bulletins, function(bulletin) {
        return bulletin.expiration;
      });
      var authored = _.remove(bulletins, function(bulletin) {
        return req.isAuthenticated() && bulletin.user.id === req.user.id;
      });
      var requests = _.remove(bulletins, function(bulletin) {
        return bulletin.type === 'request'
      });

      var data = {
        offers: bulletins,
        requests: requests,
        authored: authored
      };
      res.json(data);
    });
};

exports.add = function(req, res) {
  db.Item
    .find({
      where: { name: req.body.itemName }
    })
    .success(function(item) {
      if (!item) {
        var errorMsg = 'Item "' + req.body.itemName + '" does not exist.';
        res.send(400, { error: errorMsg });
      } else {
        addBulletin(req, res, item);
      }
    });
};

exports.delete = function(req, res) {
  db.Bulletin
    .find(req.params.id)
    .success(function(bulletin) {
      if (!bulletin) {
        var errorMsg = 'Bulletin with ID ' + req.params.id + ' does not exist.';
        res.send(400, { error: errorMsg });
        return;
      }
      bulletin.status = 'deleted';
      bulletin
        .save()
        .success(function() {
          res.send();
        });
    });
};

var addBulletin = function(req, res, item) {
  if (new Date() >= new Date(req.body.expiration)) {
    var errorMsg = 'Bulletins cannot expire before the current time.';
    res.send(400, { error: errorMsg });
    return;
  }

  db.Bulletin
    .findOrCreate({
      UserId: req.user.id,
      ItemId: item.id,
      type: req.body.type,
      status: 'open'
    })
    .success(function(bulletin, created){
      if (!created) {
        var errorMsg = 'You already have an open bulletin with ' +
                       ((req.body.type === 'offer') ? 'an offer' : 'a request') +
                       ' for ' + item.name + '.';
        res.send(400, { error: errorMsg });
        return;
      }
      bulletin.updateAttributes({
        quantity: req.body.quantity,
        unit: req.body.unit,
        expiration: req.body.expiration,
        message: req.body.message
      }).success(function() {
        res.send();
      });
    });
};
