var db = require('../models');

exports.view = function(req, res) {
  db.sequelize
    .query(
      'SELECT "Items".*, "InventoryItems"."quantity" as "quantity", ' +
             '"InventoryItems"."unit" as "unit" ' +
        'FROM "Items", "InventoryItems" ' +
        'WHERE "InventoryItems"."UserId"=:userID AND "InventoryItems"."ItemId"="Items"."id"',
      null,
      { raw: true },
      { userID: req.user.id })
    .success(function(items) {
      // TODO: put results into frontend
      res.send(JSON.stringify(items));
    });
};

exports.addItem = function(req, res) {
  var itemName = req.body.itemName;
  var quantity = req.body.quantity;
  var unit = req.body.unit;

  // make sure user doesn't already have the item
  req.user
    .getItems({ name: itemName })
    .success(function(items) {
      console.log(items);
      if (items.length == 0) {
        replace(req, res, itemName, quantity, unit);
      } else {
        // TODO: alert user already has item
        console.log('User already has ' + itemName);
        res.redirect('/inventory');
      }
    });
};

exports.editItem = function(req, res) {
  var itemName = req.body.itemName;
  var quantity = req.body.quantity;
  var unit = req.body.unit;

  replace(req, res, itemName, quantity, unit);
};

exports.deleteItem = function(req, res) {
  db.Item
    .find({ name: req.params.itemName })
    .success(function(item) {
      req.user
        .removeItem(item)
        .success(function() {
          res.redirect('/inventory');
        })
    });
};

var replace = function(req, res, itemName, quantity, unit) {
  db.Item
    .find({ name: itemName })
    .success(function(item) {
      if (!item) {
        // TODO: alert item doesn't exist
        console.log('Item ' + itemName + ' does not exist');
        res.redirect('/inventory');
      } else {
        req.user
          .addItem(item, {
            quantity: quantity,
            unit: unit
          })
          .success(function() {
            res.redirect('/inventory');
          });
      }
    });
};