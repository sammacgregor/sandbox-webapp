
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ItemList from './ItemList';

import NewItemModal from './NewItemModal';

import axios from "axios";

import sprint from '../../Models/SprintModel';

import moment from 'moment';
import SprintModel from '../../Models/SprintModel';

class ItemsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.props.board,
      sprint: new SprintModel(this.props.sprint),
      loading: true,
      error: false,
      data: []
    };
  }

  updateTest = () => {
    this.setState({ error: "true" });
  }


  loadData = () => {
    this.setState({ loading: true });

    // this.state.sprint.GetItems()
    //   .then(result => {

    //     if (result.error === true) {
    //       this.setState({ error: true, loading: false })
    //       console.log("got here!")

    //     } else {
    //       this.setState({ data: result.data, error: true, loading: false })
    //       console.log("got here!")

    //     }
    //   })


    var data = axios
      .get(process.env.REACT_APP_SANDBOX_API_URL + '/v2/sprints/'+ this.state.sprint.sprint_id +'/items')
      .then(result => {

        console.log(result);
        this.setState({
          data: result.data.data,
          loading: false,
          error: false
        });
      })
      .catch(error => {
        console.error("error: ", error);
        this.setState({
          // objects cannot be used as a react child
          // -> <p>{error}</p> would throw otherwise
          error: { error },
          loading: false
        });
      });

    return sprint;
  };
  componentDidMount() {
    this.loadData();
  }





  render() {
    const { loading, error, data } = this.state;

    if (loading) {
      return <p>Loading ...</p>;
    }
    else if (error) {
      return (
        <p>
          There was an error loading this sprints items....
          <button onClick={this.loadData}>Please try again</button>
        </p>
      );
    }
    else return (
      <div style={{ 'marginTop': "30px" }}>


        <Card>
          <CardContent>

            <Typography variant="h5" component="h2">


              Sprint {this.state.sprint.sprint_id}: {moment(this.state.sprint.sprint_start_date).format("DD-MM-YYYY")} to {moment(this.state.sprint.SprintEnd).format("DD-MM-YYYY")}
            </Typography>
            <Typography color="textSecondary">
              Items unassigned to a sprint will appear below
          </Typography>

            <NewItemModal loadData={this.loadData} sprint={this.state.sprint} />

            <ItemList data={data} />
          </CardContent>
          <CardActions>
            <Button size="small">View in search</Button>
          </CardActions>
        </Card>



      </div>
    );
  }
}

export default ItemsContainer;