import { useGetAllSlotsQuery } from "../../../../redux/features/slot/slotApi";
import { TSlotWithService } from "../../../../types";
import AddSlot from "./SlotCompo/AddSlot";

const SlotManagement = () => {
  const { data: slots } = useGetAllSlotsQuery(undefined);
  console.log("data", slots);
  return (
    <div>
      <AddSlot />
      <div className="overflow-x-auto px-6">
        <table className="table table-zebra">
          <thead>
            <tr className="font-bold text-2xl text-black text-center">
              <th>#</th>
              <th>Service Name</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <hr />
          <tbody className="text-black">
            {slots?.data?.map((slot: TSlotWithService, index: number) => (
              <tr key={slot._id} className="text-center">
                <th>{index + 1}</th>
                <td>{slot?.service?.name}</td>
                <td>{slot?.date}</td>
                <td>{slot?.startTime} min</td>
                <td>{slot?.endTime} min</td>
                <td>{slot?.isBooked} </td>
                <td>
                  <button className="btn btn-outline btn-error btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SlotManagement;
