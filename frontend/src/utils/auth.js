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

export const setDeadline = (laps) => {
  const deadline = new Date();
  deadline.setMilliseconds(deadline.getMilliseconds() + laps);
  localStorage.setItem("tokenDeadline", deadline.toISOString());
};

export const checkTokenExpiration = () => {
  let duration = 0;
  let isExpired = true;
  const tokenDeadline = localStorage.getItem("tokenDeadline");
  if (!tokenDeadline) return { isExpired, duration };
  const deadline = new Date(tokenDeadline);
  const now = new Date();
  duration = deadline.getTime() - now.getTime();
  isExpired = duration <= 0;
  if (isExpired) duration = 0;
  return { isExpired, duration };
};
