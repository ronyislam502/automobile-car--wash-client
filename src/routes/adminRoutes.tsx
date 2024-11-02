import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ServiceManagement from "../pages/Dashboard/Admin/ServiceManagement/ServiceManagement";

export const adminRoutes = [
  {
    path: "dashboard",
    element: <AdminHome />,
    children: [
      {
        path: "admin-home",
        element: <AdminHome />,
      },
      {
        path: "service-management",
        element: <ServiceManagement />,
      },
    ],
  },
];
