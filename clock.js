var moment = require('moment');
var db = require('./models');

/**
 * Set bulletin status to "expired" for expired, "open" bulletins
 */

var updateBulletins = function() {
  db.Bulletin
    .update(
      { status: 'expired' },
      [ "status = 'open' AND expiration <= ?", moment().format() ] 
    )
    .success(function(affectedRows) {
      console.log('Done! Updated ' + affectedRows + ' bulletins.');
    })
    .error(function(err) {
      console.log(err);
    });
};

// execute every 30 mins
setInterval(
  function() {
    console.log('Updating bulletin statuses...');
    db.sequelize
      .sync()
      .complete(function(err) {
        if (err) throw err;
        else {
          updateBulletins();
        }
      });
  },
  toMilliseconds(30)
);

function toMilliseconds(minutes) {
  return minutes * 60 * 1000;
}
