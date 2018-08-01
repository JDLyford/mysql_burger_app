//Requiring Connection
var connection = require("./connection.js");

//For function to add question marks
function addQM(num) {
  //Assigning an array to a variable
  var arr = [];

  //Functionality pushing "?" into each value in the array
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  //Returning the array
  return arr.toString();
}

//Pushing the object to SQL
function sqlQuery(ob) {
  //Assigning an array to a variable
  var arr = [];

  for (var key in ob) {
    arr.push(key + "=" + ob[key]);
  }

  //Returning the array
  return arr.toString();
}

//Setting up the orm variable to handle creating and updating querys
var orm = {
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // vals is an array of values that we want to save to cols
  // cols are the columns we want to insert the values into
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += addQM(vals.length);
    queryString += ") ";

    //console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // objColVals would be the columns and values that you want to update
  // an example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += sqlQuery(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  }
};

//Exporting to use in burger.js model
module.exports = orm;
