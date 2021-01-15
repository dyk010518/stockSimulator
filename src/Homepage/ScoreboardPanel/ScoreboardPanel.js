import './ScoreboardPanel.css'
import {useState} from 'react';
import Scoreboard1 from './Scoreboard1/Scoreboard1.js'
import Scoreboard2 from './Scoreboard2/Scoreboard2.js'
import Scoreboard3 from './Scoreboard3/Scoreboard3.js'
import Scoreboard4 from './Scoreboard4/Scoreboard4.js'

function Scoreboard(props){
	
	const clickHandler = function(){

	};

	return (
		<div className="ScoreboardPanel-flexColumn">
          <p>
            Scoreboard
          </p>
		  <Scoreboard1/>
          <Scoreboard2/>
          <Scoreboard3/>
          <Scoreboard4/>
        </div>
	);

}

export default Scoreboard;
