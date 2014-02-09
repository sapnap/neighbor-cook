/*
Setting up models
 */
var fs = require('fs');
var path = require('path');
var lodash = require('lodash');
var Sequelize = require('sequelize');
var pg = require('pg');
var sequelize = new Sequelize(process.env.POSTGRES_URL, { dialect: 'postgres', native: true });
var db = {};

// load all models
fs.
  readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

// build relations between models
Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);
