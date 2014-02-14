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
  
  _.each(inventory, function(val, key) {
    if (val === 'on') inventoryToAdd.push(key);
  });

  db.Item
    .findAll({ where: { name: inventoryToAdd }})
    .success(function(items) {
      if (!items) {
        console.log('Items do not exist');
      } else {
        req.user
          .setItems(items, {
            quantity: 1,
            unit: 'unit'
          }).success(function() {
            res.redirect('/profile/' + req.user.id);
          });  
      }      
    });
  
}