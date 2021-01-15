import utilities from '../../utilities.js'
import './SimulatorPanel.css'
import MarketSummary from '../../MarketSummary';


function SimulatorPanel(props){
    return(
        <div className="SimulatorPanel-flexColumn">
          <p>
            Instructions to play game
          </p>
          <MarketSummary/>
          <MarketSummary/>
          <MarketSummary/>
          <MarketSummary/>
        </div>
    )
}

export default SimulatorPanel;
