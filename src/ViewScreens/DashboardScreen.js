import React, { Component } from 'react';
import ViewOrders from "../Views/Dashboard/viewOrders";
import EditOrder from "../Views/Dashboard/editOrder"
import NavigationSimple from "../Util/Components/Navigation";

import {authenticate} from "../RestServices/PullServices";

class DashboardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liveComponent: <ViewOrders/>,
        };
    }

    async initialize() {
            //this.props.history.push("/login")
        }

    componentDidMount() {
        //this.initialize().catch(()=>{ this.props.history.push("/error") })
    }

    errorScreen = () => {
        this.props.history.push('/error')
    };



    render() {
        return (
            <div>
                <NavigationSimple/>
                    {this.state.liveComponent}
            </div>
        );
    }
}

export default DashboardScreen;