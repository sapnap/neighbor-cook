var db = require('../models');

exports.view = function(req, res) {
	basicInventory(req, res);
	res.render('inventoryInit');
};

var basicInventory = function(req, res) {
  db.InventoryItem
    //repeat for 10 baseline items
    req.user
      .addItem(item, {
        quantity: quantity,
        unit: unit
      })
       .addItem("Sugar", {
        quantity: 1,
        unit: unit
      })
};