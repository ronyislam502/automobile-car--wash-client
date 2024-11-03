import { useGetMyBookingsQuery } from "../../../../redux/features/booking/bookinApi";
import { TBooking } from "../../../../types/booking.types";

const PastBookings = () => {
  const { data: bookings } = useGetMyBookingsQuery(undefined);
  console.log(bookings);
  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {bookings?.data?.map((booking: TBooking) => (
          <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{booking?.service?.name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastBookings;
