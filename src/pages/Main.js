import React from 'react'
import localStorage from 'localStorage'
import './Main.css'
import Navbar from './Navbar'

// import _ from 'lodash'
// import { publishPost, getAllPosts , getDepartment , getUserDepartment } from '../api'
// import CKEditor from 'react-ckeditor-wrapper'
import { Container , Image , Responsive , Segment } from "semantic-ui-react"

class Main extends React.Component {
  render() {
    return (
      <div className='body'>
        <Navbar history={this.props.history}>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Segment textAlign='center'>
              {/* This Code */}
              
              <Image src='/assets/images/partner.png' size='large' centered/>
              <Container textAlign='center'>
              Copyright © 2015 Major Cineplex Group Plc. All original contents of www.majorcineplex.com ("Site") <br/>
              including text, graphics, interfaces and design thereof are all rights reserved.
              </Container>
            </Segment>
          </Responsive>
          <Responsive {...Responsive.onlyMobile}>
            <Segment basic textAlign='left'>
              {/* This Code */}

            </Segment>
            <Image src='/assets/images/partner.png' size='large' centered/>
            <Container textAlign='center'>
              Copyright © 2015 Major Cineplex Group Plc. All original contents of www.majorcineplex.com ("Site") <br/>
              including text, graphics, interfaces and design thereof are all rights reserved.
            </Container>
          </Responsive>
        </Navbar>
      </div>
    )
  }
}

export default Main