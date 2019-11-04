import React from 'react';
import BoardContainer from './BoardContainer';
import BoardModel from '../Models/BoardModel';
import AppBar from './AppBar';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
class Backlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            errorModal: false
        };
    }

    loadData = () => {
        this.setState({ loading: true });
        var board = new BoardModel(this.state.activeBoard);
        board.GetBoards().then(results => {
            this.setState({ boards: results.data })
            this.setState({ loading: false });
        })
    };

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
            <Router>

                <div>
                    <AppBar  />
                    <Switch>
                        <Route path="/boards">
                            <BoardContainer />
                        </Route>
                        <Route path="/boards/:BoardID">
                            <BoardContainer />
                        </Route>
                        <Route path="/search">
                            <h2 style="margin-top: 30px">Search</h2>
                        </Route>
                        <Route path="/">
                            <h2 style="margin-top: 30px">Home</h2>
                        </Route>
                    </Switch>

                </div>
            </Router>

        );
    }
}

export default Backlog;