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
const stockPrice = require("./models/stockPrice");
const revenues = require("./models/revenues.js");
const shares = require("./models/shares.js");
const freeCashFlow = require("./models/freecashflow.js");

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

//update recentactivity given id, symbol, buy, bp, sell, sp, amt
router.post("/updateRA", (req, res) => {
  Recentactivity.findOne({
    userId: req.body.id,
  }).then((raObj) => {
    if (raObj){
      let tempArray = [];
      let tpArray = [];
      let tempPrice;
      if (req.body.buy){
        tempArray = raObj.bought.split(",")
        tpArray = raObj.bPrice.split(",")
        tempPrice = parseFloat(req.body.bp)*parseFloat(req.body.amt)
      } else if (req.body.sell){
        tempArray = raObj.sold.split(",")
        tpArray = raObj.sPrice.split(",")
        tempPrice = parseFloat(req.body.sp)*parseFloat(req.body.amt)
      }
      if (tempArray[tempArray.length-1] === ""){
        tempArray = tempArray.slice(0,tempArray.length-1)
      }
      if (tempArray.length > 2){
        tempArray = tempArray.slice(1)
      }
      if (tpArray[tpArray.length-1] === ""){
        tpArray = tpArray.slice(0,tpArray.length-1)
      }
      if (tpArray.length > 2){
        tpArray = tpArray.slice(1)
      }
      tpArray.push(tempPrice.toString())
      tempArray.push(req.body.amt.toString() + " " + req.body.symbol.toString())
      let tempString = ""
      let tpString = ""
      for (let i=0; i<tempArray.length; i++){
        tempString = tempString + tempArray[i] + ","
      }
      for (let i=0; i<tpArray.length; i++){
        tpString = tpString + tpArray[i] + ","
      }
      if (req.body.buy){
        raObj.bought = tempString
        raObj.bPrice = tpString
      } else if (req.body.sell){
        raObj.sold = tempString
        raObj.sPrice = tpString
      }
      raObj.save()
      res.send({msg: "found", obj: raObj})
    } else {
      res.send({msg: "not found", obj: undefined})
    }
  })
})

//get stockMarketCap Data given symbol, month, number
router.get("/getMCData", (req, res) => {
  stockMarketCap.findOne({
    stockSymbol: req.query.symbol,
    month: req.query.month,
    marketNumber: req.query.number,
  }).then((MCObj) => {
    res.send(MCObj)
  })
})

//get stockPE Data given symbol, day, number
router.get("/getPEData", (req, res) => {
  stockPE.findOne({
    stockSymbol: req.query.symbol,
    day: req.query.day,
    marketNumber: req.query.number,
  }).then((PEObj) => {
    res.send(PEObj)
  })
})

//insert freecashflow data
router.post("/insertFCFData", (req, res) => {
  freeCashFlow.findOne({
    stockSymbol: req.body.symbol,
    quarter: req.body.quarter,
    marketNumber: req.body.number,
  }).then((stockObj) => {
    if (!(stockObj)) {
      let newObj = new freeCashFlow({
        stockSymbol: req.body.symbol,
        quarter: req.body.quarter,
        marketNumber: req.body.number,
        freeCashFlow: req.body.fcf,
      })
      newObj.save()
      res.send({ msg: "new", obj: newObj })
    } else {
      res.send({ msg: "already there", obj: stockObj })
    }
  })
})

//insert revenues data
router.post("/insertTRData", (req, res) => {
  revenues.findOne({
    stockSymbol: req.body.symbol,
    quarter: req.body.quarter,
    marketNumber: req.body.number,
  }).then((stockObj) => {
    if (!(stockObj)) {
      let newObj = new revenues({
        stockSymbol: req.body.symbol,
        quarter: req.body.quarter,
        marketNumber: req.body.number,
        revenue: req.body.rev,
      })
      newObj.save()
      res.send({ msg: "new", obj: newObj })
    } else {
      res.send({ msg: "already there", obj: stockObj })
    }
  })
})

