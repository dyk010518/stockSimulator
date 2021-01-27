import React, { Component } from "react";
import '../../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import './StockList.css'
import { get, dayToMonth, dayToQuarter, dayToYear } from "../../../../../utilities";


class StockList extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
    }

    state = {
        categories: [
            {stockSymbol: "CAKE", industry: "ConsumerDiscretionary"},
            {stockSymbol: "COOP", industry: "ConsumerDiscretionary"},
            {stockSymbol: "STORE", industry: "ConsumerDiscretionary"},
            {stockSymbol: "CELL", industry: "ConsumerStaples"},
            {stockSymbol: "GROCE", industry: "ConsumerStaples"},
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
        stocks: [1,2,3,4,5],
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
                                get('/api/getPEData', {
                                    symbol: this.state.marketOneSymbols[i],
                                    day: tempDay,
                                    // below is hard-coded market number
                                    number: "1",
                                }).then((PEObj) => {
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
                                                let revPerShare = parseInt(revObj.revenue)/parseInt(sharesObj.shares);
                                                revPerShare = (Math.round(parseFloat(revPerShare) * 100) / 100).toString()

                                                theObject = {
                                                    stockSymbol: this.state.marketOneSymbols[i],
                                                    stockPrice: stockObj.obj.stockPrice,
                                                    stockIndustry: theIndustry,
                                                    stockMarketCap: MCObj.stockMarketCap,
                                                    stockPE: PEObj.stockPE,
                                                    stockPB: PBObj.stockPB,
                                                    stockPS: revPerShare,
                                                }
                                                theArray.push(theObject);
                                            })

                                        })
                                          

                                        
                                    })
                                })
                            })
                        })
                    }
                    console.log(theArray);
                })
            })
        }
    }

    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        return (
            <div className="StockList-container">
                <h2 className="StockList-header">
                    Stock Search Result
                </h2>
                <div className="StockList-resultHeader">
                    <div className="StockList-resultDesctiption"> Symbol</div>
                    <div className="StockList-resultDesctiption"> Company Name</div>
                    <div className="StockList-resultDesctiption"> Screener</div>

                    {this.state.stocks.map((stock) => (
                        <>
                            <div className="StockList-resultDesctiption"> {stock}</div>
                            <div className="StockList-resultDesctiption"> Company Name</div>
                            <div className="StockList-resultDesctiption"> Screener</div>
                        </>
                    ))}
                </div>

                
            </div>
        );
    }
}

export default StockList;