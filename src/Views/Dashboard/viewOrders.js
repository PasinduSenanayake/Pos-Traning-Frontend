import React, {Component} from 'react';
import {
    Grid, Header, Image, Table, Button, Pagination,Modal,Container,Divider,Icon
} from 'semantic-ui-react'

class ViewOrders extends Component {

    constructor(props) {
        super(props)
        this.state = {}
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

                <Modal open={false} size={'small'}>
                    <Modal.Header >
                        <Container textAlign='center'>Order Details</Container>
                    </Modal.Header>
                    <Modal.Content >
                        <Container>
                        <Header as='h4' floated='left'>
                            Order Id - 3479384734739798
                        </Header>
                        <Header as='h4' floated='right'>
                            Order Status - Incomplete
                        </Header>
                        </Container>

                    </Modal.Content>
                    <Modal.Content >
                        <Container>
                            <Header as='h4' floated='left'>
                                Order Created date - 3933/2323/323
                            </Header>
                            <Header as='h4' floated='right'>
                                Order Completed date - 3933/2323/323
                            </Header>
                        </Container>
                    </Modal.Content>
                    <br/>
                    <Divider horizontal>
                        <Header as='h4'>
                            <Icon name='tag' />
                           Item Details
                        </Header>
                    </Divider>


                    <Modal.Content >
                            <Table basic='very' celled >
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Item</Table.HeaderCell>
                                        <Table.HeaderCell>Quantity</Table.HeaderCell>
                                        <Table.HeaderCell>Amount</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                                <Image src='/images/avatar/small/lena.png' rounded size='mini' />
                                                <Header.Content>
                                                    Lena
                                                    <Header.Subheader>Human Resources</Header.Subheader>
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>22</Table.Cell>
                                        <Table.Cell>Rs. 500.00</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                                <Image src='/images/avatar/small/matthew.png' rounded size='mini' />
                                                <Header.Content>
                                                    Matthew
                                                    <Header.Subheader>Fabric Design</Header.Subheader>
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>15</Table.Cell>
                                        <Table.Cell>Rs. 500.00</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                                <Image src='/images/avatar/small/lindsay.png' rounded size='mini' />
                                                <Header.Content>
                                                    Lindsay
                                                    <Header.Subheader>Entertainment</Header.Subheader>
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>12</Table.Cell>
                                        <Table.Cell>Rs. 500.00</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                                <Image src='/images/avatar/small/mark.png' rounded size='mini' />
                                                <Header.Content>
                                                    Mark
                                                    <Header.Subheader>Executive</Header.Subheader>
                                                </Header.Content>
                                            </Header>
                                        </Table.Cell>
                                        <Table.Cell>11</Table.Cell>
                                        <Table.Cell>Rs. 500.00</Table.Cell>
                                    </Table.Row>
                                    <Table.Row >
                                        <Table.Cell/>
                                        <Table.Cell>
                                            <Header as='h4' image>
                                                Total Amount
                                            </Header>
                                        </Table.Cell>

                                        <Table.Cell>
                                            <Header as='h4' image>
                                               Rs. 10000.00
                                            </Header>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                    </Modal.Content>
                    <Modal.Actions >
                        <Button negative icon='delete' labelPosition='right' content='Delete' />
                        <Button positive icon='edit' labelPosition='right' content='Edit' />
                    </Modal.Actions>
                </Modal>
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
                                            <Button icon='edit' /> &nbsp; &nbsp;
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