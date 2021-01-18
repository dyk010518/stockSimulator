import React, { Component } from "react";
import '../../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import './StockScreener.css'


class StockScreener extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
    }

    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        return (
            <div className='StockScreener-container'>
                <h2 className="StockScreener-header">
                    Stock Symbol Search
                </h2>
                
                <div className="StockScreener-labelSelect">
                    <label for="industry" className="StockScreener-label">Industry:</label>
                    <select name="industry" id="industry" className="StockScreener-select">
                        <option value="any">any</option>
                        <option value="healthcare">healthcare</option>
                        <option value="financial">financial</option>
                        <option value="energy">energy</option>
                        <option value="transportatiob">transportation</option>
                    </select>
                </div>
                

                <div className="StockScreener-labelSelect">
                    <label for="p/e" className="StockScreener-label">P/E:</label>
                    <select name="p/e" id="p/e" className="StockScreener-select">
                        <option value="any">any</option>
                        <option value="lower than 5">lower than 5</option>
                        <option value="5-10">5-10</option>
                        <option value="10-15">10-15</option>
                        <option value="15-20">15-20</option>
                        <option value="higher than 20">higher than 20</option>
                    </select>
                </div>

                <div className="StockScreener-labelSelect">
                    <label for="p/b" className="StockScreener-label">P/B:</label>
                    <select name="p/b" id="p/b" className="StockScreener-select">
                        <option value="any">any</option>
                        <option value="lower than 1">lower than 1</option>
                        <option value="1-3">1-3</option>
                        <option value="3-5">3-5</option>
                        <option value="5-10">5-10</option>
                        <option value="higher than 10">higher than 10</option>
                    </select>
                </div>

                <div className="StockScreener-labelSelect">
                    <label for="marketCap" className="StockScreener-label">Market Cap:</label>
                    <select name="marketCap" id="marketCap" className="StockScreener-select">
                        <option value="any">any</option>
                        <option value="lower than 1B">lower than 1B</option>
                        <option value="1B-10B">1B-10B</option>
                        <option value="10B-50B">10B-50B</option>
                        <option value="50B-100B">50B-100B</option>
                        <option value="higher than 100B">higher than 100B</option>
                    </select>
                </div>
                
            </div>
        );
    }
}

export default StockScreener;