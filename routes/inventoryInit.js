var _ = require('lodash');
var db = require('../models');

exports.view = function(req, res) {
  data = {
    user: req.user,
    defaultItems: [
      {'item': 'Salt', 'id': 'salt'}, 
      {'item': 'Milk', 'id': 'milk'},
      {'item': 'Eggs', 'id': 'eggs'},
      {'item': 'Butter', 'id': 'butter'},
      {'item': 'Pasta', 'id': 'pasta'},
      {'item': 'Pepper', 'id': 'pepper'},
      {'item': 'Flour', 'id': 'flour'},
      {'item': 'Rice', 'id': 'rice'},
    ]
  };
	res.render('inventoryInit', data);
};

exports.addItems = function(req, res) {
  var inventory = req.body.inventory;
  var inventoryToAdd = [];

  for (var inventoryItem in inventory) {
    if (inventory[inventoryItem] === 'on') {
      inventoryToAdd.push(inventoryItem);
    }
  }
  function doRender(){
    res.redirect('/profile/' + req.user.id);
  } 
  // creates a function that only executes after being called a certain number of times.
  var finished = _.after(inventoryToAdd.length, doRender);
  for (var i = 0; i < inventoryToAdd.length; i++) {
    db.Item
      .find({ where: { name: inventoryToAdd[i] }})
      .success(function(item) {
        if (!item) {
          console.log('Item ' + itemName + ' does not exist');
        } else {
          req.user
          .addItem(item, {
            quantity: 1,
            unit: 'unit'
          }).success(function() {
            finished();
          });  
        }      
      });
  }   
}