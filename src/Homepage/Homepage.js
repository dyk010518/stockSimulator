import './Homepage.css';
import TopBar from './TopBar/TopBar'
import MarketSummary from '../MarketSummary';
import Scoreboard from '../Scoreboard';
import utilities from '../utilities.css'
import SimulatorPanel from './SimulatorPanel/SimulatorPanel';

function Homepage(props) {
  // console.log(props);
  // ES6
  const {text, url} = props; 

  // const text = props.text;
  // const url = props.url;

  return (
    <div className="Homepage-basics">
      <TopBar/>
      <div className="Homepage-flexRow">
        <SimulatorPanel/>

        <div className="Homepage-flexColumn">
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

export default Homepage;
