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
import ProjectTableSwitch from '../containers/ProjectTableSwitch';
import TasklistModal from './TasklistModal';
import TasklistMenu from '../containers/TasklistMenu';



const columnData = [
  {
    id: 'projectName',
    hidden: false,
    numeric: false,
    disablePadding: true,
    label: 'Project',
  },
  {
    id: 'clientLastName',
    hidden: false,
    numeric: false,
    disablePadding: true,
    label: 'Client Last Name',
  },
  {
    id: 'clientFirstName',
    hidden: false,
    numeric: false,
    disablePadding: true,
    label: 'Client First Name',
  },
  {
    id: 'projectStatus',
    hidden: false,
    numeric: false,
    disablePadding: true,
    label: 'Status',
  },
  {
    id: 'projectNotes',
    hidden: false,
    numeric: false,
    disablePadding: true,
    label: 'Notes',
  },
  {
    id: 'dateProjectCreated',
    hidden: false,
    numeric: false,
    disablePadding: true,
    label: 'Date Project Created',
  },
  {
    id: 'initialPaymentReceivedTask',
    hidden: true,
    tasklistName: 'INITIAL PAYMENT',
    numeric: false,
    disablePadding: true,
    label: 'Initial Payment Recieved',
    isTask: true,
  },
  {
    id: 'initialPaymentTask',
    hidden: true,
    tasklistName: 'INITIAL PAYMENT',
    numeric: false,
    disablePadding: true,
    label: 'Initial Payment',
    isTask: true
  },
  {
    id: 'initialPayment',
    hidden: false,
    tasklistName: 'INITIAL PAYMENT',
    isTasklist: true,
    numeric: false,
    disablePadding: true,
    label: 'Initial Payment',
    tasks: ['Initial Payment','Initial Payment Recieved'],
  },
  {
    id: 'gettingStartedTask',
    hidden: true,
    tasklistName: 'PROVIDE INFORMATION',
    numeric: false,
    disablePadding: true,
    label: 'Getting Started',
    isTask: true,
  },
  {
    id: 'taxOrganizerTask',
    hidden: true,
    tasklistName: 'PROVIDE INFORMATION',
    numeric: false,
    disablePadding: true,
    label: 'Tax Organizer',
    isTask: true
  },
  {
    id: 'qTravelWorksheetTask',
    hidden: true,
    tasklistName: 'PROVIDE INFORMATION',
    numeric: false,
    disablePadding: true,
    label: 'Questionnaire-Travel Worksheet',
    isTask: true,
  },
  {
    id: 'qFbarForm8938Task',
    hidden: true,
    tasklistName: 'PROVIDE INFORMATION',
    numeric: false,
    disablePadding: true,
    label: 'Questionnaire-FBAR and Form 8938',
    isTask: true
  },
  {
    id: 'qForm5471Task',
    hidden: true,
    tasklistName: 'PROVIDE INFORMATION',
    numeric: false,
    disablePadding: true,
    label: 'Questionnaire-Form 5471 (Foreign Corporation)',
    isTask: true,
  },
  {
    id: 'qScheduleATask',
    hidden: true,
    tasklistName: 'PROVIDE INFORMATION',
    numeric: false,
    disablePadding: true,
    label: 'Questionnaire-Schedule A',
    isTask: true
  },
  {
    id: 'qScheduleCTask',
    hidden: true,
    tasklistName: 'PROVIDE INFORMATION',
    numeric: false,
    disablePadding: true,
    label: 'Questionnaire-Schedule C',
    isTask: true,
  },
  {
    id: 'qScheduleDTask',
    hidden: true,
    tasklistName: 'PROVIDE INFORMATION',
    numeric: false,
    disablePadding: true,
    label: 'Questionnaire-Schedule D',
    isTask: true
  },
  {
    id: 'qScheduleETask',
    hidden: true,
    tasklistName: 'PROVIDE INFORMATION',
    numeric: false,
    disablePadding: true,
    label: 'Questionnaire-Schedule E',
    isTask: true
  },
  {
    id: 'provideInformation',
    hidden: false,
    tasklistName: 'PROVIDE INFORMATION',
    isTasklist: true,
    numeric: false,
    disablePadding: true,
    label: 'Provide Information',
    tasks: ['Getting Started','Tax Organizer','Questionnaire-Travel Worksheet','Questionnaire-FBAR and Form 8938','Questionnaire-Form 5471 (Foreign Corporation)','Questionnaire-Schedule A','Questionnaire-Schedule C','Questionnaire-Schedule D','Questionnaire-Schedule E'],
  },
  {
    id: 'clientWelcomeCallTask',
    hidden: true,
    tasklistName: 'PREPARATION',
    numeric: false,
    disablePadding: true,
    label: 'Client Welcome Call',
    isTask: true
  },
  {
    id: 'auditProtectionTask',
    hidden: true,
    tasklistName: 'PREPARATION',
    numeric: false,
    disablePadding: true,
    label: 'Audit Protection Plan - IRS Monitoring',
    isTask: true
  },
  {
    id: 'workPaperPrepTask',
    hidden: true,
    tasklistName: 'PREPARATION',
    numeric: false,
    disablePadding: true,
    label: 'Workpaper Preparation',
    isTask: true
  },
  {
    id: 'dataEntryTask',
    hidden: true,
    tasklistName: 'PREPARATION',
    numeric: false,
    disablePadding: true,
    label: 'Data Entry',
    isTask: true
  },
  {
    id: 'dataEntryReviewTask',
    hidden: true,
    tasklistName: 'PREPARATION',
    numeric: false,
    disablePadding: true,
    label: 'Data Entry Review',
    isTask: true
  },
  {
    id: 'dataEntryCorrectionsTask',
    hidden: true,
    tasklistName: 'PREPARATION',
    numeric: false,
    disablePadding: true,
    label: 'Data Entry Corrections',
    isTask: true
  },
  {
    id: 'finalReviewTask',
    hidden: true,
    tasklistName: 'PREPARATION',
    numeric: false,
    disablePadding: true,
    label: 'Final Review',
    isTask: true
  },
  {
    id: 'preparation',
    hidden: false,
    tasklistName: 'PERPARATION',
    isTasklist: true,
    numeric: false,
    disablePadding: true,
    label: 'Preparation',
    tasks: ['Client Welcome Call','Audit Protection Plan - IRS Monitoring','Workpaper Preparation', 'Data Entry', 'Data Entry Review', 'Data Entry Corrections', 'Final Review']
  },
  {
    id: 'finalPaymentReceivedTask',
    hidden: true,
    tasklistName: 'FINALIZE PAYMENT',
    numeric: false,
    disablePadding: true,
    label: 'Final Payment Received',
    isTask: true
  },
  {
    id: 'finalInvoiceDueTask',
    hidden: true,
    tasklistName: 'FINALIZE PAYMENT',
    numeric: false,
    disablePadding: true,
    label: 'Final Invoice Due',
    isTask: true
  },
  {
    id: 'finalizePayment',
    hidden: false,
    tasklistName: 'FINALIZE PAYMENT',
    isTasklist: true,
    numeric: false,
    disablePadding: true,
    label: 'Finalize Payment',
    tasks: ['Final Payment Received','Final Invoice Due']
  },
  {
    id: 'returnReviewTask',
    hidden: true,
    tasklistName: 'CLIENT REVIEW',
    numeric: false,
    disablePadding: true,
    label: 'Return Review Instructions',
    isTask: true
  },
  {
    id: 'steamlinedProcedureTask',
    hidden: true,
    tasklistName: 'CLIENT REVIEW',
    numeric: false,
    disablePadding: true,
    label: 'Streamlined Procedure Instructions',
    isTask: true
  },
  {
    id: 'clientReviewCallTask',
    hidden: true,
    tasklistName: 'CLIENT REVIEW',
    numeric: false,
    disablePadding: true,
    label: 'Client Review Call',
    isTask: true
  },
  {
    id: 'clientReview',
    hidden: false,
    tasklistName: 'CLIENT REVIEW',
    isTasklist: true,
    numeric: false,
    disablePadding: true,
    label: 'Client Review',
    tasks: ['Return Review Instructions','Streamlined Procedure Instructions','Client Review Call'],
  },
  {
    id: 'closingLetterTask',
    hidden: true,
    tasklistName: 'FINALIZE ENGAGEMENT',
    numeric: false,
    disablePadding: true,
    label: 'Closing Letter',
    isTask: true
  },
  {
    id: 'closeEngagementTask',
    hidden: true,
    tasklistName: 'FINALIZE ENGAGEMENT',
    numeric: false,
    disablePadding: true,
    label: 'Close Engagement & Archive Teamwork Project',
    isTask: true
  },
  {
    id: '',
    hidden: false,
    tasklistName: 'FINALIZE ENGAGEMENT',
    isTasklist: true,
    numeric: false,
    disablePadding: true,
    label: 'Finalize Engagment',
    tasks: ['Closing Letter','Close Engagement & Archive Teamwork Project'],
  },
];

