import React, {Component} from 'react';
import ViewOrders from "../Views/Dashboard/viewOrders";
import NewOrder from "../Views/Dashboard/newOrder"
import EditOrder from "../Views/Dashboard/editOrder"
import NavigationSimple from "../Util/Components/Navigation";
import PageLoader from "../Util/Components/Pageloader";
import {updateOrderItem, createNewOrder, deleteOrderData,deleteOrderItem} from "../RestServices/PushServices";
import {getAllOrders, getAllItems,getOrder} from "../RestServices/PullServices";
import {withRouter} from "react-router-dom";


class DashboardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liveComponent: <PageLoader/>,
        };
    }


    componentDidMount() {
        this.initialize().catch(() => {
                this.props.history.push("/error")
            }
        );
    }

    async initialize() {
        let orderResponse = null;
        let orderContent = null;
        await getOrder("A6002862447292428459AA5320207605687665475").then((result) => {
            orderResponse = result['status'];
            orderContent = result['content']
        });
        let itemResponse = null;
        let itemContent = null;
        await getAllItems().then((result) => {
            itemResponse = result['status'];
            itemContent = result['content']
        });
        switch (itemResponse) {
            case 200:
                this.setState({
                    liveComponent: <EditOrder ref={(editComponent) => { this._updateComponent = editComponent }} componentData={orderContent} secondaryComponentData={itemContent}
                                              frontEndCommunicator={this.frontEndCommunicator} />
                });
                break;
            case 401:
                this.props.history.push('/login');
                break;
            case 280:
                this.props.history.push('/login');
                break;
            default:
                this.errorScreen()
        }
        // this.setState({
        //     liveComponent: <EditOrder componentData={[ {
        //         "key": "Juston Bruen",
        //         "text": "Juston Bruen",
        //         "value": "juston_bruen"
        //     }]} secondaryComponentData={ [ {
        //         "key": "Juston Bruen",
        //         "text": "Juston Bruen",
        //         "value": "juston_bruen"
        //     },
        //         {
        //             "key": "Pattie Simonis",
        //             "text": "Pattie Simonis",
        //             "value": "pattie_simonis"
        //         },
        //         {
        //             "key": "June Schoen",
        //             "text": "June Schoen",
        //             "value": "june_schoen"
        //         }]} frontEndCommunicator={this.frontEndCommunicator}/>
        // });
        // await getAllOrders().then((result) => {
        //     response = result['status'];
        //     content = result['content']
        // });
        // switch (response) {
        //     case 200:
        //         console.log(content)
        //         this.setState({
        //             liveComponent: <ViewOrders compoentData={content} frontEndCommunicator={this.frontEndCommunicator}/>
        //         });
        //         break;
        //     case 401:
        //         this.props.history.push('/login');
        //         break;
        //     case 280:
        //         this.props.history.push('/error');
        //         break;
        //     default:
        //         this.errorScreen()
        // }
    }


    async editOrder(updateType,orderUpdate) {
        let response = null;
        let content = null;
        await updateOrderItem(orderUpdate).then((result) => {
            response = result['status'];
            content = result['content']
        });
        switch (response) {
            case 200:
                this._updateComponent.update({'action':updateType ,'actionState':'success' ,"orderItems":content})
                break;
            case 401:
                this.props.history.push('/login');
                break;
            case 280:
                this.props.history.push('/login');
                break;
            default:
                this.errorScreen()
        }


    }

    async newOrder() {

        let orderResponse = null;
        let orderContent = null;
        this.setState({liveComponent: <PageLoader/>});
        await createNewOrder().then((result) => {
            orderResponse = result['status'];
            orderContent = result['content']
        });
        switch (orderResponse) {
            case 200:
                this.initialize().catch(this.errorScreen);
                break;
            case 401:
                this.props.history.push('/login');
                break;
            case 280:
                this.props.history.push('/login');
                break;
            default:
                this.errorScreen()
        }
        let itemResponse = null;
        let itemContent = null;
        await getAllItems().then((result) => {
            itemResponse = result['status'];
            itemContent = result['content']
        });
        switch (itemResponse) {
            case 200:
                this.setState({
                    liveComponent: <NewOrder componentData={orderContent} secondryComponentData={itemContent} frontEndCommunicator={this.frontEndCommunicator}/>
                });
                break;
            case 401:
                this.props.history.push('/login');
                break;
            case 280:
                this.props.history.push('/login');
                break;
            default:
                this.errorScreen()
        }


    }

    async updateOrder(orderData) {
        this.setState({liveComponent: <PageLoader/>});
        let response = null;
        await updateOrderItem(orderData).then((result) => {
            response = result['status']
        });
        switch (response) {
            case 200:
                this.initialize().catch(this.errorScreen);
                break;
            case 401:
                this.props.history.push('/login');
                break;
            case 280:
                this.props.history.push('/login');
                break;
            default:
                this.errorScreen()
        }
    }



    async deleteOrder(orderData) {
        this.setState({liveComponent: <PageLoader/>});
        let response = null;
        await deleteOrderData(orderData).then((result) => {
            response = result['status']
        });
        switch (response) {
            case 200:
                this.initialize().catch(this.errorScreen);
                break;
            case 401:
                this.props.history.push('/login');
                break;
            case 280:
                this.props.history.push('/login');
                break;
            default:
                this.errorScreen()
        }
    }


    errorScreen = () => {
        this.props.history.push('/error')
    };


    frontEndCommunicator = (command, ...args) => {
        switch (command) {
            case 'editOrder':
                this.editOrder(args[0]).catch(this.errorScreen);
                break;
            case 'createOrder':
                this.newOrder().catch(this.errorScreen);
                break;
            case 'updateOrder':
                this.editOrder(args[0],args[1]).catch(this.errorScreen);
                break;
            case 'deleteOrder':
                this.deleteOrder(args[0]).catch(this.errorScreen);
                break;
            default:
                this.errorScreen()
        }
    };


    render() {
        return (
            <div>

                <NavigationSimple/>
                <br/>
                {this.state.liveComponent}
            </div>
        );
    }
}

export default withRouter(DashboardScreen);