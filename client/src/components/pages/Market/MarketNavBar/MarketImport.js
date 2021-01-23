import React, { Component } from "react";
import "../../../buttonStyles.css";
import { Router } from "@reach/router";
import { Link } from "@reach/router";
import MarketNavBar from "./MarketNavBar";
import Dropzone from "react-dropzone";
import Papa from "papaparse";
import "./MarketImport.css";
import {get, post} from '../../../../utilities.js'

class MarketImport extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
        this.state = { name: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    componentDidMount() {
        document.getElementById("doanything").addEventListener("click", function() {
            console.log("pressed")
            /*
            get('/api/getPriceData', {
                symbol: "STORE", 
                day: "2728"
            }).then((stockObj) => {
                console.log(stockObj)
            })
            */
            //get('/api/deletePriceData', {symbol: "OIL"})
            /*
            let k=0;
            let sum=0;
            let getInt;
            let getData = () => {
                get('/api/getPriceData', {
                    symbol: "CELL",
                    day: k.toString(),
                }).then((stockObject) => {
                    console.log("got day " + stockObject.day + " for symbol " + stockObject.stockSymbol)
                    if (stockObject){
                        sum = sum+parseInt(stockObject.day)
                    }
                })
                k = k+1
                if (k > 2766){
                    clearInterval(getInt)
                    console.log(sum)
                }
            }
            getInt = setInterval(getData, 20)
            */
        });
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    handleSubmit(event) {
        alert("Trying to submit the form");
        event.preventDefault();
    }

    // only handling one file at a time for now
    // but you can put this inside of a forEach loop
    handleFile(acceptedFiles) {
        const file = acceptedFiles[0];
        Papa.parse(file, {
            //IMPORTANT: true for upload to stockprices, false otherwise (can comment out - same as putting false)
            //header: true,
            complete: (results) => {
                
                //upload eps
                console.log(results.data)

                //upload to stockprices
                /*
                let newResults = [];
                let tempObj = {}
                let max = parseInt(results.data[0].Open);
                let min = parseInt(results.data[0].Open);
                for (let i=0; i<results.data.length; i++){
                    tempObj = {
                        stockSymbol: "CAR",
                        stockPrice: results.data[i].Open,
                        day: (i+1).toString(),
                        marketNumber: "1",
                    }
                    if (parseInt(results.data[i].Open) > max){
                        max = results.data[i].Open
                    }
                    if (parseInt(results.data[i].Open) < min){
                        min = results.data[i].Open
                    }
                    newResults.push(tempObj)
                }
                for (let i=0; i<newResults.length; i++){
                    newResults[i].yearHigh = max.toString();
                    newResults[i].yearLow = min.toString();
                }
                let j=0;
                let uploadTime;
                let prevDay = 1;
                let missed = 0;
                let uploadData = () => {
                    post('/api/insertPriceData', {
                        symbol: newResults[j].stockSymbol,
                        day: newResults[j].day.toString(),
                        number: newResults[j].marketNumber,
                        price: newResults[j].stockPrice,
                        high: newResults[j].yearHigh,
                        low: newResults[j].yearLow,
                    }).then((returnedObject) => {
                        console.log(returnedObject.msg + " " + returnedObject.obj.day + " " + returnedObject.obj.stockSymbol)
                        if (!(parseInt(prevDay) == parseInt(returnedObject.obj.day))){
                            console.log("ERROR ERROR ERROR MISSED VALUE")
                            missed = missed + 1
                        }
                        prevDay = prevDay + 1
                    })
                    j = j+1;
                    if (j==newResults.length-1){
                        clearInterval(uploadTime)
                        console.log(missed)
                    }
                }
                uploadTime = setInterval(uploadData, 35)
                */
            },
        });
    }

    

    // required method: whatever is returned defines what
    // shows up on screen
    render() {
        return (
            <>
                <MarketNavBar
                    cash={this.props.cash}
                    username={this.props.username}
                    marketName={this.props.marketName}
                    id={this.props.id}
                />
                <div className="MarketImport-row">
                    <form onSubmit={this.handleSubmit}>
                        <label>Name of Company:</label>
                        <input type="text" value={this.state.name} onChange={this.handleChange} />
                        <Dropzone onDrop={this.handleFile}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </form>
                </div>
                <div>
                    <button id="doanything">do something</button>
                </div>
            </>
        );
    }
}

export default MarketImport;