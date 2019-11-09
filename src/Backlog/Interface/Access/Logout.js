
import React from 'react';

import Typography from '@material-ui/core/Typography';
import LoadingBar from '../Common/LoadingBar';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    Redirect
} from "react-router-dom";
class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            auth: this.props.auth,
            error: false
        };
    }


    loadData = () => {
        console.log("Logging out...")
        this.props.toggleAuth();
        this.setState({ loading: false })
    };

    componentDidMount() {
        this.loadData();
    }





    render() {
        const { loading, error, match } = this.state;

        if (loading) {
            return (
                <div style={{ 'marginTop': "100px" }}>
                    <Typography variant="h5" style={{ textAlign: "center", marginBottom: '20px' }}>Logging out...</Typography>

                    <LoadingBar />

                </div>
            )

        } else {
            <Route exact path="/">
                <Redirect to="/" />
            </Route>
        }



    }
}

export default Logout;