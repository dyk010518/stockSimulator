import utilities from '../../utilities.js'
import './SimulatorPanel.css'
import Instruction from './Instruction/Instruction.js'
import MarketSummaries from './MarketSummaries/MarketSummaries.js';


function SimulatorPanel(props){
    return(
        <div className="SimulatorPanel-flexColumn">
          <Instruction/>
          <MarketSummaries/>
        </div>
    )
}

export default SimulatorPanel;
