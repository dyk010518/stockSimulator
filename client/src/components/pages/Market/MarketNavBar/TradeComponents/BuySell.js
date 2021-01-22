import React, { Component } from "react";
import '../../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import './BuySell.css'
import { cold } from "react-hot-loader";


class BuySell extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
        this.state = ({
            infoList: [],
        })
    }

    componentDidMount() {
        document.getElementById("submit").addEventListener("click", () => {
            this.updateStatus();
        });
    }

    updateStatus = () => {
        this.state.infoList[0] = document.getElementById("stockSymbol").value;
        this.state.infoList[1] = document.getElementById("transaction").value;
        this.state.infoList[2] = Number(document.getElementById("quantity").value);
        this.props.data(this.state.infoList);
    }

    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        console.log()
        return (
            <>
                <div className="BuySell-container">
                    <h2 className="BuySell-header">
                        Trade
                    </h2>

                    <div className="BuySell-item">
                        <label for="symbol" className="BuySell-label">Stock Symbol:</label>
                        <input type="text" id="stockSymbol" className="BuySell-stockSymbol"/>
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

                    <button id="submit" className="BuySell-submit">
                        Submit
                    </button>
                </div>
            </>
        );
    }
}

export default BuySell;