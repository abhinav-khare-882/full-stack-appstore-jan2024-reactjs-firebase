// to get the complete loggedIN information from the users collection


import { useQuery } from "react-query";
import { getAllUsersFromTheCloud } from "../../api";
import { toast } from "react-toastify";

const useUsers = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "users",
    async () => {
      try {
        const users = await getAllUsersFromTheCloud();
        return users;
      } catch (error) {
        console.log(error);

        toast.error(`Error:${error}`);
        throw error;
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );
  return { data, isLoading, isError, refetch };
};

export default useUsers;
