import PropTypes from "prop-types";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <div onContextMenu={handleContextMenu} style={{ cursor: "context-menu" }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            pr: 1,
            pt: 1,
          }}
        >
          <IconButton onClick={handleViewDetail} size="small">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={handleDelete} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
        <CardContent>
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
            {classObject?.className}
          </Typography>
          <Typography align="center" variant="body1">
            {classObject?.classId}
          </Typography>
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{ p: 2 }}
        >
          <Stack alignItems="center" direction="row" spacing={1}>
            <SvgIcon color="action" fontSize="small">
              <ClockIcon />
            </SvgIcon>
            <Typography color="text.secondary" display="inline" variant="body2">
              Updated 2hr ago
            </Typography>
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
