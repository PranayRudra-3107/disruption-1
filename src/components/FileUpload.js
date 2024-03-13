import React, { useState } from 'react';
import { Button, Container, Box, OutlinedInput, Select, MenuItem, FormControl, Paper, Checkbox, FormControlLabel, Grid, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormHelperText } from '@mui/material';
import About from './About';
import configData from "./config.json";

global.base = configData.SERVER_URL;
console.log(configData.SERVER_URL);

const validationSchema = yup.object({
  name: yup.string().required('*Required'),
  delimiter: yup.string().required('*Required'),
});

const FileUpload = () => {

  const formik = useFormik({
    initialValues: {
      name: '',
      delimiter: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      sendData(values);
    },
  });

  const [alert, setAlert] = useState();
  const [formData, setFormData] = useState({
    fileName: '',
    description: '',
    expiration: '60',
    sharingFile: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, sharingFile: e.target.checked }));
  };

  const currentDate = new Date();
  const after60Days = new Date(currentDate.getTime() + 60 * 24 * 60 * 60 * 1000);
  const after90Days = new Date(currentDate.getTime() + 90 * 24 * 60 * 60 * 1000);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileSizeMB = file.size / (1024 * 1024);
    const validFileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    if (validFileTypes.includes(file.type) && fileSizeMB < 100) {
      setSelectedFile(file);
      setFormData(prev => ({ ...prev, fileName: file.name }));
      setAlert(null);
    } else {
      if (fileSizeMB >= 100) {
        setAlert({ severity: 'error', message: 'File size should be less than 100MB' });
      } else {
        setAlert({ severity: 'error', message: 'File type not supported. Accepted file types are .csv, .xls, and .xlsx' });
      }
    }
  };

  const sendData = async (formData) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', selectedFile);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('delimiter', formData.delimiter);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('expiration', formData.expiration);
      formDataToSend.append('sharingFile', formData.sharingFile);

      const response = await fetch(`${global.base}/utilization`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        console.log('Data sent successfully');
      } else {
        console.error('Failed to send data');
      }
    } catch (error) {
      console.error('Error while sending data:', error);
    }
  };

  const handleDelete = (event) => {
    event.preventDefault(); 
    setSelectedFile(null);
    setFormData(prev => ({ ...prev, fileName: '' }));
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleLeaveDialog = () => {
    setOpenDialog(false);
    window.location.href = "http://10.135.67.8:3030/#!/";
  };

  return (
    <Container align='center' style={{ paddingLeft: '150px', paddingRight: '150px' }}>
      <form style={{ paddingTop: '20px' }} onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} direction="column" justify="center" >

          <Grid item container sx={{marginBottom:'50px'}}>
            <Grid item xs={2} sx={{ textAlign: 'left' }}></Grid>
            <Grid item xs={10}>
              <Box component="label"
                fullWidth
                sx={{
                  minHeight: "180px",
                  height: "fit-content",
                  border: "2px dashed gray",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#D3D3D333",
                  padding:3
                }}>
                    <p style={{ fontSize: "20px",marginBottom: '0px' }}>Drag and drop a Utilization File here, or click to select a file from your computer.</p>
                    <p style={{ fontSize: "12px", paddingBottom:'20px'}}>Supported Formats: .csv (recommended) and Microsoft Excel 2003 and above (.xls and .xlsx)</p>
                    {alert && <Alert severity={alert.severity} style={{ marginBottom: '10px' }}>{alert.message}</Alert>}
                    {selectedFile ? (
              <>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px'}}>
                <Paper style={{ padding: '10px' }}>{formData.fileName}</Paper>
              </div>
              <div style={{ marginTop: '10px' }}>
                <Button variant="outlined" size="small" onClick={handleDelete} startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </div>
            </>
            
                ) : (
                  <>
                    <Button component="label" variant="contained">
                      Upload
                      <input type="file" accept=".xls,.xlsx,.csv" style={{ display: 'none' }} onChange={handleFileChange} />
                    </Button>
                  </>
                )}

              </Box>
            </Grid>
          </Grid>

          <Grid item container>
            <Grid item xs={2} sx={{ textAlign: 'left' }}>
              <h5>Name*</h5>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth error={formik.touched.name && Boolean(formik.errors.name)}>
                <OutlinedInput
                  placeholder="Enter Utilization File Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && <FormHelperText  severity="error">{formik.errors.name}</FormHelperText >}
              </FormControl>
            </Grid>
          </Grid>

          <Grid item container>
            <Grid item xs={2} sx={{ textAlign: 'left' }}>
              <h5>Description</h5>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth>
                <OutlinedInput placeholder="Enter Description" />
              </FormControl>
            </Grid>
          </Grid>

          <Grid item container>
            <Grid item xs={2} sx={{ textAlign: 'left' }}>
              <h5 >Delimiter*</h5>
            </Grid>
            <Grid item xs={10}>
            <FormControl fullWidth error={formik.touched.delimiter && Boolean(formik.errors.delimiter)}>
                <Select
                    variant="outlined"
                    value={formik.values.delimiter}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} // Ensure handleBlur is called
                    name="delimiter"
                    sx={{
                        textAlign: 'left',
                        '& .MuiOutlinedInput-root': {
                            borderColor: formik.touched.delimiter && formik.errors.delimiter ? 'red' : undefined
                        }
                    }}
                >
                    <MenuItem value=",">Comma (,)</MenuItem>
                    <MenuItem value=";">Semicolon (;)</MenuItem>
                    <MenuItem value="|">Pipe (|)</MenuItem>
                </Select>
                {formik.touched.delimiter && formik.errors.delimiter && (
                    <FormHelperText sx={{ color: 'red' }}>{formik.errors.delimiter}</FormHelperText>
                )}
            </FormControl>
            </Grid>
          </Grid>

          <Grid item container>
            <Grid item xs={2} sx={{ textAlign: 'left' }}>
              <h5 sx={{ textAlign: 'left' }}>Expiration</h5>
            </Grid>
            <Grid item xs={10}>
              <FormControl fullWidth>
                <Select variant="outlined" value={formData.expiration} onChange={handleChange} name="expiration" sx={{ textAlign: 'left' }}>
                  <MenuItem value="60">60 days({after60Days.toLocaleDateString()})</MenuItem>
                  <MenuItem value="90">90 days({after90Days.toLocaleDateString()})</MenuItem>
                  <MenuItem value="0">Never</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid item container>
            <Grid item xs={2}>
              <h5 style={{ textAlign: 'left' }}>Sharing</h5>
            </Grid>
            <Grid item xs={10} sx={{ textAlign: 'left' }}>
              <FormControlLabel
                control={<Checkbox size='small' checked={formData.sharingFile} onChange={handleCheckboxChange} name="sharingFile" color="primary" />}
                label="Sharing" />
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
          <Grid item>
            <Button size='small' onClick={handleOpenDialog}>Cancel</Button>
            <Button 
              variant='contained' 
              size='small'
              disabled={!selectedFile || !formik.values.name || !formik.values.delimiter}
            >
              <Link to="/offers" style={{ textDecoration: "none", color: "inherit" }}>Save</Link>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <About open={openDialog} handleClose={handleCloseDialog} handleLeave={handleLeaveDialog}/> 
      </form>
    </Container>
  );
};

export default FileUpload;
