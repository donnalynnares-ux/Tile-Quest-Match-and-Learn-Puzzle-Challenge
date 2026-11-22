'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {
    static associate(models) {
      Quiz.belongsTo(models.Level, { foreignKey: 'levelId', as: 'level' });
    }
  }
  Quiz.init({
    levelId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    options: {
      type: DataTypes.JSON,
      allowNull: false
    },
    correctAnswer: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Quiz',
  });
  return Quiz;
};