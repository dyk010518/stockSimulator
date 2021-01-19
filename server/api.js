/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Stockdata = require("./models/stockdata");
const Recentactivity = require("./models/recentactivity");
const Boughtstocks = require("./models/boughtstocks");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});


router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.get("/stockdata", (req, res) => {
  Stockdata.find({}).then((stockObjs) => {
    res.send(stockObjs);
  });
});
//type(stockObjs) is [{},{},...]

router.get("/recentactivity", (req, res) => {
  Recentactivity.find({}).then((activityObjs) => {
    res.send(activityObjs);
  });
});

router.get("/boughtstocks", (req, res) => {
  Boughtstocks.find({}).then((boughtStockObjs) => {
    res.send(boughtStockObjs);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
