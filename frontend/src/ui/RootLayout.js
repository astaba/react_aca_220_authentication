import React from "react";
import { Outlet, useLoaderData } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";

const RootLayout = () => {
  const { token } = useLoaderData();

  return (
    <React.Fragment>
      <MainNavigation token={token} />
      <main>
        <Outlet context={{ token }} />
      </main>
    </React.Fragment>
  );
};

export default RootLayout;
