import React, {Component} from 'react';
import './App.css';
import {Container, Header, Icon} from 'semantic-ui-react'

class Missing extends Component {
    render() {
        return (
            <div className="App">
                <header className="Missing-header">
                    <Container textAlign={"center"}>
                            <h1> Sorry</h1>
                            <Header icon>
                                <Icon name='broken chain' size={'large'}/>
                            </Header>
                            <h1> Page Not Found</h1>
                    </Container>
                </header>
            </div>
        );
    }
}

export default Missing;
