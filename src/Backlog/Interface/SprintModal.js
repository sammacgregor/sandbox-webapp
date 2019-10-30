import 'date-fns';

import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from "moment";

import SprintModel from '../Models/SprintModel';

import DateFnsUtils from '@date-io/date-fns';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

class SprintModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.props.board,
      open: false,
      sprintEndDate: null,
      itemTypeID: "",
      sprintGoal: "",
      sprintStartDate:null
    };
    this.handleCreate = this.handleCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    // this.setState({open:false});
  }




  handleCreate = () => {

    var now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    const sprint = new SprintModel(
      {
        sprint_goal: this.state.sprintGoal,
        sprint_estimated_points: null,
        sprint_target_points: null,
        board_id: this.state.board.board_id,
        sprint_start_date: now,
        sprint_end_date: now,
        created_by: "system.user",
        created_date: now,
        updated_by: "system.user",
        updated_date: now
      }
    );

    this.props.addSprint(sprint)
    this.setState({ open: false })


  };



  handleDateChange = date => {
    this.setState({sprintStartDate:date})
  }

  
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  render() {

    // const useStyles = makeStyles(theme => ({
    //   dialogButton: {
    //     'margin-top': "20px"
    //   },
    // }));

    // const classes = useStyles();



    const handleClickOpen = () => {
      this.setState({ open: true, sprint_start_date: null, sprint_end_date: null, sprint_goal: "" });
    };

    const handleClose = () => {
      this.setState({ open: false });

    };




    return (
      <div>

        <Button variant="outlined" color="primary" onClick={handleClickOpen}
        //  className={classes.dialogButton}
        >
          New Sprint
      </Button>
        <Dialog
          open={this.state.open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
        >

          <DialogTitle id="dialog-title">New Sprint</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter new sprint details
          </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="sprintGoal"
              onChange={this.handleChange}

              label="Sprint goal"
              type="sprintGoal"
              fullWidth
            />
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              name="sprintStartDate"
              type="datePicker"
              value={this.state.sprintStartDate}
              label="Sprint start date"
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />

<KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Sprint end date"
              name="sprintEndDate"
              type="datePicker"
              value={this.state.sprintEndDate}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />

    </MuiPickersUtilsProvider>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={this.handleCreate} color="primary">
              Create
          </Button>
          </DialogActions>
        </Dialog >
      </div >
    )
  }
}

export default SprintModal;