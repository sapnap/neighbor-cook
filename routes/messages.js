exports.viewInbox = function(req, res) {
    // TODO get messages from server
    var messages = {
        'messages': [
            {'id': 1, 'name': 'Sammy Nguyen', 'title': 'Apples'},
            {'id': 2, 'name': 'Rahul Pandey', 'title': 'Bananas'}
        ]
    };
    res.render('inbox', messages);
};

exports.viewMessage = function(req, res) {
    var messageID = req.params.id;
    var message = { 'id': messageID, 'name': 'Sammy Nguyen', 'title': 'Apples', 'text': 'I want apples!' };
    res.render('message', message);
};

exports.composeNew = function(req, res) {

};

exports.composeResponse = function(req, res) {

};

/* TODO: resolve messages
     asker
     -- got the item you wanted
     -- got the item from another person

     donater
     -- giving the item
     -- don't have the item/don't want to give the item
 */