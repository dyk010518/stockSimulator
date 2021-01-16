import React, { Component } from "react";
import '../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import MarketNavBar from './MarketNavBar';

class MarketDashboard extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
    }

    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        return (
            <>
                <MarketNavBar />
                {/* <Link to="/Game/Dashboard" >Dashboard</Link> */}
                <div>Hi</div>
            </>
        );
    }
}

export default MarketDashboard;