//Requiring internal export
var orm = require("../config/orm.js");

//Creating burger object with internal functions; all, create, and update
var burger = {
  //Finds all burgers
  all: function(cb) {
    orm.all("burgers", function(res) {
      cb(res);
    });
  },
  //Creates new burger object in burgers table with name and devoured status
  create: function(name, cb) {
    orm.create("burgers", [
      "burger_name", "devoured"
    ], [
      name, false
    ], cb);
  },
  //Updates burger based on id
  update: function(id, cb) {
    var condition = "id=" + id;
    orm.update("burgers", {
      devoured: true
    }, condition, cb);
  }
};

//Exports burger for further use
module.exports = burger;
