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
const Recentactivity = require("./models/recentactivity");
const Boughtstocks = require("./models/boughtstocks");
const date = require("./models/dates");
const stockDebtEquity = require("./models/stockDebtEquity");
const stockDividend = require("./models/stockDividend");
const stockEnterprise = require("./models/stockEnterprise");
const stockEPS = require("./models/stockEPS");
const stockMarketCap = require("./models/stockMarketCap");
const stockPB = require("./models/stockPB");
const stockPE = require("./models/stockPE");
const stockPFCF = require("./models/stockPFCF");
const stockPrice = require("./models/stockPrice");
const stockPS = require("./models/stockPS");

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

router.post("/insertEPSData", (req, res) => {
  stockEPS.findOne({
    stockSymbol: req.body.symbol,
    year: req.body.year,
  }).then((stockObj) => {
    if (!(stockObj)) {
      let newObj = new stockEPS({
        stockSymbol: req.body.symbol,
        year: req.body.year,
        marketNumber: req.body.number,
        stockEPS: req.body.eps,
      })
      newObj.save()
      res.send({msg: "new", obj: newObj})
    } else{
      res.send({msg: "already there", obj: stockObj})
    }
  })
})

router.get("/getEPSData", (req, res) => {
  stockEPS.findOne({
    stockSymbol: req.query.symbol,
    year: req.query.year,
    marketNumber: req.query.number,
  }).then((EPSObj) => res.send(EPSObj))
})

router.post("/insertPriceData", (req, res) => {
  stockPrice.findOne({
    stockSymbol: req.body.symbol,
    day: req.body.day,
  }).then((stockObj) => {
    if (!(stockObj)) {
      let newObj = new stockPrice({
        stockSymbol: req.body.symbol,
        day: req.body.day,
        marketNumber: req.body.number,
        stockPrice: req.body.price,
        yearHigh: req.body.high,
        yearLow: req.body.low,
      })
      newObj.save()
      res.send({msg: "new", obj: newObj})
    } else{
      res.send({msg: "already there", obj: stockObj})
    }
  })
})

router.get("/getPriceData", (req, res) => {
  stockPrice.findOne({
    stockSymbol: req.query.symbol,
    day: req.query.day,
    marketNumber: req.query.number,
  }).then((stockObj) => {
    if(!(stockObj)){
      res.send({obj: undefined});  
    }else{
      res.send({obj: stockObj})
    }
  })
  
})

router.get("/deletePriceData", (req, res) => {
  /*
  console.log("in api")
  stockPrice.deleteMany({
    stockSymbol: req.query.symbol
  }).then((tempObject) => {
    console.log("deleted that shit")
  })
  */
})


//type(stockObjs) is [{},{},...]

router.post('/marketdate', (req, res) => {

  date.findOne({ userId: req.body.id }).then((dateObj) => {
    if (dateObj) {
      res.send(dateObj)
    } else {

      const newDO = new date({
        userId: req.body.id,
        one: "1",
        two: "1",
        three: "1",
        four: "1",
      });

      return newDO.save()
    }
  })
})

router.get("/getdate", (req, res) => {
  date.findOne({ userId: req.query.id }).then((dateObj) => {
    res.send(dateObj);
  });
});

router.post("/nextday", (req, res) => {
  date.findOne({ userId: req.body.id }).then((dateObj) => {
    if (req.body.marketName === "One") {
      dateObj.one = req.body.newDate
    } else if (req.body.marketName === "Two") {
      dateObj.two = req.body.newDate
    } else if (req.body.marketName === "Three") {
      dateObj.three = req.body.newDate
    } else if (req.body.marketName === "Four") {
      dateObj.four = req.body.newDate
    }
    dateObj.save()
    res.send(dateObj)
  });

});

router.post('/recentactivities', (req, res) => {

  Recentactivity.findOne({ userId: req.body.id }).then((activityObj) => {
    if (activityObj) {
      res.send(activityObj)
    } else {

      const newRA = new Recentactivity({
        userId: req.body.id,
        bought: "",
        bPrice: "",
        sold: "",
        sPrice: "",
      });

      return newRA.save()
    }
  })
})

router.get("/getRA", (req, res) => {
  Recentactivity.findOne({ userId: req.query.id }).then((activityObj) => {
    res.send(activityObj);
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
