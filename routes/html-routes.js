var path = require("path");


// Routes
// =============================================================
module.exports = function(app) {

	// add route loads the add.html page,
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/view.html"));
  });

  app.get("/play", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/play.html"));
  });

};