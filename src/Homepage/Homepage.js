import './Homepage.css';
import TopBar from './TopBar/TopBar'
import ScoreboardPanel from './ScoreboardPanel/ScoreboardPanel.js';
import utilities from '../utilities.css'
import SimulatorPanel from './SimulatorPanel/SimulatorPanel.js';

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
        <ScoreboardPanel/>
      </div>
    </div>
  );
}

export default Homepage;