import { Form, Formik, FormikProps } from "formik";
import Modal from "../../../../../components/shared/Modal";
import Dropdown from "../../../../../components/Formik/Dropdown";
import Input from "../../../../../components/Formik/Input";
import { useCreateSlotMutation } from "../../../../../redux/features/slot/slotApi";
import { useState } from "react";
import { toast } from "sonner";
import { TError } from "../../../../../types/global";

type TSlotWithService = {
  _id?: string;
  service: {
    name: string;
    description: string;
    price: number;
    duration: number;
  };
  date: string;
  startTime: string;
  endTime: string;
  isBooked: string;
};

const createSlotInitialValues: TSlotWithService = {
  service: {
    name: "",
    description: "",
    price: 0,
    duration: 0,
  },
  date: "",
  startTime: "",
  endTime: "",
  isBooked: "",
};

const AddSlot = () => {
  const [isSlotCreateModalOpen, setSlotCreateModalOpen] = useState(false);
  const [SlotInfo] = useCreateSlotMutation();

  const handleCreateSlot = async (values: TSlotWithService) => {
    setSlotCreateModalOpen(false);
    const toastId = toast.loading("Slot creating");
    try {
      const response = await SlotInfo(values).unwrap();
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
    <div>
      <button
        onClick={() => setSlotCreateModalOpen(true)}
        className="btn btn-outline btn-success"
      >
        Add Service
      </button>
      <Modal isOpen={isSlotCreateModalOpen} setIsOpen={setSlotCreateModalOpen}>
        <Formik
          initialValues={createSlotInitialValues}
          onSubmit={handleCreateSlot}
        >
          {({ setFieldValue }: FormikProps<TSlotWithService>) => {
            return (
              <Form className="space-y-5">
                <Dropdown
                  name="service"
                  options={servicesToDropdownOption(servicesData.data)}
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
                <Dropdown
                  name="isBooked"
                  options={slotStatusOptions}
                  setFieldValue={setFieldValue}
                  placeholder="Select status"
                />
                <button className="btn btn-outline btn-success w-full">
                  Create slot
                </button>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </div>
  );
};

export default AddSlot;
