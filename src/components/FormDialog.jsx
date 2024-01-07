import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { toast } from "react-toastify";

const FormDialog = ({fields, defaultValue, isOpen, postUrl, title, handleClose}) => {
  const [formData, setFormData] = useState(defaultValue);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    // Add your form submission logic here
    console.log('Form submitted:', formData);
    await axios.post(postUrl, formData)
      .then((res) => {
        console.log(res)
        toast.success('Add class successfully: ' + formData.className);
        
      })
      .catch((e) => {
        toast.error(e)
      });
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
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="className"
            label="Name"
            type="text"
            fullWidth
            value={formData?.className}
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

export default FormDialog;
