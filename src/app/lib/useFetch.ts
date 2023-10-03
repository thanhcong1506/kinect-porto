import useSWR, { SWRConfiguration } from "swr";
import axios from "axios";

const useFetch = <Type>(url: string, config?: SWRConfiguration) => {
  const { data, error } = useSWR<Type>(url, async (fetchUrl) => {
    const response = await axios.get(fetchUrl);
    return response.data;
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useFetch;
