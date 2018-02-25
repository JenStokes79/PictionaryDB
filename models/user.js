
var Sequelize = require("sequelize");


var sequelize = require("../config/connection.js");



  var User = sequelize.define("User", {
 
    //save as a string
    user_name: {
    	type: Sequelize.STRING
    },
    //save as a integer
    high_score: {
    	type: Sequelize.INTEGER,
    	allowNull: true,
      defaultValue: null
   }
  }, {
  	timestamps: true
  });

User.sync();

  module.exports = User;
