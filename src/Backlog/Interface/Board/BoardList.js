
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import BoardModel from '../../Models/BoardModel';
import {
    Link
} from "react-router-dom";

class BoardList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: [],
            loading: true,
            error: false
        };
    }




    loadData = () => {

        var boardModel = new BoardModel({});


        this.setState({ loading: true });

        var data = boardModel.GetBoards()
            .then(result => {

                if (result.error === true) {
                    this.setState({ error: true, loading: false })

                } else {
                    this.setState({ boards: result.data, error: false, loading: false })

                }
            })



        return data;
    };
    componentDidMount() {
        this.loadData();
    }


    getBoardItems = () => {
        if (this.state.boards.length < 1) {
            return (<div><p style={{ textAlign: "center" }}>There are no items in this container</p></div>)
        } else return (

            <div>
                <List component="nav" aria-label="facts about item">
                    {this.state.boards.map(board =>
                        <div key={board.board_id}>
                            <BoardListItem key={board.board_id} board={board} />
                        </div>
                    )}
                </List>
            </div >
        );
    }


    render() {
        const { loading, error } = this.state;

        var BoardListItems = this.getBoardItems();

        if (loading) {
            return <p>Loading ...</p>;
        }
        else if (error) {
            return (
                <p>
                    There was an error loading the boards....
          <button onClick={this.loadData}>Please try again</button>
                </p>
            );
        }
        else return (
            <div style={{ 'marginTop': "30px" }}>


                <Card>
                    <CardContent>

                        <Typography variant="h5" component="h2">


                            Boards
            </Typography>
                        <Typography color="textSecondary">
                            Click on a board to view it
          </Typography>

                        {BoardListItems}

                    </CardContent>
                </Card>
                <Divider />
            </div>
        );
    }
}



function BoardListItem(props) {
    return (
        <div>
            <ListItem component={Link} to={"../boards/" + props.board.board_id} button id={props.board.board_id}
            >


                <ListItemText><b>{props.board.board_id}</b> - {props.board.board_name}</ListItemText>
            </ListItem>
            <Divider />
        </div>
    )
}


export default BoardList;