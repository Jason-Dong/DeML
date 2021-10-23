import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import indexRoutes from './routes/index.jsx';
import {  Route, Switch } from 'react-router-dom';
import { HashRouter } from 'react-router-dom'
import {setupProvider, setContract} from 'etherInfra.js'
import './assets/scss/style.css';
import { Button} from 'reactstrap';


function MetamaskGateway(props) {
  const [metamask,setMetamask] = useState(false);
  const [address,setAddress] = useState(false);

  const result = setupProvider().then((resp)=> {
    setMetamask(true)
  })

function check(inputValue) {
  var _address = inputValue;

  if (setContract(_address)) {
    setAddress(true);
  }
}
  

  function NiceButton() {
    const [inputValue, setInputValue] = useState(false);
    
    return (
      <div class="container">
        <h1> DeML </h1>
      <form>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
        <div class="form-group">
          <h3>Address</h3>
          <input type="text" className="form-control" id="textbox" placeholder="Address" onChange={(e) => {setInputValue(e.target.value)}}/>
        </div>
        <Button onClick={()=>check(inputValue)}>Submit</Button>
      </form>
    </div>
    );
  }
  if (metamask){
    // INPUT ADDRESS OF SMART CONTRACT
    
    if (address) {
    return <HashRouter>

      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} key={key} component={prop.component} />;
        })}
      </Switch>

    </HashRouter>
  } else {
    return <NiceButton/>
  }
}

  else {
    return "Please enable metamask support"
  }
}
ReactDOM.render(
  <MetamaskGateway/>
  ,document.getElementById('root'));
