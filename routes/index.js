
/*
 * GET home page.
 */

exports.view = function(req, res){
  console.log('index.js file');
  res.render('index', {
    'myvar': 'sfdasdf', 
    'projects': [
      { 'name': 'HELLLOOOOO',
        'image': 'lorempixel.people.1.jpeg',
        'id': 'project1'
      },
      { 'name': 'Needfinding',
        'image': 'lorempixel.city.1.jpeg',
        'id': 'project2'
      },
      { 'name': 'Prototyping',
        'image': 'lorempixel.technics.1.jpeg',
        'id': 'project3'
      }
    ]  
  });
};

exports.login = function(req, res){
  console.log('logging user in');
  var authResponse = req.params;
  console.log(authResponse);
  res.render('index', {
    'myvar': 'sfdasdf'  
  });
};