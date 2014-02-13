var db = require('../models');

/*
 * GET home page.
 */

exports.view = function(req, res){
	var errorNotLoggedIn = false
	if (req.query.errorNotLoggedIn) errorNotLoggedIn = true;
	db.Bulletin
    .findAll({
      include: [ db.Item, db.User ]
    })
    .success(function(bulletins) {
      // console.log("bulletins", JSON.stringify(bulletins));
      var data = {
      	bulletins: bulletins,
      	errorNotLoggedIn: errorNotLoggedIn
      }
      // res.send(JSON.stringify(data));
      res.render('index', data);
    })
    .error(function(err) {
      res.redirect('/');
    });  
};