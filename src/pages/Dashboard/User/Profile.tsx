import { useState } from "react";
import SectionTitle from "../../../components/shared/SectionTitle";
import { useAppSelector } from "../../../redux/hooks";
import { FaEdit } from "react-icons/fa";
import { TUserResponse } from "../../../types";
// import Modal from "../../../components/shared/Modal";
// import FormikForm from "../../../components/Formik/FormikForm";
// import Input from "../../../components/Formik/Input";

const Profile = () => {
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  const user = useAppSelector(
    (state) => state.auth.user
  ) as unknown as TUserResponse;
  console.log("profile", user);
  return (
    <div>
      <div className="">
        <SectionTitle
          heading="Profile"
          subHeading="Overview and manage your information"
        />
        <div className="flex justify-center w-full">
          <div className="mt-6 relative grid grid-cols-1 sm:grid-cols-2 gap-6 lg:w-[50%] lg:p-10 p-5 bg-primary-foreground/5 rounded-md w-full">
            <button
              onClick={() => setEditUserModalOpen(true)}
              className="absolute top-1 right-2 flex items-center gap-x-2"
            >
              <FaEdit /> Edit profile
            </button>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Name</h2>
              <p className="text-gray-500">{user?.name}</p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Email</h2>
              <p className="text-gray-500">{user?.email}</p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Phone</h2>
              <p className="text-gray-500">{user?.phone}</p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Role</h2>
              <p
                className={`text-gray-500 ${
                  user?.role === "admin" ? "text-green-600" : "text-blue-600"
                }`}
              >
                {user?.role}
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Address</h2>
              <p className="text-gray-500">{user?.address}</p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">
                Member Since
              </h2>
              <p className="text-gray-500">
                {new Date(user?.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">
                Last Updated
              </h2>
              <p className="text-gray-500">
                {new Date(user?.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <Modal isOpen={isEditUserModalOpen} setIsOpen={setEditUserModalOpen}>
        <FormikForm
          initialValues={userProfileInitialValues}
          onSubmit={onSubmit}
        >
          <Input name="name" label="Name" />
          <Input name="phone" label="Phone" />
          <Input name="address" label="Address" />
          <button type="submit" className="form-submit-btn w-full">
            Submit
          </button>
        </FormikForm>
      </Modal> */}
    </div>
  );
};

export default Profile;
