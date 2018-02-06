var express = require('express');
var http 	= require('http');
var path 	= require('path');			//work with paths

var app = express();  

const PORT = process.env.PORT || 3000;
app.set('port', PORT);

//app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
//app.use(express.favicon());


app.use(express.static(__dirname + '/public')); 
app.use(express.static(__dirname + '/documentation'));

//routes
app.use('/*', function(req, res){	    
  res.sendFile(__dirname + '/public/index.html');
});

http
	.createServer(app)
	.listen(app.get('port'), function(){
  		console.log('Integration Workshops server listening on port ' + app.get('port'));
	}
);
