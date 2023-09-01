import React from "react";
import {
  Form,
  useActionData,
  useNavigation,
  useSearchParams,
  json,
  redirect,
} from "react-router-dom";

import classes from "./AuthForm.module.css";
import { storeAuthToken } from "../utils/auth";

export const action = async ({ request, params }) => {
  const requestingURL = new URL(request.url);
  const formData = await request.formData();
  const authData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const mode = new URL(requestingURL).searchParams.get("mode") || "login";
  if (!["login", "signup"].includes(mode)) {
    throw json(
      { message: "Unexpected mode in query parameter" },
      { status: 422, statusText: "Unprocessable Entity" }
    );
  }
  const requestedURL = new URL("http://localhost:8080/" + mode);
  const headers = new Headers({ "Content-Type": "application/json" });
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(authData),
  };
  const requesting = new Request(requestedURL, options);

  const response = await fetch(requesting);
  if ([422, 401].includes(response.status)) {
    return response;
  } else if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const data = await response.json();
  storeAuthToken(data.token);

  const redirection = requestingURL.searchParams.get("redirection") || "/";
  return redirect(redirection);
};

function AuthForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const data = useActionData();
  // console.log(data);
  const { state } = useNavigation();

  const handleShiftMode = () => {
    setSearchParams((prevSearch) => {
      const newSearch = new URLSearchParams(prevSearch);
      if (newSearch.get("mode") === "signup") newSearch.set("mode", "login");
      else newSearch.set("mode", "signup");
      newSearch.delete("message");
      return newSearch;
    });
  };

  const isLoginMode =
    !searchParams.has("mode") || searchParams.get("mode") === "login";
  const isSubmitting = state === "submitting";

  const message = searchParams.get("message");
  const h1Text = (function () {
    if (message) return message;
    else if (isLoginMode) return "Log in";
    return "Create a new user";
  })();

  return (
    <>
      <Form method="post" className={classes.form} replace>
        <h1>{h1Text}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <button
            type="button"
            onClick={handleShiftMode}
            disabled={isSubmitting}
          >
            {`Swift mode to ${isLoginMode ? "Sign up" : "Login"}`}
          </button>
          <button disabled={isSubmitting}>
            {!isSubmitting ? "Save" : "Submitting..."}
          </button>
        </div>
      </Form>
      {data && data.message && (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2>{data.message}</h2>
          {data.errors && (
            <ul>
              {Object.keys(data.errors).map((key) => (
                <li key={key}>{data.errors[key]}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}

export default AuthForm;
