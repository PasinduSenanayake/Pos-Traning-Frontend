import React, {Component} from 'react';
import { Grid, Header, Table, Button, Container } from 'semantic-ui-react'

class ViewOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ordersMeta:props['componentData'],
            backCom: props['frontEndCommunicator']
        }

    }
    render() {

        const emptyTableRow = () => {
            return (
                <Table.Row>
                    <Table.Cell></Table.Cell>
                    <Table.Cell colSpan={6} textAlign={'center'}>No Open Orders</Table.Cell>
                </Table.Row>
            )
        };
        const getTableRows = (orderItem) => {
            return (
                <Table.Row key={orderItem['uId']}>
                    <Table.Cell collapsing textAlign='center'>
                        <Button basic size='small' icon='edit' onClick={() => {this.state.backCom("editOrder",orderItem['uId'])}}/> &nbsp; &nbsp;
                    </Table.Cell>
                    <Table.Cell >
                        <Header as='h4' textAlign='center'>
                            {orderItem['uId']}
                        </Header>
                    </Table.Cell>
                    <Table.Cell textAlign='center'>  {orderItem['state']}</Table.Cell>
                    <Table.Cell textAlign='center'>
                        {orderItem['createDate']}
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        {orderItem['completedDate']}
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        <b>Rs. {parseFloat(orderItem['totalAmount']).toFixed(2)}</b>
                    </Table.Cell>
                </Table.Row>
            );
        };
        return (

                <Grid centered={true} columns={3}>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <Container textAlign='center'>
                                <Header>Sweets Orders </Header>
                            </Container>
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

                                    {(this.state.ordersMeta.length === 0) ? emptyTableRow() : Object.values(this.state.ordersMeta).map(getTableRows)}

                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered={true} columns={1}>
                        <Button onClick={() => {
                            this.state.backCom("createOrder")
                        }} content='Add New Order' style={{'backgroundColor': '#ff9300', 'color': '#ffffff'}}/>
                    </Grid.Row>
                </Grid>


        );
    }
}

export default ViewOrders;