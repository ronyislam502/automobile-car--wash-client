import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ServiceManagement from "../pages/Dashboard/Admin/ServiceManagement/ServiceManagement";
import SlotManagement from "../pages/Dashboard/Admin/SlotManagement/SlotManagement";
import Bookings from "../pages/Dashboard/Admin/UserManagement/Bookings";
import UserManagement from "../pages/Dashboard/Admin/UserManagement/UserManagement";

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
      {
        path: "user-management",
        element: <UserManagement />,
      },
      {
        path: "user-management/bookings",
        element: <Bookings />,
      },
    ],
  },
];
