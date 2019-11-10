
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BoardModel from '../../Models/BoardModel';
import {
    Link
} from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import UserModal from './User/UserModal';

import UserModel from '../../Models/UserModel'

class UsersView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            users: []
        };
    }


    addUser = (user) => {

        user.AddUser().then(result => {
            if (result.error === false) {

                this.updateUsers(result.data)
            } else {
                this.setState({ errorModal: true })
            }
        })
        return user;


    };

    updateUsers = (user) => {
        this.setState({ users: this.state.users.concat(user) });
        console.log("adding user: " + user.user_id);
    }



    loadData = () => {

        this.setState({ loading: true });

        var userModel = new UserModel({});

        userModel.GetUsers()
            .then(result => {
                if (result.error === true) {
                    this.setState({ error: true, loading: false });
                }  else {
                    this.setState({ error: false, loading: false, users: result.data });
                    
                }
            })




    };
    componentDidMount() {
        this.loadData();
        this.setState({ loading: false });

    }

    getUserItems = () => {
        if (this.state.users.length < 1) {
            return (<div><p style={{ textAlign: "center" }}>There are no users</p></div>)
        } else return (

            <div>
                <List component="nav" aria-label="facts about item">
                    {this.state.users.map(user =>
                        <div key={user.user_id}>
                            <UserListItem key={user.user_id} user={user} />
                        </div>
                    )}
                </List>
            </div >
        );
    }

    render() {
        const { loading, error } = this.state;
        var UserListItems = this.getUserItems();


        if (loading) {
            return <p>Loading ...</p>;
        }
        else if (error) {
            return (
                <p>
                    There was an error loading the boards....
          <button onClick={this.loadData}>Please try again</button>
                </p>
            );
        }
        else return (
            <div>
                <Card>

                    <CardContent>
                        <Typography variant="h5" component="h2">Users</Typography>
                        <UserModal addUser={this.addUser} />

                        {UserListItems}

                    </CardContent>
                </Card>
            </div>
        );
    }
}






function UserListItem(props) {
    return (
        <div>
            <ListItem button
            >
       

                <ListItemText><b>{props.user.given_name}</b> - {props.user.surname}</ListItemText>
            </ListItem>
            <Divider />
        </div>
    )
}


export default UsersView;