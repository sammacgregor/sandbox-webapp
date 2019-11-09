
import React from 'react';
import SprintContainer from '../Sprint/SprintContainer';
import SprintEmpty from '../Sprint/SprintEmpty';
import BoardOptions from './BoardOptions';
import BoardModel from '../../Models/BoardModel';
import Typography from '@material-ui/core/Typography';
import Loading from '../Common/Loading';

import Error from '../Common/Error';
class BoardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            match: this.props.match,
            board: null,
            sprints: [],
            loading: true,
            error: false
        };
    }


    loadData = () => {
        console.log("Loading board")
        this.setState({ loading: true, error: false });
        this.setState({ match: this.props.match })


        var boardID = this.props.match.params.BoardID;

        var board = new BoardModel({})

        board.GetBoard(boardID).then(result => {

            if (result.error === true) {
                this.setState({ error: true, loading: false });
                console.log("error for days")


            } else {
                this.setState({ board: result.data })
                board = new BoardModel(result.data)

                board.GetSprints(boardID).then(results => {
                    this.setState({ sprints: results.data })
                    this.setState({ loading: false });
                })

            }

        });



    };
    componentDidMount() {
        this.loadData();
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevState.match.params.BoardID !== this.props.match.params.BoardID) {
            this.loadData();
        }
    }


    addSprint = (sprint) => {

        sprint.CreateSprint().then(result => {
            if (result.error === false) {

                this.updateSprints(result.data)
            } else {
                this.setState({ errorModal: true })
            }
        })
        return sprint;


    };

    updateSprints = (sprint) => {
        this.setState({ sprints: this.state.sprints.concat(sprint) });
        console.log("adding sprint: " + sprint.sprint_id);
    }


    deleteBoard = () => {

        console.log("deleting board: " + this.state.board.board_id)
        this.state.board.DeleteBoard()

    }



    render() {
        const { loading, error, match } = this.state;



        if (loading) {
            return (
                <Loading />

            );
        }
        else if (error) {
            return (
                <Error />
            );
        }
        else return (



            <div style={{ 'marginTop': "100px" }}>
                <BoardOptions board={this.state.board} addSprint={this.addSprint} deleteBoard={this.deleteBoard} />
                <Typography variant="h2">{this.state.board.board_name} board</Typography>


                {this.state.sprints.map(sprint =>

                    <div key={sprint.sprint_id}>

                        <SprintContainer
                            key={sprint.sprint_id}
                            board={this.state.board}
                            sprint={sprint}
                        />


                    </div>
                )}
                <SprintEmpty
                    board={this.state.board}
                    addSprint={this.addSprint}
                />
            </div>
        );
    }
}

export default BoardContainer;