var db = require('../models');
var _ = require('lodash');
var nodemailer = require('nodemailer');

exports.view = function(req, res) {
	var user_id = req.query.user_id;
	var offer = req.query.offer;
	console.log('user_id', user_id, "offer", offer);
  
  db.History
    .findAll({
    	where: [ "offerer_id=? or requester_id=?", user_id, user_id ],
    	include: [ db.Item ]
    })
    .success(function(histories) {
    	// look up users involved in message
    	var userIds = [];
    	_.each(histories, function(val) {
		    userIds.push(val.requester_id);
		    userIds.push(val.offerer_id);
		  });

    	db.User
    		.findAll({
          where: { id: userIds },
          attributes: ['id', 'first_name', 'last_name', 'img_path', 'location']
        })
    		.success(function(users) {
    			// HACK: Map user_id to user object. This is needed since we get back two separate lists: history objects and user objects. The user object is possibly shorter if multiple histories from the same user.
    			var user_map = {};
		      _.each(users, function(elem, index) {
		        user_map[elem.id] = elem;  
		      });
		      var requests = [];
		      var offers = [];
		      _.each(histories, function(elem, index) {
		      	if (user_id == elem.requester_id) {
					    requests.push({
					    	'user': user_map[elem.offerer_id],
					    	'history': elem
					   	});
				  	} else {
				  		offers.push({
					    	'user': user_map[elem.requester_id],
					    	'history': elem
					   	});
				  	}
				  });
				  // build 4 types of offers/requests
		      var requestsOther = _.filter(requests, function(elem) { return elem.history.initiator == "requester"; });
		      var requestsInit = _.filter(requests, function(elem) { return elem.history.initiator == "offerer"; });

		      var offersOther = _.filter(offers, function(elem){ return elem.history.initiator == "requester"; });
		      var offersInit = _.filter(offers, function(elem){ return elem.history.initiator == "offerer"; });
    			res.json({ requestsOther: requestsOther, requestsInit: requestsInit, offersOther: offersOther, offersInit: offersInit });
    		});
    });
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
		    	requester_id: req.body.requester_id,
		    	initiator: req.body.initiator
		    })
		    .success(function(history) {
		    	history.setItem(item);
		      res.send();
		    });
	  });	
};

exports.email = function(req, res) {
	console.log('Sending email', req.body);
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
    html: "<h1>You have a new message on <a href='http://www.epulo.us/#/history'>Epulo!</a></h1><hr>" +
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