import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { addError, removeError } from '../store/actions/errors';
import { updateUser } from '../store/actions/account';
import {
  fetchAndUpdateCompletedMilestones,
  fetchAndUpdateTasklists,
  fetchDBProjects,
  fetchTeamworkProjectData,
  updateProjectsDB,
  getUserProfileImage
} from '../store/actions/teamworkApi';
import { requestAndUpdateTasks } from '../store/actions/tasks';
import { getMessages, getMessageReplies } from '../store/actions/messages';
import { withStyles } from 'material-ui/styles';
import SetupLog from './SetupLog';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import ErrorIcon from '@material-ui/icons/Error';

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});

function getSteps() {
  return ['Add Api Key', 'Import Projects', 'Import Tasklists', 'Import Tasks', 'Import Messages & Replies'];
}

class SetupSteps extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
      showNext: true,
      showBack: false,
      buttonDisabled: true,
      apiKey: '',
      inputError: false,
      errorMessage: null,
      isLoading: false,
      resultsArr: [],
      showLog: false,
      projectCount: 0,
    }
  }

  componentDidMount() {
    if (this.props.currentUser.isAuthenticated) {
      //this.props.fetchTeamworkProjectData();
      this.props.fetchDBProjects();
      if (this.props.currentUser.user.apiKey){
        this.setState({
          apiKey: this.props.currentUser.user.apiKey,
          buttonDisabled: false,
        })
      }
    } else {
      this.props.history.push('/');
    }
  }

  getStepContent = (step) => {
    // 1 second for each api call
    let minutes = this.state.projectCount / 60
    switch (step) {
      case 0:
        return null;
      case 1:
        return 'Import the Teamwork Projects. This might take a few seconds.';
      case 2:
        return `Import the Teamwork Tasklists for each Project. This will take about ${minutes.toFixed(1)} minutes.`;
      case 3:
        // 1.25 seconds for each api call
        minutes = this.state.projectCount / 45
        return `Import the Teamwork Tasks for each Tasklist/Project. This will take about ${minutes.toFixed(1)} minutes.`
      default:
        return 'Unknown step';
    }
  }

  // form actions
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      buttonDisabled: e.target.value.length > 0 ? false : true,
      inputError: e.target.value.length === 0 && this.state.inputError ? false : null,
      errorMessage: e.target.value.length === 0 && this.state.inputError ? false : null,
    });
  };

  handleSubmit = () => {
    const user = {
      ...this.props.currentUser.user,
      apiKey: this.state.apiKey,
    }
    // first check if the api key works, will return the profile image url
    return this.props.getUserProfileImage(user, user.email, false)
    .then((res)=>{
      // update the account
      this.props.updateUser(user)
      return res
    })
    .catch((err)=>{
      return {
        message: 'Invalid API Key',
        status: 'error',
      }
    })
  }

  // Redux Actions
  buildProjectData = () => {
    return this.props.updateProjectsDB(this.props.currentUser.user)
    .then((res)=>{
      this.setState({
        showLog: true,
        resultsArr: res.projectsAdded,
        projectCount: res.projectsAdded.length,
      })
      return res
    })
    .catch((err)=>{
      console.log('the .catch got hit')
      return err
    })

    //remove this, occurs in step 1
    //this.props.currentUser.user.profileImageUrl ? null : this.props.getUserProfileImage(this.props.currentUser.user, this.props.currentUser.user.email, true);
  }

  updateCompletedDates = () => {
    this.props.fetchAndUpdateCompletedMilestones();
  }

  fetchAndUpdateTasks = () => {
    this.props.requestAndUpdateTasks(this.props.projects.projectsInDB);
  }

  triggerTaskListRequest = (id) => {
    return new Promise(async (resolve, reject) => {
      try{
        setTimeout(() => {
          this.props.fetchAndUpdateTasklists(id);
          resolve(id);
        }, 1000)
      }catch(err) {
        reject(err);
      }
    })
  }

  buildTasklistData = async () => {
    for (let p of this.props.projects.projectsInDB) {
      let result = await this.triggerTaskListRequest(p.teamwork_id);
      console.log(result);
    }
  }

  triggerGetMessages = (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        setTimeout(() => {
          this.props.getMessages(id,this.props.currentUser.user.apiKey)
          resolve(id)
        }, 1000)
      } catch(err) {
        reject(err);
      }
    })
  }

  fetchProjectMessages = async () => {
    for (let p of this.props.projects.projectsInDB) {
      let result = await this.triggerGetMessages(p.teamwork_id)
      console.log(result)
    }
  }

  triggerGetMessageReplies = (project_id,message_id) => {
    return new Promise(async (resolve,reject) => {
      try {
        setTimeout(() => {
          this.props.getMessageReplies(project_id,message_id,this.props.currentUser.user.apiKey)
          resolve(project_id);
        }, 1000)
      } catch(err) {
        reject(err);
      }
    })
  }

  fetchMessageReplies = async () => {
    for (let p of this.props.projects.projectsInDB) {
      let result = await this.triggerGetMessageReplies(p.teamwork_id,p.internalProjectMessageId)
      console.log(result)
    }
  }

  // stepper actions

  handleStepAction = (step) => {
    switch (step) {
      case 0:
        console.log('first step was hit!')
        return this.handleSubmit()
      case 1:
        console.log('step two was hit!')
        return this.buildProjectData()
      default:
        return `Unknown Step`
    }
  }

  handleNext = async() => {
    this.setState({
      inputError: false,
      errorMessage: null,
      isLoading: true,
      resultsArr: [],
      showLog: false,
    })
    let response = await this.handleStepAction(this.state.activeStep);
    console.log('the response is')
    console.log(response)
    response === undefined || response === null ? response = {status: 'error', message: 'Unable to connect to server, please try again'} : null
    setTimeout(()=>{
      if (response.status !== 'error') {
        this.setState({
          activeStep: this.state.activeStep + 1,
          isLoading: false,
        });
      } else {
        this.setState({
          inputError: true,
          errorMessage: response.message,
          isLoading: false,
        })
      }
    },500)
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className="setup-steps">
        <h1>Setup</h1>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{this.getStepContent(index)}</Typography>
                  <div className="action-container">
                    {activeStep !== 0 && (
                      <span className="error">
                        {this.state.errorMessage && (this.state.errorMessage)}
                      </span>
                    )}
                    <div>
                      {this.state.showBack && (
                        <Button
                          disabled={activeStep === 0}
                          onClick={this.handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                      )}
                      {activeStep === 0 && (
                        <FormControl className="api-form">
                          <span>Please enter your Teamwork API Key</span>
                          {this.state.inputError && (
                            <span className="error">
                              {this.state.errorMessage}
                            </span>
                          )}
                          <Input
                            error={this.state.inputError}
                            autoComplete="off"
                            id="apiKey"
                            type="text"
                            name="apiKey"
                            placeholder='Teamwork API Key'
                            onChange={this.handleChange}
                            value={this.state.apiKey}
                          />
                        </FormControl>
                      )}
                      {this.state.showNext && (
                        <Button
                          disabled={this.state.buttonDisabled}
                          variant="raised"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.button}
                        >
                          {this.state.isLoading ?
                            <CircularProgress size={24} color="inherit" />
                            :
                            activeStep === 0 ?
                              'Verify'
                              :
                              activeStep === steps.length - 1 ?
                                'Finish'
                                :
                                'Start Import'
                            }
                        </Button>
                      )}
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&quot;re finished</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
        {this.state.showLog && (
          <SetupLog
            results={this.state.resultsArr}
            activeStep={this.state.activeStep}
          />
        )}
      </div>
    );
  }
}

SetupSteps.propTypes = {
  classes: PropTypes.object,
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
    errors: state.errors,
    projects: state.projects,
	};
}

export default compose(withStyles(styles), connect(mapStateToProps, {
  requestAndUpdateTasks,
  fetchAndUpdateCompletedMilestones,
  fetchTeamworkProjectData,
  updateProjectsDB,
  fetchDBProjects,
  fetchAndUpdateTasklists,
  getMessages,
  getMessageReplies,
  getUserProfileImage,
  updateUser,
  removeError,
  addError,
 }))(SetupSteps);
