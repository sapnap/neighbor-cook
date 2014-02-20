var _ = require('lodash');
var db = require('../models');

exports.addItems = function(req, res) {
  var userInfo = req.body.user;
  console.log("user info", userInfo); 
  db.User
    .find({ where: {id: req.user.id} })
    .success(function(user) {
      if (!user) {
        console.log('unable to find user with id ' + req.user.id);
      } else {
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
  console.log("inventory", inventory);
  var inventoryToAdd = [];

  _.each(inventory, function(val, key) {
    if (val) inventoryToAdd.push(key);
  });

  db.Item
    .findAll({ where: { id: inventoryToAdd }})
    .success(function(items) {
      if (!items) {
        console.log('Items do not exist');
      } else {
        req.user
          .setItems(items, {
            quantity: 1,
            unit: 'unit'
          }).success(function() {
            res.send();
          });  
      }      
    });
};