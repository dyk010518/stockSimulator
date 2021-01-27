import React, { Component } from "react";
import '../../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import './StockList.css'
import { get, dayToMonth, dayToQuarter, dayToYear } from "../../../../../utilities";
// import { parse } from "dotenv/types";


class StockList extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
    }

    state = {
        categories: [
            {stockSymbol: "CHEESE", industry: "Consumer Discretionary"},
            {stockSymbol: "COOP", industry: "Consumer Discretionary"},
            {stockSymbol: "STORE", industry: "Consumer Discretionary"},
            {stockSymbol: "CELL", industry: "Consumer Staples"},
            {stockSymbol: "GROCE", industry: "Consumer Staples"},
            {stockSymbol: "SOLAR", industry: "Utilities"},
            {stockSymbol: "OIL", industry: "Energy"},
            {stockSymbol: "INSUR", industry: "Finance"},
            {stockSymbol: "BANK", industry: "Finance"},
            {stockSymbol: "HINSUR", industry: "Health"},
            {stockSymbol: "BAID", industry: "Health"},
            {stockSymbol: "STICKY", industry: "Industrial"},
            {stockSymbol: "VACC", industry: "Industrial"},
            {stockSymbol: "HOME", industry: "RealEstate"},
            {stockSymbol: "HOOD", industry: "RealEstate"},
            {stockSymbol: "COMP", industry: "Tech"},
            {stockSymbol: "SOFT", industry: "Tech"},
            {stockSymbol: "PHONE", industry: "Tech"},
            {stockSymbol: "CAR", industry: "Transport"},
            {stockSymbol: "SHIP", industry: "Transport"},
        ],
        stockDay: undefined,
        marketOneSymbols: ["CHEESE",
        "COOP",
        "STORE",
        "CELL",
        "GROCE",
        "SOLAR",
        "OIL",
        "INSUR",
        "BANK",
        "HINSUR",
        "BAID",
        "STICKY",
        "VACC",
        "HOME",
        "HOOD",
        "COMP",
        "SOFT",
        "PHONE",
        "CAR",
        "SHIP"],

        stocks: [],
    }

    componentDidMount = () => {
        this.updateStockList();
    }

    updateStockList = () => {
        if(this.props.id) {
            let theArray = [];
            let theObject = {};

            get('/api/getdate', {id: this.props.id }).then((dateObj) => {
                let tempDay = dateObj.one;
                this.setState({
                  stockDay: tempDay,
                }, () => {
                    for(let i=0; i < this.state.marketOneSymbols.length; i++){
                        get('/api/getPriceData', {
                            symbol: this.state.marketOneSymbols[i],
                            day: tempDay,
                            // below is hard-coded market number
                            number: "1",
                        }).then((stockObj) => {
                            let thePrice = (Math.round(parseFloat(stockObj.obj.stockPrice) * 100) / 100).toString();

                            let theIndustry = "";
                            for(let j=0; j<this.state.categories.length; j++){
                                if(this.state.marketOneSymbols[i] === this.state.categories[j].stockSymbol){
                                    theIndustry = this.state.categories[j].industry;
                                    break;
                                }
                            }
                            get('/api/getMCData', {
                                symbol: this.state.marketOneSymbols[i],
                                month: dayToMonth(tempDay),
                                // below is hard-coded market number
                                number: "1",
                            }).then((MCObj) => {
                                let theMC = parseInt(MCObj.stockMarketCap.replaceAll(",", ""));
                                if(theMC > 999999999999){
                                    theMC = Math.round(theMC/1000000000000).toString() + "T";
                                }else if(theMC > 999999999){
                                    theMC = Math.round(theMC/1000000000).toString() + "B"
                                }else{
                                    theMC = Math.round(theMC/1000000).toString() + "M"
                                }
                                    

                                get('/api/getPEData', {
                                    symbol: this.state.marketOneSymbols[i],
                                    day: tempDay,
                                    // below is hard-coded market number
                                    number: "1",
                                }).then((PEObj) => {
                                    let thePE = (Math.round(parseFloat(PEObj.stockPE) * 100) / 100).toString();

                                    get('/api/getPBData', {
                                        symbol: this.state.marketOneSymbols[i],
                                        month: dayToMonth(tempDay),
                                        // below is hard-coded market number
                                        number: "1",
                                    }).then((PBObj) => {
                                        get('/api/getRevenueData', {
                                            symbol: this.state.marketOneSymbols[i],
                                            quarter: dayToQuarter(tempDay),
                                            // below is hard-coded market number
                                            number: "1",
                                        }).then((revObj) => {
                                            get('/api/getShares', {
                                                symbol: this.state.marketOneSymbols[i],
                                                quarter: dayToQuarter(tempDay),
                                                // below is hard-coded market number
                                                number: "1",
                                            }).then((sharesObj) => {
                                                let theRevenue = revObj.revenue.replaceAll(",", "")
                                                let theShare = sharesObj.shares.replaceAll(",", "")

                                                let revPerShare = 4*parseInt(theRevenue)/parseInt(theShare);
                                                revPerShare = (Math.round(parseFloat(revPerShare) * 100) / 100).toString();

                                                get('/api/getDebt', {
                                                    symbol: this.state.marketOneSymbols[i],
                                                    quarter: dayToQuarter(tempDay),
                                                    // below is hard-coded market number
                                                    number: "1",
                                                }).then((debtObj) => {
                                                    let netDebt = parseFloat(debtObj.stockDebtEquity.replaceAll(",", ""));
                                                    let thePB = parseFloat(PBObj.stockPB.replaceAll(",", ""));
                                                    let theEquity = (parseFloat(stockObj.obj.stockPrice)/thePB)*parseFloat(theShare);
                                                    let theDebtEquity = (Math.round(parseFloat(netDebt/theEquity) * 100) / 100).toString();

                                                    get('/api/getFCF', {
                                                        symbol: this.state.marketOneSymbols[i],
                                                        quarter: dayToQuarter(tempDay),
                                                        // below is hard-coded market number
                                                        number: "1",
                                                    }).then((FCFObj) => {
                                                        let theFCF = 4*parseFloat(FCFObj.freeCashFlow.replaceAll(",", ""));
                                                        let theFCFperShare = (Math.round(parseFloat(theFCF/parseInt(theShare)) * 100) / 100).toString();

                                                        theObject = {
                                                            stockSymbol: this.state.marketOneSymbols[i],
                                                            stockPrice: thePrice,
                                                            stockIndustry: theIndustry,
                                                            stockMarketCap: theMC,
                                                            stockPE: thePE,
                                                            stockPB: PBObj.stockPB,
                                                            stockPS: revPerShare,
                                                            debtEquity: theDebtEquity,
                                                            FCFperShare: theFCFperShare,
                                                        }
                                                        theArray.push(theObject);
                                                        if(i===19){
                                                            this.setState({
                                                                stocks: theArray,
                                                            })
                                                        }                                              
                                                    })                                               
                                                })                                            
                                            })
                                        })                                  
                                    })
                                })
                            })
                        })
                    }
                })
            })
            // .then(() => {
            //     this.setState({
            //       stocks: theArray,
            //     }, () => {console.log(this.state.stocks)});
            // })
            
        }
    }

    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        const theStocks = this.state.stocks;
        console.log(theStocks);
        return (
            <div className="StockList-container">
                <h2 className="StockList-header">
                    Stock Search Result
                </h2>
                <div className="StockList-resultHeader">
                    <div className="StockList-resultDesctiption"> Symbol</div>
                    <div className="StockList-resultDesctiption"> Price</div>
                    <div className="StockList-resultDesctiption"> Industry</div>
                    <div className="StockList-resultDesctiption"> Market Cap</div>
                    <div className="StockList-resultDesctiption"> Price/Earning</div>
                    <div className="StockList-resultDesctiption"> Price/Book</div>
                    <div className="StockList-resultDesctiption"> Price/Sales</div>
                    <div className="StockList-resultDesctiption"> Debt/Equity</div>
                    <div className="StockList-resultDesctiption"> Free Cash Flow/Share</div>
                    {/* {console.log(theStocks)} */}
                    {theStocks.map((stock) => (
                        <>
                            <div className="StockList-resultDesctiption"> {stock.stockSymbol}</div>
                            <div className="StockList-resultDesctiption"> {stock.stockPrice}</div>
                            <div className="StockList-resultDesctiption"> {stock.stockIndustry}</div>
                            <div className="StockList-resultDesctiption"> {stock.stockMarketCap}</div>
                            <div className="StockList-resultDesctiption"> {stock.stockPE}</div>
                            <div className="StockList-resultDesctiption"> {stock.stockPB}</div>
                            <div className="StockList-resultDesctiption"> {stock.stockPS}</div>
                            <div className="StockList-resultDesctiption"> {stock.debtEquity}</div>
                            <div className="StockList-resultDesctiption"> {stock.FCFperShare}</div>
                        </>
                    ))}
                </div>

                
            </div>
        );
    }
}

export default StockList;