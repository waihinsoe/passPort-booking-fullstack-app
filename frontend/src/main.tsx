import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import CheckBooking from "./routes/CheckBooking/CheckBooking";
import CreateBooking from "./routes/CreateBooking/CreateBooking";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-booking",
    element: <CreateBooking />,
  },
  {
    path: "/check-booking",
    element: <CheckBooking />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RouterProvider router={router} />
);
