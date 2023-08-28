import React, { Suspense } from "react";
import {
  json,
  useRouteLoaderData,
  redirect,
  defer,
  Await,
} from "react-router-dom";

import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { loaderWorker as listLoaderWorker } from "./EventsPage";

const loaderWorker = async (eventID) => {
  const response = await fetch(`http://localhost:8080/events/${eventID}`);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch event details!" },
      { status: response.status, statusText: response.statusText }
    );
  }
  const data = await response.json();
  return data.event;
};

export const loader = async ({ request, params }) => {
  const { eventID } = params;
  return defer({
    event: await loaderWorker(eventID),
    events: listLoaderWorker(),
  });
};

export const action = async ({ request, params }) => {
  const { eventID } = params;
  const url = "http://localhost:8080/events/" + eventID;
  const options = {
    method: request.method,
  };
  const goingRequest = new Request(url, options);

  const response = await fetch(goingRequest);
  if (!response.ok) {
    throw json(
      { message: "Could not delete event!" },
      { status: response.status, statusText: response.statusText }
    );
  }

  return redirect("/events");
};

const EventDetailPage = () => {
  const deferedData = useRouteLoaderData("event-detail");
  // console.log(data);

  return (
    <React.Fragment>
      <Suspense fallback={<h3 style={{ textAlign: "center" }}>Loading...</h3>}>
        <Await resolve={deferedData.event}>
          {(event) => <EventItem event={event} />}
        </Await>
      </Suspense>
      <Suspense fallback={<h3 style={{ textAlign: "center" }}>Loading...</h3>}>
        <Await resolve={deferedData.events}>
          {(events) => <EventsList events={events} />}
        </Await>
      </Suspense>
    </React.Fragment>
  );
};

export default EventDetailPage;
