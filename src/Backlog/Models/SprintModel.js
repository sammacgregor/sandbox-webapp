import axios from "axios";

const internal = {};

export default internal.SprintModel = class {
    constructor({
        sprint_id,
        board_id,
        sprint_goal,
        sprint_start_date,
        sprint_end_date,
        sprint_active,
        sprint_story_points,
        sprint_target_points,
        created_by,
        created_date,
        updated_by,
        updated_date
      }) {


        this.sprint_id = sprint_id;
        this.board_id = board_id;
        this.sprint_goal = sprint_goal;
        this.sprint_start_date = sprint_start_date;
        this.sprint_end_date = sprint_end_date;
        this.sprint_active = sprint_active;
        this.sprint_story_points = sprint_story_points;
        this.sprint_target_points = sprint_target_points;
        this.created_by = created_by;
        this.created_date = created_date;
        this.updated_by = updated_by;
        this.updated_date = updated_date;
      };




    CreateSprint() {

        return axios
          .post(process.env.REACT_APP_SANDBOX_API_URL + '/v2/sprints',
            this
          )
          .then(result => {
            console.log(result.data);
            return result.data;
    
    
          })
          .catch(error => {
            console.error("error: ", error);
          })
    
      }



async GetItems() {

        return axios
            .get(process.env.REACT_APP_SANDBOX_API_URL + '/v2/sprints/' + this.sprint_id + '/items')      
            .then(result => {

                console.log(result.data);
                return result.data;

            })

            .catch(error => {
                console.error("error: ", error);
            })
}


}