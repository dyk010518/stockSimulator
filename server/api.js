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
const totalValues = require("./models/totalAccountValues");
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
const freecashflow = require("./models/freecashflow.js");

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

//get graph data given id, day, mn. S&P is "MARKET"
router.get('/graphData', (req, res) => {
  let SPP = [];
  let startDay;
  let tempPArray = [];
  if (req.query.day < 6) {
    startDay = 1
    totalDays = parseInt(req.query.day)
  } else {
    startDay = parseInt(req.query.day) - 5
    totalDays = 6
  }
  let tempDay;
  let count = 0;
  for (let i = 0; i < totalDays; i++) {
    //console.log(parseInt(req.query.day))
    tempDay = (parseInt(i) + parseInt(startDay)).toString()
    
    stockPrice.findOne({
      stockSymbol: "MARKET",
      day: tempDay,
      marketNumber: "1",
    }).then((markObj) => {
      tempPArray.push(markObj.stockPrice)
      count = count + 1;
      if (count === (totalDays)) {
        let percentInc;
        for (let j = 0; j < tempPArray.length - 1; j++) {
          percentInc = (parseFloat(tempPArray[j + 1]) - parseFloat(tempPArray[j])) / parseFloat(tempPArray[j])
          SPP.push(percentInc)
        }
        totalValues.findOne({
          userID: req.query.id.toString(),
        }).then((TVObj) => {
          let tempTV;
          if (req.query.mn === "One") {
            tempTV = TVObj.oneTV
          } else if (req.query.mn === "Two") {
            tempTV = TVObj.twoTV
          } else if (req.query.mn === "Three") {
            tempTV = TVObj.threeTV
          } else if (req.query.mn === "Four") {
            tempTV = TVObj.fourTV
          }
          let tempTVArray = tempTV.split(",")
          if (tempTVArray[tempTVArray.length - 1] === "") {
            tempTVArray = tempTVArray.slice(0, tempTVArray.length - 1)
          }
          let returnTVA = []
          let TVPI;
          let countT = 0;
          for (let k = 0; k < tempTVArray.length - 1; k++) {
            TVPI = (parseFloat(tempTVArray[k + 1]) - parseFloat(tempTVArray[k])) / parseFloat(tempTVArray[k])
            returnTVA.push(TVPI)
            countT = countT + 1
            if (countT === (tempTVArray.length - 1)){
              res.send({
                YourPerf: returnTVA,
                SPPerf: SPP,
              })
            }
          }
        })
      }
    })
  }
})

//create totalValues given id, values array
router.post('/createTV', (req, res) => {
  totalValues.findOne({
    userID: req.body.id,
  }).then((TVObj) => {
    if (!(TVObj)) {
      const newTVObj = new totalValues({
        userID: req.body.id,
        oneTV: "10000,",
        twoTV: "10000,",
        threeTV: "10000,",
        fourTV: "10000,",
      })
      newTVObj.save()
    }
  })
})

//get stocks for today and yesterday given day, number (market number)
router.get('/getStocksForTheDay', (req, res) => {
  if (!(req.query.day === "1")) {
    stockPrice.find({
      day: req.query.day,
      marketNumber: req.query.number,
    }).then((todayStockObjs) => {
      stockPrice.find({
        day: (parseInt(req.query.day) - 1).toString(),
        marketNumber: req.query.number,
      }).then((yesterdayStockObjs) => {
        let BGP = 0;
        let BLP = 0;
        let biggestGain = parseFloat(todayStockObjs[0].stockPrice) - parseFloat(yesterdayStockObjs[0].stockPrice);
        let biggestLoss = parseFloat(yesterdayStockObjs[0].stockPrice) - parseFloat(todayStockObjs[0].stockPrice);
        let BGN = todayStockObjs[0].stockSymbol;
        let BLN = todayStockObjs[0].stockSymbol;
        for (let i = 0; i < todayStockObjs.length; i++) {
          if (todayStockObjs[i].stockSymbol === "MARKET") {
            continue
          }
          if (parseFloat(todayStockObjs[i].stockPrice) - parseFloat(yesterdayStockObjs[i].stockPrice) > biggestGain) {
            biggestGain = parseFloat(todayStockObjs[i].stockPrice) - parseFloat(yesterdayStockObjs[i].stockPrice);
            BGP = biggestGain / parseFloat(yesterdayStockObjs[i].stockPrice)
            BGN = todayStockObjs[i].stockSymbol;
          }
          if (parseFloat(yesterdayStockObjs[i].stockPrice) - parseFloat(todayStockObjs[i].stockPrice) > biggestLoss) {
            biggestLoss = parseFloat(yesterdayStockObjs[i].stockPrice) - parseFloat(todayStockObjs[i].stockPrice);
            BLP = biggestLoss / parseFloat(yesterdayStockObjs[i].stockPrice)
            BLN = todayStockObjs[i].stockSymbol;
          }
        }
        res.send({
          bgn: BGN.toString(),
          bln: BLN.toString(),
          bgp: BGP.toString(),
          blp: BLP.toString(),
        })
      })
    })
  }
})

