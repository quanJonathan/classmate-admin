import axios from "axios";
import { te } from "date-fns/locale";
import { useParams } from "react-router-dom";
import useSWR from "swr"

export function useClassMember () {
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const {id} = useParams()
  const { data, error, isLoading } = useSWR(`http://localhost:3001/class/getClassMember/${id}`, fetcher)
 
  return {
    students: data?.filter(member => member.classes.some(cls => cls.classId.classId === id && cls.role === '1000')),
    teachers: data?.filter(member => member.classes.some(cls => cls.classId.classId === id && cls.role === '3000')),
    isLoading,
    isError: error
  }
}