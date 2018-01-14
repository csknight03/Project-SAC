var db = require("../models");

module.exports = function(app) {





          // FIND USERS BY *FamilyUuid*
          app.get("/api/families/:id", function(req, res) {
            db.User.findAll({
              where: {
                FamilyUuid: req.params.id
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


          

  //   // FIND ALL FAMILIES
  // app.get("/api/families", function(req, res) {
  //   db.Family.findAll({
  //     include: [
  //       {
  //         model: db.User,
  //         include: [
  //           {
  //             model: db.Chore
  //           }
  //         ]
  //       }
  //     ]
  //   }).then(function(dbFamily) {
  //     res.json(dbFamily);
  //   });
  // });

    // FIND FAMILY BY ID

  //   // CREATE A NEW FAMILY
  // app.post("/api/families", function(req, res) {
  //   db.Family.create(req.body).then(function(dbFamily) {
  //     res.json(dbFamily);
  //   });
  // });

  //   // DELETE A FAMILY
  // app.delete("/api/families/:id", function(req, res) {
  //   db.Family.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbFamily) {
  //     res.json(dbFamily);
  //   });
  //});

};