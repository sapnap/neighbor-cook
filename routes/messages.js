var db = require('../models');

exports.composeNew = function(req, res) {
  console.log(req.query.subject);
  var subject = req.query.subject;
  var offer = req.query.offer == '1';
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
        };
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