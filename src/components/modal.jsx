import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Chip, Grid, Stack } from "@mui/material";
import { InputTwoTone } from "@mui/icons-material";

const FormModal = ({ isOpen, onClose }) => {

  const mailRegex = "/^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$/; "

  const [formData, setFormData] = useState({
    className: "",
    // email, không nhất thiết phải tồn tại
    // Nếu không tồn tại thì sẽ tự động xóa bên backend
    classMember: [],

    // Như trên
    teachers: [], // email
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted with data:", formData);
    // Close the modal after submission
    setInputValue("");
    setFormData({
      className: "",
      classMember: [],
      teachers: [], // email
    });
    setChips([]);
    onClose();
    axios.post("/addClass", formData);
  };

  // Text field with chips
  const [chips, setChips] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddChip = () => {
    if (inputValue.trim() !== "" && !chips.includes(inputValue) && RegExp(mailRegex).exec(inputValue)) {
      setChips([...chips, inputValue]);
      setInputValue("");
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleDeleteChip = (chipToDelete) => () => {
    setChips((prevChips) => prevChips.filter((chip) => chip !== chipToDelete));
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 'auto',
          height: 'auto',
          maxWidth: "90%",
          maxHeight: "60%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
        }}
      >
        <TextField
          label="Class name"
          name="className"
          value={formData.className}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Type and press Enter"
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleAddChip()}
          fullWidth
          InputProps={{
            startAdornment: (
              <Grid  container>
                {chips.map((chip, index) => (
                  <Grid item key={index}>
                    <Chip label={chip} onDelete={handleDeleteChip(chip)} color="primary" />
                  </Grid>
                ))}
                <Grid item key="inputValue">
                  {inputValue}
                </Grid>
              </Grid>
            ),
          }}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default FormModal;
