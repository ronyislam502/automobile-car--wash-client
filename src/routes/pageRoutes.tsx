import Home from "../pages/Home/Home";
import Service from "../pages/Service/Service";

export const pageRoutes = [
  {
    path: "/",
    element: <Home />,
    Children: [
      {
        path: "service",
        element: <Service />,
      },
    ],
  },
];
