import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="max-w-7xl mx-auto">
      <RouterProvider router={routes} />
    </div>
  </React.StrictMode>
);
