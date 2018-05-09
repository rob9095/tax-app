import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Moment from 'react-moment';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from 'material-ui/styles/colorManipulator';
import Close from '@material-ui/icons/Close';

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

const columnData = [
  { id: 'projectName', hidden: false, numeric: false, disablePadding: true, label: 'Project' },
  { id: 'clientLastName', hidden: false, numeric: false, disablePadding: true, label: 'Client Last Name' },
  { id: 'clientFirstName', hidden: false, numeric: false, disablePadding: true, label: 'Client First Name' },
  { id: 'projectStatus', hidden: false, numeric: false, disablePadding: true, label: 'Status' },
  { id: 'projectNotes', hidden: false, numeric: false, disablePadding: true, label: 'Notes' },
  { id: 'dateProjectCreated', hidden: false, numeric: false, disablePadding: true, label: 'Date Project Created' },
  { id: 'initialPaymentReceivedTask', hidden: true, tasklistName: 'INITIAL PAYMENT', numeric: false, disablePadding: true, label: 'Initial Payment Recieved Task' },
  { id: 'initialPayment', hidden: false, tasklistName: 'INITIAL PAYMENT', numeric: false, disablePadding: true, label: 'Initial Payment', tasks: ['Initial Payment Recieved Task','Initial Payment'] },
  { id: 'provideInformation', hidden: false, isTasklist: true, numeric: false, disablePadding: true, label: 'Provide Information' },
  { id: 'preparation', hidden: false, isTasklist: true, numeric: false, disablePadding: true, label: 'Preparation' },
  { id: 'finalizePayment', hidden: false, isTasklist: true, numeric: false, disablePadding: true, label: 'Finalize Payment' },
  { id: 'clientReview', hidden: false, isTasklist: true, numeric: false, disablePadding: true, label: 'Client Review' },
  { id: 'finalizeEngagement', hidden: false, isTasklist: true, numeric: false, disablePadding: true, label: 'Finalize Engagment' },
];

