import React, {Component,createRef} from 'react';
import { Dropdown,Input,
    Grid, Header, Image, Table, Button, Ref,Segment,Container,Divider,Icon
} from 'semantic-ui-react'

class editOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderMeta:props['componentData'],
            backCom:props['frontEndCommunicator'],
            orderItems:props['componentData']['orderItems'],
            allItems: props['secondaryComponentData'],
            showItems:props['secondaryComponentData'].filter((element)=>{if(!props['componentData']['orderItems'].some(e => e.key === element['key'])){return element }}),
            loadingState:"",
            editingState:"",
            orderTotal:0.00
        }
    }

    createdRef = createRef();

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps);
        if (nextProps['action']==="addItem" && nextProps['actionState']==="success") {
            this.createdRef.current.textContent="Per Item Price : N/A";
            this.refs.dataDropdown.clearValue();
            this.refs.addQuantity.inputRef.value = '';
            this.setState({orderItems: nextProps['orderItems'],
                showItems:this.state.allItems.filter((element)=>{if(!nextProps['orderItems'].some(e => e.key === element['key'])){return element }})})

        }
        else if (nextProps['action']==="deleteItem" && nextProps['actionState']==="success") {
            this.setState({orderItems: nextProps['orderItems'],
                showItems:this.state.allItems.filter((element)=>{if(!nextProps['orderItems'].some(e => e.key === element['key'])){return element }})})
        }
        else if (nextProps['action']==="increaseItem" && nextProps['actionState']==="success") {
            this.setState({orderItems: nextProps['orderItems']})
        }
    };




    render() {

        const emptyTableRow = ()=>{
            return (
                <Table.Row>
                    <Table.Cell colSpan={5} textAlign={'center'}>No Order Items</Table.Cell>
                </Table.Row>
            )
        };

        const getTableRows =  (orderItem)=>{
            return (
            <Table.Row>
                <Table.Cell collapsing textAlign='center'>
                    {(this.state.loadingState==="testLoader" ?
                        <Icon loading  name='circle notch' color={'red'} size={'large'} /> :
                        <Button icon='trash' color={'red'}  onClick={()=>{
                            this.state.backCom('updateOrder',
                                {
                                    updateType:"delete",
                                    orderId:this.state.orderMeta['uId'],
                                    itemId:orderItem['code'],

                                })
                        }}/>)}
                </Table.Cell>
                <Table.Cell>
                    <Header as='h4' image>
                        <Image src='/images/avatar/small/matthew.png' rounded size='mini' />
                        <Header.Content>
                            {orderItem['name']}
                            <Header.Subheader> {orderItem['code']}</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Table.Cell>
                <Table.Cell>15</Table.Cell>
                <Table.Cell>
                    {(this.state.editingState === "testLoader") ?
                        (this.state.loadingState === "testLoader")
                            ? <Icon loading  name='circle notch' color={'green'} size={'large'} />
                            :
                            <Button  color={'green'} size='small' icon='checkmark'    onClick={()=>{
                                this.state.backCom('updateOrder',
                                    {
                                        updateType:"update",
                                        orderId:this.state.orderMeta['uId'],
                                        itemId:orderItem['code'],
                                        quantity:2

                                    })
                            }}/>

                        :<Button basic size='small' icon='edit' onClick={() => {
                            console.log(this.refs.inputRef)
                        }}/>}
                    &nbsp; &nbsp; &nbsp;
                    {(this.state.editingState === "testLoader") ?
                        <Input ref={'inputRef'} disabled={false} value={22}/>
                        :
                        <Input ref={'inputRef'} disabled={true} value={22}/>
                    }

                </Table.Cell>
                <Table.Cell>Rs. 500.00</Table.Cell>
            </Table.Row>
            )
        };
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
                               <h4> Order Completed date - {this.state.orderMeta['completedDate']}</h4>
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
                                       ref={'dataDropdown'}
                                       options={this.state.showItems}
                                       fluid
                                       clearable={true}
                                       selection
                                       search={true}
                                       placeholder='Search Items'
                                       onChange={(value,data)=>{(data['value']==="")?
                                           this.createdRef.current.textContent="Per Item Price : N/A"
                                           :this.createdRef.current.textContent="Per Item Price : Rs "+parseFloat(data['value'].split("__")[1]).toFixed(2)}}
                                   />
                               </Grid.Column>
                               <Grid.Column  width={3} verticalAlign={'middle'}>
                                   <Ref innerRef={this.createdRef}>
                                      <Segment basic>  Per Item Price : N/A </Segment>
                                   </Ref>
                               </Grid.Column>
                               <Grid.Column width={4} verticalAlign={'middle'}>
                                   <Input  placeholder='Quantity' ref={"addQuantity"} />
                               </Grid.Column>
                               <Grid.Column width={3} verticalAlign={'middle'}>
                                   {(this.state.loadingState==="addLoader" ?
                                       <Header as='h4' color={'green'}>  <Icon loading  name='circle notch' color={'green'} size={'big'} /> Adding ... </Header>
                                       : <Button positive icon='add' labelPosition='left' content='Add Item'
                                                 onClick={()=>{
                                                     this.state.backCom('updateOrder',
                                                     {
                                                         updateType:"add",
                                                         orderId:this.state.orderMeta['uId'],
                                                         itemId:"testItem",
                                                         quantity:2

                                                     })
                                                 }}/>)}

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
                                {(this.state.orderItems.length === 0 )?emptyTableRow():Object.values(this.state.orderItems).map(getTableRows)}
                                <Table.Row >
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
                                            Rs. 10000.00
                                        </Header>
                                    </Table.Cell>
                                </Table.Row>
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

export default editOrder;