import React from 'react';
import BoardContainer from './Board/BoardContainer';
import BoardModel from '../Models/BoardModel';
import AppBar from './Appbar/AppBar';
import Access from './Access/index';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Logout from './Access/Logout';
import BoardList from './Board/BoardList';
import AdminDashboard from './Admin/AdminDashboard';
import Login from './Access/Login'

import AuthModel from '../Models/AuthModel'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: null,
            auth: false,
            loading: true,
            error: false,
            errorModal: false
        };
    }

    toggleAuth = () => {
        this.setState({ auth: !this.state.auth })
    }



    authenticate = () => {

        var auth = new AuthModel({});
        auth.GetAuth()
            .then(result => {
                if (result.error) {
                    this.setState({ auth: false })
                } else {
                    this.setState({ auth: true })
                    localStorage.setItem('user_id', result.data.user_id)

                }
            })
            .catch(error => {
                console.log(error)
                this.setState({ auth: false })

            })


    }



    loadData = () => {

        this.authenticate()
        if (this.state.user_id) {
            this.toggleAuth()
        }
        this.setState({ loading: true });
        var board = new BoardModel({});
        board.GetBoards().then(results => {
            this.setState({ boards: results.data })
            this.setState({ loading: false });
        })
    };

    componentDidMount() {
        this.loadData();
    }



    authRoutes = () => {
        if (this.state.auth) {
            return (
                <div>
                    <Route path="/boards/:BoardID" render={(props) => <BoardContainer {...props} />}></Route>
                    <Route exact path="/boards">
                        <BoardList />
                    </Route>
                    <Route exact path="/search">
                        <h2>Search</h2>
                    </Route>

                    <Route exact path="/access">
                        <Access toggleAuth={this.toggleAuth} existingUser={true} />
                    </Route>

                    <Route exact path="/admin">
                        <AdminDashboard />
                    </Route>

                    <Route path="/account">
                        <h2>Account</h2>
                    </Route>
                    <Route path="/logout">
                        <h2>Logout</h2>
                        <Logout toggleAuth={this.toggleAuth} auth={this.state.auth} />
                    </Route>

                    <Route path="/auth">
                        <Login toggleAuth={this.toggleAuth} auth={this.state.auth} />
                    </Route>

                </div>
            )
        }
    }


    render() {

        const authRoutes = this.authRoutes();
        return (
            <Router>

                <div>
                    <AppBar key={this.state.auth} auth={this.state.auth} />
                    <div style={{ marginTop: "100px" }}>
                        <Switch>
                            {authRoutes}
                            <Route path="/">
                                {
                                    this.state.auth === false &&
                                    <Access toggleAuth={this.toggleAuth} existingUser={true} />
                                }
                            </Route>
                            <Redirect from='*' to='/' />
                        </Switch>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>

                </div>
            </Router>

        );
    }
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Index;