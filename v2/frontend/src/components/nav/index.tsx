import { NavLink } from 'react-router-dom';
import NavMenu from './menu';

import './nav.css';

function Nav() {
  return (
    <nav className="nav">
      <NavLink className="nav-logo" to="/">
        Vicariously
      </NavLink>
      <NavMenu />
    </nav>
  );
}

export default Nav;