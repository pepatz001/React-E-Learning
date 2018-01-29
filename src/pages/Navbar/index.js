import React from 'react'
import { Responsive , Container } from "semantic-ui-react"
import MenuLayout from '../MenuLayout'
import MenuResponsive from '../MenuResponsive'

const NavBarChildren = ({ children }) => (
    <Container>{children}</Container>
);

class Navbar extends React.Component { 
    render() {
      const { children } = this.props;
  
      return (
        <div>
          <Responsive {...Responsive.onlyMobile}>
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
