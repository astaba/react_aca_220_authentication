import React from "react";
import { Outlet, useOutletContext } from "react-router-dom";

import EventsNavigation from "../components/EventsNavigation";

const EventsLayout = () => {
  const { token } = useOutletContext();
  return (
    <React.Fragment>
      <EventsNavigation />
      <Outlet context={{ token }} />
    </React.Fragment>
  );
};

export default EventsLayout;
