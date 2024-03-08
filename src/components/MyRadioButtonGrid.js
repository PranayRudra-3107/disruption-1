import React from 'react';
import {RadioGroup} from '@material-ui/core';

class MyRadioButtonGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: 'option1',
    };
  }

  handleChange = (value) => {
    this.setState({ selectedValue: value });
  }

  render() {
    return (
      <RadioGroup name="radioGroup" selectedValue={this.state.selectedValue} onChange={this.handleChange}>
        {Radio => (
          <div>
            <label>
              <Radio value="option1" /> Option 1
            </label>
            <label>
              <Radio value="option2" /> Option 2
            </label>
            <label>
              <Radio value="option3" /> Option 3
            </label>
          </div>
        )}
      </RadioGroup>
    );
  }
}

export default MyRadioButtonGrid;
