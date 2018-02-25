

// Routes
// =============================================================
// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// grab the orm from the config
// (remember: connection.js -> orm.js -> route file)

var User = require("../models/user.js")
// Routes
// =============================================================

module.exports = function(app) {


// //api to find high score
 //api to find high score
 app.get("/api", function(req, res) {
    User.findAll({
      where: {
        high_score: {
          $gte: 10
        }
      },
      order: [["high_score", "DESC"]]
    }).then(function(results) {
      res.json(results);
    });
  });



// api to create a new user
  	app.post("/api/new", function(req, res) {
	//take new request
	var user = req.body;
	console.log("User Data:");
    console.log(req.body);
	//then add new user to database
	User.create({
		user_name: user.user_name,
		high_score: null
	});
});



}