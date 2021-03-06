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


    DeleteBoard() {


        return axios
            .delete(process.env.REACT_APP_SANDBOX_API_URL + '/v2/boards/' + this.board_id,
                this
            )
            .then(result => {
                console.log(result);
                return result.data;

            })
            .catch(error => {
                console.error("error: ", error);
            })

    }



    CreateBoard() {


        return axios
            .post(process.env.REACT_APP_SANDBOX_API_URL + '/v2/boards',
                this
            )
            .then(result => {
                console.log(result);
                return result.data;

            })
            .catch(error => {
                console.error("error: ", error);
            })

    }


    GetBoard(boardID) {
        return new Promise(function (resolve, reject) {

        return axios
            .get(process.env.REACT_APP_SANDBOX_API_URL + '/v2/boards/' + boardID)
            .then(result => {
                console.log(result.data);

                resolve(result.data);

            })
            .catch(error => {
                console.error("error: ", error);
                reject({ error: true, message: error })
            })
        })

    }


    GetSprints(board_id) {
        console.log("requested sprints for board: " + board_id)

        return axios
            .get(process.env.REACT_APP_SANDBOX_API_URL + '/v2/boards/' + board_id + '/sprints')
            .then(result => {
                console.log(result.data);
                return result.data;

            })
            .catch(error => {
                console.error("error: ", error);
            })
            

    }


    GetBoards() {

        return new Promise(function (resolve, reject) {
            axios
                .get(process.env.REACT_APP_SANDBOX_API_URL + '/v2/boards')
                .then(result => {
                    console.log(result.data);
                    resolve(result.data)
                    // return result.data;

                })
                .catch(error => {
                    console.error("error: ", error);
                    reject(error)
                })
        })
    }

}