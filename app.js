/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

// routes - linking to controllers (what info to retrieve)
var index = require('./routes/index');
var profile = require('./routes/profile');
var messages = require('./routes/messages');
var inventory = require('./routes/inventory');
var bulletin = require('./routes/bulletin');
var inventoryInit = require('./routes/inventoryInit');
var help = require('./routes/help');
var getStart = require('./routes/getStart');

var app = express();
var db = require('./models');

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Neighbor Cook secret key'));
app.use(express.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());
app.use(passport.initialize());
app.use(passport.session());

// The below exposes request-level info to the views, needed for authenticated user
// needs to go before app.router
app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// TODO this makes a db call for every request-inefficient
passport.deserializeUser(function(id, done) {
  db.User
    .find(id)
    .success(function(user) {
      done(null, user);
    })
    .error(function(err) {
      done(err, null);
    });
});

passport.use(new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    // TODO save accessToken somewhere so we can get more data from FB (e.g. friends)

    db.User
      .findOrCreate({ fb_id: profile.id })
      .success(function(user, created) {
        if (!created) {
          // TODO: periodically update user data
          done(null, user);
        } else {
          user.loadFBProfile(profile);
          user
            .save()
            .complete(function(err) {
              if (!!err) {
                // TODO redirect somewhere
                console.log('The instance has not been saved:', err);
              } else {
                done(null, user);
              }
            });
        }
      });
  }
));

// Source: http://scotch.io/tutorials/javascript/easy-node-authentication-facebook
// route middleware to make sure a user is logged in
function ensureLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		next();
  } else {
    // Include error message to be displayed
    // res.redirect('/?errorNotLoggedIn=true');
    // res.json({errorNotLoggedIn: true});
    res.redirect('/sign_in');
  }
}

// pages
app.get('/sign_in', index.sign_in);
app.get('/', ensureLoggedIn, index.view);
app.get('/search', ensureLoggedIn, index.search);
app.get('/profile/:id', ensureLoggedIn, profile.view);
app.get('/', index.view);
app.get('/help', help.view);
app.get('/help/getStart', getStart.view);

// inventory management
app.put('/inventory', ensureLoggedIn, inventoryInit.addItems);
app.get('/inventory', ensureLoggedIn, inventory.view);
app.post('/inventory', ensureLoggedIn, inventory.addItem);
app.put('/inventory/:itemID', ensureLoggedIn, inventory.editItem);
app.delete('/inventory/:itemID', ensureLoggedIn, inventory.deleteItem);

// messaging
app.get('/messages/:id', ensureLoggedIn, messages.composeNew);

// bulletins
app.get('/bulletins', ensureLoggedIn, bulletin.view);
app.post('/bulletins',  ensureLoggedIn, bulletin.add);
app.delete('/bulletins/:id', bulletin.delete);

// login and logout
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/sign_in' }),
  function(req, res) {
    // Successful authentication
    if (req.user.options.isNewRecord) {
      res.redirect('/#/inventory/initialize');
    } else {
      res.redirect('/');
    }
    
  });
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/sign_in');
});

db.sequelize
  .sync()
  .complete(function(err) {
    if (err) throw err;
    else {
      http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
      });
    }
  });
