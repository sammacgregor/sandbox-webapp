
import React from 'react';
import SprintContainer from './SprintContainer';

class BoardContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            board: this.props.board,
            sprints: [],
            loading: true,
            error: false
        };
    }


    loadData = () => {

        this.setState({ loading: true });

        console.log(this.props.board);
        this.state.board.GetSprints().then(results => {
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



            <div style={{ 'marginTop': "100px" }}>
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