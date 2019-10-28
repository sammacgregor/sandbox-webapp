import axios from "axios";

const internal = {};

export default internal.BoardModel = class {
    constructor({
        board_id,
        board_name,
        created_date,
        created_by,
        updated_date,
        updated_by
    }) {

        this.board_id = board_id;
        this.board_name = board_name;
        this.created_date = created_date;
        this.created_by = created_by;
        this.updated_date = updated_date;
        this.updated_by = updated_by;
    }




    CreateBoard() {
        return new Promise(resolve => {

            return axios
                .post(process.env.REACT_APP_SANDBOX_API_URL + '/v2/boards',
                    this
                )
                .then(result => {
                    console.log(result);
                    resolve();

                })
                .catch(error => {
                    console.error("error: ", error);
                })
        })

    }


    GetBoard(boardID) {

        return axios
            .get(process.env.REACT_APP_SANDBOX_API_URL + '/v2/boards/' + boardID)
            .then(result => {
                console.log(result.data);
                return result.data;

            })
            .catch(error => {
                console.error("error: ", error);
                return {error: true, message: error}
            })

    }


    GetSprints() {
        console.log("requested sprints for board: " + this.board_id)

        return axios 
            .get(process.env.REACT_APP_SANDBOX_API_URL + '/v2/boards/' + this.board_id + '/sprints')
            .then(result => {
                console.log(result.data);
                return result.data;

            })
            .catch(error => {
                console.error("error: ", error);
            })

    }


    GetBoards() {

        return axios 
            .get(process.env.REACT_APP_SANDBOX_API_URL + '/v2/boards')
            .then(result => {
                console.log(result.data);
                return result.data;

            })
            .catch(error => {
                console.error("error: ", error);
            })

    }

}