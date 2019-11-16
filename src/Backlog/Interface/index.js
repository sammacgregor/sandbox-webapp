import React from 'react';
import BoardContainer from './Board/BoardContainer';
import AppBar from './Appbar/AppBar';
import Access from './Access/index';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Logout from './Access/Logout';
import BoardList from './Board/BoardList';
import AdminDashboard from './Admin/AdminDashboard';

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
                if (result.error === false) {

                    console.log("authenticated")
                    console.log(result)
                    this.toggleAuth()

                    this.setState({ loading: false })


                } else {

                    this.setState({ auth: false })
                    console.log("not authenticated")
                    this.setState({ loading: false })

                }
            })
            .catch(error => {
                console.log(error)
                this.setState({ auth: false })
                this.setState({ loading: false })

            })


    }



    loadData = () => {
        this.authenticate()
        
    };

    componentDidMount() {
        this.loadData();

    }





    render() {

        if (this.state.loading) {
            return null
        } else {
            return (
                <Router>

                    <div>
                        <AppBar key={this.state.auth} auth={this.state.auth} />
                        <div style={{ marginTop: "100px" }}>
                            <Switch>
                                <PrivateRoute auth={this.state.auth} exact path="/boards/:BoardID" component={BoardContainer}></PrivateRoute>
                                <PrivateRoute auth={this.state.auth} exact path="/boards" component={BoardList}></PrivateRoute>
                                <PrivateRoute auth={this.state.auth} exact path="/search"/>


                                <Route auth={this.state.auth} exact path="/login">
                                    <Access toggleAuth={this.toggleAuth} existingUser={true} />
                                </Route>

                                <PrivateRoute auth={this.state.auth} exact path="/admin" component={AdminDashboard}/>

                                <PrivateRoute auth={this.state.auth} path="/account"/>
                                <PrivateRoute auth={this.state.auth} path="/logout">
                                    <Logout toggleAuth={this.toggleAuth} auth={this.state.auth} />
                                </PrivateRoute>


                                <Route auth={this.state.auth} path="/">
                                </Route>
                                <Redirect from='*' to='/' />
                            </Switch>
                        </div>
                        <Box mt={5}>
                            <Copyright />
                        </Box>

                    </div>
                </Router>

            )
        }

    }
}
const PrivateRoute = ({ component, auth, ...rest }) => {

    return (
      <Route {...rest} exact
        render = {(props) => (
            auth ? (
            <div>
              {React.createElement(component, props)}
            </div>
          ) :
          (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        )}
      />
    )
  }
  

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
// function PrivateRoute({ children, auth, ...rest }) {
//     return (
//         <Route
//             {...rest}
//             render={({ location }) =>
//                 auth ? (
//                     children
//                 ) : (
//                         <Redirect
//                             to={{
//                                 pathname: "/login",
//                                 state: { from: location }
//                             }}
//                         />
//                     )
//             }
//         />
//     );
// }


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Sandbox
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Index;