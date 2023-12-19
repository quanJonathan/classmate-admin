import axios from "axios";
import useSWR from "swr";

export function useUsers () {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR("http://localhost:3001/user/all", fetcher);
  
  console.log(data)
  return {
    users: data,
    isLoading,
    isError: error
  }
}