//insert stockDebtEquity data
router.post("/insertNDData", (req, res) => {
  stockDebtEquity.findOne({
    stockSymbol: req.body.symbol,
    quarter: req.body.quarter,
    marketNumber: req.body.number,
  }).then((stockObj) => {
    if (!(stockObj)) {
      let newObj = new stockDebtEquity({
        stockSymbol: req.body.symbol,
        quarter: req.body.quarter,
        marketNumber: req.body.number,
        stockDebtEquity: req.body.nd,
      })
      newObj.save()
      res.send({ msg: "new", obj: newObj })
    } else {
      res.send({ msg: "already there", obj: stockObj })
    }
  })
})

//sell a stock
router.post("/sellStock", (req, res) => {
  console.log("reached 2")
  User.findOne({
    _id: req.body.id
  }).then((userObj) => {
    let totalCost = parseFloat(req.body.amt) * parseFloat(req.body.bp)
    let prevCash;
    if (req.body.mn === "1") {
      prevCash = parseFloat(userObj.cashOne)
      userObj.cashOne = (prevCash + totalCost).toString()
    } else if (req.body.mn === "2") {
      prevCash = parseFloat(userObj.cashTwo)
      userObj.cashTwo = (prevCash + totalCost).toString()
    } else if (req.body.mn === "3") {
      prevCash = parseFloat(userObj.cashThree)
      userObj.cashThree = (prevCash + totalCost).toString()
    } else if (req.body.mn === "4") {
      prevCash = parseFloat(userObj.cashFour)
      userObj.cashFour = (prevCash + totalCost).toString()
    }
    userObj.save()
  }).then(() => {
    Boughtstocks.findOne({
      userID: req.body.id,
      stockName: req.body.symbol,
    }).then((stockObj) => {
      let oldPrice = parseFloat(stockObj.costBasis);
      let oldQuantity = parseFloat(stockObj.quantity);
      let newPrice = parseFloat(req.body.bp);
      let newQuantity = parseFloat(req.body.amt);
      let totalQuantity = oldQuantity - newQuantity;

      let tempCostBasis = ((oldPrice*oldQuantity)-(newPrice*newQuantity))/totalQuantity;

      stockObj.costBasis = (Math.round(parseFloat(tempCostBasis) * 100) / 100).toString();
      stockObj.quantity = (parseInt(stockObj.quantity) - parseInt(req.body.amt)).toString()

      stockObj.save()
      res.send(stockObj)
    })
  })
})

//buy a stock
router.post("/buyStock", (req, res) => {
  Boughtstocks.findOne({
    userID: req.body.id,
    stockName: req.body.symbol,
  }).then((stockObj) => {
    User.findOne({
      _id: req.body.id
    }).then((userObj) => {
      let totalCost = parseFloat(req.body.amt) * parseFloat(req.body.bp)
      let prevCash;
      if (req.body.mn === "1") {
        prevCash = parseFloat(userObj.cashOne)
        userObj.cashOne = (prevCash - totalCost).toString()
      } else if (req.body.mn === "2") {
        prevCash = parseFloat(userObj.cashTwo)
        userObj.cashTwo = (prevCash - totalCost).toString()
      } else if (req.body.mn === "3") {
        prevCash = parseFloat(userObj.cashThree)
        userObj.cashThree = (prevCash - totalCost).toString()
      } else if (req.body.mn === "4") {
        prevCash = parseFloat(userObj.cashFour)
        userObj.cashFour = (prevCash - totalCost).toString()
      }
      userObj.save()
    })
    if (!(stockObj)){
      let newObj = new Boughtstocks({
        userID: req.body.id,
        stockName: req.body.symbol,
        quantity: req.body.amt,
        costBasis: req.body.bp,
      })
      newObj.save()
      res.send(newObj)
    } else {
      let oldPrice = parseFloat(stockObj.costBasis);
      let oldQuantity = parseFloat(stockObj.quantity);
      let newPrice = parseFloat(req.body.bp);
      let newQuantity = parseFloat(req.body.amt);
      let totalQuantity = oldQuantity + newQuantity;

      let tempCostBasis = ((oldPrice*oldQuantity)+(newPrice*newQuantity))/totalQuantity;

      stockObj.costBasis = (Math.round(parseFloat(tempCostBasis) * 100) / 100).toString();
      stockObj.quantity = (parseInt(stockObj.quantity) + parseInt(req.body.amt)).toString()
      stockObj.save()
      res.send(stockObj)
    }
  })
})

