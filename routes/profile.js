
exports.viewSelf = function(req, res) {
    var data = { 'editable': true,
    	'name': 'Sammy Patel',
    	'location': 'Stanford, CA',
    	'donated': 19,
    	'received': 4,
    	'inventory': [
    		{'id': 1, 'name': 'Apple'},
    		{'id': 2, 'name': 'Banana'},
    		{'id': 3, 'name': 'Milk'},
    		{'id': 4, 'name': 'Salt'},
    	] 
     };
    res.render('profile', data);
};

exports.view = function(req, res) {
    var userID = req.params.id;
    var data = { 'editable': false,
    	'name': 'Sammy Patel',
    	'location': 'Stanford, CA',
    	'donated': 19,
    	'received': 4,
    	'inventory': [
    		{'id': 1, 'name': 'Apple'},
    		{'id': 2, 'name': 'Banana'},
    		{'id': 3, 'name': 'Milk'},
    		{'id': 4, 'name': 'Salt'},
    	] 
     };
    res.render('profile', data);
};