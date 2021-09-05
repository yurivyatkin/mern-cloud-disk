import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../reducers/userReducer';

import Logo from '../../assets/img/navbar-logo.svg';

import './navbar.css';

function Navbar() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <img src={Logo} alt="" className="navbar__logo" />
      <div className="navbar__header">MERN CLOUD</div>
      {!isAuth && (
        <div className="navbar__login">
          <NavLink to="/login">Log In</NavLink>
        </div>
      )}
      {!isAuth && (
        <div className="navbar__registration">
          <NavLink to="/registration">Register</NavLink>
        </div>
      )}
      {isAuth && (
        <div
          className="navbar__registration"
          onClick={() => dispatch(logout())}
        >
          Logout
        </div>
      )}
    </div>
  );
}

export default Navbar;
