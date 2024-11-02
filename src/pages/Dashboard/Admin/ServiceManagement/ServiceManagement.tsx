import { useGetAllServicesQuery } from "../../../../redux/features/service/serviceApi";
import { TService } from "../../../../types";
import AddService from "./ServiceCompo/AddService";

const ServiceManagement = () => {
  const { data: services } = useGetAllServicesQuery(undefined);

  return (
    <div>
      <AddService />
      <div className="overflow-x-auto px-6">
        <table className="table table-zebra">
          <thead>
            <tr className="font-bold text-2xl text-black text-center">
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Duration(mins)</th>
              <th>EDIT</th>
              <th>Action</th>
            </tr>
          </thead>
          <hr />
          <tbody className="text-black">
            {services?.data?.map((service: TService, index: number) => (
              <tr key={service._id} className="text-center">
                <th>{index + 1}</th>
                <td>{service?.name}</td>
                <td>{service?.description}</td>
                <td>$ {service?.price}</td>
                <td>{service.duration}</td>
                <td>
                  <button className="btn btn-outline btn-accent btn-sm">
                    Update
                  </button>
                </td>
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

export default ServiceManagement;
