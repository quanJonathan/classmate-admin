import React, { useState } from 'react';
import {
  Button,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
  FormControl
} from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormControlLabel from "@mui/material/FormControlLabel";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios, { HttpStatusCode } from 'axios';
import { toast } from "react-toastify";

const AccountEditFormDialog = ({ id, fields, defaultValue, isOpen, postUrl, title, handleClose }) => {
  const [formData, setFormData] = useState(defaultValue);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //console.log(defaultValue)

  const handleFormSubmit = async () => {
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    if (!formData.lastName || !formData.firstName || !formData.email) {
      toast.error('Check for infos')
      console.error('Check for missing infos');
      return;
    }
    else if ((!formData.oldPassword && formData.newPassword) || (!formData.oldPassword && formData.newPassword2) ||
      (formData.newPassword !== formData.newPassword2)) {
      toast.error('Passwords incorrect!')
      console.error('Passwords incorrect!');
      return;
    }
    await axios.post(postUrl, formData)
      .then((res) => {
        console.log(res)
        if (res.status === HttpStatusCode.Ok)
          toast.success('Edited successfully: ' + res.data.email);
        else {
          toast.error('Error')
        }
      })
      .catch((e) => {
        toast.error(e)
      });
    handleCloseFull();
  };

  const handleCloseFull = () => {
    //setFormData(defaultValue)
    handleClose();
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [showPassword1, setShowPassword1] = useState(false);

  const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

  const handleMouseDownPassword1 = (event) => {
    event.preventDefault();
  };

  const [showPassword2, setShowPassword2] = useState(false);

  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Dialog open={id ? isOpen === id : isOpen} onClose={handleCloseFull}>
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
            disabled
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData?.email}
            onChange={handleInputChange}
          />
          <FormControl fullWidth required variant="outlined" sx={{
            marginTop: "5px", marginBottom: "5px"
          }}>
            <InputLabel htmlFor="outlined-adornment-password"
              sx={{
                // marginLeft: "5px", marginRight: "5px"
              }}
            >
              Password
            </InputLabel>
            <OutlinedInput
              required
              margin="dense"
              id="oldPassword"
              name="oldPassword"
              label="Old Password"
              minLength="6"
              fullWidth
              value={formData?.oldPassword}
              onChange={handleInputChange}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth required variant="outlined" sx={{
            marginTop: "5px", marginBottom: "5px"
          }}>
            <InputLabel htmlFor="outlined-adornment-password"
              sx={{
                // marginLeft: "5px", marginRight: "5px"
              }}
            >
              New Password
            </InputLabel>
            <OutlinedInput
              required
              margin="dense"
              id="newPassword"
              name="newPassword"
              label="New Password"
              minLength="6"
              fullWidth
              value={formData?.newPassword}
              onChange={handleInputChange}
              type={showPassword1 ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword1}
                    onMouseDown={handleMouseDownPassword1}
                    edge="end"
                  >
                    {showPassword1 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth required variant="outlined" sx={{
            marginTop: "5px", marginBottom: "5px"
          }}>
            <InputLabel htmlFor="outlined-adornment-password"

            >
              Confirm New Password
            </InputLabel>
            <OutlinedInput
              required
              margin="dense"
              id="newPassword2"
              name="newPassword2"
              label="Confirm New Password"
              minLength="6"
              fullWidth
              value={formData?.newPassword2}
              onChange={handleInputChange}
              type={showPassword2 ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword2}
                    edge="end"
                  >
                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
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

export default AccountEditFormDialog;
