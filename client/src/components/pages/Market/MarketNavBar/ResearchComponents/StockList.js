import React, { Component } from "react";
import '../../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import './StockList.css'


class StockList extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
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
                </div>
            </div>
        );
    }
}

export default StockList;