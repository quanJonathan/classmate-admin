import React, { lazy, Suspense } from 'react';
import { styled } from '@mui/material/styles';

const ApexChart = lazy(() => import('react-apexcharts'), {
  ssr: false,
  loading: () => null
});

const Chart = styled(ApexChart)``;

const ChartWrapper = (props) => (
  <Suspense fallback={null}>
    <Chart {...props} />
  </Suspense>
);

export default ChartWrapper;