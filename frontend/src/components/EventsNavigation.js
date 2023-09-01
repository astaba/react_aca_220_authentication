import React from "react";
import { NavLink, useOutletContext } from "react-router-dom";

import classes from "./EventsNavigation.module.css";

function EventsNavigation() {
  const { token } = useOutletContext();

  const activeStyle = ({ isActive }) => {
    return isActive ? classes.active : undefined;
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="." end className={activeStyle}>
              All Events
            </NavLink>
          </li>
          {/* {token && ( */}
            <li>
              <NavLink to="new" className={activeStyle}>
                New Event
              </NavLink>
            </li>
          {/* )} */}
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
