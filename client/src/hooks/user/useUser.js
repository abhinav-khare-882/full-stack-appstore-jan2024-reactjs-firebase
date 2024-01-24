// custom hook

import { useQuery } from "react-query";
import { getAuthenticatedUser } from "../../api";
import { toast } from "react-toastify";

const useUser = () => {
//   console.log("useUser hook is called");
  const { data, isLoading, isError, refetch } = useQuery(
    "user",
    async () => {
      try {
        const userDetail = await getAuthenticatedUser();
        toast.success("Fine its working");
        return userDetail;
      } catch (error) {
        console.log(error);
        if (!error.message.includes("not authenticated")) {
          toast.error(`Error:${error}`);
        }
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};
export default useUser;
