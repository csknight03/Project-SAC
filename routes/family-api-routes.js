// var db = require("../models");

module.exports = function(app, db) {

    // FIND ALL FAMILIES
  app.get("/api/families", function(req, res) {
    db.Family.findAll({
      include: [
        {
          model: db.User,
          include: [
            {
              model: db.Chore
            }
          ]
        }
      ]
    }).then(function(dbFamily) {
      res.json(dbFamily);
    });
  });

    // FIND FAMILY BY ID
  app.get("/api/families/:id", function(req, res) {
    db.Family.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: db.User,
          include: [
            {
              model: db.Chore
            }
          ]
        }
      ]
    }).then(function(dbFamily) {
      res.json(dbFamily);
    });
  });

    // CREATE A NEW FAMILY
  app.post("/api/families", function(req, res) {
    db.Family.create(req.body).then(function(dbFamily) {
      res.json(dbFamily);
    });
  });

    // DELETE A FAMILY
  app.delete("/api/families/:id", function(req, res) {
    db.Family.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbFamily) {
      res.json(dbFamily);
    });
  });

};