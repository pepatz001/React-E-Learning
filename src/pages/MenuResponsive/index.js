import React from 'react'
import { Sidebar , Menu , Responsive , Image , Icon } from 'semantic-ui-react'

class MenuResponsive extends React.Component {
  
  state = { 
    visible: false,
  }
  
  handlePusher = () => {
    const { visible } = this.state
    if (visible) this.setState({ visible: false })
  }

  handleToggle = () => this.setState({ visible: !this.state.visible })

  render(){
    const { activeItem , visible } = this.state

    return (
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation="overlay" icon="labeled" direction='right' inverted vertical visible={visible}>
            <Menu.Item>
            <Image centered size="tiny" src='/assets/images/major-logo.png' />
            </Menu.Item>
            <Menu.Item name='home' onClick={(e) => this.props.history.replace('/')}>
              Home
            </Menu.Item>
            <Menu.Item name='gamepad'>
              Case Study
            </Menu.Item>
            <Menu.Item name='camera'>
              Quiz
            </Menu.Item>
            <Menu.Item name='gamepad'>
              Ranking
            </Menu.Item>
            <Menu.Item name='camera'>
              Cinema
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher
            dimmed={visible}
            onClick={this.handlePusher}
            style={{ minHeight: "100vh" , top: '60px' , background: 'rgba(28,28,35,0.85)'}}
          >
            <Menu fixed="top" inverted>
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

// const NavBarMobile = ({
//   children,
//   leftItems,
//   onPusherClick,
//   onToggle,
//   rightItems,
//   visible
// }) => (
//   <Sidebar.Pushable>
//     <Sidebar
//       as={Menu}
//       animation="overlay"
//       icon="labeled"
//       inverted
//       items={leftItems}
//       vertical
//       visible={visible}
//     />
//     <Sidebar.Pusher
//       dimmed={visible}
//       onClick={onPusherClick}
//       style={{ minHeight: "100vh" }}
//     >
//       <Menu fixed="top" inverted>
//         <Menu.Item>
//           <Image size="tiny" src='/assets/images/major-logo-1.png' />
//         </Menu.Item>
//         <Menu.Item onClick={onToggle}>
//           <Icon name="sidebar" />
//         </Menu.Item>
//         <Menu.Menu position="right">
//           {_.map(rightItems, item => <Menu.Item {...item} />)}
//         </Menu.Menu>
//       </Menu>
//       {children}
//     </Sidebar.Pusher>
//   </Sidebar.Pushable>
// )

// const NavBarChildren = ({ children }) => (
//   <Container style={{ marginTop: "2.5em" }}>{children}</Container>
// )

// class NavBar extends React.Component {
//   state = {
//     visible: false,
//     active: ''
//   }

//   handlePusher = () => {
//     const { visible } = this.state

//     if (visible) this.setState({ visible: false })
//   }

//   handleToggle = () => this.setState({ visible: !this.state.visible })

//   handleClick = (e, { name }) => this.setState({ active: name })

//   render() {
//     const { children, leftItems, rightItems } = this.props
//     const { visible } = this.state
//     const { active } = this.state
//     return (
//       <div>
//         <Responsive {...Responsive.onlyMobile}>
//           <NavBarMobile
//             leftItems={leftItems}
//             onPusherClick={this.handlePusher}
//             onToggle={this.handleToggle}
//             rightItems={rightItems}
//             visible={visible}
//           >
//             <NavBarChildren>{children}</NavBarChildren>
//           </NavBarMobile>
//         </Responsive>
//       </div>
//     )
//   }
// }