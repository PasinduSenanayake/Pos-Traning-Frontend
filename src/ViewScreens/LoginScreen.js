import React, {Component} from 'react';
import Login from "../Views/Login/Login";
import PageLoader from "../Util/Components/Pageloader"
import {authenticate} from "../RestServices/PullServices";

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liveComponent: <PageLoader/>,
        };
    }

    async initialize() {
            // No need await here, will be useful later
        await this.setState({liveComponent: <Login loginData={true} frontEndCommunicator={this.frontEndCommunicator}/>})
    }

    componentDidMount() {
        this.initialize().catch(() => {
                this.props.history.push("/error")
            }
        );
    }

    errorScreen = () => {
        this.props.history.push('/error')
    };

    async login(userName, password) {

        this.setState({liveComponent: <PageLoader/>});
        if (await authenticate(userName, password)['status'] === 200) {
            this.props.history.push('/dashboard')
        } else {
            this.setState({liveComponent: <Login loginData={false} frontEndCommunicator={this.frontEndCommunicator}/>})
        }
    }


    frontEndCommunicator = (command, ...args) => {
        switch (command) {
            case 'login':
                this.login(args[0], args[1]);
                break;
            default:
                this.errorScreen();
        }
    };

    render() {
        return (
            <div>
                {this.state.liveComponent}
            </div>
        );
    }
}

export default LoginScreen;