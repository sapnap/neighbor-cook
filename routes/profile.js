var db = require('../models');

exports.view = function(req, res) {
  db.User
    .find(req.params.id)
    .success(function(user) {
      if (!user) {
        // TODO: alert user doesn't exist
        res.redirect('/');
      } else {
        var data = {
          editable: req.user && user.id == req.user.id,
          name: user.getFullname(),
          image: user.img_path,
          location: 'Stanford, CA',
          donated: 19,
          received: 4,
          inventory: [
            {'id': 1, 'name': 'Apple'},
            {'id': 2, 'name': 'Banana'},
            {'id': 3, 'name': 'Milk'},
            {'id': 4, 'name': 'Salt'}
          ]
        };
        res.render('profile', data);
      }
    });
};