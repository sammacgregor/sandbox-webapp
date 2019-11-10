
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Grid from '@material-ui/core/Grid';

import UsersView from './UsersView';

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            selectedView: 1
        };
    }



    setView = (event, view) => {
        this.setState({selectedView:view})

    }

    loadData = () => {


        this.setState({ loading: true });


    };
    componentDidMount() {
        this.loadData();
        this.setState({ loading: false });

    }

    getView = () => {
        var data = null;

        switch (this.state.selectedView) {
            case 1:
                data = <UsersView />;
                break;
            case 2:
                data = <GroupsView />;
                break;
            default: data = <div></div>
                break;
        }

        return data

    }


    render() {
        const { loading, error } = this.state;

        var CurrentView = this.getView(this.state.selectedView)

        if (loading) {
            return <p>Loading ...</p>;
        }
        else if (error) {
            return (
                <p>
                    There was an error loading the boards....
          <button onClick={this.loadData}>Please try again</button>
                </p>
            );
        }
        else return (
            <div style={{ 'marginTop': "30px" }}>
                <Typography style={{marginBottom:"20px"}} variant="h4">Admin Dashboard</Typography>

                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">Options</Typography>
                                <AdminOptions setView={this.setView} />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        {CurrentView}


                    </Grid>
                </Grid>


            </div>
        );
    }
}



function AdminOptions(props) {
    return (
        <div>

            <List component="nav" aria-label="facts about item">
                <Divider />
                <ListItem name="selectedView" value="1"  button onClick={(event) => props.setView(event, 1)}>
                    <ListItemText>Users</ListItemText>
                </ListItem>
                <Divider />
                <ListItem name="selectedView" value="2" button onClick={(event) => props.setView(event, 2)}>
                    <ListItemText>Groups</ListItemText>
                </ListItem>

                <Divider />

            </List>


        </div>
    )
}



function GroupsView(props) {
    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2">Groups</Typography>

                </CardContent>
            </Card>
        </div>
    )
}

export default AdminDashboard;