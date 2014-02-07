
/*
 * GET home page.
 */
var FB = require('fb');

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

exports.login = function(req, res) {
  console.log('logging user in');
  // console.log(req.body);
  var access_token = req.body.authResponse.accessToken;
  var user_id = req.body.authResponse.userID;
  // var url = 'https://graph.facebook.com/' + user_id + "?access_token=" + access_token;
  // console.log(url);
  FB.setAccessToken(access_token);
  FB.api(user_id, function (result) {
    if(!result || result.error) {
     console.log(!result ? 'error occurred' : result.error);
     return;
    }
    console.log(result);
    // have access to full user object
    user = {
      name: result.name,
      id: result.id
    };
  });
  res.render('index');
};