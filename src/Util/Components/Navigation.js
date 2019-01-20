/**
 * Created by orange on 02/09/17.
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../Assets/css/Navigation.css'
import { Grid, Segment, Header, Dropdown, Button ,Icon} from 'semantic-ui-react'
import {logOut} from "../../RestServices/AuthServices";



class NavigationSimple extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: props.data,
        }
    }

    async logOut() {
        let response = null;
        await logOut().then((result)=>{response= result['status']});
        switch (response){
            case 200:
                this.props.history.push('/login');
                break;
            default:
                this.props.history.push('/error');
        }
    }

    render() {

        return (

            //TODO: Implement routes for each of the new navigation options.
            <Segment.Group>
                <Segment style={{ 'backgroundColor': '#fa9a23', 'padding': 3 }} textAlign='right' size="mini">
                    <span style={{ 'paddingRight': '6%' }} className="headerFontColor"> Welcome,
                        {' '}
                        <Dropdown item text='User8292'>
            <Dropdown.Menu>
              <Dropdown.Item>User8292</Dropdown.Item>
              <Dropdown.Item onClick={()=>{this.logOut();}}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown></span>
                </Segment>
                <Segment style={{ 'backgroundColor': '#fa6c1e' }}>
                    <Grid columns={10} divided>
                        <Grid.Row verticalAlign={'middle'} stretched={true}>
                            <Grid.Column textAlign={'center'} width={3}>
                                <Header as='h3' image textAlign='left'>
                                    <Header.Content className="headerFontColor">
                                        ABCD Order Management System
                                    </Header.Content>
                                </Header>
                            </Grid.Column>

                            <Grid.Column textAlign={'center'} width={2} className="customGrid">
                                <Button className="customButton" onClick={() => {
                                    this.props.history.push('/dashboard');
                                }}>
                                    <Header as='h5' icon style={{color:'#ffffff'}}>
                                        <Icon name='home' />
                                        Home
                                    </Header>
                                </Button>
                            </Grid.Column>
                            <Grid.Column textAlign={'center'} width={2} className="customGrid">
                                <Button className="customButton" onClick={() => {
                                    this.props.history.push('/items');
                                }}>
                                    <Header as='h5'icon style={{color:'#ffffff'}}>
                                        <Icon name='cart' />
                                        Items
                                    </Header>
                                </Button>
                            </Grid.Column>
                            <Grid.Column textAlign={'center'} className="customGrid">
                                <Button className="customButton" onClick={() => {
                                    this.props.history.push('/messages');
                                }}>
                                    <Header as='h5' icon style={{color:'#ffffff'}}>
                                        <Icon name='address card' />
                                        Messages
                                    </Header>
                                </Button>
                            </Grid.Column>
                            <Grid.Column textAlign={'center'} width={2} className="customGrid">
                                <Button className="customButton" onClick={() => {
                                    this.props.history.push('/payments');
                                }}>
                                    <Header as='h5' icon style={{color:'#ffffff'}}>
                                        <Icon name='money bill alternate outline' />
                                        Payments
                                    </Header>
                                </Button>
                            </Grid.Column>
                            <Grid.Column textAlign={'center'} width={2} className="customGrid">
                                <Button className="customButton" onClick={() => {
                                    this.props.history.push('/offers');
                                }}>
                                    <Header as='h5' icon style={{color:'#ffffff'}}>
                                        <Icon name='dollar sign' />
                                        Offers/Discounts
                                    </Header>
                                </Button>
                            </Grid.Column>
                            <Grid.Column textAlign={'center'} className="customGrid">
                                <Button className="customButton" onClick={() => {
                                    this.props.history.push('/settings');
                                }}>
                                    <Header as='h5' icon style={{color:'#ffffff'}}>
                                        <Icon name='settings' />
                                        Settings
                                    </Header>
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Segment.Group>

        );
    }
}
export default withRouter(NavigationSimple);