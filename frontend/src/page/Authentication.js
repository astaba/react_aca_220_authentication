import React from "react";
import { json, redirect } from "react-router-dom";

import AuthForm from "../components/AuthForm";
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

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;
