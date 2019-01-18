import React, { Component } from 'react';
import Order from "../Views/Dashboard/Order";

class DashboardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liveComponent: <Order/>,
        };
    }

    async initialize() {
            this.props.history.push("/login")
        }

    componentDidMount() {
        this.initialize().catch(()=>{ this.props.history.push("/error") })
    }

    render() {
        return (
            <div>
                    {this.state.liveComponent}
            </div>
        );
    }
}

export default DashboardScreen;