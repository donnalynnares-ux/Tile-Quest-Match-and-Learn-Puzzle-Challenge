module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'User',
    {
      user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING(100), allowNull: false },
      email: { type: DataTypes.STRING(150), unique: true, allowNull: false },
      role: { type: DataTypes.STRING(30), allowNull: false, defaultValue: 'HOST' },
    },
    { tableName: 'users', timestamps: true, createdAt: 'created_at', updatedAt: false }
  );