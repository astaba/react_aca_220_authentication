import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import NewsletterSignup from "./NewsletterSignup";

function MainNavigation() {
  const activeStyle = ({isActive}) => {
    return isActive ? classes.active : undefined;
  }

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/" className={activeStyle} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" className={activeStyle}>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/newsletter" className={activeStyle}>
              Newsletter
            </NavLink>
          </li>
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
