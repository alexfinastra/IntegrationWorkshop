var express = require('express');
var router = express.Router();
var path 	= require('path');			//work with paths
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {	
	console.log(" --> " + req)
	res.sendFile(__dirname + '/public/index.html');
});

router.post('/schedule', function(req, res, next){
	console.log(" --> /schedule " + JSON.stringify(req.body))
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




	res.redirect('/');
})

module.exports = router;