import React, { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";

export const loaderWorker = async () => {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // throw new Error(`Error ${response.status}: ${response.statusText}`);
    // throw {message: "Something went wrong"};
    // throw json({ message: "Could not fetch events!", status: 500 });
    throw json(
      { message: "Could not fetch events!" },
      { status: response.status, statusText: response.statusText }
    );
  }
  const data = await response.json();
  return data.events;
};

export const loader = async () => {
  return defer({ events: loaderWorker() });
};

const EventsPage = () => {
  const deferedData = useLoaderData();

  return (
    <Suspense fallback={<h3 style={{ textAlign: "center" }}>Loading...</h3>}>
      <Await resolve={deferedData.events}>
        {(fetchedEvents) => <EventsList events={fetchedEvents} />}
      </Await>
    </Suspense>
  );
};

export default EventsPage;
