/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var index = require('./routes/index');
var profile = require('./routes/profile');
var messages = require('./routes/messages');
var search = require('./routes/search');
var friends = require('./routes/friends');

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Neighbor Cook secret key'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
// The below exposes request-level info to the views, needed for authenticated user
// needs to go before app.router
app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// take a user object and store desired info in session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// used to deserialize the user from info in session
passport.deserializeUser(function(id, done) {
  done(null, {'id': 4, 'name':'Mark Zuckerberg','first_name': 'Mark', 'location': 'Menlo Park, California'});
  // User.findById(id, function(err, user) {
    // done(err, user);
  // });
});

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  console.log('should do database interaction here to pull out current user');
  console.log('User object from facebook', profile);
  // should do database interaction here to pull out current user
  done(null, {'id': profile.id, 'name': profile.name, 'first_name': profile.first_name, 'location': profile.location});
  // User.findOrCreate(..., function(err, user) {
  //   if (err) { return done(err); }
  //   done(null, user);
  // });
}
));

// Source: http://scotch.io/tutorials/javascript/easy-node-authentication-facebook
// route middleware to make sure a user is logged in
function ensureLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();
	// if they aren't redirect them to the home page
	res.redirect('/');
}

// Add routes here
app.get('/', index.view);
app.get('/profile/me', ensureLoggedIn, profile.viewSelf);
app.get('/profile/:id', profile.view);

app.get('/messages', messages.viewInbox);
app.get('/messages/:id', messages.viewConversation);
app.get('/compose/new', messages.composeNew);
//app.post('send', messages.send);

app.get('/search', search.view);
//app.get('/friends', friends.view);

// route for logging out
app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
  	console.log('Successful authentication, redirect home.');
  	console.log(req.user);
    // Successful authentication, redirect to profile.
    res.redirect('/profile/req.user.id');
  });

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
