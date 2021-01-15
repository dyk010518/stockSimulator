import logo from './logo.svg';
import './App.css';
import Homepage from './Homepage/Homepage'

function App(props) {
  // console.log(props);
  // ES6
  const {text, url} = props; 

  // const text = props.text;
  // const url = props.url;

  return (
    <div>
      <Homepage/>
    </div>
  );
}

export default App;
