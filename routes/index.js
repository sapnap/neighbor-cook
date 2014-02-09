
/*
 * GET home page.
 */

exports.view = function(req, res){
  console.log(req.session);
  if (req.user) {
    res.render('index', { user: req.user });
  } else {
    res.render('index');
  }
  
};