import React from 'react'
import localStorage from 'localStorage'
import MenuLayout from '../MenuLayout'
import Navbar from '../Navbar'

// import _ from 'lodash'
import { getDepartment , getUserDepartment } from '../../api'
// import CKEditor from 'react-ckeditor-wrapper'
import { Divider , Container , Menu , Segment, Grid , Responsive , Image } from "semantic-ui-react"

class AllTopic extends React.Component {

    state = {
        department : "",
        code: "",
        contents: [],
        topics: [],
        activeItem: ''
      }
    
      mapContent = (list) => {
        var content = [{topic:"",name:"",code:""}]
        content = list.filter(item => item.name === this.state.department).map(list => list.content)
        const topic = []
        content.forEach( v => topic.indexOf(v.topic) === -1 ? topic.push(v.topic) : null)
        this.setState({
          contents: content,
          topics: topic,
          activeItem: content[0].name,
          code: content[0].code
        })
      }
    
      mapUser = (list) => {
        const item = list.filter(item => item.username === localStorage.username).map(item => item.department)
        this.setState({department: item[0]})
        localStorage.setItem('department', this.state.department)
        if(this.state.department === 'admin'){
          this.props.history.replace('/admin')
        } else {
          getDepartment()
          .then(data => this.mapContent(data))
          .catch(err => console.error('Something went wrong.'))
        }
      }
    
      componentWillMount() { 
        getUserDepartment()
        .then(user => this.mapUser(user))
        .catch(err => console.error('Something went wrong.'))
      }
      
      handleItemClick = (name,code) => {
        this.setState({ 
          activeItem: name,
          code: code
        })
      }
    
    render() {
        const { activeItem , topics , contents } = this.state
        return (
        <div className='body'>
            {/* <MenuLayout history={this.props.history}/>
            <MenuResponsive history={this.props.history}/> */}
            <Navbar history={this.props.history}>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <Segment textAlign='center'>
                        <Grid>
                        <Grid.Column width={3}>
                            <Menu inverted vertical className='Layout'>
                            <Container>
                                { topics.length >= 0 ? //Javascript  //? คือ if else Syntax => ... ? true : false
                                topics.map((item,index) => //Loop
                                    <Menu.Item>
                                    <Menu.Header>{item}</Menu.Header>
                                    <Menu.Menu>
                                        { contents.length >= 0 ? //Javascript  //? คือ if else Syntax => ... ? true : false
                                        contents.filter(list => list.topic === item).map((thisItem) => //Loop
                                            <Menu.Item name={thisItem.name} active={activeItem === thisItem.name} onClick={(e) => this.handleItemClick(thisItem.name,thisItem.code)} />
                                        )
                                        : null }
                                    </Menu.Menu>
                                    </Menu.Item>
                                )
                                : null }
                            </Container>
                            </Menu>
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <Segment style={{ margin: '0 10px 0 25px' }} vertical>
                            <Grid>
                                <Grid.Column stretched width={16}>
                                <Segment basic textAlign='left'>
                                    <h2>{this.state.activeItem}</h2>
                                    <Divider />
                                    <div>
                                        <div dangerouslySetInnerHTML={{ __html: this.state.code }}></div>
                                    </div>
                                </Segment>
                                </Grid.Column>
                            </Grid>
                            </Segment>
                        </Grid.Column>
                        </Grid>
                    </Segment>
                </Responsive>
                <Responsive {...Responsive.onlyMobile}>
                    <Segment basic textAlign='left'>
                        <h2>{this.state.activeItem}</h2>
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: this.state.code }}></div>
                        </div>
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