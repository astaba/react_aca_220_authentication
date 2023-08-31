import { NavLink, useSubmit } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import NewsletterSignup from "./NewsletterSignup";
import { getAuthToken } from "../utils/auth";

function MainNavigation() {
  const submit = useSubmit();

  const activeStyle = ({ isActive }) => {
    return isActive ? classes.active : undefined;
  };

  const handleLogout = () => {
    submit(null, { method: "POST", action: "/logout" });
  };

  const isToken = getAuthToken();

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
          {!isToken ? (
            <li>
              <NavLink to="/auth?mode=login" className={activeStyle}>
                Authentication
              </NavLink>
            </li>
          ) : (
            <li>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
