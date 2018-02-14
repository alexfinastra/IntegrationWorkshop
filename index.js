var express = require('express');
var http 	= require('http');
var path 	= require('path');			//work with paths
var morgan = require('morgan');
//var bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var db = require('./workshops/db');
var index = require('./routes/index');

var app = express();  

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

//app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
//app.use(express.favicon());

app.use(morgan('dev'))
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'integration workshops', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public')); 
app.use(express.static(__dirname + '/documentation'));
app.use(express.static(__dirname + '/workshops'));

//routes
app.use('/', index);

passport.use(new Strategy(
  function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
}));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});




http
	.createServer(app)
	.listen(app.get('port'), function(){
  		console.log('Integration Workshops server listening on port ' + app.get('port'));
	}
);
