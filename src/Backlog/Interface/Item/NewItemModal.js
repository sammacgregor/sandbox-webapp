import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { makeStyles } from '@material-ui/core/styles';
// import Draggable from 'react-draggable';
// import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import moment from "moment";

import ItemModel from '../../Models/ItemModel';

import { LOOKUP_ITEM_PRIORITY, LOOKUP_ITEM_TYPE } from "../../ExpressionRules/ItemHelper";


class NewItemModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sprint: this.props.sprint,
      open: false,
      itemPriorityID: "",
      itemTypeID: "",
      summary: "",
      description: ""
    };
    this.handleCreate = this.handleCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    // this.setState({open:false});
  }

  handleCreate = () => {

    var now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    const item = new ItemModel(
      {
        summary: this.state.summary,
        description: this.state.description,
        item_type_id: this.state.itemTypeID,
        item_priority_id: this.state.itemPriorityID,
        item_status_id: 1,
        sprint_id: this.state.sprint.sprint_id,
        created_by: "system.user",
        created_date: now,
        updated_by: "system.user",
        updated_date: now
      }
    );

    this.props.addItem(item)
    this.setState({ open: false })
     

  };



  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
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
      this.setState({ open: true, itemPriorityID: "", itemTypeID: "", summary: "", description: "" });
    };

    const handleClose = () => {
      this.setState({ open: false });

    };




    return (
      <div>

        <Button style={{ marginTop: "10px" }} variant="outlined" color="primary" onClick={handleClickOpen}
        //  className={classes.dialogButton}
        >
          New Item
      </Button>
        <Dialog
          open={this.state.open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
        >

          <DialogTitle id="dialog-title">New Item</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter new item details
          </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="summary"
              onChange={this.handleChange}

              label="Summary"
              type="summary"
              fullWidth
            />
            <TextField
              id="standard-select-item-type"
              select
              name="itemTypeID"
              label="Type"
              value={this.state.itemTypeID}
              onChange={this.handleChange}
              helperText="Select an item type"
              margin="normal"
            >
              {LOOKUP_ITEM_TYPE.map(option => (


                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Description"
              multiline
              onChange={this.handleChange}

              name="description"
              rowsMax="4"
              margin="normal"
            />

            <TextField
              id="standard-select-item-priority"
              select
              name="itemPriorityID"
              label="Priority"
              value={this.state.itemPriorityID}
              onChange={this.handleChange}
              helperText="Select a priority"
              margin="normal"
            >
              {LOOKUP_ITEM_PRIORITY.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>






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

export default NewItemModal;