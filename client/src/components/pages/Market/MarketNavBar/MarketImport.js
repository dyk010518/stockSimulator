import React, { Component } from "react";
import "../../../buttonStyles.css";
import { Router } from "@reach/router";
import { Link } from "@reach/router";
import MarketNavBar from "./MarketNavBar";
import Dropzone from "react-dropzone";
import Papa from "papaparse";
import "./MarketImport.css";
import { get, post, dayToYear, dayToMonth, dayToQuarter } from '../../../../utilities.js'

const mNumber = "1"
const names = [
    "CHEESE",
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
    "CAR",
    "SHIP",
    "MARKET"]

const sIndex = 0;

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
            /*
            //collect relevant stock data, put in array                       
            get('/api/getAllPriceData', {
                symbol: names[sIndex],
                number: mNumber,
            }).then((stockObjects) => {
                let stageTwo = (pData) => {
                    get('/api/getAllEPSData', {
                        symbol: names[sIndex],
                        number: mNumber,
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
                                marketNumber: mNumber,
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
            */
            


            //testing stuff
            /*
            get('/api/getPriceData', {
                symbol: "STORE", 
                day: "2728"
            }).then((stockObj) => {
                console.log(stockObj)
            })
            */
            //get('/api/dontuseme', {symbol: "SOFT"})
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
            /*
            OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
            OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
            OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
            OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
            OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
            */
            header: true,
            complete: (results) => {

                /*

                //upload free cash flow
                //get index of tr row
                let ndIndex;
                for (let i=0; i<results.data.length; i++){
                    if (results.data[i][0] === "FreeCashFlow"){
                        ndIndex = parseInt(i)
                        break
                    }
                }
                //get index of 2015
                let lastFour;
                let beginIndex;
                for (let i=0; i<results.data[0].length; i++){
                    lastFour = results.data[0][i].substring(results.data[0][i].length-4)
                    if (lastFour === "2015"){
                        beginIndex = parseInt(i)
                        break
                    }
                }
                //create json objects
                let tempObj = {};
                let tempArray = [];
                let ndval;
                for (let i=0; i<42; i++){
                    if(results.data[ndIndex][i+beginIndex]){
                        ndval = results.data[ndIndex][i+beginIndex].toString()
                    } else{
                        let c = 0;
                        while (!(results.data[ndIndex][i+beginIndex+c])){
                            if (i+beginIndex+c == results.data[ndIndex].length-1){
                                break
                            } else{
                                c = c+1
                            }
                        }
                        if (results.data[ndIndex][i+beginIndex+c]){
                            ndval = results.data[ndIndex][i+beginIndex+c].toString()
                        } else {
                            ndval = "No FCF value for this quarter"
                        }
                    }
                    tempObj = {
                        stockSymbol: names[sIndex],
                        quarter: (i+1).toString(),
                        marketNumber: mNumber,
                        freeCashFlow: ndval.toString(),
                    }
                    //make post request with this object, for now just add to array
                    tempArray.push(tempObj)
                }
                //upload to database
                let j=0;
                let uploadTime;
                let prevDay = 1;
                let missed = 0;
                let uploadData = () => {
                    post('/api/insertFCFData', {
                        symbol: tempArray[j].stockSymbol,
                        quarter: tempArray[j].quarter,
                        number: tempArray[j].marketNumber,
                        fcf: tempArray[j].freeCashFlow.toString(),
                    }).then((returnedObject) => {
                        console.log(returnedObject.msg + " " + returnedObject.obj.quarter + " " + returnedObject.obj.stockSymbol)
                        if (!(parseInt(prevDay) == parseInt(returnedObject.obj.quarter))){
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

                //upload total revenue
                /*
                //get index of tr row

                /*
                let osIndex;
                for (let i=0; i<results.data.length; i++){
                    if (results.data[i][0] === "OrdinarySharesNumber"){
                        osIndex = parseInt(i)
                        break
                    }
                }
                //get index of 2015
                let lastFour;
                let beginIndex;
                for (let i=0; i<results.data[0].length; i++){
                    lastFour = results.data[0][i].substring(results.data[0][i].length-4)
                    if (lastFour === "2015"){
                        beginIndex = parseInt(i)
                        break
                    }
                }
                //create json objects
                let tempObj = {};
                let tempArray = [];
                let osval;
                for (let i=0; i<42; i++){
                    if(results.data[osIndex][i+beginIndex]){
                        osval = results.data[osIndex][i+beginIndex].toString()
                    } else{
                        let c = 0;
                        while (!(results.data[osIndex][i+beginIndex+c])){
                            if (i+beginIndex+c == results.data[osIndex].length-1){
                                break
                            } else{
                                c = c+1
                            }
                        }
                        if (results.data[osIndex][i+beginIndex+c]){
                            osval = results.data[osIndex][i+beginIndex+c].toString()
                        } else {
                            osval = "No ordinary shares value for this quarter"
                        }
                    }
                    tempObj = {
                        stockSymbol: names[sIndex],
                        quarter: (i+1).toString(),
                        marketNumber: mNumber,
                        shares: osval.toString(),
                    }
                    //make post request with this object, for now just add to array
                    tempArray.push(tempObj)
                }
                //upload to database
                let j=0;
                let uploadTime;
                let prevDay = 1;
                let missed = 0;
                let uploadData = () => {
                    post('/api/insertTRData', {
                        symbol: tempArray[j].stockSymbol,
                        quarter: tempArray[j].quarter,
                        number: tempArray[j].marketNumber,
                        rev: tempArray[j].revenue.toString(),
                    }).then((returnedObject) => {
                        console.log(returnedObject.msg + " " + returnedObject.obj.quarter + " " + returnedObject.obj.stockSymbol)
                        if (!(parseInt(prevDay) == parseInt(returnedObject.obj.quarter))){
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

                /*
                let j=0;
                let uploadTime;
                let prevDay = 1;
                let missed = 0;
                let uploadData = () => {
                    post('/api/insertSharesData', {
                        symbol: tempArray[j].stockSymbol,
                        quarter: tempArray[j].quarter,
                        number: tempArray[j].marketNumber,
                        shares: tempArray[j].shares.toString(),
                    }).then((returnedObject) => {
                        console.log(returnedObject.msg + " " + returnedObject.obj.quarter + " " + returnedObject.obj.stockSymbol)
                        if (!(parseInt(prevDay) == parseInt(returnedObject.obj.quarter))){
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

                //upload net debt
                /*
                //get index of net debt row
                let ndIndex;
                for (let i=0; i<results.data.length; i++){
                    if (results.data[i][0] === "NetDebt"){
                        ndIndex = parseInt(i)
                        break
                    }
                }
                //get index of 2015
                let lastFour;
                let beginIndex;
                for (let i=0; i<results.data[0].length; i++){
                    lastFour = results.data[0][i].substring(results.data[0][i].length-4)
                    if (lastFour === "2015"){
                        beginIndex = parseInt(i)
                        break
                    }
                }
                //create json objects
                let tempObj = {};
                let tempArray = [];
                let ndval;
                for (let i=0; i<42; i++){
                    if(results.data[ndIndex][i+beginIndex]){
                        ndval = results.data[ndIndex][i+beginIndex].toString()
                    } else{
                        let c = 0;
                        while (!(results.data[ndIndex][i+beginIndex+c])){
                            if (i+beginIndex+c == results.data[ndIndex].length-1){
                                break
                            } else{
                                c = c+1
                            }
                        }
                        if (results.data[ndIndex][i+beginIndex+c]){
                            ndval = results.data[ndIndex][i+beginIndex+c].toString()
                        } else {
                            ndval = "No net debt value for this quarter"
                        }
                    }
                    tempObj = {
                        stockSymbol: names[sIndex],
                        quarter: (i+1).toString(),
                        marketNumber: mNumber,
                        stockDebtEquity: ndval.toString(),
                    }
                    //make post request with this object, for now just add to array
                    tempArray.push(tempObj)
                }
                
                //upload to database
                
                let j=0;
                let uploadTime;
                let prevDay = 1;
                let missed = 0;
                let uploadData = () => {
                    post('/api/insertNDData', {
                        symbol: tempArray[j].stockSymbol,
                        quarter: tempArray[j].quarter,
                        number: tempArray[j].marketNumber,
                        nd: tempArray[j].stockDebtEquity.toString(),
                    }).then((returnedObject) => {
                        console.log(returnedObject.msg + " " + returnedObject.obj.quarter + " " + returnedObject.obj.stockSymbol)
                        if (!(parseInt(prevDay) == parseInt(returnedObject.obj.quarter))){
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


                //upload pb ratio
                /*
                //get index of pb ratio
                let pbIndex;
                for (let i=0; i<results.data.length; i++){
                    if (results.data[i][0] === "PbRatio"){
                        pbIndex = parseInt(i)
                        break
                    }
                }
                //get index of first 2015
                let lastFour;
                let beginIndex;
                for (let i=0; i<results.data[0].length; i++){
                    lastFour = results.data[0][i].substring(results.data[0][i].length-4)
                    if (lastFour === "2015"){
                        beginIndex = parseInt(i)
                        break
                    }
                }
                //create new PB objects
                let tempObj = {};
                let tempArray = [];
                let pbval;
                for (let i=0; i<125; i++){
                    if(results.data[pbIndex][i+beginIndex]){
                        pbval = results.data[pbIndex][i+beginIndex].toString()
                    } else{
                        let c = 0;
                        while (!(results.data[pbIndex][i+beginIndex+c])){
                            if (i+beginIndex+c == results.data[pbIndex].length-1){
                                break
                            } else{
                                c = c+1
                            }
                        }
                        if (results.data[pbIndex][i+beginIndex+c]){
                            pbval = results.data[pbIndex][i+beginIndex+c].toString()
                        } else {
                            pbval = "No PB value for this month"
                        }
                    }
                    tempObj = {
                        stockSymbol: names[sIndex],
                        month: (i+1).toString(),
                        marketNumber: mNumber,
                        stockPB: pbval,
                    }
                    //make post request with this object, for now just add to array
                    tempArray.push(tempObj)
                }
                //post to database
                let j=0;
                let uploadTime;
                let prevDay = 1;
                let missed = 0;
                let uploadData = () => {
                    post('/api/insertPBData', {
                        symbol: tempArray[j].stockSymbol,
                        month: tempArray[j].month,
                        number: tempArray[j].marketNumber,
                        pb: tempArray[j].stockPB,
                    }).then((returnedObject) => {
                        console.log(returnedObject.msg + " " + returnedObject.obj.month + " " + returnedObject.obj.stockSymbol)
                        if (!(parseInt(prevDay) == parseInt(returnedObject.obj.month))){
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

                //upload enterprise value
                /*
                //get index of enterprise value
                let evIndex;
                for (let i=0; i<results.data.length; i++){
                    if (results.data[i][0] === "EnterpriseValue"){
                        evIndex = parseInt(i)
                        break
                    }
                }
                //get index of first 2015
                let lastFour;
                let beginIndex;
                for (let i=0; i<results.data[0].length; i++){
                    lastFour = results.data[0][i].substring(results.data[0][i].length-4)
                    if (lastFour === "2015"){
                        beginIndex = parseInt(i)
                        break
                    }
                }
                //create new EV objects
                let tempObj = {};
                let tempArray = [];
                for (let i=0; i<125; i++){
                    tempObj = {
                        stockSymbol: names[sIndex],
                        month: (i+1).toString(),
                        marketNumber: mNumber,
                        stockEnterprise: results.data[evIndex][i+beginIndex].toString(),
                    }
                    //make post request with this object, for now just add to array
                    tempArray.push(tempObj)
                }
                //post to database
                let j=0;
                let uploadTime;
                let prevDay = 1;
                let missed = 0;
                let uploadData = () => {
                    post('/api/insertEVData', {
                        symbol: tempArray[j].stockSymbol,
                        month: tempArray[j].month,
                        number: tempArray[j].marketNumber,
                        epv: tempArray[j].stockEnterprise,
                    }).then((returnedObject) => {
                        console.log(returnedObject.msg + " " + returnedObject.obj.month + " " + returnedObject.obj.stockSymbol)
                        if (!(parseInt(prevDay) == parseInt(returnedObject.obj.month))){
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
                
                //upload market cap
                /*
                //get index of market cap
                let mcIndex;
                for (let i=0; i<results.data.length; i++){
                    if (results.data[i][0] === "MarketCap"){
                        mcIndex = parseInt(i)
                        break
                    }
                }
                
                //get index of first 2015
                let lastFour;
                let beginIndex;
                for (let i=0; i<results.data[0].length; i++){
                    lastFour = results.data[0][i].substring(results.data[0][i].length-4)
                    if (lastFour === "2015"){
                        beginIndex = parseInt(i)
                        break
                    }
                }
                
                //create new marketcap objects
                let tempObj = {};
                let tempArray = [];
                for (let i=0; i<125; i++){
                    tempObj = {
                        stockSymbol: names[sIndex],
                        month: (i+1).toString(),
                        marketNumber: mNumber,
                        stockMarketCap: results.data[mcIndex][i+beginIndex].toString(),
                    }
                    //make post request with this object, for now just add to array
                    tempArray.push(tempObj)
                }
                
                //post to database
                let j=0;
                let uploadTime;
                let prevDay = 1;
                let missed = 0;
                let uploadData = () => {
                    post('/api/insertMCData', {
                        symbol: tempArray[j].stockSymbol,
                        month: tempArray[j].month,
                        number: tempArray[j].marketNumber,
                        cap: tempArray[j].stockMarketCap,
                    }).then((returnedObject) => {
                        console.log(returnedObject.msg + " " + returnedObject.obj.month + " " + returnedObject.obj.stockSymbol)
                        if (!(parseInt(prevDay) == parseInt(returnedObject.obj.month))){
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
                        stockSymbol: "CAR",
                        year: (i+1).toString(),
                        marketNumber: mNumber,
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
                        stockSymbol: names[sIndex],
                        stockPrice: results.data[i].Open,
                        day: (i+1).toString(),
                        marketNumber: mNumber,
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
                    updateCash={this.props.updateCash}
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