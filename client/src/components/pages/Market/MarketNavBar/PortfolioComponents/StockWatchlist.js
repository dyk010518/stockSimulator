import React, { Component } from "react";
import "../../../../buttonStyles.css";
import { Router } from "@reach/router";
import { Link } from "@reach/router";
import "./StockWatchlist.css";

class StockWatchlist extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
  }

  // required method: whatever is returned defines what
  // shows up on screen
  render() {
    return (
      <>
        <div className="StockWatchlist-container">
          
          <h2 className="StockWatchlist-header">Watchlist</h2>
          <div className="StockWatchlist-item">
            <div className="StockWatchlist-label">
              Symbol
            </div>
            <div className="StockWatchlist-label">
              Price
            </div>
          </div>

          <hr className="StockWatchlist-line"></hr>

          <div className="StockWatchlist-addContainer">
            <div className='StockWatchlist-search'>
                <input type="text" id="symbolSearch" name="symbolSearch" className='StockWatchlist-textArea'></input>
                <button className='StockWatchlist-add'>
                    Add
                </button>
            </div>
          </div>

        </div>
      </>
    );
  }
}

export default StockWatchlist;
