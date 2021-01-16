import React, { Component } from "react";
import '../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';

class MarketPortfolio extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
    }

    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        return (
            <>
                <Link to="/Game/Portfolio" >Portfolio</Link>
            </>
        );
    }
}

export default MarketPortfolio;