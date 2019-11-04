import React from 'react';
import BoardContainer from './BoardContainer';
import BoardModel from '../Models/BoardModel';
import AppBar from './AppBar';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    Redirect
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
                    <AppBar />
                    <Switch>
                    <Route path="/boards/:BoardID" render={(props) => <BoardContainer {...props} />}></Route>
                        {/* {BoardContainer} */}
                        <Route exact path="/boards">
                            <BoardContainer />
                        </Route>


                        <Route exact path="/search">
                            <h2>Search</h2>
                        </Route>
                        <Route path="/">
                            <h2>Home</h2>
                        </Route>
                        <Redirect from='*' to='/' />
                    </Switch>

                </div>
            </Router>

        );
    }
}

export default Backlog;