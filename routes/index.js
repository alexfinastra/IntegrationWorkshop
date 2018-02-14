var express = require('express');
var path 	= require('path');			//work with paths
var nodemailer = require('nodemailer');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {	
	res.sendFile(__dirname + '/public/index.html');
});

router.get('/workshops/:name', function (req, res, next) {	
  var options = {
    root: __dirname + '/../workshops/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.name + ".html";
  res.sendFile(fileName, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', fileName);
    }
  });

});

router.post('/login', 
		passport.authenticate('local', { failureRedirect: '/' }), 
		function(req, res) {  	
    console.log(" ++++ Authenticated +++ " + req.user)
    res.redirect("/workshops/" + req.user["workshopIndex"]);
});

router.get('/logout', function(req, res, next){
		console.log("We are in workshops logout");
    req.logout();
    res.redirect('/');
});

router.post('/schedule', function(req, res, next){
	console.log(" --> /schedule " + JSON.stringify(req.body))

	if(req.body["email"] != null && req.body["email"] != '')
	{
		var transporter = nodemailer.createTransport({
		  service: 'gmail',
		  auth: {
		    user: 'finastra.integration.team@gmail.com',
		    pass: 'koza2012'
		  }
		});

		var mailOptions = {
		  from: 'alexander.perman@finastra.com',
		  to: req.body["email"],
		  subject: 'Integration Workshop schedule',
		  text: "Hi " + req.body["name"] + "\nThank you for interesting in Integration Session Workshop. We will be in touch with you shortly. \n Finastra Integration team"
		};

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    console.log(error);
		  } else {
		    console.log('Email sent: ' + info.response);
		  }
		});

		var mailOptions = {
		  from: 'finastra.integration.team@gmail.com',
		  to: 'alexander.perman@finastra.com',
		  subject: "Integration Workshop - " + req.body["company"],
		  text: "Hi, bro we have a new request from Integration Worshop will following contacts : " + JSON.stringify(req.body) 
		};

		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    console.log(error);
		  } else {
		    console.log('Email sent: ' + info.response);
		  }
		});
	}
	res.redirect('/');
})

module.exports = router;