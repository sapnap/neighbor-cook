var db = require('../models');

exports.view = function(req, res) {
  db.sequelize
    .query(
      'SELECT "Items".*, "InventoryItems"."quantity" as "inventoryItem.quantity", ' +
             '"InventoryItems"."unit" as "inventoryItem.unit" ' +
        'FROM "Items", "InventoryItems" ' +
       'WHERE "InventoryItems"."UserId"=:userID AND "InventoryItems"."ItemId"="Items"."id"',
      null,
      { raw: true },
      { userID: req.user.id })
    .success(function(items) {
      res.json({ inventory: items })
    });
};

// getting info from adding to inventory request
exports.addItem = function(req, res) {
  var itemName, quantity, unit;
  if (req.method === 'GET') {
    itemName = req.params.itemName;
    quantity = req.query.quantity;
    unit = req.query.unit;
  } else if (req.method === 'POST') {
    itemName = req.body.itemName;
    quantity = req.body.quantity;
    unit = req.body.unit;
  }

  if (quantity === '') quantity = null;

  // finding item in database
  // TODO allow case insensitive search
  db.Item
    .find({ where: { name: itemName }})
    .success(function(item) {
      if (!item) {
        // TODO allow them to email us so we can add to the DB
        var errorMsg = '"' + itemName + '" does not exist in the database.';
        res.send(400, { error: errorMsg });
      } else {
        addInventoryItem(req, res, item, quantity, unit, false);
      }
    });
};

exports.editItem = function(req, res) {
  var itemID, quantity, unit;
  if (req.method === 'GET') {
    itemID = req.params.itemID;
    quantity = req.query.quantity;
    unit = req.query.unit;
  } else if (req.method === 'PUT') {
    itemID = req.params.itemID;
    quantity = req.body.quantity;
    unit = req.body.unit;
  }

  if (quantity === '') quantity = null;

  db.Item
    .find(itemID)
    .success(function(item) {
      if (!item) {
        var errorMsg = 'Item with id ' + itemID + ' does not exist in the database.';
        res.send(400, { error: errorMsg });
      } else {
        addInventoryItem(req, res, item, quantity, unit, true);
      }
    });
};

exports.deleteItem = function(req, res) {
  db.Item
    .find(req.params.itemID)
    .success(function(item) {
      if (!item) {
        var errorMsg = 'Item with id ' + req.params.itemID +
                       ' does not exist in the database.';
        res.send(400, { error: errorMsg });
      } else {
        req.user
          .removeItem(item)
          .success(function() {
            res.json({ itemID: item.id });
          });
      }
    });
};

/**
 * Adds a new item to a user's inventory.
 * @param req HTTP request object
 * @param res HTTP response object
 * @param item db.Item instance
 * @param quantity
 * @param unit
 * @param replace if the item already exists, whether it should be replaced
 */
var addInventoryItem = function(req, res, item, quantity, unit, replace) {
  db.InventoryItem
    //find item if it exists, find unique user item id pair
    .find({ where: { UserId: req.user.id, ItemId: item.id }})
    .success(function(inventoryItem) {
      if (inventoryItem && !replace) {
        var errorMsg =  'You already have "' + item.name + '" in your inventory.';
        res.send(400, { error: errorMsg });
      } else if (!inventoryItem || replace) {
        req.user
          .addItem(item, {
            quantity: quantity,
            unit: unit
          })
          .success(function() {
            res.json({
              item: item,
              quantity: quantity,
              unit: unit
            });
          });
      }
    });
};