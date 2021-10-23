import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import indexRoutes from './routes/index.jsx';
import {  Route, Switch } from 'react-router-dom';
import { HashRouter } from 'react-router-dom'
import {setupProvider} from 'etherInfra.js'
import './assets/scss/style.css';







function MetamaskGateway(props) {
  const [metamask,setMetamask] = useState(false);
  const result = setupProvider().then((resp)=> {
    setMetamask(true)
  })
  if (metamask){
    return <HashRouter>

      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} key={key} component={prop.component} />;
        })}
      </Switch>

    </HashRouter>
  }
  else {
    return "Please enable metamask support"
  }
}
ReactDOM.render(
  <MetamaskGateway/>
  ,document.getElementById('root'));
