import React from "react";
import { useRouteLoaderData } from "react-router-dom";

import EventForm from "../components/EventForm";
import { requireAuth } from "../utils/auth";

export const loader = ({request, params}) => {
  return requireAuth(request);
}

const EditEventPage = () => {
  const data = useRouteLoaderData("event-detail");

  return <EventForm event={data.event} method="PATCH" />;
};

export default EditEventPage;
