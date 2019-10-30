
import React from 'react';
import BoardContainer from './BoardContainer';
import BoardModel from '../Models/BoardModel';
import AppBar from './AppBar';


class Backlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: [],
            activeBoard: [],
            loading: true,
            loadingRefData: true,
            loadingBoard: true,
            error: false
        };
    }


    addBoard = (board) => {

        board.CreateItem().then(result => {
          if(result.error === false) { 
            this.updateItems(result.data)      
          }
        })
        return board;
        
    
      };
    
      updateBoards = (board) => {
        this.setState({ data: this.state.data.concat(board) });
        console.log("adding item: " + board.board_id);
      }
    

    setBoard = (board_id) => {
        this.setState({ loadingBoard: true });

        var board = new BoardModel(this.state.boards.filter(board => board.board_id === board_id)[0]);

        this.setState({ activeBoard: board, loadingBoard: false });
    }

    loadRefData = () => {
        this.setState({ loadingRefData: true });

        var board = new BoardModel(this.state.activeBoard);
        board.GetBoards().then(results => {
            this.setState({ boards: results.data, loadingRefData: false })
            this.setState({  });

        })
    };

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


 

    getBoardContainer = () => {
        if (this.state.loadingBoard) {
            return <p>Please choose a board</p>
        }
        return <BoardContainer  key={this.state.activeBoard.board_id} board={this.state.activeBoard} />
    }


    render() {
        const { loading, error } = this.state;

        var BoardContainer = this.getBoardContainer();

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
            <div>
                <AppBar
                    boards={this.state.boards}
                    setBoard={this.setBoard}
                    addBoard={this.addBoard}
                />
                {BoardContainer}
            </div>

        );
    }
}

export default Backlog;