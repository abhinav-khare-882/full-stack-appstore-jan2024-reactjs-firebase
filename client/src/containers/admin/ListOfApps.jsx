import React from "react";
import useApps from "../../hooks/apps/useApps";
import { HashLoader } from "react-spinners";
import { AdminListCard } from "../../components";

const ListOfApps = () => {
  const { data: apps, isError, isLoading, refetch } = useApps();

  if (isLoading) {
    return (
      <div>
        <HashLoader color="#FF9E01" size={60} />
      </div>
    );
  }
  if (isError || !apps) {
    return <div>Error loading apps.</div>;
  }
  return (
    <div className="w-full h-auto grid grid-col-1 lg:grid-cols-2 gap-4">
      {apps?.length > 0 && apps ? (
        <React.Fragment>
          {apps?.map((app) => (
            <AdminListCard key={app?._id} data={app} />
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

export default ListOfApps;
