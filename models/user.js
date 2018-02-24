
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,140]

      }
  },
  complete: {
    type: DataTypes.BOOLEAN,
    default: false
  }
  });
  return User;
};
