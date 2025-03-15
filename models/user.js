'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Quan hệ nhiều-nhiều với bảng Phim thông qua bảng YeuThich
   
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ten_nguoi_dung: DataTypes.STRING,
    email: DataTypes.STRING,
    mat_khau: DataTypes.STRING,
    phan_quyen: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
