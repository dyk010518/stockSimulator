import React, { Component } from "react";
import '../../../../buttonStyles.css';
import { Router } from '@reach/router';
import { Link } from '@reach/router';
import { Scatter } from 'react-chartjs-2';
import './Graph.css'
import { get, post } from "../../../../../utilities.js";

class Graph extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
        this.state = {
            cash: undefined,
            day: undefined,
            name: undefined,
            price: undefined,
            yourP: undefined,
            marketP: undefined,
            tday: undefined,
        }
    }

    //marketName is One, Two, Three, or Four
    componentDidMount() {
        get('/api/graphData', {
            id: this.props.id,
            day: this.props.day,
            mn: this.props.marketName,
          }).then((resultObj) => {
            this.setState({
              YP: resultObj.YourPerf,
              SPP: resultObj.SPPerf,
            }, () => {
                console.log("in graphjs")
                let ans = []
                let tempObj = {}
                let minDay;
                if (parseInt(this.props.day)<5){
                    minDay = 1
                } else {
                    minDay = parseInt(this.props.day) - 5
                }

                for (let i = 0; i < this.state.YP.length; i++) {
                    tempObj = {
                        x: parseInt(minDay),
                        y: parseFloat(this.state.YP[i])
                    }
                    ans.push(tempObj)
                    minDay = minDay + 1
                }
                let tyourP = ans
        
                ans = []
                tempObj = {}
                if (parseInt(this.props.day)<5){
                    minDay = 1
                } else {
                    minDay = parseInt(this.props.day) - 5
                }
                for (let i = 0; i < this.state.SPP.length; i++) {
                    tempObj = {
                        x: parseInt(minDay),
                        y: parseFloat(this.state.SPP[i])
                    }
                    ans.push(tempObj)
                    minDay = minDay + 1
                }
                let tmarketP = ans
                this.setState({
                    yourP: tyourP,
                    marketP: tmarketP,
                    tday: this.props.day,
                })
            })
          })
    }
    
    componentDidUpdate(){
        //this.setUp()
    }
    createObjs = (inputArr) => {
        let ans = []
        let tempObj = {}
        for (let i = 0; i < inputArr.length; i++) {
            tempObj = {
                x: parseInt(i + 1),
                y: parseFloat(inputArr[i])
            }
            ans.push(tempObj)
        }
        return ans
    }

    setUp = () => {
        let ans = []
        let tempObj = {}
        for (let i = 0; i < this.props.YP.length; i++) {
            tempObj = {
                x: parseInt(i + 1),
                y: parseFloat(this.props.YP[i])
            }
            ans.push(tempObj)
        }
        let tyourP = ans

        ans = []
        tempObj = {}
        for (let i = 0; i < this.props.SPP.length; i++) {
            tempObj = {
                x: parseInt(i + 1),
                y: parseFloat(this.props.SPP[i])
            }
            ans.push(tempObj)
        }
        let tmarketP = ans
        this.setState({
            yourP: tyourP,
            marketP: tmarketP,
            tday: this.props.day,
        })
    }
    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        /*
        if (!this.state.stocks){
            return null
        }
        for (let i=0; i<this.state.stocks.length; i++){
            continue
        }
        */
        console.log(this.props.YP)
        if (true) {
            let minDay;
            if (parseInt(this.state.tday)<5){
                minDay = parseInt(this.state.tday)
            } else {
                minDay = parseInt(this.state.tday) - 5
            }
            
            console.log(this.state.yourP)
            return (

                <>

                    <div >
                        <Scatter
                            data={{
                                datasets: [{
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
                                            callback: function (value, index, values) {
                                                return '%' + value;
                                            }
                                        }
                                    }],
                                    xAxes: [{
                                        ticks: {
                                            beginAtZero: false,
                                            min: parseInt(minDay),
                                            max: parseInt(this.state.tday),
                                            stepSize: 1,
                                            callback: function (value, index, values) {
                                                return "Day " + value;
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
        } else {
            return (null)
        }

    }
}

export default Graph;