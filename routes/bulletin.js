var db = require('../models');

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
  db.Bulletin
    .create({
      status: 'open',
      quantity: req.body.quantity,
      unit: req.body.unit,
      expiration: req.body.expiration,
      message: req.body.message,
      type: req.body.type
    })
    .success(function(bulletin){
      bulletin.setItem(item);
      bulletin.setUser(req.user);
      res.redirect('/');
    });
};


