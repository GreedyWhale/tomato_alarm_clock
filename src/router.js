import React, { Suspense, lazy } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from './methods/history/index';

const Home = lazy(() => import('./pages/Home/index'));
const LogIn = lazy(() => import('./pages/LogIn/index'));

function AppRouter() {
  return (
    <Router history={history}>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/logIn" component={LogIn}/>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default AppRouter;