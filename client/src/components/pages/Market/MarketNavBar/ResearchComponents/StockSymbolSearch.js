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
                <h3>
                    Stock Symbol Search
                </h3>
                <div className='StockSymbolSearch-searchAndSubmit'>
                    <textarea>
                        Search
                    </textarea>
                    <button>
                        Submit
                    </button>
                </div>
                    
            </div>
        );
    }
}

export default StockSymbolSearch;