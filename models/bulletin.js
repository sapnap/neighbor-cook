module.exports = function(sequelize, DataTypes) {
  var Bulletin = sequelize.define('Bulletin', {
    status: {
    	type: DataTypes.STRING(16),
    	validate: {
    		isIn: [["open", "expired", "resolved", "deleted"]]
    	}
    },    
    quantity: {
      type: DataTypes.FLOAT,
      validate: {
        // Postgres doesn't support unsigned values
        isPositive: function(value) {
          if (value !== null && value <= 0) {
            throw new Error('Quantity values must be greater than zero');
          }
        }
      }
    },
    unit: DataTypes.STRING,
    expiration: DataTypes.DATE,
    message: DataTypes.STRING,
    type: {
    	type: DataTypes.STRING,
    	validate: {
    		isIn: [["request", "offer"]]
    	}
    }
  }, {
    classMethods: {
      associate: function(models) {
        Bulletin.belongsTo(models.User);
        Bulletin.belongsTo(models.Item);
      }
    }
  });
  return Bulletin;
};