//get user's boughtstocks of a user given a symbol given id, symbol
router.get("/getBoughtStocks", (req, res) => {
  Boughtstocks.findOne({
    userID: req.query.id,
    stockName: req.query.symbol,
  }).then((stockObj) => {
    res.send(stockObj)
  })
})

//get user's object (contains all markets) given id
router.get("/getCash", (req, res) => {
  User.findOne({
    _id: req.query.id,
  }).then((userObj) => {
    res.send(userObj)
  })
})

//delete shit, don't use
router.get("/deleteErrorEnterprise", (req, res) => {
  /*
  stockEnterprise.deleteMany({
    stockSymbol: "CHEESE"
  }).then((tempObject) => {
    console.log("deleted that shit")
  })
  */
})

//insert stockPB data
router.post("/insertPBData", (req, res) => {
  stockPB.findOne({
    stockSymbol: req.body.symbol,
    month: req.body.month,
    marketNumber: req.body.number,
  }).then((stockObj) => {
    if (!(stockObj)) {
      let newObj = new stockPB({
        stockSymbol: req.body.symbol,
        month: req.body.month,
        marketNumber: req.body.number,
        stockPB: req.body.pb,
      })
      newObj.save()
      res.send({ msg: "new", obj: newObj })
    } else {
      res.send({ msg: "already there", obj: stockObj })
    }
  })
})

//insert stockEnterprise data
router.post("/insertEVData", (req, res) => {
  stockEnterprise.findOne({
    stockSymbol: req.body.symbol,
    month: req.body.month,
    marketNumber: req.body.number,
  }).then((stockObj) => {
    if (!(stockObj)) {
      let newObj = new stockEnterprise({
        stockSymbol: req.body.symbol,
        month: req.body.month,
        marketNumber: req.body.number,
        stockEnterprise: req.body.epv,
      })
      newObj.save()
      res.send({ msg: "new", obj: newObj })
    } else {
      res.send({ msg: "already there", obj: stockObj })
    }
  })
})

//insert stockMarketCap data
router.post("/insertMCData", (req, res) => {
  stockMarketCap.findOne({
    stockSymbol: req.body.symbol,
    month: req.body.month,
    marketNumber: req.body.number,
  }).then((stockObj) => {
    if (!(stockObj)) {
      let newObj = new stockMarketCap({
        stockSymbol: req.body.symbol,
        month: req.body.month,
        marketNumber: req.body.number,
        stockMarketCap: req.body.cap,
      })
      newObj.save()
      res.send({ msg: "new", obj: newObj })
    } else {
      res.send({ msg: "already there", obj: stockObj })
    }
  })
})

//insert stockPE data
router.post("/insertPEData", (req, res) => {
  stockPE.findOne({
    stockSymbol: req.body.symbol,
    day: req.body.day,
    marketNumber: req.body.number,
  }).then((stockObj) => {
    if (!(stockObj)) {
      let newObj = new stockPE({
        stockSymbol: req.body.symbol,
        day: req.body.day,
        marketNumber: req.body.number,
        stockPE: req.body.pe,
      })
      newObj.save()
      res.send({ msg: "new", obj: newObj })
    } else {
      res.send({ msg: "already there", obj: stockObj })
    }
  })
})

