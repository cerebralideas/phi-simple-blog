#!/usr/bin/env node

/**
 * Module dependencies.
 */

var express = require('express'),
	// mongoose = require('mongoose'),
	// fs = require('fs'),
	nodemailer = require('nodemailer'),
	site = require('./routes/index'),
	blog = require('./routes/blog'),
	contact = require('./routes/contact'),
	http = require('http'),
	path = require('path'),
	port = 8080,
	url	= 'http://localhost:' + port + '/';

// mongoose.connect('mongodb://nodejitsu_cerebralideas:12nl4fgohv70om4d56sqiatslf@ds043947.mongolab.com:43947/nodejitsu_cerebralideas_nodejitsudb4073559951');

/* We can access nodejitsu enviroment variables from process.env */
/* Note: the SUBDOMAIN variable will always be defined for a nodejitsu app */
if (process.env.SUBDOMAIN) {
	url = 'http://' + process.env.SUBDOMAIN + '.jit.su/';
}

var app = express();

var smtpTransport = nodemailer.createTransport("SMTP", {

	service: "Gmail",
	auth: {
		user: "cerebralideas@gmail.com",
		pass: "B2QaogHkt6UPgo"
	}
});

app.configure(function () {
	app.set('port', process.env.PORT || port);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	// app.use(express.cookieParser('your secret here'));
	// app.use(express.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(function (req, res) {

		res.render('not-found.jade', { title: '404: Not Found' });
	});
});

app.configure('development', function () {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
	app.use(express.errorHandler());
});

app.get('/', blog.posts);
app.get('/blog/:post/', blog.single);
app.get('/thank-you', contact.thank_you);

http.createServer(app).listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
	console.log(url);
});

app.post('/contact-form', function (req, res) {

	var mailOptions = {},
		name = req.body.name,
		email = req.body.email,
		phone = req.body.phone || 'N/A',
		message = req.body.message;

	if (!name || !email || !message) {

		console.log('User did not complete required fields.');
		res.status(500);
		return;

	} else if (req.body.comment) {

		console.log('Spam detected due to honeypot usage.');
		res.redirect('http://google.com');
		return;
	}

	mailOptions = {

		from: email,
		to: "info@cerebralideas.com",
		subject: name + ' has requested a contact',
		text:   name + ' has requested a contact with the email: ' + email + '\n ' +
				phone + ' was left as a callback number. \n\n' +
				'The message in full:\n ' +
				message + '\n\n' +
				'This message was sent from cerebralideas.com'
	};

	smtpTransport.sendMail(mailOptions, function (error, response) {

		if (error) {

			console.log('There was an error sending the message.');
			console.log(error);

		} else {

			console.log("Message sent: " + response.message);
			res.redirect('/thank-you');
		}

		// if you don't want to use this transport object anymore, uncomment following line
		//smtpTransport.close(); // shut down the connection pool, no more messages
	});
});