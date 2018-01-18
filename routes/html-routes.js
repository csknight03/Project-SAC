// *********************************************************************************
// html-routes.js
// *********************************************************************************

var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
  
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/families", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/newFamily.html"));
  });

  app.get("/dashboard", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/dashboard.html"));
  });

  app.get("/admin", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/adminView.html"));
  });

};