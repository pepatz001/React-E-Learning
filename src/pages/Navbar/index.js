import React from 'react'
import { Responsive , Container } from "semantic-ui-react"
import MenuLayout from '../MenuLayout'
import MenuResponsive from '../MenuResponsive'

const NavBarChildren = ({ children }) => (
    <Container>{children}</Container>
);

class Navbar extends React.Component {
    state = {
      visible: false
    };
  
    handlePusher = () => {
      const { visible } = this.state;
  
      if (visible) this.setState({ visible: false });
    };
  
    handleToggle = () => this.setState({ visible: !this.state.visible });
  
    render() {
      const { children } = this.props;
      const { visible } = this.state;
  
      return (
        <div>
          <Responsive maxWidth={Responsive.onlyTablet.minWidth}>
            {/* <NavBarMobile
              leftItems={leftItems}
              onPusherClick={this.handlePusher}
              onToggle={this.handleToggle}
              rightItems={rightItems}
              visible={visible}
            >
              <NavBarChildren>{children}</NavBarChildren>
            </NavBarMobile> */}
            <MenuResponsive history={this.props.history}> 
                <NavBarChildren>{children}</NavBarChildren>
            </MenuResponsive>
          </Responsive>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <MenuLayout history={this.props.history}/>
            <NavBarChildren>{children}</NavBarChildren>
          </Responsive>
        </div>
      );
    }
  }

export default Navbar