var db = require('../models');

exports.viewInbox = function(req, res) {
    // TODO get messages from server
    var conversations = {
        'conversations': [
            {'id': 1, 'name': 'Sammy Nguyen', 'title': 'Apples'},
            {'id': 2, 'name': 'Rahul Pandey', 'title': 'Bananas'},
            {'id': 1, 'name': 'Sammy Nguyen', 'title': 'Apples'},
            {'id': 2, 'name': 'Rahul Pandey', 'title': 'Bananas'},
            {'id': 1, 'name': 'Sammy Nguyen', 'title': 'Apples'},
            {'id': 2, 'name': 'Rahul Pandey', 'title': 'Bananas'}
        ]
    };
    res.render('inbox', conversations);
};

exports.viewConversation = function(req, res) {
    var conversationID = req.params.id;
    // TODO: make sure user isn't viewing a conversation they're not participating in

    var data = {
        'recipient': 'Sammy Nguyen',
        'messages': [
            {'userIsAuthor': true, 'text': "Do you have any apples? I need 2.", 'timestamp': '1/23/14 14:23:56'},
            {'userIsAuthor': false, 'text': "Yes, I'll be at home at 6 if you can get them then.", 'timestamp': '1/23/14 14:27:40'},
            {'userIsAuthor': true, 'text': "Sounds good, thanks!", 'timestamp': '1/23/14 14:30:14'},
            {'userIsAuthor': false, 'text': "No problem, see you then.", 'timestamp': '1/23/14 14:35:49'}
        ]
    };
    res.render('message', data);
};

exports.composeNew = function(req, res) {
    console.log(req.query.subject);
    var subject = req.query.subject;
    var offer = (req.query.offer == '1') ? true : false;
    var recipientUserId = req.params.id;
    console.log(recipientUserId);
    console.log(offer);
        
    db.User
        .find({ where: { id: recipientUserId } })
        .success(function(user) {
          if (!user) {
            res.redirect('/');
          } else {
            console.log(user);
            var data = {
                'subject': subject,
                'offer': offer,
                'recipientUser': user
            }
            res.render('message_email', data);
          }
        });    
};

/* TODO: resolve messages
     asker
     -- got the item you wanted
     -- got the item from another person

     donater
     -- giving the item
     -- don't have the item/don't want to give the item
 */