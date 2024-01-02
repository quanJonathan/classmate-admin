import axios from "axios";
import useSWR from "swr";
import { useParams } from "react-router-dom";


export function useOneClass () {

  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const {id} = useParams()

  console.log(`http://localhost:3001/class/getOne/${id}`)
  const { data, error, isLoading } = useSWR(`http://localhost:3001/class/getOne/${id}`, fetcher);
  
  return {
    data: data,
    isLoading,
    isError: error
  }
}