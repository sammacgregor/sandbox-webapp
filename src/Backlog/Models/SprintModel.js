import axios from "axios";

const internal = {};

export default internal.SprintModel = class {
    constructor({
        sprint_id,
        board_id,
        sprint_start_date,
        sprint_end_date,
        sprint_active,
        sprint_story_points,
        sprint_target_points,
        created_by,
        updated_date,
        updated_by
    }) {

        console.log('Initialise SprintModel');
        this.sprint_id = sprint_id;
        this.board_id = board_id;
        this.sprint_start_date = sprint_start_date;
        this.sprint_end_date = sprint_end_date;
        this.sprint_active = sprint_active;
        this.sprint_story_points = sprint_story_points;
        this.sprint_target_points = sprint_target_points;
        this.created_by = created_by;
        this.updated_date = updated_date;
        this.updated_by = updated_by;
    };




CreateSprint() {
    return new Promise(resolve => {

        return axios
            .post(process.env.REACT_APP_SANDBOX_API_URL + '/v2/sprints',
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


async GetItems() {
    let data = await new Promise(resolve => {

        axios
            .get(process.env.REACT_APP_SANDBOX_API_URL + '/v2/sprints/' + this.sprint_id + '/items')      
            .then(result => {

                console.log(result.data);
                return result.data;

            })

            .catch(error => {
                console.error("error: ", error);
            })
    })
    return data;
}


}