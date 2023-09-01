import React from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
  json,
  redirect,
} from "react-router-dom";

import classes from "./AuthForm.module.css";
import { storeAuthToken } from "../utils/auth";

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const authData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const mode = new URL(request.url).searchParams.get("mode") || "login";
  if (!["login", "signup"].includes(mode)) {
    throw json(
      { message: "Unexpected mode in query parameter" },
      { status: 422, statusText: "Unprocessable Entity" }
    );
  }
  const url = new URL("http://localhost:8080/" + mode);
  const headers = new Headers({ "Content-Type": "application/json" });
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(authData),
  };
  const requesting = new Request(url, options);

  const response = await fetch(requesting);
  if ([422, 401].includes(response.status)) {
    return response;
  } else if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const data = await response.json();
  storeAuthToken(data.token);

  return redirect("/");
};

function AuthForm() {
  const [searchParams] = useSearchParams();
  const data = useActionData();
  console.log(data);
  const { state } = useNavigation();

  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = state === "submitting";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link
            to={`?mode=${isLogin ? "signup" : "login"}`}
            style={isSubmitting ? { pointerEvents: "none" } : null}
          >
            {isLogin ? "Create new user" : "Login"}
          </Link>
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
