import axios from "axios";

const internal = {};

export default internal.ItemModel = class{
  constructor({
    ItemID,
    ItemTypeID,
    ItemPriorityID,
    ItemStatusID,
    SprintID,
    AssigneeID,
    ReporterID,
    Summary,
    Description,
    TeamID,
    CreatedBy,
    CreatedDate,
    UpdatedBy,
    UpdatedDate
  }) {

    console.log('Initialise ItemModel');
    this.ItemID = ItemID;
    this.ItemTypeID = ItemTypeID;
    this.ItemPriorityID = ItemPriorityID;
    this.ItemStatusID = ItemStatusID;
    this.SprintID = SprintID;
    this.AssigneeID = AssigneeID;
    this.ReporterID = ReporterID;
    this.Summary = Summary;
    this.Description = Description;
    this.TeamID = TeamID;
    this.CreatedBy = CreatedBy;
    this.CreatedDate = CreatedDate;
    this.UpdatedBy = UpdatedBy;
    this.UpdatedDate = UpdatedDate;
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




