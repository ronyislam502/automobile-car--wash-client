import { Form, Formik, FormikProps } from "formik";
import Dropdown from "../../../../components/Formik/Dropdown";

import { TUserResponse } from "../../../../types";
import SectionTitle from "../../../../components/shared/SectionTitle";
import { useState } from "react";
import { toast } from "sonner";
import { TError } from "../../../../types/global";
import Modal from "../../../../components/shared/Modal";
import {
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "../../../../redux/features/user/userApi";

const userRoleOptions = [
  {
    label: "User",
    value: "user",
  },
  {
    label: "Admin",
    value: "admin",
  },
];

type TInitialValues = {
  role: string;
};

const UserManagement = () => {
  const { data: users } = useGetAllUsersQuery(undefined);
  const [updateUser] = useUpdateUserMutation();
  const [isUserUpdateModalOpen, setUserUpdateModalOpen] = useState(false);

  const [userInfo, setUserInfo] = useState<TUserResponse | null>(null);

  const initialValues: TInitialValues = {
    role: userInfo?.role || "",
  };

  const handleUserUpdate = async (values: TInitialValues) => {
    setUserUpdateModalOpen(false);
    const toastId = toast.loading("User updating");
    if (userInfo) {
      try {
        const response = await updateUser({
          userData: values,
          id: userInfo._id,
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

  return (
    <div>
      <div className="">
        <SectionTitle
          heading="User Management"
          subHeading="Overview and manage user roles"
        />
        <div className="overflow-x-auto px-6">
          <table className="table table-zebra">
            <thead>
              <tr className="font-bold text-2xl text-black text-center">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <hr />
            <tbody className="text-black">
              {users?.data?.map((user: TUserResponse, index: number) => (
                <tr key={user._id} className="text-center">
                  <th>{index + 1}</th>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.phone}</td>
                  <td>{user?.address}</td>
                  <td>{user?.role} </td>
                  <td>
                    <button
                      onClick={() => {
                        setUserInfo(user);
                        setUserUpdateModalOpen(true);
                      }}
                      className="btn btn-outline btn-info btn-sm"
                    >
                      {user.role === "admin" && "user" ? "User" : "Admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isUserUpdateModalOpen} setIsOpen={setUserUpdateModalOpen}>
        <Formik initialValues={initialValues} onSubmit={handleUserUpdate}>
          {({ setFieldValue }: FormikProps<TInitialValues>) => {
            return (
              <Form className="space-y-5">
                <Dropdown
                  name="role"
                  options={userRoleOptions}
                  setFieldValue={setFieldValue}
                  placeholder="Select role"
                />
                <button className="form-submit-btn w-full">Submit</button>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </div>
  );
};

export default UserManagement;
