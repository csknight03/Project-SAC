var db = require("../models");

module.exports = function(app) {

    // FIND ALL CHORES
  app.get("/api/chores", function(req, res) {
    db.Chore.findAll({
      include: [
        {
          model: db.User
        }
      ]
    }).then(function(dbChore) {
      res.json(dbChore);
    });
  });

    // FIND CHORE BY ID
  app.get("/api/chores/:id", function(req, res) {
    db.Chore.findOne({
      where: {
        UserFbid: req.params.id
      },
      include: [
        {
          model: db.User
        }
      ]
    }).then(function(dbChore) {
      res.json(dbChore);
    });
  });

    // CREATE A NEW CHORE
  app.post("/api/chores", function(req, res) {
    db.Chore.create(req.body).then(function(dbChore) {
      res.json(dbChore);
    });
  });

    // DELETE A CHORE
  app.delete("/api/chores/:id", function(req, res) {
    db.Chore.destroy({
      where: {
        UserFbid: req.params.id
      }
    }).then(function(dbChore) {
      res.json(dbChore);
    });
  });

  // UPDATE A NEW CHORE
  app.put("/api/chores/:id", function(req, res) {
    db.Chore.findOne({
      where: {
        UserFbid: req.params.id
      },
      // include: [
      //   {
      //     model: db.User
      //   }
      // ]
    }).then(function(dbChore) {
      db.Chore.updateAttributes({
        status: req.body.status
      });
    });
  });

};