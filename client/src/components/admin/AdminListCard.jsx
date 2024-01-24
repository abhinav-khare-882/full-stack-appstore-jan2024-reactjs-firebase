import React, { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import useUser from "../../hooks/user/useUser";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import useApps from "../../hooks/apps/useApps";
import { deleteAnAppFromCloud } from "../../api";

const AdminListCard = ({ data }) => {
  const { data: user, isLoading, isError, refetch } = useUser();
  const { data: apps, refetch: refetchApps } = useApps();
  const [isDelete, setisDelete] = useState(false);

  const removeAnApp = async () => {
    await deleteAnAppFromCloud(data?._id).then(() => {
      toast.success("Removed the app");
    });
  };

  return (
    <div className="border-2 border-heroPrimary rounded-md px-3 py-2 flex items-center justify-start gap-3 relative w-full h-24">
      <img src={data?.appIcon} className="w-16 h-16 object-cover rounded-md" alt="" />
      <h2 className="text-textPrimary font-semibold text-xl">
        {data?.title}
        <span className="block font-normal text-base">{data?.company}</span>
      </h2>
      {user?.role === "admin" && (
        <div
          className="w-6 h-6 rounded-md absolute bg-red-500 bottom-2 right-2 flex items-center justify-center cursor-pointer"
          onClick={() => setisDelete(true)}
        >
          <FaTrash className="text-xs text-white" />
        </div>
      )}

      <AnimatePresence>
        {isDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-md flex items-center justify-center"
          >
            <div className="border rounded-md border-heroPrimary p-4 flex flex-col items-center justify-center gap-4">
              <h2 className="text-2xl font-medium">Are you sure, you want to delete it??</h2>
              <div className="flex items-center justify-center gap-4">
                <button
                  className="outline-none px-6 py-2 rounded-md border border-heroPrimary hover:bg-teal-400 hover:border-none hover:text-black"
                  onClick={() => removeAnApp()}
                >
                  YES
                </button>
                <button
                  className="outline-none px-6 py-2 rounded-md border border-heroPrimary hover:bg-red-400 hover:border-none hover:text-black"
                  onClick={() => setisDelete(false)}
                >
                  NO
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminListCard;
