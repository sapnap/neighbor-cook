var db = require('../models');
var schedule = require('node-schedule');
var _ = require('lodash');

exports.view = function(req, res) {
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
      res.json(data);
    });
};

exports.add = function(req, res) {
  db.Item
    .find({ where: { name: req.body.itemName }})
    .success(function(item) {
      if (!item) {
        // TODO: alert item doesn't exist
        console.log('Item ' + req.body.itemName + ' does not exist');
        res.redirect('/inventory');
      } else {
        addBulletin(req, res, item);
      }
    });
};

exports.create = function(req, res) {
  res.render('bulletin/create');
};

exports.delete = function(req, res) {
  db.Bulletin
    .find(req.params.id)
    .success(function(bulletin) {
      bulletin.status = "deleted";
      bulletin
        .save()
        .success(function() {
          res.redirect('/');
        });
    });
};

var addBulletin = function(req, res, item) {
  // TODO make sure expiration is after current time

  db.Bulletin
    .create({
      status: 'open',
      quantity: req.body.quantity,
      unit: req.body.unit,
      expiration: req.body.expiration.date + ' ' + req.body.expiration.time,
      message: req.body.message,
      type: req.body.type
    })
    .success(function(bulletin){
      bulletin.setItem(item);
      bulletin.setUser(req.user);
      // scheduleExpiration(bulletin, req.body.expiration);
      res.json({ success: true });
    });
};

// TODO test this more
var scheduleExpiration = function(bulletin, expiration) {
  var ymd = _.transform(expiration.date.split('-'), function(result, str) {
    result.push(parseInt(str));
  });
  var hm = _.transform(expiration.time.split(':'), function(result, str) {
    result.push(parseInt(str));
  });

  // months need to be zero-indexed
  var date = new Date(ymd[0], ymd[1]-1, ymd[2], hm[0], hm[1], 0);
  console.log(date);

  schedule.scheduleJob(date, function() {
    bulletin.status = 'expired';
    bulletin.save();
  });
};
