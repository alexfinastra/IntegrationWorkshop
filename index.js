var express = require('express');
var http 	= require('http');
var path 	= require('path');			//work with paths
var logger = require('morgan');
var bodyParser = require('body-parser');
var index = require('./routes/index');

var app = express();  


const PORT = process.env.PORT || 3000;
app.set('port', PORT);

//app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
//app.use(express.favicon());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public')); 
app.use(express.static(__dirname + '/documentation'));

//routes
app.use('/', index);

http
	.createServer(app)
	.listen(app.get('port'), function(){
  		console.log('Integration Workshops server listening on port ' + app.get('port'));
	}
);
