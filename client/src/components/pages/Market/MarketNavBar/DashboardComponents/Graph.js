import React, { Component } from "react";
import '../../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import {Scatter} from 'react-chartjs-2';


class Graph extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
        this.state = {
            //pass in as props, hard coded for now
            year: "2015",
            month: "3",
            yourP: [{
                x: 2,
                y: 10
            }, {
                x: 3,
                y: 5
            }, {
                x: 10,
                y: 5
            }],
            marketP: [{
                x: 2,
                y: 20
            }, {
                x: 3,
                y: 7
            }, {
                x: 10,
                y: 8 
            }],


        }
    }

    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        let month = this.state.month
        let year = this.state.year
        return (
            
            <>
                
                <div>
                    <Scatter 
                        data = {{
                            datasets:[{
                                label: 'Your Performance',
                                //data format: points
                                data: this.state.yourP,
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
                                data: this.state.marketP,
                                pointBackgroundColor: "red",
                                backgroundColor: [
                                    'rgba(255, 0, 0, 0.5)',
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