//post totalValues given id, number, valueUpdate
router.post('/updateTotalValues', (req, res) => {
  totalValues.findOne({
    userID: req.body.id,
  }).then((TVObj) => {
    if (TVObj) {
      number = req.body.number
      let tempArray = [];
      if (number === "1") {
        tempArray = TVObj.oneTV.split(",")
      } else if (number === "2") {
        tempArray = TVObj.twoTV.split(",")
      } else if (number === "3") {
        tempArray = TVObj.threeTV.split(",")
      } else if (number === "4") {
        tempArray = TVObj.fourTV.split(",")
      }
      if (tempArray[tempArray.length - 1] === "") {
        tempArray = tempArray.slice(0, tempArray.length - 1)
      }
      if (tempArray.length > 5) {
        tempArray = tempArray.slice(1)
      }
      tempArray.push(req.body.valueUpdate.toString())
      let tempString = "";
      for (let i = 0; i < tempArray.length; i++) {
        tempString = tempString + tempArray[i] + ","
      }
      if (number === "1") {
        TVObj.oneTV = tempString.toString()
      } else if (number === "2") {
        TVObj.twoTV = tempString.toString()
      } else if (number === "3") {
        TVObj.threeTV = tempString.toString()
      } else if (number === "4") {
        TVObj.fourTV = tempString.toString()
      }
      TVObj.save()
      res.send({ obj: TVObj, msg: "success" })
    }
  })
})

//update recentactivity given id, symbol, buy, bp, sell, sp, amt
router.post("/updateRA", (req, res) => {
  Recentactivity.findOne({
    userId: req.body.id,
  }).then((raObj) => {
    if (raObj) {
      let tempArray = [];
      let tpArray = [];
      let tempPrice;
      if (req.body.buy) {
        tempArray = raObj.bought.split(",")
        tpArray = raObj.bPrice.split(",")
        tempPrice = parseFloat(req.body.bp) * parseFloat(req.body.amt)
      } else if (req.body.sell) {
        tempArray = raObj.sold.split(",")
        tpArray = raObj.sPrice.split(",")
        tempPrice = parseFloat(req.body.sp) * parseFloat(req.body.amt)
      }
      if (tempArray[tempArray.length - 1] === "") {
        tempArray = tempArray.slice(0, tempArray.length - 1)
      }
      if (tempArray.length > 2) {
        tempArray = tempArray.slice(1)
      }
      if (tpArray[tpArray.length - 1] === "") {
        tpArray = tpArray.slice(0, tpArray.length - 1)
      }
      if (tpArray.length > 2) {
        tpArray = tpArray.slice(1)
      }
      tpArray.push(tempPrice.toString())
      tempArray.push(req.body.amt.toString() + " " + req.body.symbol.toString())
      let tempString = ""
      let tpString = ""
      for (let i = 0; i < tempArray.length; i++) {
        tempString = tempString + tempArray[i] + ","
      }
      for (let i = 0; i < tpArray.length; i++) {
        tpString = tpString + tpArray[i] + ","
      }
      if (req.body.buy) {
        raObj.bought = tempString
        raObj.bPrice = tpString
      } else if (req.body.sell) {
        raObj.sold = tempString
        raObj.sPrice = tpString
      }
      raObj.save()
      res.send({ msg: "found", obj: raObj })
    } else {
      res.send({ msg: "not found", obj: undefined })
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

//get stockPB Data given symbol, month, number
router.get("/getPBData", (req, res) => {
  stockPB.findOne({
    stockSymbol: req.query.symbol,
    month: req.query.month,
    marketNumber: req.query.number,
  }).then((PBObj) => {
    res.send(PBObj)
  })
})

//get revenue Data given symbol, quarter, number
router.get("/getRevenueData", (req, res) => {
  revenues.findOne({
    stockSymbol: req.query.symbol,
    quarter: req.query.quarter,
    marketNumber: req.query.number,
  }).then((revObj) => {
    res.send(revObj)
  })
})

//get shares Data given symbol, quarter, number
router.get("/getShares", (req, res) => {
  shares.findOne({
    stockSymbol: req.query.symbol,
    quarter: req.query.quarter,
    marketNumber: req.query.number,
  }).then((sharesObj) => {
    res.send(sharesObj)
  })
})

//get debt Data given symbol, quarter, number
router.get("/getDebt", (req, res) => {
  stockDebtEquity.findOne({
    stockSymbol: req.query.symbol,
    quarter: req.query.quarter,
    marketNumber: req.query.number,
  }).then((debtObj) => {
    res.send(debtObj)
  })
})

//get shares FCF given symbol, quarter, number
router.get("/getFCF", (req, res) => {
  freeCashFlow.findOne({
    stockSymbol: req.query.symbol,
    quarter: req.query.quarter,
    marketNumber: req.query.number,
  }).then((FCFObj) => {
    res.send(FCFObj)
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

      let tempCostBasis = ((oldPrice * oldQuantity) - (newPrice * newQuantity)) / totalQuantity;


      stockObj.quantity = (parseInt(stockObj.quantity) - parseInt(req.body.amt)).toString()
      if (parseInt(stockObj.quantity) === 0) {
        stockObj.costBasis = (0).toString()
      } else {
        stockObj.costBasis = (Math.round(parseFloat(tempCostBasis) * 100) / 100).toString();
      }
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
    if (!(stockObj)) {
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

      let tempCostBasis = ((oldPrice * oldQuantity) + (newPrice * newQuantity)) / totalQuantity;

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
    if (stockObj) {
      res.send({ msg: "found", obj: stockObj })
    } else {
      res.send({ msg: "not found", obj: undefined })
    }
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

      newDO.save()
      res.send(newDO)
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
      res.send(newRA)
    } else {
      res.send(activityObj)
    }
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
