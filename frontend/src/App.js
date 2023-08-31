import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./ui/RootLayout";
import HomePage from "./page/HomePage";
import EventsPage, { loader as eventsLoader } from "./page/EventsPage";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as eventDetailDeleteAction,
} from "./page/EventDetailPage";
import EditEventPage from "./page/EditEventPage";
import NewEventPage from "./page/NewEventPage";
import EventsLayout from "./ui/EventsLayout";
import ErrorDisplay from "./components/ErrorDisplay";
import NotFound from "./page/NotFound";
import { action as eventFormAction } from "./components/EventForm";
import NewsletterPage, {
  action as newsletterPageAction,
} from "./page/NewsletterPage";
import AuthenticationPage, {
  action as authPageAction,
} from "./page/Authentication";
import { logoutAction } from "./utils/actions";
import { getAuthToken } from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root-route",
    loader: () => ({ token: getAuthToken() }),
    errorElement: <ErrorDisplay />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
            errorElement: <ErrorDisplay />,
          },
          {
            path: ":eventID",
            id: "event-detail",
            loader: eventDetailLoader,
            errorElement: <ErrorDisplay />,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: eventDetailDeleteAction,
                errorElement: <ErrorDisplay />,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: eventFormAction,
                errorElement: <ErrorDisplay />,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: eventFormAction,
            errorElement: <ErrorDisplay />,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterPageAction,
        errorElement: <ErrorDisplay />,
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authPageAction,
        errorElement: <ErrorDisplay />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
