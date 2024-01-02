import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Checkbox,
  Box,
  Container,
  Card,
} from "@mui/material";
import { Person as PersonIcon, More as MoreIcon } from "@mui/icons-material";

export const ClassPeople = (props) => {
  const { students, teachers } = props;
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  return (
    <Card>
      <Container style={{ marginTop: 20 }}>
        <Section title="Teachers" data={teachers} icon={<PersonIcon />} selectAll={selectAll} />
        <Section title="Students" data={students} icon={<PersonIcon />} selectAll={selectAll} />
      </Container>
    </Card>
  );
};

const Section = ({ title, data, icon, selectAll }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleToggle = (item) => {
    const currentIndex = selectedItems.indexOf(item);
    const newSelectedItems = [...selectedItems];

    if (currentIndex === -1) {
      newSelectedItems.push(item);
    } else {
      newSelectedItems.splice(currentIndex, 1);
    }

    setSelectedItems(newSelectedItems);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...data]);
    }
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-evenly" alignItems="center">
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <IconButton>{icon} </IconButton>
      </Box>
      <List>
        {data.map((item) => (
          <ListItem key={item._id} onClick={() => handleToggle(item)}>
            <ListItemIcon>
              <Checkbox checked={selectedItems.indexOf(item) !== -1} tabIndex={-1} disableRipple />
            </ListItemIcon>
            <ListItemText primary={item.firstName + " " + item.lastName} />
            <ListItemIcon>
              <IconButton>
                <MoreIcon />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
