import { Box, Tab, Tabs, Typography } from "@mui/material";
import React from "react";
import { ClassGeneral } from "../sections/classes/class-general";
import { ClassHomeWork } from "../sections/classes/class-homework";
import { ClassPeople } from "../sections/classes/class-people";
import { ClassGrade } from "../sections/classes/class-grade";
import PropTypes from 'prop-types';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const ClassEdit = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);

  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="scrollable prevent tabs example"
        centered
      >
        <Tab label="General Information" {...a11yProps(0)}/>
        <Tab label="Class-HomeWork" {...a11yProps(1)} />
        <Tab label="People" {...a11yProps(2)}/>
        <Tab label="Grade" {...a11yProps(3)}/>
      </Tabs>
      <CustomTabPanel value={value} index={0}>
          Item 1
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item 2
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item 3
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item 4
      </CustomTabPanel>
    </Box>
  );
};

export default ClassEdit;
