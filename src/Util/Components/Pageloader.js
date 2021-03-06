import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
class PageLoader extends React.Component {

    render() {

        return (
            <Dimmer active inverted>
                <Loader size='large'>Loading</Loader>
            </Dimmer>
        )
    }

}

export default PageLoader;