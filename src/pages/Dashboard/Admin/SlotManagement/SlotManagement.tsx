import { Form, Formik, FormikProps } from "formik";
import { useState } from "react";
import { toast } from "sonner";
import {
  useCreateSlotMutation,
  useGetAllSlotsQuery,
  useUpdateSlotMutation,
} from "../../../../redux/features/slot/slotApi";
import { TSlotWithService } from "../../../../types";
import { TError } from "../../../../types/global";
import SectionTitle from "../../../../components/shared/SectionTitle";
import Modal from "../../../../components/shared/Modal";
import Dropdown from "../../../../components/Formik/Dropdown";
import { servicesToDropdownOption } from "../../../../utilities/utils";
import Input from "../../../../components/Formik/Input";

const slotStatusOptions = [
  {
    label: "Available",
    value: "available",
  },
  {
    label: "Cancel",
    value: "canceled",
  },
];

type TInitialValues = {
  isBooked: string;
};
type TCreateSlotInitialValues = {
  service: string;
  date: string;
  startTime: string;
  endTime: string;
};

const createSlotInitialValues: TCreateSlotInitialValues = {
  service: "",
  date: "",
  startTime: "",
  endTime: "",
};

const SlotManagement = () => {
  const { data: slots } = useGetAllSlotsQuery(undefined);
  const [updateSlot] = useUpdateSlotMutation();
  const [createSlot] = useCreateSlotMutation();
  // modal
  const [isSlotUpdateModalOpen, setSlotUpdateModalOpen] = useState(false);
  const [isSlotCreateModalOpen, setSlotCreateModalOpen] = useState(false);
  // utils
  const [selectedSlot, setSelectedSlot] = useState<TSlotWithService | null>(
    null
  );

  const initialValues = {
    isBooked: selectedSlot?.isBooked || "",
  };

  const handleUpdateSlot = async (values: TInitialValues) => {
    console.log(values);
    setSlotUpdateModalOpen(false);
    const toastId = toast.loading("Slot updating");
    if (selectedSlot) {
      try {
        const response = await updateSlot({
          slotInfo: values,
          id: selectedSlot._id,
        }).unwrap();
        toast.success(response.message, { id: toastId, duration: 2000 });
      } catch (error) {
        console.log(error);
        const err = error as TError;
        toast.error(err?.data?.message, {
          id: toastId,
          duration: 2000,
        });
      }
    }
  };
  const handleCreateSlot = async (values: TCreateSlotInitialValues) => {
    setSlotCreateModalOpen(false);
    const toastId = toast.loading("Slot creating");
    try {
      const response = await createSlot(values).unwrap();
      toast.success(response.message, { id: toastId, duration: 2000 });
    } catch (error) {
      console.log("error", error);
      const err = error as TError;
      toast.error(err?.data?.message, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <>
      <div className="">
        <SectionTitle heading="Slot Management" />
        <div className="flex justify-end mb-5">
          <button
            onClick={() => setSlotCreateModalOpen(true)}
            className="btn btn-outline btn-success"
          >
            Create slot
          </button>
        </div>
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
                    <button
                      onClick={() => {
                        setSelectedSlot(slot);
                        setSlotUpdateModalOpen(true);
                      }}
                      className="btn btn-outline btn-info btn-sm"
                    >
                      {slot.isBooked === "available" ? "Cancel" : "Available"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* slot update */}
      <Modal isOpen={isSlotUpdateModalOpen} setIsOpen={setSlotUpdateModalOpen}>
        <Formik initialValues={initialValues} onSubmit={handleUpdateSlot}>
          {({ setFieldValue }: FormikProps<TInitialValues>) => {
            return (
              <Form className="space-y-5">
                <Dropdown
                  name="isBooked"
                  options={slotStatusOptions}
                  setFieldValue={setFieldValue}
                  placeholder="Select status"
                />
                <button className="form-submit-btn w-full">Submit</button>
              </Form>
            );
          }}
        </Formik>
      </Modal>
      {/* slot create */}
      <Modal isOpen={isSlotCreateModalOpen} setIsOpen={setSlotCreateModalOpen}>
        <Formik
          initialValues={createSlotInitialValues}
          onSubmit={handleCreateSlot}
        >
          {({ setFieldValue }: FormikProps<TCreateSlotInitialValues>) => {
            return (
              <Form className="space-y-5">
                <Dropdown
                  name="service"
                  options={servicesToDropdownOption(service)}
                  setFieldValue={setFieldValue}
                  placeholder="Select service"
                />
                <Input name="date" label="Date" placeholder="ex: YYYY-MM-DD" />
                <Input
                  name="startTime"
                  label="Start time"
                  placeholder="ex: 10:00"
                />
                <Input
                  name="endTime"
                  label="End time"
                  placeholder="ex: 17:00"
                />
                <button className="form-submit-btn w-full">Create slot</button>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};

export default SlotManagement;
