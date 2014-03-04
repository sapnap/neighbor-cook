var db = require('../models');
var _ = require('lodash');
var fs = require('fs');
var nodemailer = require('nodemailer');

exports.view = function(req, res) {
	var userID = req.user.id;
  
  db.History
    .findAll({
    	where: [ "offerer_id=? OR requester_id=?", userID, userID ],
      order: '"createdAt" DESC',
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
    			// HACK: Map user_id to user object. This is needed since we get back two separate lists: history objects and user objects.
    			//       The user object is possibly shorter if multiple histories from the same user.
    			var userMap = {};
		      _.each(users, function(user) {
		        userMap[user.id] = user;
		      });

		      var requests = [];
		      var offers = [];
		      _.each(histories, function(history) {
		      	if (userID == history.requester_id) {
					    requests.push({
					    	'user': userMap[history.offerer_id],
					    	'history': history
					   	});
				  	} else {
				  		offers.push({
					    	'user': userMap[history.requester_id],
					    	'history': history
					   	});
				  	}
				  });

				  // build 4 types of offers/requests
          // initiations: started by user
          // responses: sent to user
		      var requestResponses = _.filter(requests, function(elem) { return elem.history.initiator == "offerer"; });
		      var requestInitiations = _.filter(requests, function(elem) { return elem.history.initiator == "requester"; });
		      var offersResponses = _.filter(offers, function(elem){ return elem.history.initiator == "requester"; });
		      var offersInitiations = _.filter(offers, function(elem){ return elem.history.initiator == "offerer"; });
    			res.json({
            requestResponses: requestResponses,
            requestInitiations: requestInitiations,
            offerResponses: offersResponses,
            offerInitiations: offersInitiations
          });
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
  templatePath = "./views/email.html";
  templateContent = fs.readFileSync(templatePath, encoding="utf8");
  var html = _.template(templateContent, {
  	'body' : req.body.body,
  	'sender_name' : req.user.first_name + ' ' + req.user.last_name,
  	'sender_id' : req.user.id
  });

  var mailOptions = {
    from: "Epulo <epulo.us@gmail.com>",
    to: req.body.recipient_email,
    bcc: "epulo.us@gmail.com",
    reply_to: req.body.sender_email,
    subject: req.body.subject,
    generateTextFromHTML: true,
    forceEmbeddedImages: true,
    html: html
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