class EnhancedTableHead extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      noSort: false,
      initialPaymentReceivedTask: false,
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.lastCheckedTask != this.props.lastCheckedTask) {
      this.props.onShowShowTasklistTasks()
      this.setState({
        initialPaymentReceivedTask: true,
      })
    }
  }

  handlePopover = (tasks) => {
    console.log(tasks)
  }

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  showTasklistTasks = (tasklistName, tasks) => event => {
      // this.setState({
      //   initialPaymentReceivedTask: true,
      // })
      this.props.onShowPopOver(tasks, tasklistName)
      this.props.projects.projectsInDB.forEach(p => {
      let columnTasklists = p.tasklists.filter(t => t.taskName === tasklistName)
      //this.props.onShowShowTasklistTasks(columnTasklists)
    })
  }

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            {if (this.state[column.id] != false || this.state[column.id] === undefined){
              return (
                  <TableCell
                    key={column.id}
                    numeric={column.numeric}
                    padding={column.disablePadding ? 'none' : 'default'}
                    sortDirection={orderBy === column.id ? order : false}
                  >
                    <Tooltip
                      title="Sort"
                      placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                      enterDelay={300}
                    >
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={order}
                        onClick={this.createSortHandler(column.id)}
                        //onMouseOver={this.showTasklistTasks(column.tasklistName)}
                      >
                      {column.tasklistName === undefined ?
                        column.label
                        :
                        <span onClick={this.showTasklistTasks(column.tasklistName,column.tasks)}>{column.label}</span>
                      }
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
              )
            }}
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  onShowShowTasklistTasks: PropTypes.func.isRequired,
  onShowPopOver: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  projects: PropTypes.object.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title">Nutrition</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: 'asc',
      orderBy: 'projectName',
      selected: [],
      data: [].sort((a, b) => (a.projectName < b.projectName ? -1 : 1)),
      page: 0,
      rowsPerPage: 20,
    };
    this.sanitizeName = this.sanitizeName.bind(this);
    this.handleShowPopover = this.handleShowPopover.bind(this)
  }

  sanitizeName = (s) => {
    let check = s.split('').filter(s => s === '-')
    if (check.length === 0) {
      let firstName = s
      let lastName = '';
      return({firstName, lastName})
    }
    let split = s.split('-')
    let splitTwo = split[1].split('_')
    let lastName = splitTwo[0];
    if (splitTwo[1] === undefined) {
      let firstName = lastName;
      return({firstName, lastName})
    }
    let splitThree = splitTwo[1].split(' ');
    let firstName = splitThree[0]
    let secondCheck = firstName.split('').filter(s => s === '(')
    if (secondCheck.length > 0 ) {
      let anotherSplit = firstName.split('(');
      firstName = anotherSplit[0];
    }
    return({firstName, lastName})
  }

  sanitizeTasklists = (project) => {

  }

  componentDidMount(){
    // generate the data and save it to state
    let projects = this.props.projects.projectsInDB;
    //console.log(projects)
    let formattedProjectData = [];

    projects.forEach(p => {
      let clientNames = this.sanitizeName(p.name)
      let ipTaskDate, piTaskDate, fpTaskDate, pTaskDate, feTaskDate, crTaskDate = false;
      let ipTaskInitialPaymentRecievedDate, ipTaskInitialPaymentRecievedCompleted = false;
      let ipTask = p.tasklists.filter(t => t.taskName === 'INITIAL PAYMENT' && t.complete === true);
      ipTask.length === 0 || ipTask[0].complete === false ? ipTaskDate = false : ipTaskDate = ipTask[0].lastChangedOn;
      if (ipTask.length > 0) {
        let intialPaymentRecievedTask = ipTask[0].tasks.filter(task => task.content === 'Initial Payment Received')
        ipTaskInitialPaymentRecievedDate = intialPaymentRecievedTask[0].lastChangedOn
        ipTaskInitialPaymentRecievedCompleted = intialPaymentRecievedTask[0].completed
      }
      let piTask = p.tasklists.filter(t => t.taskName === 'PROVIDE INFORMATION');
      piTask.length === 0 || piTask[0].complete === false ? piTaskDate = false : piTaskDate = piTask[0].lastChangedOn;
      let pTask =  p.tasklists.filter(t => t.taskName === 'PREPARATION');
      pTask.length === 0 || pTask[0].complete === false ? pTaskDate = false : pTaskDate = pTask[0].lastChangedOn;
      let fpTask = p.tasklists.filter(t => t.taskName === 'FINALIZE PAYMENT');
      fpTask.length === 0 || fpTask[0].complete === false ? fpTaskDate = false : fpTaskDate = fpTask[0].lastChangedOn;
      let crTask = p.tasklists.filter(t => t.taskName === 'CLIENT REVIEW');
      crTask.length === 0 || crTask[0].complete === false ? crTaskDate = false : crTaskDate = crTask[0].lastChangedOn;
      let feTask = p.tasklists.filter(t => t.taskName === 'FINALIZE ENGAGEMENT');
      feTask.length === 0 || feTask[0].complete === false ? feTaskDate = false : feTaskDate = feTask[0].lastChangedOn;
      let formattedProject = {
        id: p.teamwork_id,
        projectName: p.name,
        clientFirstName: clientNames.firstName,
        clientLastName: clientNames.lastName,
        lastTasklistChanged: p.lastTasklistChanged,
        projectStatus: p.status,
        projectNotes: '',
        dateProjectCreated: p.createdOn,
        initialPayment: ipTaskDate,
        intialPaymentRecieved: {
          hidden: true,
          lastChangedOn: ipTaskInitialPaymentRecievedDate,
          completed: ipTaskInitialPaymentRecievedCompleted,
          name: 'Initial Payment Received',
        },
        provideInformation: piTaskDate,
        preparation: pTaskDate,
        finalizePayment: fpTaskDate,
        clientReview: crTaskDate,
        finalizeEngagement: feTaskDate,
      }
      formattedProjectData.push(formattedProject);
    })
    console.log(formattedProjectData)
    this.setState({
      data: formattedProjectData
    })
  }

  handleShowPopover = (tasklistName,tasks) => {
    this.props.onTogglePopover(tasklistName,tasks)
  }

  handleShowTasklistTask = () => {
    let updatedState = this.state.data.map(p => {
      let newProject = {
        ...p
      };
      newProject.intialPaymentRecieved['hidden'] = false
      return newProject;
    });
    this.setState({updatedState})
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data =
      order === 'desc'
        ? this.state.data.sort((a, b) => (b[orderBy] === false ) - (a[orderBy] === false) || (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] === false ) - (b[orderBy] === false) || (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
      this.setState({page: 0})
      setTimeout(()=> {
        this.setState({ rowsPerPage: event.target.value });
      },250)
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, projectData, lastCheckedTask } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    console.log(lastCheckedTask)
    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              projects={projectData}
              onShowShowTasklistTasks={this.handleShowTasklistTask}
              onShowPopOver={this.handleShowPopover}
              lastCheckedTask={lastCheckedTask}
            />
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                const isSelected = this.isSelected(n.id);
                return (
                  <TableRow
                    key={n.id}
                    hover
                    onClick={event => this.handleClick(event, n.id)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isSelected} />
                    </TableCell>
                    <TableCell className="table-cell" padding="none">{n.projectName}</TableCell>
                    <TableCell className="table-cell" padding="none">{n.clientLastName}</TableCell>
                    <TableCell className="table-cell" padding="none">{n.clientFirstName}</TableCell>
                    <TableCell className="table-cell" padding="none">{n.lastTasklistChanged}</TableCell>
                    <TableCell className="table-cell" padding="none">{n.projectNotes}</TableCell>
                    <TableCell className="table-cell" padding="none">
                      <Moment format="MM/DD/YY">{n.dateProjectCreated}</Moment>
                    </TableCell>
                    {!n.intialPaymentRecieved.hidden && (
                      <TableCell className="table-cell tasklist" padding="none">
                        {n.intialPaymentRecieved.completed ?
                          <Moment format="MM/DD/YY">{n.intialPaymentRecieved.lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    <TableCell className="table-cell tasklist" padding="none">
                      {n.initialPayment ? <Moment format="MM/DD/YY">{n.initialPayment}</Moment> : <Close className="incomplete-tasklist" />}
                    </TableCell>
                    <TableCell className="table-cell tasklist" padding="none">
                      {n.provideInformation ? <Moment format="MM/DD/YY">{n.provideInformation}</Moment> : <Close className="incomplete-tasklist" />}
                    </TableCell>
                    <TableCell className="table-cell tasklist" padding="none">
                      {n.preparation ? <Moment format="MM/DD/YY">{n.preparation}</Moment> : <Close className="incomplete-tasklist" />}
                    </TableCell>
                    <TableCell className="table-cell tasklist" padding="none">
                      {n.finalizePayment ? <Moment format="MM/DD/YY">{n.finalizePayment}</Moment> : <Close className="incomplete-tasklist" />}
                    </TableCell>
                    <TableCell className="table-cell tasklist" padding="none">
                      {n.clientReview ? <Moment format="MM/DD/YY">{n.clientReview}</Moment> : <Close className="incomplete-tasklist" />}
                    </TableCell>
                    <TableCell className="table-cell tasklist" padding="none">
                      {n.finalizeEngagement ? <Moment format="MM/DD/YY">{n.finalizeEngagement}</Moment> : <Close className="incomplete-tasklist" />}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={13} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[25,50,100,250,this.state.data.length]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
    projects: state.projects
	};
}

export default compose(withStyles(styles), connect(mapStateToProps, { }), )(EnhancedTable);
