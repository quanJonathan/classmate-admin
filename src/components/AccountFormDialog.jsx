import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { toast } from "react-toastify";

const AccountFormDialog = ({ fields, defaultValue, isOpen, postUrl, title, handleClose }) => {
  const [formData, setFormData] = useState(defaultValue);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = () => {
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    if (!formData.lastName || !formData.firstName || !formData.email || !formData.password) {
      toast.error('Check for missing infos')
      console.error('Check for missing infos');
      return;
    }
    axios.post(postUrl, formData)
    handleCloseFull();
  };

  const handleCloseFull = () => {
    setFormData(defaultValue)
    handleClose();
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={handleCloseFull}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below:
          </DialogContentText>
          <Grid container spacing={1}>
            <Grid item xs={12} lg={6}>
              <TextField
                autoFocus
                required
                fullWidth
                margin="dense"
                id="firstName"
                name="firstName"
                label="First Name"
                type="text"
                value={formData?.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                fullWidth
                required
                margin="dense"
                id="lastName"
                name="lastName"
                label="Last Name"
                type="text"
                value={formData?.lastName}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>

          <TextField
            required
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData?.email}
            onChange={handleInputChange}
          />
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            minlength="6"
            fullWidth
            value={formData?.password}
            onChange={handleInputChange}
          />

          <TextField
            margin="dense"
            id="address"
            name="address"
            label="Address"
            type="text"
            fullWidth
            value={formData?.address}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="phone"
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            fullWidth
            value={formData?.phoneNumber}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFull}>Cancel</Button>
          <Button onClick={handleFormSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AccountFormDialog;
