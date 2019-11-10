
import React from 'react';

import Typography from '@material-ui/core/Typography';
import LoadingBar from '../Common/LoadingBar';
import { Redirect } from "react-router-dom";

var session = require('express-session')


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            auth: this.props.auth,
            error: false,
            start: 0,
            time: 0,
            isOn: false
        };
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)


    }
    stopTimer() {
        this.setState({ isOn: false })
        clearInterval(this.timer)
    }

    startTimer() {
        this.setState({
            time: this.state.time,
            start: Date.now() - this.state.time,
            isOn: true
        })
        this.timer = setInterval(() => this.setState({
            time: Date.now() - this.state.start
        }), 1);
    }

    loadData = () => {
        this.startTimer()
        console.log("Logging in...")


    };

    componentDidMount() {
        this.loadData();
        console.log("loaded login")
    }

    componentWillUnmount() {
        this.stopTimer()
        this.props.toggleAuth();

    }



    render() {

        return (
            <div style={{ 'marginTop': "100px" }}>
                <Typography variant="h5" style={{ textAlign: "center", marginBottom: '20px' }}>Logging in...</Typography>

                <LoadingBar />

                {this.state.time > 1000 &&
                    <Redirect to="/" />
                }

            </div>
        )



    }
}

export default Login;