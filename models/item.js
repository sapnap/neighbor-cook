module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        Item.hasMany(models.User, {
          as: 'Owner',
          through: models.InventoryItem
        });
        Item.hasMany(models.Bulletin);
      }
    }
  });
  return Item;
};