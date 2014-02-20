var db = require('../models');

exports.view = function(req, res) {
  db.User
    .find({
      where: { id: req.params.id },
      include: [ db.Item ]
    })
    .success(function(user) {
      if (!user) {
        // TODO: alert user doesn't exist
        console.log('User ' + req.params.id + ' does not exist');
        res.json('/');
      } else {
        console.log(JSON.stringify(user.items));
        var data = {
          id: user.id,
          editable: req.isAuthenticated() && user.id == req.user.id,
          name: user.getFullname(),
          image: user.img_path,
          location: user.location,
          donated: 19,
          received: 4,
          inventory: user.items
        };
        res.json(data);
      }
    })
    .error(function(err) {
      // TODO alert user of error (given id probably wasn't numeric)
      res.json('/');
    });
};

// Get data of currently signed in user
exports.me = function(req, res) {
  db.User
    .find({ where: { id: req.user.id } })
    .success(function(user) {
      res.json(user);
    })
    .error(function(err) {
      // should never get in here
      res.json('/');
    });
};

exports.contact = function(req, res) {
  db.User
    .find({
      where: { id: req.params.id },
      attributes: [ 'id', 'first_name', 'last_name', 'email' ]
    })
    .success(function(user) {
      if (!user) {
        res.redirect('/');
      } else {
        console.log(user);
        var data = {
          'recipient': user
        };
        res.json(data);
      }
    });
};