
exports.viewSelf = function(req, res) {
    var data = { 'editable': true };
    res.render('profile', data);
};

exports.view = function(req, res) {
    var userID = req.params.id;
    res.render('profile');
};