//npms
var express = require("express");

//Internal exports
var router = express.Router();
var burger = require("../models/burger.js");

// Index route
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  // express callback response by calling burger.selectAllBurger
  burger.all(function(burgerData) {
    // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
    res.render("index", { burger_data: burgerData });
  });
});

// post route to add new burger and redirect to index
router.post("/burgers/create", function(req, res) {
  // Input post to addburger
  burger.create(req.body.burger_name, function(result) {
    console.log(result);
    // Redirects back to index
    res.redirect("/");
  });
});

// put route for burger update then redirects back to index
router.put("/burgers/:id", function(req, res) {
  burger.update(req.params.id, function(result) {
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log(result);
    // Send back response and let page reload from .then in Ajax
    res.sendStatus(200);
  });
});

module.exports = router;
