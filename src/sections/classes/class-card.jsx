import PropTypes from "prop-types";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@heroicons/react/24/solid/CheckCircleIcon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { toast } from "react-toastify";
import axios, { HttpStatusCode } from "axios";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  SvgIcon,
  Typography,
  Button
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TimeIcon } from "@mui/x-date-pickers";

export const ClassCard = (props) => {
  const { classObject } = props;
  const navigate = useNavigate();

  const [anchorPosition, setAnchorPosition] = useState({ top: 0, left: 0 });
  const [isContextMenuOpen, setContextMenuOpen] = useState(false);

  const handleContextMenu = (event) => {
    event.preventDefault();

    setAnchorPosition({
      top: event.clientY,
      left: event.clientX,
    });

    setContextMenuOpen(true);
  };

  const handleClose = () => {
    setContextMenuOpen(false);
  };

  const handleDelete = () => {
    // Handle delete action
    handleClose();
    // Add logic for delete action
  };

  const handleViewDetail = () => {
    handleClose();
    navigate(`/classes/edit/${classObject?.classId}`);
  };

  function stringToColor(string) {
    string = string.toUpperCase()

    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    name = name.toUpperCase()
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
    };
  }

  const handleBan = async (name, id, state) => {
    let curUser = {
      classId: id, 
      state: state == "active" ? "inactive" : "active"
    };
    console.log('Form submitted:', curUser);
    
    await axios.post("http://localhost:3001/class/updateState", curUser).then((res) => {
        toast.success((state == "inactive" ? 'Activate ' : 'Inactivate ') + "class " + name + ' successfully!')
    }).catch((e) => {
      toast.error('Cannot ban! ' + e.message)

    })
  };

  return (
    <div onContextMenu={handleContextMenu} style={{ cursor: "context-menu" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          bgcolor: classObject?.state == 'active' ? stringToColor(classObject?.className) : 'grey'
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            pr: 1,
            pt: 1,
            bgcolor: classObject?.state == 'active' ? 'white' : 'grey',
            margin: '3% 2.5% 0px 2.5%',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px'
          }}
        >
          <Button
            id={classObject._id}
            color="inherit"
            startIcon={
              <SvgIcon fontSize="small">
                {classObject.state === 'active' ? <CheckIcon /> : <XMarkIcon />}
              </SvgIcon>
            }
            onClick={() => handleBan(classObject.className, classObject.classId, classObject.state)}
          ></Button>
          <IconButton onClick={handleViewDetail} size="small">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={handleDelete} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
        <CardContent sx={{ width: '95%', alignSelf: 'center', bgcolor: classObject?.state == 'active' ? 'white' : 'grey' }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pb: 3,
            }}
          >
            <Avatar src="" variant="square" />
          </Box>
          <Typography align="center" gutterBottom variant="h5">
            {classObject?.className + (classObject?.state == 'inactive' ? " (INACTIVE)" : "")}
          </Typography>
          <Typography align="center" variant="body1">
            {classObject?.classId}
          </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        {/* <Divider /> */}
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            p: 2, bgcolor: classObject?.state == 'active' ? 'white' : 'grey', width: '95%', alignSelf: 'center', marginBottom: '3%',
            borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'
          }}
        >
          <Stack alignItems="center" direction="row" spacing={1}>
            <SvgIcon color="action" fontSize="small">
              <ClockIcon />
            </SvgIcon>
            {/* <Typography color="text.secondary" display="inline" variant="body2">
              Updated 2hr ago
            </Typography> */}
          </Stack>
          <Stack alignItems="center" direction="row" spacing={1}>
            <Typography color="text.secondary" display="inline" variant="body2">
              {classObject.members.length} members
            </Typography>
          </Stack>
        </Stack>
      </Card>
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={anchorPosition}
        open={isContextMenuOpen}
        onClose={handleClose}
      >
        <MenuItem onClick={handleViewDetail}>View detail</MenuItem>
        <MenuItem onClick={handleClose}>Disable</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

ClassCard.propTypes = {
  classObject: PropTypes.object.isRequired,
};
