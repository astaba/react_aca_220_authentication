import React from "react";
import {
  useNavigate,
  Form,
  useNavigation,
  useActionData,
  redirect,
  json,
} from "react-router-dom";

import classes from "./EventForm.module.css";

export const action = async ({ request, params }) => {
  const { eventID } = params;
  const formData = await request.formData();
  const eventData = {
    title: formData.get("title"),
    image: formData.get("image"),
    date: formData.get("date"),
    description: formData.get("description"),
  };

  let url = "http://localhost:8080/events/";
  if (request.method === "PATCH") url += eventID;
  const headers = new Headers({ "Content-Type": "application/json" });
  const options = {
    method: request.method,
    headers,
    body: JSON.stringify(eventData),
  };
  const goingRequest = new Request(url, options);

  const response = await fetch(goingRequest);

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: "Could not save event!" },
      { status: response.status, statusText: response.statusText }
    );
  }

  return redirect("/events");
};

function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();

  const isSubmitting = navigation.state === "submitting";
  function cancelHandler() {
    navigate("..");
  }

  return (
    // <Form method="post" action="any-other-route" className={classes.form}>
    <Form method={method} className={classes.form}>
      {actionData && actionData.errors && (
        <ul>
          {Object.keys(actionData.errors).map((item) => (
            <li key={item}>{actionData.errors[item]}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : undefined}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : undefined}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : undefined}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : undefined}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {!isSubmitting ? "Save" : "Submitting..."}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;
