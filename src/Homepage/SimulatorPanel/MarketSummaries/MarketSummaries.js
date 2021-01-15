import {useState} from 'react';
import MarketSummary1 from './MarketSummary1/MarketSummary1.js'
import MarketSummary2 from './MarketSummary2/MarketSummary2.js'
import MarketSummary3 from './MarketSummary3/MarketSummary3.js'
import MarketSummary4 from './MarketSummary4/MarketSummary4.js'


function MarketSummaries(props){
	
	const clickHandler = function(){

	};

	return (
		<div>
			<MarketSummary1/>
			<MarketSummary2/>
			<MarketSummary3/>
			<MarketSummary4/>
		</div>
	);

}

export default MarketSummaries;
