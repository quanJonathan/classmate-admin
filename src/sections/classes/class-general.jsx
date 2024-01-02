import { CircularProgress, Typography } from "@mui/material";
import { useOneClass } from "../../hooks/useOneClass";
import Spinner from "../../components/spinner";

export const ClassGeneral = ({id}) => {
  const {data, isLoading, isError} = useOneClass();
  console.log(isLoading);

  return (
    <>
    {isLoading ? (
      <Spinner />
    ) : (
  <div className="circle-container">
    <div className="circle-chart">
      {/* <CircularProgress value={100}>
        <div className="circle-progress-container">
          <div className="circle-progress-text">Ac Balance</div>
          <div className="circle-balance">$1000</div>
        </div>
      </CircularProgress> */}

      <Typography variant="h1">{data.className}</Typography>
      <Typography variant="h5">{data.classId}</Typography>
      <Typography variant="h5">{data.state == 'inactive' ? "(INACTIVE)" : ''}</Typography>
    </div>
  </div>
  )}
  </>
  )
    };
