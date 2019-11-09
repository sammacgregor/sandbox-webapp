
import React from 'react';

import Typography from '@material-ui/core/Typography';
import LoadingBar from '../Common/LoadingBar';


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

            return (
                <div style={{ 'marginTop': "100px" }}>
                    <Typography variant="h5" style={{ textAlign: "center", marginBottom: '20px' }}>Logging out...</Typography>

                    <LoadingBar />

                </div>
            )



    }
}

export default Logout;