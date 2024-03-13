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
  const [selectedValue, setSelectedValue] = React.useState('general'); // Default selected value

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Completeness Score</FormLabel>
      <RadioGroup
        aria-label="completeness-and-accuracy-score"
        name="completeness-and-accuracy-score"
        value={selectedValue}
        onChange={handleChange}
      >
        <Grid container direction="row">
          <Grid item xs={6}>
            <FormControlLabel value="general" control={<Radio />} label="General" />
            <Typography variant="caption">No rows have missing fields</Typography>
            <LinearProgress variant="determinate" value={90} />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel value="city/state_match" control={<Radio />} label="City/State Match" />
            <Typography variant="caption">3 out of 300 rows contain a City/State mismatch</Typography>
            <LinearProgress variant="determinate" value={10} />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel value="npi_data" control={<Radio />} label="NPI data" />
            <Typography variant="caption">not mapped</Typography>
            <LinearProgress variant="determinate" value={30} />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel value="zip_code_check" control={<Radio />} label="ZIP Code Check" />
            <Typography variant="caption">No rows have an invalid Zip Code</Typography>
            <LinearProgress variant="determinate" value={80} />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel value="recommended_data" control={<Radio />} label="Recommended data" />
            <Typography variant="caption">File contains 7 out of 10 recommended data</Typography>
            <LinearProgress variant="determinate" value={50} />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel value="npi_validation" control={<Radio />} label="NPI Validation" />
            <Typography variant="caption">Not mapped</Typography>
            <LinearProgress variant="determinate" value={60} />
          </Grid>
        </Grid>
      </RadioGroup>
    </FormControl>
  );
}
