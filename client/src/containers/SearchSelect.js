import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { ListItemText } from 'material-ui/List';
import Select from 'material-ui/Select';
import Checkbox from 'material-ui/Checkbox';
import Chip from 'material-ui/Chip';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  label: {
    fontSize: 12,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

class SearchSelect extends React.Component {
  state = {
    val: [],
    data: [],
  };

  handleChange = event => {
    this.setState({ val: event.target.value });
    console.log(this.state)
  };

  componentDidMount(){
    const columnId = this.props.column.id;
    const data = this.props.tableData.map((p => (
      p[columnId]
    )))
    .filter((v, i, a) => a.indexOf(v) === i)
    this.setState({
      data
    })
    if (columnId === 'projectName'){
      console.log(data)
    }
  }

  render() {
    const { classes, theme, column, tableData } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple" className={classes.label}>Search</InputLabel>
          <Select
            multiple
            value={this.state.val}
            onChange={this.handleChange}
            input={<Input id="select-multiple" />}
            MenuProps={MenuProps}
          >
            <MenuItem
              key={90921}
              value={'im at the top!'}
            >yo im at the top!</MenuItem>
            {this.state.data.map((val,i) => (
              <MenuItem
                key={i}
                value={val}
                style={{
                  fontWeight:
                    this.state.val.indexOf(val) === -1
                      ? theme.typography.fontWeightRegular
                      : theme.typography.fontWeightMedium,
                }}
              >{val ? val : 'N/A'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

SearchSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SearchSelect);
