import React, { Component } from "react";
import '../../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import {Scatter} from 'react-chartjs-2';
import { get, post } from "../../../../../utilities.js";
import './Graph.css'

class Graph extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
        this.state = {
            cash: undefined,
            day: undefined,
            name: undefined,
            price: undefined,
        }
    }

    componentDidMount() {
        get("/api/stockdata").then((stockObjs) => {
            this.setState({
                name: stockObjs[0].stockName,
                stocks: stockObjs,
                stateDate: stockObjs[0].date,
                price: stockObjs[0].stockPrice,
            })
        });
    }
    
    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        if (!this.state.stocks){
            return null
        }
        for (let i=0; i<this.state.stocks.length; i++){
            continue
        }
        
        let date = this.state.stateDate.split("/")
        let month = date[0];
        let day = date[1];
        let year = date[2]
        let yourP = [{
            x: 1,
            y: 10
        }]
        let marketP = [{
            x: 1,
            y: 20
        }]
        return (
            
            <>
                
                <div className="Graph-size">
                    <Scatter
                        data = {{
                            datasets:[{
                                label: 'Your Performance',
                                //data format: points
                                data: yourP,
                                pointBackgroundColor: "white",
                                backgroundColor: [
                                    'rgba(0, 0, 0, 0)',
                                ],
                                showLine: true,
                                borderColor: 'black',
                                borderWidth: 1
                            },
                            {
                                label: 'Market Performance',
                                //data format: points
                                data: marketP,
                                pointBackgroundColor: "red",
                                backgroundColor: [
                                    'rgba(255, 0, 0, 0.75)',
                                ],
                                showLine: true,
                                borderColor: 'black',
                                borderWidth: 1
                                }]
                        }}
                        height={400}
                        width={600}
                        options={{
                            maintainAspectRatio: false,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        callback: function(value, index, values) {
                                            return '$' + value;
                                        }
                                    }
                                }],
                                xAxes: [{
                                    ticks: {
                                        beginAtZero: false,
                                        min: 1,
                                        stepSize: 1,
                                        callback: function(value, index, values) {
                                            return month + '/' + value + '/' + year;
                                        }
                                    }
                                }]
                            },
                            legend: {
                                display: true,
                                labels: {
                                    fontColor: 'rgb(255, 99, 132)'
                                },
                                
                            },
                        }}
                    />
                </div>
            </>
        );
    }
}

export default Graph;