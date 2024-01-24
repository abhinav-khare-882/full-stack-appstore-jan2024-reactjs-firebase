import React from "react";
import useUsers from "../../hooks/user/useUsers";
import { UserListCard } from "../../components";
import { HashLoader } from "react-spinners";

const AdminUsers = () => {
  const { data: users, isLoading, isError, refetch } = useUsers();
  if (isLoading) {
    return <HashLoader color="#FF9E01" size={60} />;
  }
  return (
    <div className="w-full flex flex-wrap items-center justify-evenly gap-4">
      {users && users?.length > 0 ? (
        <React.Fragment>
          {users?.map((user) => (
            <UserListCard key={user?.uid} user={user} />
          ))}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>No Data</p>
        </React.Fragment>
      )}
    </div>
  );
};

export default AdminUsers;
