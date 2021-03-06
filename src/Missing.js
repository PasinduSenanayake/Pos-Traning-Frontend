import React, {Component} from 'react';
import './App.css';
import {Container, Header, Icon,Button,Divider} from 'semantic-ui-react'
import {withRouter} from "react-router-dom";


class Missing extends Component {
    render() {
        return (
            <div className="App">
                <header className="Missing-header">
                    <Container textAlign={"center"}>

                            <Header icon>
                                <Icon name='broken chain' size={'large'}/>
                                <br/>
                                Page Not Found
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

export default withRouter(Missing);
