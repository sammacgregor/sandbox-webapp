
import React from 'react';
import SprintContainer from './SprintContainer';
import BoardOptions from './BoardOptions';
import BoardModel from '../Models/BoardModel';
import {
    useParams
} from "react-router-dom";
class BoardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: null,
            sprints: [],
            loading: true,
            error: false
        };
    }


    loadData = () => {
        this.setState({ loading: true });

        let { boardID } = useParams();

        board = new BoardModel({}).GetBoard(boardID);

        this.setState({ board: board }).then(board => {

            board.GetSprints().then(results => {
                this.setState({ sprints: results.data })
                this.setState({ loading: false });
            })

        })
    };
    componentDidMount() {
        this.loadData();
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
        const { loading, error } = this.state;



        if (loading) {
            return <p>Loading ...</p>;
        }
        else if (error) {
            return (
                <p>
                    There was an error loading the repos.{" "}
                    <button onClick={this.loadData}>Try again</button>
                </p>
            );
        }
        else return (



            <div style={{ 'marginTop': "100px" }}>
                <BoardOptions board={this.state.board} addSprint={this.addSprint} deleteBoard={this.deleteBoard} />

                <h1>{this.state.board.board_name} board</h1>



                {this.state.sprints.map(sprint =>

                    <div key={sprint.sprint_id}>

                        <SprintContainer
                            key={sprint.sprint_id}
                            board={this.state.board}
                            sprint={sprint}
                        />


                    </div>
                )}
            </div>
        );
    }
}

export default BoardContainer;