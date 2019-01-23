import React, {Component, createRef} from 'react';
import {Dropdown, Input,  Grid, Header, Image, Table, Button, Ref, Segment, Container, Divider, Icon, Label, Transition
} from 'semantic-ui-react'
import {totalAmountCalculater, unitAmountCalculater} from "../../Util/Support/PriceCalcutator";

class editOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderMeta: props['componentData'],
            backCom: props['frontEndCommunicator'],
            orderItems: props['componentData']['orderItems'],
            allItems: props['secondaryComponentData'],
            showItems: props['secondaryComponentData'].filter((element) => {
                if (!props['componentData']['orderItems'].some(e => e.key === element['key'])) {
                    return element
                }
            }),
            loadingState: "",
            editingState: "",
            errorState: ""
        }
    }

    createdRef = createRef();

    update(nextProps) {
        if (nextProps['action'] === "addItem" && nextProps['actionState'] === "success") {
            this.createdRef.current.textContent = "Per Item Price : N/A";
            this.refs.dataDropdown.clearValue();
            this.refs.addQuantity.inputRef.value = '';
            this.updateItem(nextProps['orderItems'])

        } else if (nextProps['action'] === "deleteItem" && nextProps['actionState'] === "success") {
            this.updateItem(nextProps['orderItems'])

        } else if (nextProps['action'] === "updateItem" && nextProps['actionState'] === "success") {
            this.setState({loadingState: "", editingState: "", orderItems: nextProps['orderItems']})
        }
    };

    updateItem(nextOrderItems){
        this.setState({
            loadingState: "",
            editingState: "",
            orderItems: nextOrderItems,
            showItems: this.state.allItems.filter((element) => {
                if (!nextOrderItems.some(e => e.key === element['key'])) {
                    return element
                }
            })
        })

    }


    render() {

        const setDefaultValue = ()=>{
            let editState = this.state.editingState;

            if (editState !== "") {
                let prvState = editState.split("__");
                this.refs[prvState[0]].inputRef.value = prvState[1]
            }
        };

        const validate = (elementData,errorState)=>{
            if (!isNaN(elementData)) {
                this.setState({errorState: ""});

            } else {
                this.setState({errorState: errorState})

            }

        };

        const addItem = ()=>{
            if (this.refs.dataDropdown.state.value !== "") {
                if (!isNaN(this.refs.addQuantity.inputRef.value)) {
                    this.setState({loadingState: "addItem"});
                    this.state.backCom('updateOrder', "addItem",
                        {
                            updateType: "add",
                            orderId: this.state.orderMeta['uId'],
                            itemId: this.refs.dataDropdown.state.value.split("__")[0],
                            quantity: this.refs.addQuantity.inputRef.value
                        })
                } else {
                    this.setState({errorState: "addQuantity"})
                }
            } else {
                this.setState({errorState: "addItem"})
            }
        };

        const deleteItem = (orderCode)=>{
            setDefaultValue();
            this.setState({loadingState: orderCode + "delete"});
            this.state.backCom('updateOrder', "deleteItem",
                {
                    updateType: "delete",
                    orderId: this.state.orderMeta['uId'],
                    itemId: orderCode,

                })

        };

        const updateItem = (orderCode,orderQuantity)=>{

            if (!isNaN(this.refs[orderCode].inputRef.value)) {
                this.setState({loadingState: orderCode + "edit"});
                this.state.backCom('updateOrder', "updateItem",
                    {
                        updateType: "update",
                        orderId: this.state.orderMeta['uId'],
                        itemId: orderCode,
                        quantity: this.refs[orderCode].inputRef.value

                    })
            } else {
                this.setState({errorState:orderCode + "__" + orderQuantity})
            }


        };

        const getErrorElement = (errorState,errorMessage,pointing=true)=>{
            return(
            <Transition
                visible={(this.state.errorState === errorState)}
                animation='scale' duration={100}>
                <Label basic color='red' pointing={pointing}>
                    {errorMessage}
                </Label>
            </Transition>
            )
        };

        const emptyTableRow = () => {
            return (
                <Table.Row>
                    <Table.Cell colSpan={5} textAlign={'center'}>No Order Items</Table.Cell>
                </Table.Row>
            )
        };

        const getTableRows = (orderItem) => {
            return (
                <Table.Row key={orderItem['code']}>
                    <Table.Cell collapsing textAlign='center'>
                        {(this.state.loadingState === orderItem['code'] + "delete" ?
                            <Icon loading name='circle notch' color={'red'} size={'large'}/> :
                            <Button icon='trash' color={'red'} disabled={this.state.editingState === orderItem['code']} onClick={() => {deleteItem(orderItem['code']);}}/>)}
                    </Table.Cell>
                    <Table.Cell>
                        <Header as='h4' image>
                            <Image src='/images/avatar/small/matthew.png' rounded size='mini'/>
                            <Header.Content>
                                {orderItem['name']}
                                <Header.Subheader> {orderItem['code']}</Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Table.Cell>
                    <Table.Cell>{parseFloat(orderItem['unitPrice']).toFixed(2)}</Table.Cell>
                    <Table.Cell>
                        {(this.state.editingState === orderItem['code'] + "__" + orderItem['quantity']) ?
                            (this.state.loadingState === orderItem['code'] + "edit")
                                ? <Icon loading name='circle notch' color={'green'} size={'large'}/>
                                :
                                <Button color={'green'} size='small' icon='checkmark' onClick={() => { updateItem(orderItem['code'], orderItem['quantity'])}}/>

                            : <Button basic size='small' icon='edit' onClick={() => {
                                this.setState({errorState: ""});
                                setDefaultValue();
                                this.setState({editingState: orderItem['code'] + "__" + orderItem['quantity']})
                            }}/>}
                        &nbsp; &nbsp; &nbsp;
                        {(this.state.editingState === orderItem['code'] + "__" + orderItem['quantity']) ?
                            <Input ref={orderItem['code']} disabled={false} defaultValue={orderItem['quantity']}
                                   onChange={() => {validate(this.refs[orderItem['code']].inputRef.value,orderItem['code'] + "__" + orderItem['quantity'])}}/>
                            :
                            <Input id={orderItem['code']} ref={orderItem['code']} disabled={true}
                                   defaultValue={orderItem['quantity']}/>
                        }

                        {getErrorElement(orderItem['code'] + "__" + orderItem['quantity'],"Please enter quantity",false)}

                            </Table.Cell>
                            <Table.Cell>Rs. {unitAmountCalculater(orderItem)}</Table.Cell>
                            </Table.Row>
                            )
                        };
                        return (

                        <Grid>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <Container textAlign='right'>
                                        <Button positive icon='reply' labelPosition='right' content='back' onClick={()=>{this.state.backCom('back')}}/>
                                    </Container>
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <Container textAlign='center'>
                                        <Header>Order Details </Header>
                                    </Container>
                                </Grid.Column>

                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={2}>
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <Segment padded={'very'}>

                                        <Grid columns='two'>
                                            <Grid.Row>
                                                <Grid.Column>
                                                    <h4>Order Id - {this.state.orderMeta['uId']}</h4>
                                                </Grid.Column>
                                                <Grid.Column textAlign={'right'}>
                                                    <h4>Order Status - {this.state.orderMeta['state']}</h4>
                                                </Grid.Column>
                                            </Grid.Row>

                                            <Grid.Row>
                                                <Grid.Column>
                                                    <h4> Order Created date - {this.state.orderMeta['createDate']}</h4>
                                                </Grid.Column>
                                                <Grid.Column textAlign={'right'}>
                                                    <h4> Order Completed date
                                                        - {this.state.orderMeta['completedDate']}</h4>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>

                                        <br/>
                                        <Divider horizontal>
                                            <Header as='h4'>
                                                <Icon name='add to cart'/>
                                                Add New Item
                                            </Header>
                                        </Divider>

                                        <Grid>
                                            <Grid.Row>
                                                <Grid.Column width={6}>
                                                    <Dropdown
                                                        ref={'dataDropdown'}
                                                        options={this.state.showItems}
                                                        fluid
                                                        clearable={true}
                                                        selection
                                                        search={true}
                                                        placeholder='Search Items'
                                                        onChange={(value, data) => {
                                                            if (data['value'] === "") {
                                                                this.createdRef.current.textContent = "Per Item Price : N/A"

                                                            } else {
                                                                this.setState({errorState: ""})
                                                                this.createdRef.current.textContent = "Per Item Price : Rs " + parseFloat(data['value'].split("__")[1]).toFixed(2)
                                                            }
                                                        }
                                                        }
                                                    />


                                                    {getErrorElement("addItem","Please enter an Item")}

                                                </Grid.Column>
                                                <Grid.Column width={3} verticalAlign={'middle'}>
                                                    <Ref innerRef={this.createdRef}>
                                                        <Segment basic> Per Item Price : N/A </Segment>
                                                    </Ref>
                                                </Grid.Column>
                                                <Grid.Column width={4} verticalAlign={'middle'}>
                                                    <Input placeholder='Quantity' ref={"addQuantity"}
                                                           onChange={(event, data) => {validate(data['value'],"addQuantity")}}/>
                                                    {getErrorElement("addQuantity","Please enter quantity")}

                                                </Grid.Column>
                                                <Grid.Column width={3} verticalAlign={'middle'}>
                                                    {(this.state.loadingState === "addItem" ?
                                                        <Header as='h4' color={'green'}> <Icon loading name='circle notch' color={'green'} size={'big'}/> Adding </Header>
                                                        : <Button positive icon='add' labelPosition='left'
                                                                  content='Add Item'
                                                                  onClick={() => {addItem()}}/>)}

                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>

                                        <Divider horizontal>
                                            <Header as='h4'>
                                                <Icon name='tag'/>
                                                Item Details
                                            </Header>
                                        </Divider>
                                        <Table basic='very' celled>
                                            <Table.Header>
                                                <Table.Row>
                                                    <Table.HeaderCell/>
                                                    <Table.HeaderCell>Item</Table.HeaderCell>
                                                    <Table.HeaderCell>Per Item Price (Rs)</Table.HeaderCell>
                                                    <Table.HeaderCell>Quantity</Table.HeaderCell>
                                                    <Table.HeaderCell>Amount</Table.HeaderCell>
                                                </Table.Row>
                                            </Table.Header>

                                            <Table.Body>
                                                {(this.state.orderItems.length === 0) ? emptyTableRow() : Object.values(this.state.orderItems).map(getTableRows)}
                                                <Table.Row key={"Total"}>
                                                    <Table.Cell/>
                                                    <Table.Cell/>
                                                    <Table.Cell/>
                                                    <Table.Cell>
                                                        <Header as='h4' image>
                                                            Total Amount
                                                        </Header>
                                                    </Table.Cell>

                                                    <Table.Cell>
                                                        <Header as='h4' image>
                                                            Rs. {totalAmountCalculater(this.state.orderItems)}
                                                        </Header>
                                                    </Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                        <Divider/>
                                        <Grid columns='two'>
                                            <Grid.Row>
                                                <Grid.Column>
                                                    <Button negative icon='trash' labelPosition='right'
                                                            content='Delete Order' onClick={()=>{this.state.backCom("deleteOrder",this.state.orderMeta['uId'])}}/>
                                                </Grid.Column>
                                                <Grid.Column textAlign={'right'}>
                                                    <Button positive icon='check circle' labelPosition='right'
                                                            content='Check Out'/>
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

                        export default editOrder;