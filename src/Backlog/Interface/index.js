import React from 'react';
import BoardContainer from './Board/BoardContainer';
import BoardModel from '../Models/BoardModel';
import AppBar from './Appbar/AppBar';
import Access from './Access/index';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    Redirect
} from "react-router-dom";
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: false,
            loading: true,
            error: false,
            errorModal: false
        };
    }

    toggledAuth = () => {
        this.setState({auth: !this.state.auth})
    }

    loadData = () => {
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



    getBoardContainer = () => {
        if (this.state.loading) {
            return <p></p>
        }
        else {
            // return 

        }
    }

    render() {
        const loading = this.state.loading;

        // const BoardContainer = this.getBoardContainer();



        return (
            <Router>

                <div>
                    <AppBar auth={this.state.auth} />
                    <Switch>
                        <Route path="/boards/:BoardID" render={(props) => <BoardContainer {...props} />}></Route>
                        <Route exact path="/boards">
                            <BoardContainer />
                        </Route>
                        <Route exact path="/search">
                            <h2>Search</h2>
                        </Route>
                        <Route path="/">
                            <h2>Home</h2>
                            <Access toggleAuth={this.toggledAuth} />
                        </Route>
                        <Redirect from='*' to='/' />
                    </Switch>

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