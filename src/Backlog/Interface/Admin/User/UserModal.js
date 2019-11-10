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

import UserModel from '../../../Models/UserModel';


class UserModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            givenName: "",
            surname: "",
            email: "",
            mobile: "",
            password: ""
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillUnmount() {
        // this.setState({open:false});
    }

    handleCreate = () => {

        var now = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

        const user = new UserModel(
            {
                given_name: this.state.givenName,
                surname: this.state.surname,
                email: this.state.email,
                mobile: this.state.mobile,
                password: this.state.password,
                created_by: "system.user",
                created_date: now,
                updated_by: "system.user",
                updated_date: now
            }
        );

        this.props.addUser(user)
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
            this.setState({ open: true, password: "", email: "", mobile: "", givenName: "", surname: "" });
        };

        const handleClose = () => {
            this.setState({ open: false });

        };




        return (
            <div>

                <Button style={{ marginTop: "10px" }} variant="outlined" color="primary" onClick={handleClickOpen}
                //  className={classes.dialogButton}
                >
                    New User
      </Button>
                <Dialog
                    open={this.state.open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    maxWidth="sm"
                >

                    <DialogTitle id="dialog-title">New user</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter new user details
          </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name="givenName"
                            onChange={this.handleChange}

                            label="Given name"
                            type="givenName"
                            fullWidth
                        />

                        <TextField
                            fullWidth
                            label="Surname"
                            multiline
                            onChange={this.handleChange}

                            name="surname"
                            rowsMax="4"
                            margin="normal"
                        />

                        <TextField
                            margin="dense"
                            id="name"
                            name="email"
                            onChange={this.handleChange}

                            label="Email"
                            type="email"
                            fullWidth
                        />

<TextField
                            margin="dense"
                            id="name"
                            name="mobile"
                            onChange={this.handleChange}

                            label="Mobile #"
                            type="mobile"
                            fullWidth
                        />

<TextField

                            margin="dense"
                            id="name"
                            name="password"
                            onChange={this.handleChange}

                            label="Password"
                            type="password"
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

export default UserModal;