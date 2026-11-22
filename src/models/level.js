'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    static associate(models) {
      Level.hasMany(models.Quiz, { foreignKey: 'levelId', as: 'quizzes' });
    }
  }
  Level.init({
    levelNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tileRequirements: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {}
    }
  }, {
    sequelize,
    modelName: 'Level',
  });
  return Level;
};