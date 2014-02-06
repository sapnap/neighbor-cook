
/*
 * GET home page.
 */

exports.view = function(req, res) {
  res.render('index');
};

exports.login = function(req, res) {
  var authResponse = req.params;
  console.log(authResponse);
  res.render('index');
};