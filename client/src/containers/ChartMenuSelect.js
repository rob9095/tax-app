import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class ChartMenuSelect extends React.Component {
  state = {
    chartType: '',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.onChartTypeChange(event.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="chart-type">Chart Type</InputLabel>
          <Select
            value={this.state.chartType}
            onChange={this.handleChange}
            inputProps={{
              name: 'chartType',
              id: 'chart-type',
            }}
          >
            <MenuItem value="">
              <em>Chart Type</em>
            </MenuItem>
            <MenuItem value={'Project Status'}>Project Status</MenuItem>
            <MenuItem value={'Preparer'}>Preparer</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

ChartMenuSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChartMenuSelect);
