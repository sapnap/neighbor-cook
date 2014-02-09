module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    fb_id: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    img_path: DataTypes.STRING,
    location: DataTypes.STRING,
    gps: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Item, {
          through: models.InventoryItem
        });
      }
    },
    instanceMethods: {
      getFullname: function() {
        return [this.first_name, this.last_name].join(' ');
      },
      loadFBProfile: function(profile) {
        this.first_name = profile.name.givenName;
        this.last_name = profile.name.familyName;
        this.gender = profile.gender;
        // TODO: save image instead of linking to facebook
        this.img_path = 'http://graph.facebook.com/' + profile.id + '/picture?height=64&width=64';
      }
    }
  });
  return User;
};