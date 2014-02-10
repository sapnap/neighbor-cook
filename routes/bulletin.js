var db = require('../models');

exports.view = function(req, res) {
  db.Bulletin
    .findAll({
      include: [ db.Item, db.User ]
    })
    .success(function(bulletins) {
      console.log("bulletins", JSON.stringify(bulletins));
      var data = {
        bulletins: bulletins
      };
      res.redirect('/', data);
    })
    .error(function(err) {
      res.redirect('/');
    });
};

 // id         | integer                  | not null default nextval('"Bulletins_id_seq"'::regclass)
 // status     | character varying(16)    |
 // quantity   | double precision         |
 // unit       | character varying(255)   |
 // expiration | timestamp with time zone |
 // message    | character varying(255)   |
 // type       | character varying(255)   |
 // createdAt  | timestamp with time zone | not null
 // updatedAt  | timestamp with time zone | not null
 // UserId     | integer                  |
 // ItemId     | integer                  |
exports.add = function(req, res) {
  db.Item
    .find({ where: { name: req.body.itemName }})
    .success(function(item) {
      if (!item) {
        // TODO: alert item doesn't exist
        console.log('Item ' + req.body.itemName + ' does not exist');
        res.redirect('/inventory');
      } else {
        addBulletin(req, res, item);
      }
    });
}

exports.create = function(req, res) {
  res.render('bulletin/create');
}

var addBulletin = function(req, res, item, user) {
  db.Bulletin
    .create({
      status: 'open',
      quantity: req.body.quantity,
      unit: req.body.unit,
      expiration: req.body.expiration,
      message: req.body.message,
      type: req.body.type
    })
    .success(function(bulletin){
      bulletin.setItem(item);
      bulletin.setUser(req.user);
      res.redirect('/');
    });
}


