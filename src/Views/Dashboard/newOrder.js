import React, {Component} from 'react';
import { Dropdown,Input,
    Grid, Header, Image, Table, Button, Pagination,Segment,Container,Divider,Icon
} from 'semantic-ui-react'

class newOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewVisibility:props['visibility']
        }
    }


    render() {
        return (

            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Container textAlign='right'>
                            <Button positive icon='reply' labelPosition='right' content='back' />
                        </Container>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Container textAlign='center'>
                            <Header>Order Details </Header>
                        </Container>
                    </Grid.Column>

                </Grid.Row>
                <Grid.Row >
                    <Grid.Column width={2}>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Segment padded={'very'}>

                            <Grid columns='two'>
                                <Grid.Row>
                                    <Grid.Column>
                                        <h4>Order Id - 3479384734739798</h4>
                                    </Grid.Column>
                                    <Grid.Column textAlign={'right'}>
                                        <h4>Order Status - Incomplete</h4>
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column>
                                        <h4> Order Created date - 3933/2323/323</h4>
                                    </Grid.Column>
                                    <Grid.Column textAlign={'right'}>
                                        <h4> Order Completed date - N/A</h4>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                            <br/>
                            <Divider horizontal>
                                <Header as='h4'>
                                    <Icon name='add to cart' />
                                    Add New Item
                                </Header>
                            </Divider>

                            <Grid>
                                <Grid.Row >
                                    <Grid.Column width={6}>
                                        <Dropdown
                                            fluid
                                            selection
                                            search={true}
                                            placeholder='Search Items'
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={3} verticalAlign={'middle'}>
                                        Per Item Price : N/A
                                    </Grid.Column>
                                    <Grid.Column width={4} verticalAlign={'middle'}>
                                        <Input  placeholder='Quantity' />
                                    </Grid.Column>
                                    <Grid.Column width={3} verticalAlign={'middle'}>
                                        <Button positive icon='add' labelPosition='left' content='Add Item' />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                            <Divider horizontal>
                                <Header as='h4'>
                                    <Icon name='tag' />
                                    Item Details
                                </Header>
                            </Divider>
                            <Table basic='very' celled  >
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell/>
                                        <Table.HeaderCell>Item</Table.HeaderCell>
                                        <Table.HeaderCell>Per Item Price</Table.HeaderCell>
                                        <Table.HeaderCell>Quantity</Table.HeaderCell>
                                        <Table.HeaderCell>Amount</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                </Table.Body>
                            </Table>
                            <Divider />
                            <Grid columns='two'>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Button negative icon='trash' labelPosition='right' content='Delete Order' />
                                    </Grid.Column>
                                    <Grid.Column textAlign={'right'}>
                                        <Button positive icon='check circle' labelPosition='right' content='Check Out' />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={2}>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        );
    }
}

export default newOrder;