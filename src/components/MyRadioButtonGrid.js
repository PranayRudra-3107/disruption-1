import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';

export default function RadioButtonsGroup() {
  return (
    <Grid container direction="row">
      <Grid item xs={6}>
        <FormControl>
          <FormLabel>Completeness Score</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="general"
            name="radio-buttons-group"
          >
            <FormControlLabel value="general" control={<Radio />} label="General" />
            <FormControlLabel value="npi_data" control={<Radio />} label="NPI Data" />
            <FormControlLabel value="recommended_data" control={<Radio />} label="Recommended Data" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl>
          <FormLabel>Accuracy Score</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="general"
            name="radio-buttons-group"
          >
            <FormControlLabel value="city/state_match" control={<Radio />} label="City/State Match" />
            <FormControlLabel value="zip_code_check" control={<Radio />} label="Zip Code Check" />
            <FormControlLabel value="npi_validation" control={<Radio />} label="NPI Validation" />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
}
