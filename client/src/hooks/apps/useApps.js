import { useQuery } from "react-query";
import { getAllAppsFromTheCloud } from "../../api";
import { toast } from "react-toastify";

const useApps = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "apps",
    async () => {
      try {
        const apps = await getAllAppsFromTheCloud();
        return apps;
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

export default useApps;
