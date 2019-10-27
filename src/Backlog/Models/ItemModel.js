import axios from "axios";

const internal = {};

export default internal.ItemModel = class{
  constructor({
    item_id,
    item_type_id,
    item_priority_id,
    item_status_id,
    sprint_id,
    assignee_id,
    reporter_id,
    summary,
    description,
    team_id,
    created_by,
    created_date,
    updated_by,
    updated_date
  }) {


    this.item_id = item_id;
    this.item_type_id = item_type_id;
    this.item_priority_id = item_priority_id;
    this.item_status_id = item_status_id;
    this.sprint_id = sprint_id;
    this.assignee_id = assignee_id;
    this.reporter_id = reporter_id;
    this.summary = summary;
    this.description = description;
    this.team_id = team_id;
    this.created_by = created_by;
    this.created_date = created_date;
    this.updated_by = updated_by;
    this.updated_date = updated_date;
  }



 CreateItem() {
    return new Promise(resolve => {

    return axios
      .post(process.env.REACT_APP_SANDBOX_API_URL + '/v2/items',
        this
      )
      .then(result => {
        console.log(result);
        resolve();

        // this.setState({
        //   data: result.data,
        //   loading: false,
        //   error: false
        // });
      })
      .catch(error => {
        console.error("error: ", error);
        // // this.setState({
        // //   // objects cannot be used as a react child
        // //   // -> <p>{error}</p> would throw otherwise
        // //   error: {error},
        // //   loading: false
        // });
      })
    })

  }

}




