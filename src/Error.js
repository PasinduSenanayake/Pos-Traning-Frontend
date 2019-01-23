import React, {Component} from 'react';
import './App.css';
import {Button, Container, Divider, Header, Icon} from 'semantic-ui-react'
import {withRouter} from "react-router-dom";

class Error extends Component {
    render() {
        return (
            <div className="App">
                <header className="Missing-header">
                    <Container textAlign={"center"}>

                        <Header icon>
                            <Icon name='ambulance' size={'large'}/>
                            <br/>
                           Sorry, something went wrong. Please try again.
                        </Header>
                        <br/>
                        <br/>
                        <Divider/>
                        <Button onClick={()=>{this.props.history.push('/dashboard')}}>Redirect to Dashboard</Button>
                    </Container>
                </header>
            </div>
        );
    }
}

export default withRouter(Error);
