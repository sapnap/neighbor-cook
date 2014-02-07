/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var index = require('./routes/index');
var profile = require('./routes/profile');
var messages = require('./routes/messages');
var search = require('./routes/search');
var friends = require('./routes/friends');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
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
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/profile/me', profile.viewSelf);
app.get('/profile/:id', profile.view);

app.get('/messages', messages.viewInbox);
app.get('/messages/:id', messages.viewConversation);
app.get('/compose/new', messages.composeNew);
//app.post('send', messages.send);

app.get('/search', search.view);
//app.get('/friends', friends.view);

app.post('/auth/facebook/callback', index.login);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
