var db = require('../models');

/*
 * GET home page.
 */

exports.view = function(req, res){
	db.Bulletin
    .findAll({
      include: [ db.Item, db.User ]
    })
    .success(function(bulletins) {
      console.log("bulletins", JSON.stringify(bulletins));
      var data = {
      	bulletins: bulletins
      }
      // res.send(JSON.stringify(data));
      res.render('index', data);
    })
    .error(function(err) {
      res.redirect('/');
    });  
};