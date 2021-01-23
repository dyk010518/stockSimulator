import React, { Component } from "react";
import "../../../buttonStyles.css";
import { Router } from "@reach/router";
import { Link } from "@reach/router";
import MarketNavBar from "./MarketNavBar";
import Dropzone from "react-dropzone";
import Papa from "papaparse";
import "./MarketImport.css";

class MarketImport extends Component {
    // makes props available in this component
    constructor(props) {
        super(props);
        this.state = { name: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
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
            header: true,
            complete: (results) => {

                let newResults = [];
                let tempObj = {}
                let max = parseInt(results.data[0].Open);
                let min = parseInt(results.data[0].Open);
                for (let i=0; i<results.data.length; i++){
                    tempObj = {
                        stockSymbol: "CAKE",
                        stockPrice: results.data[i].Open,
                        day: i+1,
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
                console.log(newResults)
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
            </>
        );
    }
}

export default MarketImport;