import React, { Component } from "react";
import "../../../buttonStyles.css";
import { Router } from "@reach/router";
import { Link } from "@reach/router";
import MarketNavBar from "./MarketNavBar";
import StockList from "./ResearchComponents/StockList.js";
import StockScreener from "./ResearchComponents/StockScreener.js";
import StockSymbolSearch from "./ResearchComponents/StockSymbolSearch.js";
import "./MarketResearch.css";

class MarketResearch extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    
  }
  
  // required method: whatever is returned defines what
  // shows up on screen
  render() {
    return (
      <>
        <MarketNavBar
          cash={this.props.cash}
          username={this.props.username}
          marketName={this.props.marketName}
          id={this.props.id}
          updateCash={this.props.updateCash}
          updateDay={this.props.updateDay}
          updateTotalValue={this.updateTotalValue}
        />
        <div className="MarketResearch-row">
          <div className="MarketResearch-column">
            <StockSymbolSearch />
            <StockScreener />
          </div>
          <StockList />
        </div>
      </>
    );
  }
}

export default MarketResearch;
