import React from "react";

import EventForm from "../components/EventForm";
import { requireAuth } from "../utils/auth";

export const loader = ({request, params}) => {
  return requireAuth(request);
}

const NewEventPage = () => {
  return <EventForm method="POST" />;
};

export default NewEventPage;
