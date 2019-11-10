import React from 'react';
import SignIn from "./SignIn";
import SignUp from "./SignUp";


class AccessPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            match: this.props.match,
            auth: this.props.auth,
            loading: true,
            error: false,
            existingUser: this.props.existingUser
        };
    }


    
   
    renderPage = () => {
        if (this.state.existingUser) {
            return <SignIn authenticate={this.authenticate} toggleAuth={this.props.toggleAuth} setExistingUser={this.setExistingUser} />;
        }
        else {
            return <SignUp setExistingUser={this.setExistingUser} />;
        }
    }

    setExistingUser = () => {
        this.setState({ existingUser: !this.state.existingUser })
    }


    render() {

        var page = this.renderPage();

        return (
            <div>
                {page}
            </div>

        );
    }
}

export default AccessPage;
