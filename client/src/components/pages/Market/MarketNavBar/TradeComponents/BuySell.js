import React, { Component } from "react";
import '../../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import './BuySell.css'


class BuySell extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
    }

    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        return (
            <>
                <div className="BuySell-container">
                    <h2 className="BuySell-header">
                        Trade
                    </h2>

                    <div className="BuySell-item">
                        <label for="symbol" className="BuySell-label">Stock Symbol:</label>
                        <input type="text" id="stockSymbol" name="stockSymbol" className="BuySell-stockSymbol"/>
                    </div>

                    <div className="BuySell-item">
                        <label for="transaction" className="BuySell-label">Transaction:</label>
                        <select name="transaction" id="transaction" className="BuySell-select">
                            <option value="buy">buy</option>
                            <option value="sell">sell</option>
                        </select>
                    </div>

                    <div className="BuySell-item">
                        <label for="quantity" className="BuySell-label">Quantity:</label>
                        <input type="text" id="quantity" name="quantity" className="BuySell-quantity"/>
                    </div>

                    <div className="BuySell-item">
                        <label for="quantity" className="BuySell-label">Total Price:</label>
                        <div className="BuySell-info">"Price * Quantity"</div>
                    </div>

                    <button className="BuySell-submit">
                        Submit
                    </button>
                </div>
            </>
        );
    }
}

export default BuySell;