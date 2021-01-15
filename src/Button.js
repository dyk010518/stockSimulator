import {useState} from 'react';


function Button(props){
	const {text} = props;
	//let count = 0;
	const [count, setCount] = useState(0);


	const clickHandler = function(){
		console.log("inside click handler");
		setCount(count + 1);
		console.log(count);
	};
	return (
		<div>
			<button onClick={clickHandler}>Clicks: {count}</button>
		</div>
		);

}

export default Button;
