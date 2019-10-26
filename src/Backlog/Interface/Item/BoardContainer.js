
import React from 'react';
import ItemsContainer from './ItemsContainer';
import axios from "axios";

import SprintModel from '../../Models/SprintModel';
import BoardModel from '../../Models/BoardModel';
import Divider from '@material-ui/core/Divider';


class BoardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boardID: 1,
            board: null,
            sprints: [],
            loading: true,
            error: false,
            data: []
        };
    }



    loadData = () => {
        this.setState({ loading: true });

        var board = new BoardModel({ BoardID: this.state.boardID });

        board.GetBoard(1).then(data => {
            if (data.error=true) {
                this.setState({ error: true })

            } else {
                this.setState({ board: data[0] })

            }

        })

        board.GetSprints().then(data => {
            this.setState({ sprints: data })
            this.setState({ loading: false });

            // this.setState({ loading: false });

        })


    };
    componentDidMount() {
        this.loadData();
    }






    render() {
        const { loading, error, data } = this.state;



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



            <div style={{'marginTop':"100px"}}>

                {this.state.sprints.map(sprint =>

                    <div key={sprint.SprintID}>

                        <ItemsContainer
                            board={this.state.board}
                            sprint={sprint}
                        />
                        <Divider />


                    </div>
                )}
            </div>
        );
    }
}

export default BoardContainer;