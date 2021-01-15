import logo from './logo.svg';
import './App.css';
import MarketSummary from './MarketSummary';
import Scoreboard from './Scoreboard';

function App(props) {
  // console.log(props);
  // ES6
  const {text, url} = props; 

  // const text = props.text;
  // const url = props.url;

  return (
    <div className="App">
      <header className="App-header">
        Stock Simulator
      </header>
      <div className="flexRow">
        <div className="flexColumn">
          <p>
            Instructions to play game
          </p>
          <MarketSummary/>
          <MarketSummary/>
          <MarketSummary/>
          <MarketSummary/>
        </div>

        <div className="flexColumn">
          <p>
            Scoreboard
          </p>
          <Scoreboard/>
          <Scoreboard/>
          <Scoreboard/>
          <Scoreboard/>
        </div>
      </div>
    </div>
  );
}

export default App;
