import React, { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { checkTokenExpiration, getAuthToken } from "../utils/auth";

export const loader = () => {
  // console.log("Route layout loader!");
  return { token: getAuthToken() };
};

const RootLayout = () => {
  const { token } = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    const { isExpired, duration } = checkTokenExpiration();
    // console.log(`${isExpired}: ${duration}`);
    if (isExpired) return;
    const timer = setTimeout(() => {
      /**
       * In this case we log out the user, but
       * here you could trigger what ever you please, like
       * notifying the user session expiration with drop down
       * notification.
       */
      submit(null, { method: "POST", action: "/logout" });
    }, duration);
    return () => {
      clearTimeout(timer);
    };
  }, [token, submit]);

  return (
    <React.Fragment>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  );
};

export default RootLayout;
