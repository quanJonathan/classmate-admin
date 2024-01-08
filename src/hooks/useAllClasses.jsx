import axios from "axios";
import useSWR from "swr";

export function useAllClasses () {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR("https://classmatebe-final.onrender.com/class/all", fetcher);
  
  console.log(data)
  return {
    dt: data,
    isLoading,
    isError: error
  }
}