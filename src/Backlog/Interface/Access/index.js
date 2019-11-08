import React from 'react';
import SignIn from "./SignIn";
import SignUp from "./SignUp";


class AccessPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            match: this.props.match,
            loading: true,
            error: false,
            existingUser: true
        };
    }

    renderPage = () => {
        if (this.state.existingUser) {
            return <SignIn setExistingUser={this.setExistingUser} />;
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
