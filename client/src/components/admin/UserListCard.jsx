import React from "react";
import { Avatar } from "../../assets";
import { updateUserDataToCloud } from "../../api";
import useUsers from "../../hooks/user/useUsers";
import { toast } from "react-toastify";

const UserListCard = ({ user }) => {
  const { data: users, isLoading, isError, refetch } = useUsers();
  const updateTheUsersRole = async (role) => {
    await updateUserDataToCloud({ _id: user?.uid, role: role }).then((data) => {
      toast.success("User role updated");
      refetch();
    });
  };
  return (
    <div className="p-4 border border-zinc-700 rounded-md flex flex-col items-center justify-center gap-3">
      <img
        src={user?.picture ? user?.picture : Avatar}
        className="w-24 h-24 objec-cover rounded-md "
        alt=""
      />
      <p className="text-xl font-semibold">{user?.name}</p>
      <p className="text-base font-semibold">Role: {user?.role}</p>
      {user?.role === "admin" ? (
        <button
          className="text-sm font-semibold px-2 py-1 bg-zinc-400 rounded-md cursor-pointer"
          onClick={() => updateTheUsersRole("member")}
        >
          Mark as member
        </button>
      ) : (
        <button
          className="text-sm font-semibold px-2 py-1 bg-zinc-400 rounded-md cursor-pointer"
          onClick={() => updateTheUsersRole("admin")}
        >
          Mark as Admin
        </button>
      )}
    </div>
  );
};

export default UserListCard;