class EnhancedTableHead extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      noSort: false,
      currentTaskName: '',
      showAddTasksMenu: false,
      currentEvent: null,
      currentTasks: [],
      columnData: [],
      currentColumn: '',
      lastCheckedTask: null,
    }
    this.handleTasklistMenuSelect = this.handleTasklistMenuSelect.bind(this);
    this.handleToggleTask = this.handleToggleTask.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.lastCheckedTask !== this.props.lastCheckedTask || newProps.removeTask !== this.props.removeTask) {
      let updatedState = this.state
      updatedState.columnData.forEach(c => {
        if (c.label === newProps.lastCheckedTask && c.isTask === true) {
            c.hidden = !c.hidden
            console.log(c)
        }
      })
      this.props.onShowShowTasklistTasks(newProps.lastCheckedTask)
      updatedState.lastCheckedTask = newProps.lastCheckedTask
      this.setState({updatedState})
    }
  }

  handleTasklistMenuSelect = (option) => {
    if (option === 'Sort') {
      this.props.onRequestSort(this.state.currentEvent, this.state.currentColumn);
    } else {
      // find any shown tasks
      let activeTasks = this.state.columnData.filter(c => c.isTask === true && c.hidden === false )
      this.props.onShowPopOver(this.state.currentTasks, this.state.currentColumn, activeTasks)
    }
  }

  handleToggleTask = (task) => {

  }

  createSortHandler = (property,isTasklist,tasks,isTask,label) => event => {
    if (isTasklist) {
      this.setState({
        showAddTasksMenu: true,
        currentEvent: event,
        currentColumn: property,
        currentTasks: tasks,
      })
    } else if (isTask) {
      this.props.onRequestSort(event, label, isTask);
    } else {
      this.props.onRequestSort(event, property)
    }
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

  componentDidMount() {
    this.setState({
      columnData: columnData,
    })
  }

  render() {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

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
          {this.state.columnData.map(column => {
            {if (column.hidden !== true){
              return (
                  <TableCell
                    key={column.id}
                    numeric={column.numeric}
                    padding={column.disablePadding ? 'none' : 'default'}
                    sortDirection={orderBy === column.id ? order : false}
                    className={column.isTasklist ? 'column-head tasklist' : 'column-head'}
                  >
                    {/* <Tooltip
                      title="Sort"
                      placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                      enterDelay={300}
                    > */}
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={order}
                        onClick={this.createSortHandler(column.id,column.isTasklist,column.tasks,column.isTask,column.label)}
                        //onMouseOver={this.showTasklistTasks(column.tasklistName)}
                      >
                      {column.isTasklist ? <TasklistMenu label={column.label} handleSelect={this.handleTasklistMenuSelect} /> : column.label }
                      {/* {column.tasklistName === undefined ?
                        column.label
                        :
                        <span onMouseOver={this.showTasklistTasks(column.tasklistName,column.tasks)}>{column.label}</span>
                      } */}
                      </TableSortLabel>
                    {/* </Tooltip> */}
                    {/* {column.isTasklist ? <TasklistModal tasks={column.tasks} /> :null} */}
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
  tasklistCol: {
    minWidth: 130,
  }
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
      lastCheckedTask: '',
    };
    this.sanitizeName = this.sanitizeName.bind(this);
    this.handleShowPopover = this.handleShowPopover.bind(this)
    this.handleShowTasklistTask = this.handleShowTasklistTask.bind(this);
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
      let ipInitialPaymentDate, ipInitialPaymentCompleted, ipInitialPaymentRecievedDate, ipInitialPaymentRecievedCompleted, piGettingStartedDate, piGettingStartedCompleted, piTaxOrganizerDate, piTaxOrganizerCompleted, piQTravelWorksheetDate, piQTravelWorksheetCompleted, piQFbarDate, piQFbarCompleted, piQForm5471Date, piQForm5471Completed, piQScheduleADate, piQScheduleACompleted, piQScheduleCDate, piQScheduleCCompleted, piQScheduleDDate, piQScheduleDCompleted, piQScheduleEDate, piQScheduleECompleted, pClientWelcomeCallDate, pClientWelcomeCallCompleted, pAuditProtectionDate, pAuditProtectionCompleted,pWorkPaperPrepDate, pWorkPaperPrepCompleted, pDataEntryDate, pDataEntryCompleted, pDataEntryReviewDate, pDataEntryReviewCompleted = false;
      let pDataEntryCorrectionsDate, pDataEntryCorrectionsCompleted, pFinalReviewDate, pFinalReviewCompleted, fpFinalPaymentReceivedDate, fpFinalPaymentReceivedCompleted, fpFinalInvoiceDueDate, fpFinalInvoiceDueCompleted, crReturnReviewInstructionsDate, crReturnReviewInstructionsCompleted, crStreamlinedProcedureDate, crStreamlinedProcedureCompleted, crClientReviewCallDate, crClientReviewCallCompleted, feClosingLetterDate, feClosingLetterCompleted, feCloseEngagementDate, feCloseEngagementCompleted = false;

      let ipTask = p.tasklists.filter(t => t.taskName === 'INITIAL PAYMENT' && t.complete === true);
      ipTask.length === 0 || ipTask[0].complete === false ? ipTaskDate = false : ipTaskDate = ipTask[0].lastChangedOn;
      // tasks for Initial Payment tasklist
      if (ipTask.length > 0) {
        // inital payment task
        let intialPaymentTask = ipTask[0].tasks.filter(task => task.content === 'Initial Payment')
        if (intialPaymentTask[0] !== undefined && intialPaymentTask[0].completed !== false) {
          ipInitialPaymentDate = intialPaymentTask[0].lastChangedOn
          ipInitialPaymentCompleted = intialPaymentTask[0].completed
        }

        // intial payment recieved task
        let intialPaymentRecievedTask = ipTask[0].tasks.filter(task => task.content === 'Initial Payment Received')
        if (intialPaymentRecievedTask[0] !== undefined && intialPaymentRecievedTask[0].completed !== false) {
          ipInitialPaymentRecievedDate = intialPaymentRecievedTask[0].lastChangedOn
          ipInitialPaymentRecievedCompleted = intialPaymentRecievedTask[0].completed
        }
      }
      let piTask = p.tasklists.filter(t => t.taskName === 'PROVIDE INFORMATION');
      piTask.length === 0 || piTask[0].complete === false ? piTaskDate = false : piTaskDate = piTask[0].lastChangedOn;
      //tasks for Provide Information tasklist
      if (piTask.length > 0) {
      // 'Getting Started'
      let gettingStartedTask = piTask[0].tasks.filter(task => task.content === 'Getting Started')
      if (gettingStartedTask[0] !== undefined && gettingStartedTask[0].completed !== false) {
        piGettingStartedDate = gettingStartedTask[0].lastChangedOn
        piGettingStartedCompleted = gettingStartedTask[0].completed
      }

      // 'Tax Organizer'
      let taxOrangizerTask = piTask[0].tasks.filter(task => task.content === 'Tax Organizer')
      if (taxOrangizerTask[0] !== undefined && taxOrangizerTask[0].completed !== false) {
        piTaxOrganizerDate = taxOrangizerTask[0].lastChangedOn
        piTaxOrganizerCompleted = taxOrangizerTask[0].completed
      }

      // 'Questionnaire-Travel Worksheet'
      let qTravelWorksheetTask = piTask[0].tasks.filter(task => task.content === 'Questionnaire-Travel Worksheet')
      if (qTravelWorksheetTask[0] !== undefined && qTravelWorksheetTask[0].completed !== false) {
        piQTravelWorksheetDate = qTravelWorksheetTask[0].lastChangedOn
        piQTravelWorksheetCompleted = qTravelWorksheetTask[0].completed
      }

      // 'Questionnaire-FBAR and Form 8938'
      let qFbarTask = piTask[0].tasks.filter(task => task.content === 'Questionnaire-FBAR and Form 8938')
      if (qFbarTask[0] !== undefined && qFbarTask[0].completed !== false) {
        piQFbarDate = qFbarTask[0].lastChangedOn
        piQFbarCompleted = qFbarTask[0].completed
      }

      // 'Questionnaire-Form 5471 (Foreign Corporation)'
      let qForm5471Task = piTask[0].tasks.filter(task => task.content === 'Questionnaire-Form 5471 (Foreign Corporation)')
      if (qForm5471Task[0] !== undefined && qForm5471Task[0].completed !== false) {
        piQForm5471Date = qForm5471Task[0].lastChangedOn
        piQForm5471Completed = qForm5471Task[0].completed
      }

      // 'Questionnaire-Schedule A'
      let qScheduleATask = piTask[0].tasks.filter(task => task.content === 'Questionnaire-Schedule A')
      if (qScheduleATask[0] !== undefined && qScheduleATask[0].completed !== false) {
        piQScheduleADate = qScheduleATask[0].lastChangedOn
        piQScheduleACompleted = qScheduleATask[0].completed
      }

      // 'Questionnaire-Schedule C'
      let qScheduleCTask = piTask[0].tasks.filter(task => task.content === 'Questionnaire-Schedule C')
      if (qScheduleCTask[0] !== undefined && qScheduleCTask[0].completed !== false) {
        piQScheduleCDate = qScheduleCTask[0].lastChangedOn
        piQScheduleCCompleted = qScheduleCTask[0].completed
      }

      // 'Questionnaire-Schedule D'
      let qScheduleDTask = piTask[0].tasks.filter(task => task.content === 'Questionnaire-Schedule D')
      if (qScheduleDTask[0] !== undefined && qScheduleDTask[0].completed !== false) {
        piQScheduleDDate = qScheduleDTask[0].lastChangedOn
        piQScheduleDCompleted = qScheduleDTask[0].completed
      }

      // 'Questionnaire-Schedule E'
      let qScheduleETask = piTask[0].tasks.filter(task => task.content === 'Questionnaire-Schedule E')
      if (qScheduleETask[0] !== undefined && qScheduleETask[0].completed !== false) {
        piQScheduleEDate = qScheduleETask[0].lastChangedOn
        piQScheduleECompleted = qScheduleETask[0].completed
      }
      }

      let pTask =  p.tasklists.filter(t => t.taskName === 'PREPARATION');
      pTask.length === 0 || pTask[0].complete === false ? pTaskDate = false : pTaskDate = pTask[0].lastChangedOn;
      // tasks for PREPARATION tasklists
      if (pTask.length > 0) {
        // 'Client Welcome Call'
        let clientWelcomeCallTask = pTask[0].tasks.filter(task => task.content === 'Client Welcome Call')
        if (clientWelcomeCallTask[0] !== undefined && clientWelcomeCallTask[0].completed !== false) {
          pClientWelcomeCallDate = clientWelcomeCallTask[0].lastChangedOn
          pClientWelcomeCallCompleted = clientWelcomeCallTask[0].completed
        }

        // 'Audit Protection Plan - IRS Monitoring'
        let auditProtectionTask = pTask[0].tasks.filter(task => task.content = 'Audit Protection Plan - IRS Monitoring')
        if (auditProtectionTask[0] !== undefined && auditProtectionTask[0].completed !== false) {
          pAuditProtectionDate = auditProtectionTask[0].lastChangedOn
          pAuditProtectionCompleted = auditProtectionTask[0].completed
        }

        // 'Workpaper Preparation'
        let workPaperPrepTask = pTask[0].tasks.filter(task => task.content = 'Workpaper Preparation')
        if (workPaperPrepTask[0] !== undefined && workPaperPrepTask[0].completed !== false) {
          pWorkPaperPrepDate = workPaperPrepTask[0].lastChangedOn
          pWorkPaperPrepCompleted = workPaperPrepTask[0].completed
        }

        // 'Data Entry'
        let dataEntryTask = pTask[0].tasks.filter(task => task.content = 'Data Entry')
        if (dataEntryTask[0] !== undefined && dataEntryTask[0].completed !== false) {
          pDataEntryDate = dataEntryTask[0].lastChangedOn
          pDataEntryCompleted = dataEntryTask[0].completed
        }

        // 'Data Entry Review'
        let dataEntryReviewTask = pTask[0].tasks.filter(task => task.content = 'Data Entry Review')
        if (dataEntryReviewTask[0] !== undefined && dataEntryReviewTask[0].completed !== false) {
          pDataEntryReviewDate = dataEntryReviewTask[0].lastChangedOn
          pDataEntryReviewCompleted = dataEntryReviewTask[0].completed
        }

        // 'Data Entry Corrections'
        let dataEntryCorrectionsTask = pTask[0].tasks.filter(task => task.content = 'Data Entry Corrections')
        if (dataEntryCorrectionsTask[0] !== undefined && dataEntryCorrectionsTask[0].completed !== false) {
          pDataEntryCorrectionsDate = dataEntryCorrectionsTask[0].lastChangedOn
          pDataEntryCorrectionsCompleted = dataEntryCorrectionsTask[0].completed
        }

        // 'Final Review'
        let finalReviewTask = pTask[0].tasks.filter(task => task.content = 'Final Review')
        if (finalReviewTask[0] !== undefined && finalReviewTask[0].completed !== false) {
          pFinalReviewDate = finalReviewTask[0].lastChangedOn
          pFinalReviewCompleted = finalReviewTask[0].completed
        }
      }
      let fpTask = p.tasklists.filter(t => t.taskName === 'FINALIZE PAYMENT');
      fpTask.length === 0 || fpTask[0].complete === false ? fpTaskDate = false : fpTaskDate = fpTask[0].lastChangedOn;
      // tasks for Finalize Payment Tasklist
      if (fpTask.length > 0) {
        // 'Final Payment Received'
        let finalPaymentReceivedTask = fpTask[0].tasks.filter(task => task.content = 'Final Payment Received')
        if (finalPaymentReceivedTask[0] !== undefined && finalPaymentReceivedTask[0].completed !== false) {
          fpFinalPaymentReceivedDate = finalPaymentReceivedTask[0].lastChangedOn
          fpFinalPaymentReceivedCompleted = finalPaymentReceivedTask[0].completed
        }

        // 'Final Invoice Due'
        let finalInvoiceDueTask = fpTask[0].tasks.filter(task => task.content = 'Final Invoice Due')
        if (finalInvoiceDueTask[0] !== undefined && finalInvoiceDueTask[0].completed !== false) {
          fpFinalInvoiceDueDate = finalInvoiceDueTask[0].lastChangedOn
          fpFinalInvoiceDueCompleted = finalInvoiceDueTask[0].completed
        }
      }
      let crTask = p.tasklists.filter(t => t.taskName === 'CLIENT REVIEW');
      crTask.length === 0 || crTask[0].complete === false ? crTaskDate = false : crTaskDate = crTask[0].lastChangedOn;
      // tasks for client review tasklist
      if (crTask.length > 0) {
        // 'Return Review Instructions'
        let returnReviewInstructionsTask = crTask[0].tasks.filter(task => task.content = 'Return Review Instructions')
        if (returnReviewInstructionsTask[0] !== undefined && returnReviewInstructionsTask[0].completed !== false) {
          crReturnReviewInstructionsDate = returnReviewInstructionsTask[0].lastChangedOn
          crReturnReviewInstructionsCompleted = returnReviewInstructionsTask[0].completed
        }

        // 'Streamlined Procedure Instructions'
        let streamlinedProcedureTask = crTask[0].tasks.filter(task => task.content = 'Streamlined Procedure Instructions')
        if (streamlinedProcedureTask[0] !== undefined && streamlinedProcedureTask[0].completed !== false) {
          crStreamlinedProcedureDate = streamlinedProcedureTask[0].lastChangedOn
          crStreamlinedProcedureCompleted = streamlinedProcedureTask[0].completed
        }

        // 'Client Review Call'
        let clientReviewCallTask = crTask[0].tasks.filter(task => task.content = 'Client Review Call')
        if (clientReviewCallTask[0] !== undefined && clientReviewCallTask[0].completed !== false) {
          crClientReviewCallDate = clientReviewCallTask[0].lastChangedOn
          crClientReviewCallCompleted = clientReviewCallTask[0].completed
        }
      }

      let feTask = p.tasklists.filter(t => t.taskName === 'FINALIZE ENGAGEMENT');
      feTask.length === 0 || feTask[0].complete === false ? feTaskDate = false : feTaskDate = feTask[0].lastChangedOn;
      // tasks for finalize engagement tasklist
      if (feTask.length > 0) {
        // 'Closing Letter'
        let closingLetterTask = feTask[0].tasks.filter(task => task.content = 'Closing Letter')
        if (closingLetterTask[0] !== undefined && closingLetterTask[0].completed !== false) {
          feClosingLetterDate = closingLetterTask[0].lastChangedOn
          feClosingLetterCompleted = closingLetterTask[0].completed
        }

        // 'Close Engagement & Archive Teamwork Project'
        let closeEngagementTask = feTask[0].tasks.filter(task => task.content = 'Close Engagement & Archive Teamwork Project')
        if (closeEngagementTask[0] !== undefined && closeEngagementTask[0].completed !== false) {
          feCloseEngagementDate = closeEngagementTask[0].lastChangedOn
          feCloseEngagementCompleted = closeEngagementTask[0].completed
        }

      }
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
        "Initial Payment Recieved": {
          hidden: true,
          lastChangedOn: ipInitialPaymentRecievedDate,
          completed: ipInitialPaymentRecievedCompleted,
        },
        "Initial Payment": {
          hidden: true,
          lastChangedOn: ipInitialPaymentDate,
          completed: ipInitialPaymentCompleted,
        },
        provideInformation: piTaskDate,
        "Getting Started": {
          hidden: true,
          lastChangedOn: piGettingStartedDate,
          completed: piGettingStartedCompleted,
        },
        "Tax Organizer": {
          hidden: true,
          lastChangedOn: piTaxOrganizerDate,
          completed: piTaxOrganizerCompleted,
        },
        "Questionnaire-Travel Worksheet": {
          hidden: true,
          lastChangedOn: piQTravelWorksheetDate,
          completed: piQTravelWorksheetCompleted,
        },
        "Questionnaire-FBAR and Form 8938": {
          hidden: true,
          lastChangedOn: piQFbarDate,
          completed: piQFbarCompleted,
        },
        "Questionnaire-Form 5471 (Foreign Corporation)": {
          hidden: true,
          lastChangedOn: piQForm5471Date,
          completed: piQForm5471Completed,
        },
        "Questionnaire-Schedule A": {
          hidden: true,
          lastChangedOn: piQScheduleADate,
          completed: piQScheduleACompleted,
        },
        "Questionnaire-Schedule C": {
          hidden: true,
          lastChangedOn: piQScheduleCDate,
          completed: piQScheduleCCompleted,
        },
        "Questionnaire-Schedule D": {
          hidden: true,
          lastChangedOn: piQScheduleDDate,
          completed: piQScheduleDCompleted,
        },
        "Questionnaire-Schedule E": {
          hidden: true,
          lastChangedOn: piQScheduleEDate,
          completed: piQScheduleECompleted,
        },
        preparation: pTaskDate,
        "Client Welcome Call": {
          hidden: true,
          lastChangedOn: pClientWelcomeCallDate,
          completed: pClientWelcomeCallCompleted,
        },
        "Audit Protection Plan - IRS Monitoring": {
          hidden: true,
          lastChangedOn: pAuditProtectionDate,
          completed: pAuditProtectionCompleted,
        },
        "Workpaper Preparation": {
          hidden: true,
          lastChangedOn: pWorkPaperPrepDate,
          completed: pWorkPaperPrepCompleted,
        },
        "Data Entry": {
          hidden: true,
          lastChangedOn: pDataEntryDate,
          completed: pDataEntryCompleted,
        },
        "Data Entry Review": {
          hidden: true,
          lastChangedOn: pDataEntryReviewDate,
          completed: pDataEntryReviewCompleted,
        },
        "Data Entry Corrections": {
          hidden: true,
          lastChangedOn: pDataEntryCorrectionsDate,
          completed: pDataEntryCorrectionsCompleted,
        },
        "Final Review": {
          hidden: true,
          lastChangedOn: pFinalReviewDate,
          completed: pFinalReviewCompleted,
        },
        finalizePayment: fpTaskDate,
        "Final Payment Received": {
          hidden: true,
          lastChangedOn: fpFinalPaymentReceivedDate,
          completed: fpFinalPaymentReceivedCompleted,
        },
        "Final Invoice Due": {
          hidden: true,
          lastChangedOn: fpFinalInvoiceDueDate,
          completed: fpFinalInvoiceDueCompleted,
        },
        clientReview: crTaskDate,
        "Return Review Instructions": {
          hidden: true,
          lastChangedOn: crReturnReviewInstructionsDate,
          completed: crReturnReviewInstructionsCompleted,
        },
        "Streamlined Procedure Instructions": {
          hidden: true,
          lastChangedOn: crStreamlinedProcedureDate,
          completed: crStreamlinedProcedureCompleted,
        },
        "Client Review Call": {
          hidden: true,
          lastChangedOn: crClientReviewCallDate,
          completed: crClientReviewCallCompleted,
        },
        finalizeEngagement: feTaskDate,
        "Closing Letter": {
          hidden: true,
          lastChangedOn: feClosingLetterDate,
          completed: feClosingLetterCompleted,
        },
        "Close Engagement & Archive Teamwork Project": {
          hidden: true,
          lastChangedOn: feCloseEngagementDate,
          completed: feCloseEngagementCompleted,
        },
      }
      formattedProjectData.push(formattedProject);
    })
    console.log(formattedProjectData)
    this.setState({
      data: formattedProjectData
    })
  }

  handleShowPopover = (tasks,tasklistName,activeTasks) => {
    this.props.onTogglePopover(tasks,tasklistName,activeTasks)
  }

  handleShowTasklistTask = (task) => {
    let updatedData = this.state.data
    updatedData.forEach(p => {
      p[task].hidden = !p[task].hidden
    })

    // let updatedData = this.state.data.map(p => {
    //   let newProject = {
    //     ...p
    //   };
    //   newProject[task].hidden = false
    //   return newProject;
    // });
    this.setState({
      data: updatedData,
      lastCheckedTask: task,
    })
  }

  handleRequestSort = (event, property, isTask) => {
    const orderBy = property;
    let order = 'desc';
    let data = this.state.data;

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    if (isTask) {
      data =
        order === 'desc'
            ? this.state.data.sort((a, b) => (b[orderBy].lastChangedOn === undefined ) - (a[orderBy].lastChangedOn === undefined) || (b[orderBy].lastChangedOn < a[orderBy].lastChangedOn ? -1 : 1))
            : this.state.data.sort((a, b) => (a[orderBy].lastChangedOn === undefined ) - (b[orderBy].lastChangedOn === undefined) || (a[orderBy].lastChangedOn < b[orderBy].lastChangedOn ? -1 : 1));
    } else {
      data =
        order === 'desc'
            ? this.state.data.sort((a, b) => (b[orderBy] === false ) - (a[orderBy] === false) || (b[orderBy] < a[orderBy] ? -1 : 1))
            : this.state.data.sort((a, b) => (a[orderBy] === false ) - (b[orderBy] === false) || (a[orderBy] < b[orderBy] ? -1 : 1));
    }

    // this.state.data.sort((a,b) => {
    //   console.log(a[orderBy])
    // })
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
    const { classes, projectData, lastCheckedTask, removeTask } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
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
              removeTask={removeTask}
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
                    {!n['Initial Payment'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Initial Payment'].completed ?
                          <Moment format="MM/DD/YY">{n['Initial Payment'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    {!n['Initial Payment Recieved'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Initial Payment Recieved'].completed ?
                          <Moment format="MM/DD/YY">{n['Initial Payment Recieved'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    <TableCell className="table-cell tasklist" padding="none">
                      {n.initialPayment ? <Moment format="MM/DD/YY">{n.initialPayment}</Moment> : <Close className="incomplete-tasklist" />}
                    </TableCell>
                    {!n['Getting Started'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Getting Started'].completed ?
                          <Moment format="MM/DD/YY">{n['Getting Started'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    {!n['Tax Organizer'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Tax Organizer'].completed ?
                          <Moment format="MM/DD/YY">{n['Tax Organizer'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    {!n['Questionnaire-Travel Worksheet'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Questionnaire-Travel Worksheet'].completed ?
                          <Moment format="MM/DD/YY">{n['Questionnaire-Travel Worksheet'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    {!n['Questionnaire-Form 5471 (Foreign Corporation)'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Questionnaire-Form 5471 (Foreign Corporation)'].completed ?
                          <Moment format="MM/DD/YY">{n['Questionnaire-Form 5471 (Foreign Corporation)'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    {!n['Questionnaire-Schedule A'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Questionnaire-Schedule A'].completed ?
                          <Moment format="MM/DD/YY">{n['Questionnaire-Schedule A'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    {!n['Questionnaire-Schedule C'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Questionnaire-Schedule C'].completed ?
                          <Moment format="MM/DD/YY">{n['Questionnaire-Schedule C'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    {!n['Questionnaire-Schedule D'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Questionnaire-Schedule D'].completed ?
                          <Moment format="MM/DD/YY">{n['Questionnaire-Schedule D'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    {!n['Questionnaire-Schedule E'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Questionnaire-Schedule E'].completed ?
                          <Moment format="MM/DD/YY">{n['Questionnaire-Schedule E'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    <TableCell className="table-cell tasklist" padding="none">
                      {n.provideInformation ? <Moment format="MM/DD/YY">{n.provideInformation}</Moment> : <Close className="incomplete-tasklist" />}
                    </TableCell>
                    {!n['Client Welcome Call'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Client Welcome Call'].completed ?
                          <Moment format="MM/DD/YY">{n['Client Welcome Call'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    {!n['Audit Protection Plan - IRS Monitoring'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Audit Protection Plan - IRS Monitoring'].completed ?
                          <Moment format="MM/DD/YY">{n['Audit Protection Plan - IRS Monitoring'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    {!n['Workpaper Preparation'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Workpaper Preparation'].completed ?
                          <Moment format="MM/DD/YY">{n['Workpaper Preparation'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    {!n['Data Entry'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Data Entry'].completed ?
                          <Moment format="MM/DD/YY">{n['Data Entry'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    {!n['Data Entry Review'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Data Entry Review'].completed ?
                          <Moment format="MM/DD/YY">{n['Data Entry Review'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    {!n['Data Entry Corrections'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Data Entry Corrections'].completed ?
                          <Moment format="MM/DD/YY">{n['Data Entry Corrections'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    {!n['Final Review'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Final Review'].completed ?
                          <Moment format="MM/DD/YY">{n['Final Review'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    <TableCell className="table-cell tasklist" padding="none">
                      {n.preparation ? <Moment format="MM/DD/YY">{n.preparation}</Moment> : <Close className="incomplete-tasklist" />}
                    </TableCell>
                    {!n['Final Payment Received'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Final Payment Received'].completed ?
                          <Moment format="MM/DD/YY">{n['Final Payment Received'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    {!n['Final Invoice Due'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Final Invoice Due'].completed ?
                          <Moment format="MM/DD/YY">{n['Final Invoice Due'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    <TableCell className="table-cell tasklist" padding="none">
                      {n.finalizePayment ? <Moment format="MM/DD/YY">{n.finalizePayment}</Moment> : <Close className="incomplete-tasklist" />}
                    </TableCell>
                    {!n['Return Review Instructions'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Return Review Instructions'].completed ?
                          <Moment format="MM/DD/YY">{n['Return Review Instructions'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    {!n['Streamlined Procedure Instructions'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Streamlined Procedure Instructions'].completed ?
                          <Moment format="MM/DD/YY">{n['Streamlined Procedure Instructions'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    {!n['Client Review Call'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Client Review Call'].completed ?
                          <Moment format="MM/DD/YY">{n['Client Review Call'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    <TableCell className="table-cell tasklist" padding="none">
                      {n.clientReview ? <Moment format="MM/DD/YY">{n.clientReview}</Moment> : <Close className="incomplete-tasklist" />}
                    </TableCell>
                    {!n['Closing Letter'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Closing Letter'].completed ?
                          <Moment format="MM/DD/YY">{n['Closing Letter'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
                    {!n['Close Engagement & Archive Teamwork Project'].hidden && (
                      <TableCell className="table-cell tasklist-task" padding="none">
                        {n['Close Engagement & Archive Teamwork Project'].completed ?
                          <Moment format="MM/DD/YY">{n['Close Engagement & Archive Teamwork Project'].lastChangedOn}</Moment>
                          :
                          <Close className="incomplete-tasklist" />
                        }
                      </TableCell>
                    )}
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
