import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routeGenerator } from "../utilities/routeGenerator";
import { pageRoutes } from "./pageRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routeGenerator(pageRoutes),
  },
]);

export default routes;
