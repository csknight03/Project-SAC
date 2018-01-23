var db = require("../models");

module.exports = function(app) {

    // FIND ALL USERS
  app.get("/api/users", function(req, res) {
    db.User.findAll({
      include: [
        {
          model: db.Family,
          model: db.Chore
        }
      ]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

    // FIND USER BY ID
  app.get("/api/users/:id", function(req, res) {
    db.User.findOne({
      where: {
        Fbid: req.params.id
      },
      include: [
        {
          model: db.Family,
          model: db.Chore
        }
      ]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

      // FIND USER BY FAMILYID
      app.get("/api/users/family/:FamilyUuid", function(req, res) {
        db.User.findAll({
          where: {
            FamilyUuid: req.params.FamilyUuid
          },
          include: [
            {
              model: db.Chore
            }
          ]
        }).then(function(dbUser) {
          res.json(dbUser);
        });
      });


    // CREATE A NEW USER
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

    // DELETE A USER
  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  // UPDATE A USER BY THEIR ID  ** NOT WORKING RIGHT **

  app.put("/api/users/:id", function(req, res) {
    db.User.update(
      req.body,
      {
      where: {
        Fbid: req.params.id
      },
      include: [
        {
          model: db.Family,
          // model: db.Chore
        }
      ]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};