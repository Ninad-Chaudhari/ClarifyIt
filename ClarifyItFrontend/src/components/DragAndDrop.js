import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import "../styles/DragAndDrop.css";

const DragAndDrop = ({ onFileUpload }) => {
  const [isFileDropped, setIsFileDropped] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setIsFileDropped(true);

      const file = acceptedFiles[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        onFileUpload(parsedData);
      };

      reader.readAsBinaryString(file);

      // Remove the animation effect after 2 seconds
      setTimeout(() => {
        setIsFileDropped(false);
      }, 2000);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${isDragActive ? "active" : ""} ${
        isFileDropped ? "dropped" : ""
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the file here...</p>
      ) : isFileDropped ? (
        <p>File successfully uploaded!</p>
      ) : (
        <p>Drag & drop a file here, or click to select a file.</p>
      )}
    </div>
  );
};

export default DragAndDrop;
