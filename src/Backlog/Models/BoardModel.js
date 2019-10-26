import axios from "axios";

const internal = {};

export default internal.BoardModel = class {
    constructor({
        BoardID,
        BoardName,
        CreatedDate,
        CreatedBy,
        UpdatedDate,
        UpdatedBy
    }) {

        console.log('Initialise BoardModel');
        this.BoardID = BoardID;
        this.BoardName = BoardName;
        this.CreatedDate = CreatedDate;
        this.CreatedBy = CreatedBy;
        this.UpdatedDate = UpdatedDate;
        this.UpdatedBy = UpdatedBy;
    }




    CreateBoard() {
        return new Promise(resolve => {

            return axios
                .post('http://localhost:3001/v1/boards',
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
            .get('http://localhost:3001/v1/boards/' + boardID)
            .then(result => {
                console.log(result);
                return result.data;

            })
            .catch(error => {
                console.error("error: ", error);
                return {error: true, message: error}
            })

    }


    GetSprints() {

        return axios
            .get('http://localhost:3001/v1/boards/' + this.BoardID + '/sprints')
            .then(result => {
                console.log(result);
                return result.data;

            })
            .catch(error => {
                console.error("error: ", error);
            })

    }

}