import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import Error404 from './pages/Error404';

import './assets/styles/App.css';

function App() {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/carteira"><Wallet /></Route>
        <Route path="*"><Error404 /></Route>
      </Switch>
    </div>
  );
}

export default App;
