import React, { Component } from "react";
import "../../../buttonStyles.css";
import { Router } from "@reach/router";
import { Link } from "@reach/router";
import MarketNavBar from "./MarketNavBar";
import StockPortfolio from "./PortfolioComponents/StockPortfolio.js";
import StockWatchlist from "./PortfolioComponents/StockWatchlist.js";
import "./MarketPortfolio.css";

class MarketPortfolio extends Component {
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
          totalValue={this.props.totalValue}
          username={this.props.username}
          marketName={this.props.marketName}
          id={this.props.id}
          updateCash={this.props.updateCash}
          updateTotalValue={this.props.updateTotalValue}
        />
        <div className="MarketPortfolio-row">
          <StockPortfolio 
            cash={this.props.cash}
            totalValue={this.props.totalValue}
            username={this.props.username}
            marketName={this.props.marketName}
            id={this.props.id}
            updateCash={this.props.updateCash}
            updateTotalValue={this.props.updateTotalValue}
          />
          <StockWatchlist />
        </div>
      </>
    );
  }
}

export default MarketPortfolio;
