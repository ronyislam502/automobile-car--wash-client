import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ServiceManagement from "../pages/Dashboard/Admin/ServiceManagement/ServiceManagement";
import SlotManagement from "../pages/Dashboard/Admin/SlotManagement/SlotManagement";

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
      {
        path: "slot-management",
        element: <SlotManagement />,
      },
    ],
  },
];
