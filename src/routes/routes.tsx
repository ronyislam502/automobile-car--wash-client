import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utilities/routeGenerator";
import { pageRoutes } from "./pageRoutes";
import Dashboard from "../layouts/Dashboard";
import { adminRoutes } from "./adminRoutes";
import ProtectedRoute from "./ProtectedRoute";
import { userRoutes } from "./userRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routeGenerator(pageRoutes),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminRoutes),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: routeGenerator(userRoutes),
  },
]);

export default routes;
