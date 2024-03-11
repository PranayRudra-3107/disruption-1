import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

export default function RadioButtonsGroup() {
  return (
    <Grid container direction="row">
      <Grid item xs={6}>
        <FormControl>
          <FormLabel>Completeness Score</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="general"
            name="score-radio-group" 
          >
            <FormControlLabel value="general" control={<Radio />} label="General" />
            <Typography variant="caption">No rows have missing fields</Typography>
            <LinearProgress variant="determinate" value={57} />
            <FormControlLabel value="npi_data" control={<Radio />} label="NPI Data" />
            <Typography variant="caption">Not mapped</Typography>
            <LinearProgress variant="determinate" value={0} />
            <FormControlLabel value="recommended_data" control={<Radio />} label="Recommended Data" />
            <Typography variant="caption">File contains 7 out of 10 recommended data columns</Typography>
            <LinearProgress variant="determinate" value={70} />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
      <FormControl>
          <FormLabel> Accuracy Score</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="city/state_match"
            name="score-radio-group" 
          >
            <FormControlLabel value="city/state_match" control={<Radio />} label="City/State Match" />
            <Typography variant="caption">3 out of 300 rows contain a City/State mismatch</Typography>
            <LinearProgress variant="determinate" value={99} />
            <FormControlLabel value="zip_code_check" control={<Radio />} label="Zip Code Check" />
            <Typography variant="caption">No rows have an invalid Zip Code</Typography>
            <LinearProgress variant="determinate" value={100} />
            <FormControlLabel value="npi_validation" control={<Radio />} label="NPI Validation" />
            <Typography variant="caption">Not mapped</Typography>
            <LinearProgress variant="determinate" value={0} />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
}
