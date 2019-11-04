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
                            <BoardContainer key={this.state.activeBoard.board_id} deleteBoard={this.deleteBoard} board={this.state.activeBoard} />
                        </Route>
                        <Route path="/boards/:BoardID">
                            <BoardContainer />
                        </Route>
                        <Route path="/search">
                            <p>Search</p>
                        </Route>
                        <Route path="/">
                            <p>Home</p>
                        </Route>
                    </Switch>

                </div>
            </Router>

        );
    }
}

export default Backlog;