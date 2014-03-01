var db = require('../models');
var _ = require('lodash');
var nodemailer = require('nodemailer');

exports.view = function(req, res) {
	var user_id = req.query.user_id;
	var offer = req.query.offer;
	console.log('user_id', user_id, "offer", offer);
  
  if (offer == '1') {
  	db.History
	    .findAll({ 
	    	where: { offerer_id: user_id },
      	include: [ db.Item ]
	    })
	    .success(function(histories) {
	    	// look up users involved in message
	    	var userIds = [];
	    	_.each(histories, function(val) {
			    userIds.push(val.requester_id);
			  });

	    	db.User
	    		.findAll({
            where: { id: userIds },
            attributes: ['id', 'first_name', 'last_name']
          })
	    		.success(function(users) {
	    			res.json({ users: users, histories: histories });
	    		});
	    });
  } else {
  	db.History
	    .findAll({
        where: { requester_id: user_id },
	    	include: [ db.Item ]
	    })
	    .success(function(histories) {
	    	var userIds = [];
	    	_.each(histories, function(val) {
			    userIds.push(val.offerer_id);
			  });

	    	db.User
	    		.findAll({
            where: { id: userIds },
            attributes: ['id', 'first_name', 'last_name']
          })
	    		.success(function(users) {
	    			res.json({ users: users, histories: histories });
	    		});
	    });
  }
};

exports.add = function(req, res) {
  db.Item
	  .find({ where: { name: req.body.item }})
	  .success(function(item) {
	  	if (!item) {
        var errorMsg = 'Item "' + req.body.item + '" does not exist in the database.';
        res.send(400, { error: errorMsg });
        return;
      }
	  	db.History
		    .create({
		    	offerer_id: req.body.offerer_id,
		    	requester_id: req.body.requester_id
		    })
		    .success(function(history) {
		    	history.setItem(item);
		      res.send();
		    });
	  });	
};

exports.email = function(req, res) {
	console.log('gonna send an email');
	console.log(req.body);
	var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
	});
	var mailOptions = {
    from: "Epulo <epulo.us@gmail.com>",
    to: req.body.recipient_email,
		bcc: "epulo.us@gmail.com",
    reply_to: req.body.sender_email,
    subject: req.body.subject,
    generateTextFromHTML: true,
    html: "<h1>You have a new message on Epulo!</h1><hr>" +
    			"<p>" + req.body.body + "</p>"
  };
  smtpTransport.sendMail(mailOptions, function(error, response){
    if (error) {
    	console.log(error);
    } else {
    	console.log("Message sent: " + response.message);
    }
    smtpTransport.close(); // shut down the connection pool, no more messages
  });
	res.send();
};