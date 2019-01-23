import React, {Component} from 'react';
import ViewOrders from "../Views/Dashboard/viewOrders";
import EditOrder from "../Views/Dashboard/editOrder"
import NavigationSimple from "../Util/Components/Navigation";
import PageLoader from "../Util/Components/Pageloader";
import {updateOrderItem, createNewOrder, deleteOrderData} from "../RestServices/PushServices";
import {getAllOrders, getAllItems, getOrder} from "../RestServices/PullServices";
import {withRouter} from "react-router-dom";
import DimmerPage from "../Util/Components/DimmerPage";


class DashboardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liveComponent: null,
            lostConnection: false,
        };
    }


    componentDidMount() {
        this.initialize().catch(() => {
               // this.props.history.push("/error")
            }
        );
        this.retryInterval=null;
    }


    errorRedirect(errorStatus, command, ...args) {
        switch (errorStatus) {
            case 500:
                this.props.history.push('/login');
                break;
            case 401:
                this.props.history.push('/login');
                break;
            case 280:
                this.setState({lostConnection: true});
                this.retryInterval = setInterval(() => {
                    this.frontEndCommunicator(command, ...args)
                }, 5000)
                break;
            case 120:
                this.props.history.push('/error');
                break;
            default:
                this.errorScreen()

        }

    }

    async initialize() {
        let response = null;
        let content = null;
        await getAllOrders().then((result) => {
            response = result['status'];
            content = result['content']
        });
        switch (response) {
            case 200:
                if(this.retryInterval) {
                    clearInterval(this.retryInterval);}
                this.setState({
                    liveComponent: <ViewOrders componentData={content} frontEndCommunicator={this.frontEndCommunicator}/>,lostConnection:false});

                break;
            default:
                if (!this.state.lostConnection) {
                    this.errorRedirect(response, 'init')
                }
        }
    }

    async backView() {
        this.setState({
            liveComponent: <PageLoader/>
        });
        this.initialize().catch(this.errorScreen);
    }


    async editOrderView(orderId) {
        this.setState({
            liveComponent: <PageLoader/>
        });
        let orderResponse = null;
        let orderContent = null;
        await getOrder(orderId).then((result) => {
            orderResponse = result['status'];
            orderContent = result['content']
        });

        switch (orderResponse) {
            case 200:
                let itemResponse = null;
                let itemContent = null;
                await getAllItems().then((result) => {
                    itemResponse = result['status'];
                    itemContent = result['content']
                });
                switch (itemResponse) {
                    case 200:
                        if(this.retryInterval) {
                            clearInterval(this.retryInterval);
                        }
                        this.setState({
                            liveComponent: <EditOrder ref={(editComponent) => {
                                this._updateComponent = editComponent
                            }} componentData={orderContent} secondaryComponentData={itemContent}
                                                      frontEndCommunicator={this.frontEndCommunicator}/>,
                            lostConnection:false});
                        break;
                    default:
                        if (!this.state.lostConnection) {
                            this.errorRedirect(itemResponse, "editOrder", orderId)
                        }
                }
                break;
            default:
                if (!this.state.lostConnection) {
                this.errorRedirect(orderResponse, "editOrder", orderId)
            }
        }

    }


    async editOrder(updateType, orderUpdate) {
        let response = null;
        let content = null;
        await updateOrderItem(orderUpdate).then((result) => {
            response = result['status'];
            content = result['content']
        });
        switch (response) {
            case 200:
                if(this.retryInterval) {
                    clearInterval(this.retryInterval);
                }
                this.setState({lostConnection:false});
                this._updateComponent.update({'action': updateType, 'actionState': 'success', "orderItems": content})
                break;
            default:
                if (!this.state.lostConnection) {
                    this.errorRedirect(response, "updateOrder", updateType, orderUpdate)
                }
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
                if(this.retryInterval) {
                    clearInterval(this.retryInterval);
                }
                this.editOrderView(orderContent).catch(this.errorScreen);
                break;
            default:
                if (!this.state.lostConnection) {
                    this.errorRedirect(orderResponse, "createOrder")
                }
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
                if(this.retryInterval) {
                    clearInterval(this.retryInterval);
                }
                this.initialize().catch(this.errorScreen);
                break;
            default:
                if (!this.state.lostConnection) {
                    this.errorRedirect(response)
                }
        }
    }


    errorScreen = () => {
        this.props.history.push('/error')
    };


    frontEndCommunicator = (command, ...args) => {
        switch (command) {
            case 'editOrder':
                this.editOrderView(args[0]).catch(this.errorScreen);
                break;
            case 'createOrder':
                this.newOrder().catch(this.errorScreen);
                break;
            case 'updateOrder':
                this.editOrder(args[0], args[1]).catch(this.errorScreen);
                break;
            case 'deleteOrder':
                this.deleteOrder(args[0]).catch(this.errorScreen);
                break;
            case 'back':
                this.backView().catch(this.errorScreen);
                break;
            case 'init':
                this.initialize();
                break;
            default:
                this.errorScreen()
        }
    };


    render() {
        return (
            <div>
                <DimmerPage visibility={this.state.lostConnection}/>
                <NavigationSimple/>
                <br/>
                {this.state.liveComponent}
            </div>
        );
    }
}

export default withRouter(DashboardScreen);