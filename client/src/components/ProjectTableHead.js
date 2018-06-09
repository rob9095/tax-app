import React, { Component } from 'react';
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
import TasklistMenu from '../containers/TasklistMenu';
import Checkbox from 'material-ui/Checkbox';
import { saveTableState } from '../store/actions/savedTableViews';
import { SAVE_TABLE_HEAD_STATE } from '../store/actionTypes';
import { handleSavedViewDisplay, clearSavedViewDisplay } from '../store/actions/savedTableView';

const columnData = [
  {
    id: 'projectName',
    hidden: false,
    numeric: false,
    disablePadding: true,
    label: 'Project',
  },
  {
    id: 'preparer',
    hidden: false,
    numeric: false,
    disablePadding: true,
    label: 'Preparer',
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
    id: 'lastTasklistChanged',
    hidden: false,
    numeric: false,
    disablePadding: false,
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
    id: 'finalizeEngagement',
    hidden: false,
    tasklistName: 'FINALIZE ENGAGEMENT',
    isTasklist: true,
    numeric: false,
    disablePadding: true,
    label: 'Finalize Engagment',
    tasks: ['Closing Letter','Close Engagement & Archive Teamwork Project'],
  },
];

class ProjectTableHead extends Component {
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
      savedViewTitle: '',
      tasks: [],
      currentColumnIsTasklist: false,
      currentColumnIsTask: false,
      currentColumnLabel: '',
    }
    this.handleTasklistMenuSelect = this.handleTasklistMenuSelect.bind(this);
  }

  updateColumnData = (lastCheckedTask) => {
    let updatedColumnData = this.state.columnData
    updatedColumnData.forEach(c => {
      if (c.label === lastCheckedTask && c.isTask === true) {
          c.hidden = !c.hidden
          //console.log(c)
      }
    })
    this.setState({
      columnData: updatedColumnData,
      lastCheckedTask: lastCheckedTask,
    })
    this.props.onShowShowTasklistTasks(lastCheckedTask)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.lastCheckedTask !== this.props.lastCheckedTask || newProps.removeTask !== this.props.removeTask) {
      this.updateColumnData(newProps.lastCheckedTask)
      // let updatedState = this.state
      // updatedState.columnData.forEach(c => {
      //   if (c.label === newProps.lastCheckedTask && c.isTask === true) {
      //       c.hidden = !c.hidden
      //       console.log(c)
      //   }
      // })
      // this.props.onShowShowTasklistTasks(newProps.lastCheckedTask)
      // updatedState.lastCheckedTask = newProps.lastCheckedTask
      // this.setState({
      //   ...updatedState
      // })
    }

    if (newProps.saveState === true && this.props.saveState === false) {
      // this.props.saveTableState(this.state,'SAVE_TABLE_HEAD_STATE');
      this.props.toggleGetHeadState(this.state);
    }

    // if (newProps.viewCheck) {
    //   if (newProps.viewCheck[0].title !== this.props.viewCheck[0].title) {
    //     console.log('we have loaded a saved different view available in table header')
    //     for (let t of newProps.viewCheck[0].headerState.tasks) {
    //       this.updateColumnData(t)
    //     }
    //     this.setState({
    //       ...newProps.viewCheck[0].headerState,
    //     })
    //     console.log('we updated the view in the header')
    //     this.props.triggerViewUpdate(newProps.viewCheck[0].bodyState, newProps.viewCheck[0].headerState.tasks);
    //   }
    // }

      const viewCheck = Object.entries(newProps.savedView)
      if (newProps.savedView.length > 0) {
      const viewTitle = newProps.savedView[0].title
      const view = newProps.savedView[0]

      console.log('we have a saved view(s) available in table header')
      // console.log(newProps.savedView[0].title)
      if (viewTitle !== this.state.savedViewTitle && viewTitle !== undefined) {
        console.log(`we confirmed that the new title: ${viewTitle} is different from the last one: ${this.state.savedViewTitle}`)
        // then clear any tasks if they exist
        this.state.columnData.forEach(c => {
          if (c.hidden === false && c.isTask === true) {
              this.updateColumnData(c.label);
          }
        })
        // show new tasks
        for (let t of view.headerState.tasks) {
          this.updateColumnData(t)
        }
        this.setState({
          ...view.headerState,
          savedViewTitle: viewTitle,
        })
        console.log('we updated the view in the header because the title was different')
        this.props.triggerViewUpdate(view)
      }
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

  createSortHandler = (property,isTasklist,tasks,isTask,label) => event => {
    if (isTasklist) {
      this.setState({
        showAddTasksMenu: true,
        currentEvent: event,
        currentTasks: tasks,
      })
    } else if (isTask) {
      this.props.onRequestSort(event, label, isTask);
    } else {
      this.props.onRequestSort(event, property)
    }
    this.setState({
      currentColumn: property,
      currentColumnIsTasklist: isTasklist,
      currentColumnIsTask: isTask ? isTask : false,
      currentColumnLabel: label,
    })
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

ProjectTableHead.propTypes = {
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

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
    projects: state.projects,
    tableState: state.tableState,
    savedView: state.savedView,
	};
}

export default connect(mapStateToProps, { saveTableState, handleSavedViewDisplay })(ProjectTableHead);
