module.exports = function(sequelize, DataTypes) {
  var History = sequelize.define('History', {
    offerer_id: DataTypes.INTEGER,
    requester_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        History.belongsTo(models.Item);
      }
    }
  });
  return History;
};