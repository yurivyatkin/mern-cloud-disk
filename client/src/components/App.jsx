import { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from './navbar/Navbar';
import Registration from './authorization/Registration';
import Login from './authorization/Login';
import Disk from './disk/Disk';
import Profile from './profile/Profile';

import { auth } from '../actions/user';

import './app.css';

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          {!isAuth ? (
            <Switch>
              <Route path="/registration" component={Registration} />
              <Route path="/login" component={Login} />
              <Redirect to="/login" />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={Disk} />
              <Route exact path="/profile" component={Profile} />
              <Redirect to="/" />
            </Switch>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
