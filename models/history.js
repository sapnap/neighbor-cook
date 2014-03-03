module.exports = function(sequelize, DataTypes) {
  var History = sequelize.define('History', {
    offerer_id: DataTypes.INTEGER,
    requester_id: DataTypes.INTEGER,
    initiator: {
      type: DataTypes.STRING(16),
      validate: {
        isIn: [["requester", "offerer"]]
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        History.belongsTo(models.Item);
      }
    }
  });
  return History;
};