
import React from 'react'
import { Dimmer, Header,Icon,Sidebar } from 'semantic-ui-react'
class DimmerPage extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            visibility: false
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({visibility:nextProps['visibility']})
    }


    render() {
        return (

            <Dimmer active={this.state.visibility}  page>
                <Sidebar direction={'bottom'} icon='labeled' visible={true} width='thin'>
                    <Header as='h1' icon inverted>
                        <Icon name='heartbeat' size={'massive'}/>
                       Sorry we lost Connection, but we are keep trying ...
                        <Header.Subheader>Check your internet connection </Header.Subheader>
                    </Header>
                    <br/><br/><br/><br/><br/><br/><br/><br/>
                </Sidebar>

            </Dimmer>
        )
    }

}
export default DimmerPage;