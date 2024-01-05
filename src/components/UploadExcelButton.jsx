import React, { useState } from "react";
import { IconButton, Button, SvgIcon } from "@mui/material";
import ExcelJS from "exceljs";
import { UploadOutlined } from "@mui/icons-material";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";


const ExcelUploadButton = ({ onUpload }) => {
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log("file")
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(file);

    const worksheet = workbook.worksheets[0];
    const data = worksheet.getSheetValues();

    console.log(data)
    onUpload(data);
  };

  const handleButtonClick = () => {
    // Programmatically trigger the file input click
    console.log("click import")
    document.getElementById("fileInput").click();
  };

  return (
    <div>
      <input
        type="file"
        id="fileInput"
        accept=".xlsx, .xls"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Button
        color="inherit"
        onClick={handleButtonClick}
        startIcon={
          <SvgIcon fontSize="small">
            <ArrowUpOnSquareIcon />
          </SvgIcon>
        }
      >
        Import
      </Button>

    </div>
  );
};

export default ExcelUploadButton;
