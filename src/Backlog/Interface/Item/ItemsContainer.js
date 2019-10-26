
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ItemList from './ItemList';

import NewItemModal from './NewItemModal';

import axios from "axios";

import SprintModel from '../../Models/SprintModel';
import BoardModel from '../../Models/BoardModel';
import ItemModel from '../../Models/ItemModel';

import moment from 'moment';

class ItemsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.props.board,
      sprint: this.props.sprint,
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


     

    

      var data = axios
        .get('http://localhost:3001/v1/sprints/'+ this.state.sprint.SprintID +'/items')
        .then(result => {

          console.log(result);
          this.setState({
            data: result.data,
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

        return data;
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
      <div style={{'marginTop':"30px"}}>


        <Card>
          <CardContent>

            <Typography variant="h5" component="h2">
            

              Sprint {this.state.sprint.SprintID}: {moment(this.state.sprint.SprintStartDate).format("DD-MM-YYYY")} to {moment(this.state.sprint.SprintEnd).format("DD-MM-YYYY")}
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