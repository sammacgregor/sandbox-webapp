import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from "moment";

import BoardModel from '../Models/BoardModel';

import MenuItem from '@material-ui/core/MenuItem';


class BoardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      boardName: ""
    };
    this.handleCreate = this.handleCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillUnmount() {
    // this.setState({open:false});
  }

  handleCreate = () => {

    var now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    const board = new BoardModel(
      {
        board_name: this.state.boardName,
        created_by: "system.user",
        created_date: now,
        updated_by: "system.user",
        updated_date: now
      }
    );

    this.props.addBoard(board)
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

   


    const handleClickOpen = () => {
      this.setState({ open: true,  board_name: "" });
    };

    const handleClose = () => {
      this.setState({ open: false });

    };




    return (
      <div>
      <MenuItem onClick={handleClickOpen}>New board</MenuItem>

        <Dialog
          open={this.state.open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          maxWidth="sm"
        >

          <DialogTitle id="dialog-title">New Board</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter new board details
          </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="boardName"
              onChange={this.handleChange}

              label="Board Name"
              type="boardName"
              fullWidth
            />
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

export default BoardModal;