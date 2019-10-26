import axios from "axios";

const internal = {};

export default internal.SprintModel = class {
    constructor({
        SprintID,
        BoardID,
        SprintStartDate,
        SprintEndDate,
        SprintActive,
        SprintStoryPoints,
        SprintTargetPoints,
        CreatedBy,
        UpdatedDate,
        UpdatedBy
    }) {

        console.log('Initialise SprintModel');
        this.SprintID = SprintID;
        this.BoardID = BoardID;
        this.SprintStartDate = SprintStartDate;
        this.SprintEndDate = SprintEndDate;
        this.SprintActive = SprintActive;
        this.SprintStoryPoints = SprintStoryPoints;
        this.SprintTargetPoints = SprintTargetPoints;
        this.CreatedBy = CreatedBy;
        this.UpdatedDate = UpdatedDate;
        this.UpdatedBy = UpdatedBy;
    };




CreateSprint() {
    return new Promise(resolve => {

        return axios
            .post('http://localhost:3001/v1/sprints',
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


async GetItems(sprintID) {
    let data = await new Promise(resolve => {

        axios
            .get('http://localhost:3001/v1/sprints/' + sprintID + '/items')      
            .then(result => {

                console.log(result);
                resolve();
                return result;

            })

            .catch(error => {
                console.error("error: ", error);
            })
    })
    return data;
}


}