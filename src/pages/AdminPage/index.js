import React from 'react';
import { Tab , Dimmer, Loader } from 'semantic-ui-react'
import Users from '../Users'
import Departments from '../Departments'
import WebBoardAdmin from '../WebBoardAdmin'

class AdminPage extends React.Component {
    state = { activeItem: 'home' , loader: true }
    
    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    logout = () => {
        localStorage.clear()
        this.props.history.replace('/login') //redirect
    }

    componentDidMount(){
        this.setState({ loader: false })
        // console.log('test')
    }

    render() {
        const { activeItem } = this.state
        const panes = [
            { menuItem: { content: 'Users'}, render: () => <Tab.Pane attached={false}><Users history={this.props.history}/></Tab.Pane> },
            { menuItem: { content: 'Departments'}, render: () => <Tab.Pane attached={false}><Departments history={this.props.history}/></Tab.Pane> },
            { menuItem: { content: 'Web Board'}, render: () => <Tab.Pane attached={false}><WebBoardAdmin history={this.props.history}/></Tab.Pane> },
            { menuItem: { content: 'Log out' , icon: 'shutdown' , position: 'right' } , render: () => this.logout()}
          ]

        return (
            <div>
                <Dimmer active={this.state.loader}>
                    <Loader>Loading</Loader>
                </Dimmer>
                <Tab menu={{ color:'black', inverted: true, attached: false, tabular: false }} panes={panes}/>
            </div>
        )
    }
}

export default AdminPage;