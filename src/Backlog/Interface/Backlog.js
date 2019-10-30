
import React from 'react';
import BoardContainer from './BoardContainer';
import BoardModel from '../Models/BoardModel';
import AppBar from './AppBar';
import ErrorModal from './ErrorModal';


class Backlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: [],
            activeBoard: [],
            loading: true,
            loadingBoard: true,
            error: false,
            errorModal: false
        };
    }


    deleteBoard = () => {

        this.setState({ loadingBoard: true });

        console.log("deleting board: " + this.state.activeBoard.board_id)
        var currentBoards = this.state.boards;
        var index = currentBoards.findIndex(x => x.board_id === this.state.activeBoard.board_id)
        this.state.activeBoard.DeleteBoard()
        if (index !== -1) {
            currentBoards.splice(index, 1);
          this.setState({ boards: currentBoards });
        }
        this.setState({activeBoard:null})

    }


    addBoard = (board) => {

        board.CreateBoard().then(result => {
          if(result.error === false) { 

            this.updateBoards(result.data)      
          } else {
                  this.setState({ errorModal: true })
          }
        })
        return board;
        
    
      };
    
      updateBoards = (board) => {
        this.setState({ boards: this.state.boards.concat(board) });
        console.log("adding board: " + board.board_id);
      }
    

    setBoard = (board_id) => {
        this.setState({ loadingBoard: true });

        var board = new BoardModel(this.state.boards.filter(board => board.board_id === board_id)[0]);

        this.setState({ activeBoard: board, loadingBoard: false });
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


 

    getBoardContainer = () => {
        if (this.state.loadingBoard) {
            return <p>Please choose a board</p>
        }
        return <BoardContainer  key={this.state.activeBoard.board_id} deleteBoard={this.deleteBoard} board={this.state.activeBoard} />
    }


    getErrorModal = () => {
        if(this.state.errorModal) {
          return <ErrorModal />
        }
      }

    render() {
        const { loading, error } = this.state;

        var BoardContainer = this.getBoardContainer();

        var ErrorModal = this.getErrorModal();

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
                {ErrorModal}
                {BoardContainer}
            </div>

        );
    }
}

export default Backlog;