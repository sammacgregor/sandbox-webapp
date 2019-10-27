
import React from 'react';
import SprintContainer from './SprintContainer';
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
            error: false
        };
    }



    loadData = () => {
        this.setState({ loading: true });

        var board = new BoardModel({ board_id: 1 });

        board.GetBoard(1).then(result => {
            if (result.error===true) {
                this.setState({ error: true })

            } else {
                this.setState({ board: result.data })

            }

        })

        board.GetSprints().then(results => {
            this.setState({ sprints: results.data })
            this.setState({ loading: false });

            // this.setState({ loading: false });

        })


    };
    componentDidMount() {
        this.loadData();
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



            <div style={{'marginTop':"100px"}}>

                {this.state.sprints.map(sprint =>

                    <div key={sprint.sprint_id}>

                        <SprintContainer
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