import { redirect } from "react-router-dom";

export const storeAuthToken = (token) => {
  localStorage.setItem("authToken", token);
};

export const getAuthToken = () => {
  const authToken = localStorage.getItem("authToken");
  return authToken;
};

export const requireAuth = (request) => {
  const authToken = getAuthToken();
  if (!authToken) {
    const url = new URL(request.url);
    const redirection = url.pathname;
    const query = new URLSearchParams();
    query.set("message", "You must log in first!");
    query.set("redirection", redirection);

    throw redirect("/auth?mode=login&" + query.toString());
  }
  return null;
};
