
/*
 * GET home page.
 */

exports.view = function(req, res){
  console.log(req.session);
  if (req.user) {     
    console.log('found user', req.user.id, req.user.name);
    res.render('index', {'user': req.user}
    );    
  } else {
    res.render('index');
  }
  
};