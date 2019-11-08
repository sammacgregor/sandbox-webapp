
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';


import SprintModel from '../../Models/SprintModel';
import SprintModal from './SprintModal';

class SprintEmpty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.props.board,
      loading: true,
      error: false,
      data: []
    };
  }



  loadData = () => {
  };

  componentDidMount() {
    this.loadData();
  }


  render() {


return (
      <div style={{ 'marginTop': "30px" }}>


        <Card>
          <CardContent style={{textAlign:"center"}}>
            <Typography  variant="h5" component="h2">
              Need another sprint?
            </Typography>
            <SprintModal board={this.props.board} addSprint={this.props.addSprint}/>
          </CardContent>
        </Card>
        <Divider />



      </div>
    );
  }
}

export default SprintEmpty;