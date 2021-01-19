import React, { Component } from "react";
import '../../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import './StockSymbolSearch.css'


class StockSymbolSearch extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
    }

    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        return (
            <div className="StockSymbolSearch-container">
                <h2 className="StockSymbolSearch-header">
                    Stock Symbol Search
                </h2>
                <div className='StockSymbolSearch-searchAndSubmit'>
                    <input type="text" id="symbolSearch" name="symbolSearch" className='StockSymbolSearch-textArea'></input>
                    <button>
                        Submit
                    </button>
                </div>
                    
            </div>
        );
    }
}

export default StockSymbolSearch;