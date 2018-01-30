import React from 'react'
import localStorage from 'localStorage'
import Navbar from '../Navbar'

import { getUserDepartment } from '../../api'
// import CKEditor from 'react-ckeditor-wrapper'
import { Divider , Container , Menu , Segment, Grid , Responsive , Image , Accordion , Icon     } from "semantic-ui-react"

class AllTopic extends React.Component {

    mapUser = (list) => {
        const item = list.filter(item => item.username === localStorage.username).map(item => item.department)
        this.setState({department: item[0]})
        localStorage.setItem('department', this.state.department)
        if(this.state.department === 'admin'){
          this.props.history.replace('/admin')
        }
    }
    
    componentWillMount() { 
        getUserDepartment()
        .then(user => this.mapUser(user))
        .catch(err => console.error('Something went wrong.'))
    }
    
    render() {
        return (
        <div className='body'>
            {/* <MenuLayout history={this.props.history}/>
            <MenuResponsive history={this.props.history}/> */}
            <Navbar history={this.props.history}>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <Segment textAlign='center'>
                        
                        <Image src='/assets/images/partner.png' size='large' centered/>
                        <Container textAlign='center'>
                        Copyright © 2015 Major Cineplex Group Plc. All original contents of www.majorcineplex.com ("Site") <br/>
                        including text, graphics, interfaces and design thereof are all rights reserved.
                        </Container>
                    </Segment>
                </Responsive>
                <Responsive {...Responsive.onlyMobile}>
                    <Segment basic textAlign='left'>

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

export default AllTopic

                                {/* <Menu.Item>
                                    <Menu.Header>{item}</Menu.Header>
                                    <Menu.Menu>
                                        { contents.length >= 0 ? //Javascript  //? คือ if else Syntax => ... ? true : false
                                        contents.filter(list => list.topic === item).map((thisItem) => //Loop
                                            <Menu.Item name={thisItem.name} active={activeItem === thisItem.name} onClick={(e) => this.handleItemClick(thisItem.name,thisItem.code)} />
                                        )
                                        : null }
                                    </Menu.Menu>
                                    </Menu.Item> */}