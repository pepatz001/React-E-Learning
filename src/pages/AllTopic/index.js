import React from 'react'
import localStorage from 'localStorage'
import Navbar from '../Navbar'

// import _ from 'lodash'
import { getDepartment , getUserDepartment } from '../../api'
// import CKEditor from 'react-ckeditor-wrapper'
import { Divider , Container , Menu , Segment, Grid , Responsive , Image , Accordion , Icon  , Breadcrumb } from "semantic-ui-react"

class AllTopic extends React.Component {

    state = {
        department : "",
        code: "",
        contents: [],
        topics: [],
        activeItem: '',
        activeIndex: 0
    }
    
    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex })
    }
    
    mapContent = (list) => {
        var content = [{topic:"",name:"",code:""}]
        content = list.filter(item => item.name === localStorage.getItem('departmentClick')).map(list => list.content)
        const topic = []
        content.forEach( v => topic.indexOf(v.topic) === -1 ? topic.push(v.topic) : null)
        console.log(localStorage.getItem('departmentTopicClick'))
        if(localStorage.getItem('departmentTopicClick') !== ''){
            var thisCode = ''
            content.forEach( v => 
                v.name === localStorage.getItem('departmentTopicClick') ?
                thisCode = v.code : null
            )
            this.setState({
                contents: content,
                topics: topic,
                activeItem: localStorage.getItem('departmentTopicClick'),
                code: thisCode
              })
              localStorage.setItem('departmentTopicClick','')
        } else {
            this.setState({
                contents: content,
                topics: topic,
                activeItem: content[0].name,
                code: content[0].code
              })
        }
        // console.log(topic)
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
        const { activeItem , topics , contents , activeIndex } = this.state
        return (
        <div className='body'>
            {/* <MenuLayout history={this.props.history}/>
            <MenuResponsive history={this.props.history}/> */}
            <Navbar history={this.props.history}>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <Segment textAlign='left' className='webboard'>
                        <Breadcrumb className='breadcrumbLeft'>
                            <Breadcrumb.Section link onClick={(e) => this.props.history.replace('/')}>Home</Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right angle' />
                            <Breadcrumb.Section active>{ localStorage.getItem('departmentClick') == 'Bowling Operation Business Unit' ? 'Bowling' : localStorage.getItem('departmentClick')}</Breadcrumb.Section>
                        </Breadcrumb>
                        <Divider className='default'/>
                        <Grid>
                        <Grid.Column width={3} textAlign='center'>
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
                                <Segment basic textAlign='left' className='PC'>
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
                        <Image src='/assets/images/partner.png' size='large' centered/>
                        <Container textAlign='center'>
                        Copyright © 2015 Major Cineplex Group Plc. All original contents of www.majorcineplex.com ("Site") <br/>
                        including text, graphics, interfaces and design thereof are all rights reserved.
                        </Container>
                    </Segment>
                </Responsive>
                <Responsive {...Responsive.onlyMobile}>
                    <Segment basic textAlign='left'>
                        <Breadcrumb className='breadcrumbLeft'>
                            <Breadcrumb.Section link onClick={(e) => this.props.history.replace('/')}>Home</Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right angle' />
                            <Breadcrumb.Section active>{ localStorage.getItem('departmentClick') == 'Bowling Operation Business Unit' ? 'Bowling' : localStorage.getItem('departmentClick')}</Breadcrumb.Section>
                        </Breadcrumb>
                        <Divider className='default'/>
                            { topics.length >= 0 ? //Javascript  //? คือ if else Syntax => ... ? true : false
                                topics.map((item,index) => //Loop
                                    <Accordion>
                                        <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick}>
                                            <Icon name='dropdown' />
                                            {item}
                                        </Accordion.Title>
                                        <Accordion.Content active={activeIndex === index}>
                                            <Menu inverted vertical className='Responsive'>
                                            { contents.length >= 0 ? //Javascript  //? คือ if else Syntax => ... ? true : false
                                                contents.filter(list => list.topic === item).map((thisItem) => //Loop
                                                    <Menu.Item name={thisItem.name} active={activeItem === thisItem.name} onClick={(e) => this.handleItemClick(thisItem.name,thisItem.code)} />
                                                )
                                                : null }
                                            </Menu>
                                        </Accordion.Content>
                                    </Accordion>
                                )
                                : null }
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