//insert stockEPS data
router.post("/insertEPSData", (req, res) => {
  stockEPS.findOne({
    stockSymbol: req.body.symbol,
    year: req.body.year,
    marketNumber: req.body.number,
  }).then((stockObj) => {
    if (!(stockObj)) {
      let newObj = new stockEPS({
        stockSymbol: req.body.symbol,
        year: req.body.year,
        marketNumber: req.body.number,
        stockEPS: req.body.eps,
      })
      newObj.save()
      res.send({ msg: "new", obj: newObj })
    } else {
      res.send({ msg: "already there", obj: stockObj })
    }
  })
})

//insert shares data
router.post("/insertSharesData", (req, res) => {
  shares.findOne({
    stockSymbol: req.body.symbol,
    quarter: req.body.quarter,
    marketNumber: req.body.number,
  }).then((stockObj) => {
    if (!(stockObj)) {
      let newObj = new shares({
        stockSymbol: req.body.symbol,
        quarter: req.body.quarter,
        marketNumber: req.body.number,
        shares: req.body.shares,
      })
      newObj.save()
      res.send({ msg: "new", obj: newObj })
    } else {
      res.send({ msg: "already there", obj: stockObj })
    }
  })
})

//get stockEPS Data given symbol, year, number
router.get("/getEPSData", (req, res) => {
  stockEPS.findOne({
    stockSymbol: req.query.symbol,
    year: req.query.year,
    marketNumber: req.query.number,
  }).then((EPSObj) => {
    res.send(EPSObj)
  })
})

//get all EPS data given symbol, number
router.get("/getAllEPSData", (req, res) => {
  stockEPS.find({
    stockSymbol: req.query.symbol,
    marketNumber: req.query.number,
  }).then((EPSObjs) => res.send(EPSObjs))
})

//insert stockPrice data
router.post("/insertPriceData", (req, res) => {
  stockPrice.findOne({
    stockSymbol: req.body.symbol,
    day: req.body.day,
    marketNumber: req.body.number,
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
      res.send({ msg: "new", obj: newObj })
    } else {
      res.send({ msg: "already there", obj: stockObj })
    }
  })
})

//get stockPrice given symbol, day, number
router.get("/getPriceData", (req, res) => {
  stockPrice.findOne({
    stockSymbol: req.query.symbol,
    day: req.query.day,
    marketNumber: req.query.number,
  }).then((stockObj) => {
    if (!(stockObj)) {
      res.send({ obj: undefined });
    } else {
      res.send({ obj: stockObj })
    }
  })
})

//get all stockPrice given symbol, number
router.get("/getAllPriceData", (req, res) => {
  stockPrice.find({
    stockSymbol: req.query.symbol,
    marketNumber: req.query.number,
  }).then((stockObjs) => {
    res.send(stockObjs)
  })
})

//dont use this
router.get("/dontuseme", (req, res) => {
  /*
  console.log("in api")
  stockDebtEquity.deleteMany({
    stockSymbol: "SOFT"
  }).then((tempObject) => {
    console.log("deleted that shit")
  })
  */
})

//initializes dates for users
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

//get date given id
router.get("/getdate", (req, res) => {
  date.findOne({ userId: req.query.id }).then((dateObj) => {
    res.send(dateObj);
  });
});

//goes to next day given id
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

//updates recent activities given id
router.post('/recentactivities', (req, res) => {

  Recentactivity.findOne({ userId: req.body.id }).then((activityObj) => {
    if (!(activityObj)) {
      const newRA = new Recentactivity({
        userId: req.body.id,
        bought: "",
        bPrice: "",
        sold: "",
        sPrice: "",
      });
      newRA.save()
    }
    res.send(activityObj)
  })
})

//get recentactivity given id
router.get("/getRA", (req, res) => {
  Recentactivity.findOne({ userId: req.query.id }).then((activityObj) => {
    res.send(activityObj);
  });
});

//get all boughtstocks
router.get("/boughtstocks", (req, res) => {
  Boughtstocks.find({ userID: req.query.id }).then((boughtStockObjs) => {
    res.send(boughtStockObjs);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
