// *********************************************************************************
// html-routes.js
// *********************************************************************************

var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
  
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/families", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/newFamily.html"));
  });

};