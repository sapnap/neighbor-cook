var db = require('../models');

exports.view = function(req, res) {
  db.User
    .find({
      where: { id: req.params.id },
      include: [ db.Item ]
    })
    .success(function(user) {
      if (!user) {
        error(res, 'User ' + req.params.id + ' does not exist.');
      } else {
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
      error(res, err.toString());
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
      error(res, 'User ' + req.user.id + ' does not exist.');
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
        error(res, 'User ' + req.params.id + ' does not exist.');
      } else {
        console.log(user);
        var data = {
          'recipient': user
        };
        res.json(data);
      }
    });
};

var error = function(res, message) {
  res.send(400, { error: message });
};