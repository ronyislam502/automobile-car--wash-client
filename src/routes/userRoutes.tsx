import PastBookings from "../pages/Dashboard/User/Booking/PastBookings";
import UpcomingBookings from "../pages/Dashboard/User/Booking/UpcomingBookings";
import Profile from "../pages/Dashboard/User/Profile";

export const userRoutes = [
  {
    path: "dashboard",
    element: <Profile />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "past-bookings",
        element: <PastBookings />,
      },
      {
        path: "upcoming-bookings",
        element: <UpcomingBookings />,
      },
    ],
  },
];
