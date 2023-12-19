import { CircularProgress, Typography } from "@mui/material";

export const ClassGeneral = (props) => {
  <div className="circle-container">
    <div className="circle-chart">
      <CircularProgress value={100}>
        <div className="circle-progress-container">
          <div className="circle-progress-text">Ac Balance</div>
          <div className="circle-balance">$1000</div>
        </div>
      </CircularProgress>
    </div>
  </div>;
};
