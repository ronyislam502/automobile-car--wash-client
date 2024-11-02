import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utilities/routeGenerator";
import { pageRoutes } from "./pageRoutes";
import Dashboard from "../layouts/Dashboard";
import { adminRoutes } from "./adminRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routeGenerator(pageRoutes),
  },
  {
    path: "/admin",
    element: <Dashboard />,
    children: routeGenerator(adminRoutes),
  },
]);

export default routes;
