import React from 'react'
import { Sidebar , Menu , Responsive , Image , Icon , Accordion } from 'semantic-ui-react'

class MenuResponsive extends React.Component {
  
  state = { 
    visible: false,
    activeIndex: -1
  }
  
  handlePusher = () => {
    const { visible } = this.state
    if (visible) this.setState({ visible: false })
  }

  handleToggle = () => this.setState({ visible: !this.state.visible })

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  handleClickDepartment = (departmentName) => {
    localStorage.setItem('departmentClick', departmentName)
    this.props.history.replace('/Crpdaz') //redirect
  }

  render(){
    const { activeItem , visible , activeIndex } = this.state

    return (
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation="overlay" icon="labeled" direction='right' inverted vertical visible={visible}>
            <Menu.Item>
            <Image centered size="tiny" src='/assets/images/major-logo.png'/>
            </Menu.Item>
            <Menu.Item name='home' onClick={(e) => this.props.history.replace('/')}>
              Home
            </Menu.Item>
            <Menu.Item>
            <Accordion>
              <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                <Icon name='dropdown' />
                Operation
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <Menu.Item onClick={(e) => this.handleClickDepartment('Cinema')}>
                  Cinema
                </Menu.Item>
                <Menu.Item onClick={(e) => this.handleClickDepartment('Bowling Operation Business Unit')}>
                  Bowling Operation Business Unit
                </Menu.Item>
              </Accordion.Content>
            </Accordion>
            </Menu.Item>
            <Menu.Item className='navbarItem' key='support' name='support' onClick={(e) => this.handleClickDepartment('Support')} />
            <Menu.Item name='forums'>
              Forums
            </Menu.Item>
            {/* <Menu.Item name='camera'>
              Quiz
            </Menu.Item> */}
          </Sidebar>
          <Sidebar.Pusher
            onClick={this.handlePusher}
            style={{ minHeight: "100vh" , background: 'rgba(28,28,35,0.85)'}}
          >
            <Menu fixed="top">
              <Menu.Item>
                <Image size="tiny" src='/assets/images/major-logo-1.png' />
              </Menu.Item>
              <Menu.Item position="right" onClick={this.handleToggle}>
                <Icon name="sidebar" />
              </Menu.Item>
            </Menu>
            {this.props.children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
    )
  }
}

export default MenuResponsive