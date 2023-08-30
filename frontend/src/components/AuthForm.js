import React from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

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
