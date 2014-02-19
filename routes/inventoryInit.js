var _ = require('lodash');
var db = require('../models');

exports.view = function(req, res) {
  var data = {
    user: req.user,
    defaultItems: [
      {'item': 'Salt', 'id': 'salt'}, 
      {'item': 'Milk', 'id': 'milk'},
      {'item': 'Eggs', 'id': 'eggs'},
      {'item': 'Butter', 'id': 'butter'},
      {'item': 'Pasta', 'id': 'pasta'},
      {'item': 'Pepper', 'id': 'pepper'},
      {'item': 'Flour', 'id': 'flour'},
      {'item': 'Rice', 'id': 'rice'}
    ]
  };
	res.json(data);
};

exports.addItems = function(req, res) {
  var userInfo = req.body.user;
  console.log("user info", userInfo); 
  db.User
    .find({ where: {id: req.user.id} })
    .success(function(user) {
      if (!user) {
        console.log('unable to find user with id ' + req.user.id);
      } else {
        console.log(user);
        user.updateAttributes({
          email: userInfo.email,
          location: userInfo.location
        }).success(function() {
          console.log("updated user successfully!!");
        });
      }
    })
    .error(function(err) {
      console.log('user info was not updated');
    });
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
};