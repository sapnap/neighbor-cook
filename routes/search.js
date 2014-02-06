
exports.view = function(req, res) {
		var query = req.query.query;
		if (query === undefined) {
			res.render('search');
		} else {
			console.log(query);
			data = {
				'query': query,
				'results': [
					{'name': 'Rahul', 'id': '1', 'location': 'Stanford, CA', 'quantity': 3},
					{'name': 'Sammy', 'id': '2', 'location': 'Menlo Park, CA', 'quantity': 1},
					{'name': 'Sapna', 'id': '3', 'location': 'Stanford, CA', 'quantity': 0},
				]
			};
			res.render('search', data);
		}
};