import React from 'react';
import List from '@material-ui/core/List';

import SprintListItem from './SprintListItem';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",
      data: this.props.data
    };

  }


componentDidMount() {
  this.setState({loading: true})
}

  render() {
    if (this.props.data.length < 1) {
      return (<div><p>There are no items in this container</p></div>)
    } else return (

      <div>
        <List component="nav" aria-label="facts about item">



           {this.props.data.map(item =>

            <div key={item.item_id}>

              <SprintListItem key={item.item_id} data={item} />

            </div>
          )} 



        </List>

      </div >
    );
  }
}

export default ItemList;