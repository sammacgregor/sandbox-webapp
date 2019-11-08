
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';

import SprintListItem from './SprintListItem';

import NewItemModal from './NewItemModal';
import moment from 'moment';
import SprintModel from '../Models/SprintModel';
import ItemModel from '../Models/ItemModel';

class SprintContainer extends React.Component {
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


  addItem = (item) => {

    item.CreateItem().then(result => {
      if(result.error === false) { 
        this.updateItems(result.data)      
      }
    })
    return item;
    

  };

  updateItems = (item) => {
    this.setState({ data: this.state.data.concat(item) });
    console.log("adding item: " + item.item_id);
  }

  deleteItem = (item) => {

    var tempItem = new ItemModel(item);
    console.log("deleting item: " + item.item_id)
    var currentItems = this.state.data;
    var index = currentItems.findIndex(x => x.item_id === item.item_id)
    tempItem.DeleteItem()
    if (index !== -1) {
      currentItems.splice(index, 1);
      this.setState({ data: currentItems });
    }
  }

  loadData = () => {
    this.setState({ loading: true });

    var data = this.state.sprint.GetItems()
      .then(result => {

        if (result.error === true) {
          this.setState({ error: true, loading: false })

        } else {
          this.setState({ data: result.data, error: false, loading: false })

        }
      })



    return data;
  };
  componentDidMount() {
    this.loadData();
  }


  getSprintItems = () => {
    if (this.state.data.length < 1) {
      return (<div><p>There are no items in this container</p></div>)
    } else return (

      <div>
        <List component="nav" aria-label="facts about item">
          {this.state.data.map(item =>
            <div key={item.item_id}>
              <SprintListItem cloneItem={this.addItem} deleteItem={this.deleteItem} key={item.item_id} data={item} />
            </div>
          )}
        </List>
      </div >
    );
  }


  render() {
    const { loading, error } = this.state;

    var SprintListItems = this.getSprintItems();

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
              {this.state.sprint.sprint_goal}
          </Typography>

            <NewItemModal addItem={this.addItem} sprint={this.state.sprint} />

            {SprintListItems}




          </CardContent>
          <CardActions>
            <Button size="small">View in search</Button>
          </CardActions>
        </Card>
        <Divider />



      </div>
    );
  }
}

export default SprintContainer;