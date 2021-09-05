import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from './navbar/Navbar';
import Registration from './authorization/Registration';
import Login from './authorization/Login';

import './app.css';

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          {!isAuth && (
            <Switch>
              <Route path="/registration" component={Registration} />
              <Route path="/login" component={Login} />
            </Switch>
          )}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
