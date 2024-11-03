import SectionTitle from "../../../../components/shared/SectionTitle";
import { useGetAllBookingsQuery } from "../../../../redux/features/booking/bookinApi";
import { TBooking } from "../../../../types/booking.types";

const Bookings = () => {
  const { data: bookings } = useGetAllBookingsQuery(undefined);
  console.log("book", bookings);
  return (
    <div>
      <SectionTitle
        heading="Bookings Overview"
        subHeading="View all customer bookings"
      />
      <div className="overflow-x-auto px-6">
        <table className="table table-zebra">
          <thead>
            <tr className="font-bold text-2xl text-black text-center">
              <th>#</th>
              <th>Customer Name</th>
              <th>Service Name</th>
              <th>Vehicle</th>
              <th>Slot</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <hr />
          <tbody className="text-black">
            {bookings?.data?.map((booking: TBooking, index: number) => (
              <tr key={booking._id} className="text-center">
                <th>{index + 1}</th>
                <td>{booking?.customer?.name}</td>
                <td>{booking?.slot?.date}</td>
                <td>{booking?.slot?.startTime} </td>
                <td>{booking?.slot?.endTime} </td>
                <td>{booking?.slot?.isBooked} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
