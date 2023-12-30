import axios from "axios";
import useSWR from "swr";

export function useAllClasses () {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR("http://localhost:3001/class/all", fetcher);
  
  console.log(data)
  return {
    dt: data,
    isLoading,
    isError: error
  }
}