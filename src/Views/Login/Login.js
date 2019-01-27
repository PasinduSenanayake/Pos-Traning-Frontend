import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment ,Container} from 'semantic-ui-react'
import sweetImg from "../../Util/Assets/sweets/sweet.png"
class Login extends Component {

        constructor(props){
            super(props);
            this.state = {
                backendCom : props['frontEndCommunicator'],
                errorState : props['loginAccess'],
                userName : null,
                password :null,
            }
        }



    render() {
        return (
            <div className='login-form'>
                <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            <Image src={sweetImg} /> Log-in to your account
                        </Header>
                        <Form size='large'>
                            <Segment stacked>

                                <Container>
                                    { (this.state.errorState === "") ? ""
                                        : <Header as='h5' color='red'> {this.state.errorState }</Header> }
                                </Container>
                                <br/>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='Username'
                                            onChange = {(event,data)=>this.setState({userName:data['value']})}/>
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    onChange = {(event,data)=>this.setState({password:data['value']})}
                                />

                                <Button onClick={()=>
                                {this.state.backendCom('login',this.state.userName, this.state.password)}}
                                        color='teal' fluid size='large'>
                                    Login
                                </Button>

                            </Segment>
                        </Form>
                        <Message>
                            New to us? <a href='#'>Sign Up</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Login;