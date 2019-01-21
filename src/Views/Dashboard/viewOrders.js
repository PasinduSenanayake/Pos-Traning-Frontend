import React, {Component} from 'react';
import {
    Grid, Header, Image, Table, Button, Pagination,Modal,Container,Divider,Icon
} from 'semantic-ui-react'
import EditOrder from "./editOrder";

class ViewOrders extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editView:false,
            editViewData:{},
            backendCom:{}
        }
    }


    getTripTableRows = (rowObj) => {
        return (
            <Table.Row key={rowObj['driverId']}>
                <Table.Cell textAlign='center'>
                    <Grid centered={true} columns={2}>
                        <Grid.Row verticalAlign="middle">
                            <Grid.Column>
                                <Image src={rowObj['image']} circular size={"tiny"} centered/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Table.Cell>
                <Table.Cell selectable>
                    <Header as='h4' textAlign='center'>
                    </Header>
                </Table.Cell>
                <Table.Cell textAlign='center'> {rowObj['licenseNo']}</Table.Cell>
                <Table.Cell textAlign='center'>
                    {rowObj['contactNumber']}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                    <b>{rowObj['email']}</b>
                </Table.Cell>
            </Table.Row>
        );
    };
    searchTableUpdate = (updatedState) => {
        this.setState({drivers: this.setDriverTableRows(updatedState, 4, 1), fetchedDataSet: updatedState})
    };

    render() {
        return (


            <div>
                <EditOrder visibility ={this.state.editView} componentData={this.state.editViewData} communicator={this.state.backendCom}/>
                <Grid centered={true} columns={3}>
                    <Grid.Row centered columns={1}>
                        <Grid.Column width={2} verticalAlign={'middle'} textAlign={'right'}>
                            <p> Order Id </p>
                        </Grid.Column>
                        <Grid.Column width={10} verticalAlign={'middle'}>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered={true} columns={1}>
                        <Grid.Column width={12} verticalAlign={'middle'}>
                            <Table compact definition singleLine celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell />
                                        <Table.HeaderCell textAlign='center'>Order Id</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center'>Status</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center'>Created Date</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center'>Completed Date</Table.HeaderCell>
                                        <Table.HeaderCell textAlign='center'>Total Amount</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {/*{Object.values(this.state.drivers).map(this.getTripTableRows)}*/}
                                    <Table.Row key={"testOrder"}>
                                        <Table.Cell collapsing textAlign='center'>
                                            <Button icon='edit' onClick={()=>{this.setState({editView:true})}} /> &nbsp; &nbsp;
                                        </Table.Cell>
                                        <Table.Cell  selectable>
                                            <Header as='h4' textAlign='center'>
                                                TestId232323232
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell textAlign='center'> Test</Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            test
                                        </Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            test
                                        </Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            <b>test</b>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered={true} columns={1}>
                        <Button onClick={() => {
                            this.state.communicator("addNewDriverRedirect")
                        }} content='Add New Order' style={{'backgroundColor': '#ff9300', 'color': '#ffffff'}}/>
                    </Grid.Row>
                </Grid>
            </div>

        );
    }
}

export default ViewOrders;