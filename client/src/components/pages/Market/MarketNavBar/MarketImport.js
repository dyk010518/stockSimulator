import React, { Component } from "react";
import "../../../buttonStyles.css";
import { Router } from "@reach/router";
import { Link } from "@reach/router";
import MarketNavBar from "./MarketNavBar";
import Dropzone from "react-dropzone";
import Papa from "papaparse";
import "./MarketImport.css";
import { get, post, dayToYear, dayToMonth, dayToQuarter } from '../../../../utilities.js'

const names = ["CHEESE",
    "COOP",
    "STORE",
    "CELL",
    "GROCE",
    "SOLAR",
    "OIL",
    "INSUR",
    "BANK",
    "HINSUR",
    "BAID",
    "STICKY",
    "VACC",
    "HOME",
    "HOOD",
    "COMP",
    "SOFT",
    "PHONE",
    "SHIP"]
//upload COMP next, index 15!!
const sIndex = 14;

class MarketImport extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
        this.state = { name: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    //collect relevant eps data, put in array

    

    componentDidMount() {
        document.getElementById("doanything").addEventListener("click", function () {
            console.log("pressed")

            //upload pe ratio
            //collect relevant stock data, put in array                       
            get('/api/getAllPriceData', {
                symbol: names[sIndex],
                number: "1",
            }).then((stockObjects) => {
                let stageTwo = (pData) => {
                    get('/api/getAllEPSData', {
                        symbol: names[sIndex],
                        number: "1",
                    }).then((epsData) => {
                        //calculate new pe ratio (price/eps), put in object
                        let tempObj;
                        let tempArray = [];
                        //console.log(epsData)
                        for (let i=0; i<pData.length; i++){
                            let year = parseInt(dayToYear(i+1))
                            year = year - 1;
                            //console.log(year)
                            if (!(epsData[year])){
                                break
                            }
                            let intEPS = parseInt(epsData[year].stockEPS)
                            tempObj = {
                                stockSymbol: names[sIndex],
                                day: (i+1).toString(),
                                marketNumber: "1",
                                stockPE: (parseInt(pData[i].stockPrice)/intEPS).toString()
                            }
                            tempArray.push(tempObj)
                        }
                        let j=0;
                        let uploadTime;
                        let prevDay = 1;
                        let missed = 0;
                        let uploadData = () => {
                            post('/api/insertPEData', {
                                symbol: tempArray[j].stockSymbol,
                                day: tempArray[j].day,
                                number: tempArray[j].marketNumber,
                                pe: tempArray[j].stockPE,
                            }).then((returnedObject) => {
                                console.log(returnedObject.msg + " " + returnedObject.obj.day + " " + returnedObject.obj.stockSymbol)
                                if (!(parseInt(prevDay) == parseInt(returnedObject.obj.day))){
                                    console.log("ERROR ERROR ERROR MISSED VALUE")
                                    missed = missed + 1
                                }
                                prevDay = prevDay + 1
                            })
                            j = j+1;
                            if (j==tempArray.length){
                                clearInterval(uploadTime)
                                console.log(missed)
                            }
                        }
                        uploadTime = setInterval(uploadData, 35)
                    })
                }
                stageTwo(stockObjects)
            })

            


            //testing stuff
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


                /*
                //upload eps
                //find the index that basic eps is at
                let epsIndex;
                for (let i=0; i<results.data.length; i++){
                    if (results.data[i][0] === "BasicEPS"){
                        epsIndex = parseInt(i)
                        break
                    }
                }
                //finds the correct begin index
                let lastFour;
                let beginIndex;
                for (let i=0; i<results.data[0].length; i++){
                    lastFour = results.data[0][i].substring(results.data[0][i].length-4)
                    if (lastFour === "2015"){
                        beginIndex = parseInt(i+1)
                        break
                    }
                }
                //sets up json object
                let tempObj = {};
                let tempArray = [];
                for (let i=0; i<10; i++){
                    tempObj = {
                        stockSymbol: "SHIP",
                        year: (i+1).toString(),
                        marketNumber: "1",
                        stockEPS: results.data[epsIndex][i+beginIndex].toString(),
                    }
                    //make post request with this object, for now just add to array
                    tempArray.push(tempObj)
                }
                //actual upload part
                let j=0;
                let uploadTime;
                let prevDay = 1;
                let missed = 0;
                let uploadData = () => {
                    post('/api/insertEPSData', {
                        symbol: tempArray[j].stockSymbol,
                        year: tempArray[j].year,
                        number: tempArray[j].marketNumber,
                        eps: tempArray[j].stockEPS,
                    }).then((returnedObject) => {
                        console.log(returnedObject.msg + " " + returnedObject.obj.year + " " + returnedObject.obj.stockSymbol)
                        if (!(parseInt(prevDay) == parseInt(returnedObject.obj.year))){
                            console.log("ERROR ERROR ERROR MISSED VALUE")
                            missed = missed + 1
                        }
                        prevDay = prevDay + 1
                    })
                    j = j+1;
                    if (j==tempArray.length){
                        clearInterval(uploadTime)
                        console.log(missed)
                    }
                }
                uploadTime = setInterval(uploadData, 35)
                */



                //upload stockprices
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