import { Link, useSubmit } from "react-router-dom";

import classes from "./EventItem.module.css";
import { getAuthToken } from "../utils/auth";

function EventItem({ event }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const isConfirmed = window.confirm("Are you sure?");
    if (isConfirmed) {
      submit(
        null, // FormData object
        { method: "DELETE" /*action: "any-other-route"*/ } // Form props
      );
    }
  }

  const isToken = getAuthToken();

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      {isToken && (
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )}
    </article>
  );
}

export default EventItem;
