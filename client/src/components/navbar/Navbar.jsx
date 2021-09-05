import './navbar.css';
import Logo from '../../assets/img/navbar-logo.svg';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar">
      <img src={Logo} alt="" className="navbar__logo" />
      <div className="navbar__header">MERN CLOUD</div>
      <div className="navbar__login">
        <NavLink to="/login"></NavLink>Log In
      </div>
      <div className="navbar__registration">
        <NavLink to="/registration">Register</NavLink>
      </div>
    </div>
  );
}

export default Navbar;
