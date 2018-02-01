import React from 'react'
import localStorage from 'localStorage'
import './Main.css'
import Navbar from './Navbar'

// import _ from 'lodash'
import { getTopic , getUserDepartment , getDepartment } from '../api'
// import CKEditor from 'react-ckeditor-wrapper'
import { Container , Image , Responsive , Segment , Feed , Grid , Divider , Header , Label , Table } from "semantic-ui-react"
import { Carousel } from 'react-responsive-carousel'

import TimeAgo from 'javascript-time-ago'

// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'

// Add locale-specific relative date/time formatting rules.
TimeAgo.locale(en)

// Create relative date/time formatter.
const timeAgo = new TimeAgo('en-US')
var dateFormat = require('dateformat')

class Main extends React.Component {

  state = {
    hotTopic: [],
    courseUpdate: [],
    courseNew: []
  }

  setCourse = (data) => {
    // console.log(data)
    const courseUpdate = data.filter(item => item.update === '1')
    const courseNew = data.sort((a, b) => new Date(dateFormat(a.created,'yyyy-mm-dd').split('/').reverse()) - new Date(dateFormat(b.created,'yyyy-mm-dd').split('/').reverse())).reverse().slice(0, 3)
    this.setState({
      courseUpdate: courseUpdate,
      courseNew: courseNew
    })
  }

  setTopic = (topic) => {
    const allTopic = topic
    const count = []
    allTopic.forEach( v => count.push({
        _id: v._id,
        offerLength: v.offer.length,
        topicName: v.topicName,
        created: v.created
    }))
    const myData = count.sort((a, b) => a.offerLength - b.offerLength).reverse().slice(0, 5)
    this.setState({hotTopic: myData})
    
    getDepartment()
    .then(department => this.setCourse(department))
    .catch(err => console.error('Something went wrong.'))
  }

  mapUser = (list) => {
    const item = list.filter(item => item.username === localStorage.username).map(item => item.department)
    this.setState({department: item[0]})
    localStorage.setItem('department', this.state.department)
    if(this.state.department === 'admin'){
      this.props.history.replace('/admin')
    } else {
        getTopic()
        .then(topic => this.setTopic(topic))
        .catch(err => console.error('Something went wrong.'))
    }
  }

  componentWillMount() { 
    getUserDepartment()
        .then(user => this.mapUser(user))
        .catch(err => console.error('Something went wrong.'))
  }

  showTopic = (id) => {
    localStorage.setItem('idTopic',id)
    this.props.history.replace('/WebBoard/Topic')
  }

  showDepartment = (name,topic) => {
    localStorage.setItem('departmentClick', name)
    // console.log(topic)
    localStorage.setItem('departmentTopicClick', topic)
    this.props.history.replace('/Crpdaz') //redirect
  }

  render() {
    const hotTopics = this.state.hotTopic
    const { courseUpdate , courseNew } = this.state
    return (
      <div className='body'>
        <Navbar history={this.props.history}>
          <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <Segment textAlign='center'>
              {/* This Code */}
              <Carousel autoPlay showThumbs={false} className='banner'>
                <div>
                    <img src="assets/images/1.jpeg" />
                </div>
                <div>
                    <img src="assets/images/2.jpeg" />
                </div>
                <div>
                    <img src="assets/images/3.jpeg" />
                </div>
              </Carousel>
              <Divider/>
              <Grid>
                <Grid.Column width={6}>
                  <Header as='h2' textAlign='left'>Courses</Header>
                  <Segment className='feedNew'>
                    <Feed>
                      {courseNew.length >= 0 ? //Javascript  //? คือ if else Syntax => ... ? true : false
                        courseNew.map(item => //Loop
                          <Feed.Event>
                            <Feed.Content>
                              <Feed.Date>{dateFormat(item.created,'longDate')}</Feed.Date>
                              <Feed.Summary>
                                <Label className='gold' horizontal>New!</Label>
                                <a onClick={(e) => this.showDepartment(item.name,item.content.name)}>{item.content.name}</a>
                              </Feed.Summary><br/>
                            </Feed.Content>
                          </Feed.Event>
                        )
                        : null}
                      {courseUpdate.length >= 0 ? //Javascript  //? คือ if else Syntax => ... ? true : false
                          courseUpdate.map(item => //Loop
                          <Feed.Event>
                            <Feed.Content>
                              <Feed.Date>{dateFormat(item.created,'longDate')}</Feed.Date>
                              <Feed.Summary>
                                <Label className='gold' horizontal>Update!</Label>
                                <a onClick={(e) => this.showDepartment(item.name,item.content.name)}>{item.content.name}</a>
                              </Feed.Summary><br/>
                            </Feed.Content>
                          </Feed.Event>
                        )
                        : null}
                    </Feed>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={10}>
                  <Header as='h2' textAlign='left'>Hot Topics</Header>
                  <Segment className='feedNew'>
                    <Table>
                      <Table.Body>
                        {hotTopics.length >= 0 ? //Javascript  //? คือ if else Syntax => ... ? true : false
                          hotTopics.map(item => //Loop
                          <Table.Row>
                              <Table.Cell width='12' className='hand'><a onClick={(e) => this.showTopic(item._id,item.topicName)}>{item.topicName}</a></Table.Cell>
                              <Table.Cell width='4' textAlign='right' className='date'>{dateFormat(item.created,'longDate')}</Table.Cell>
                          </Table.Row>
                        )
                        : null}
                      </Table.Body>
                    </Table>
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
              {/* This Code */}
              <Carousel autoPlay showThumbs={false}>
                <div>
                    <img src="assets/images/1.jpeg" />
                </div>
                <div>
                    <img src="assets/images/2.jpeg" />
                </div>
                <div>
                    <img src="assets/images/3.jpeg" />
                </div>
              </Carousel>
              <Divider/>
              <Header as='h2' textAlign='left'>Courses</Header>
              <Segment className='feedNew'>
                <Feed>
                  {courseNew.length >= 0 ? //Javascript  //? คือ if else Syntax => ... ? true : false
                    courseNew.map(item => //Loop
                      <Feed.Event>
                        <Feed.Content>
                          <Feed.Date>{dateFormat(item.created,'longDate')}</Feed.Date>
                          <Feed.Summary>
                            <Label className='gold' horizontal>New!</Label>
                            <a onClick={(e) => this.showDepartment(item.name,item.content.name)}>{item.content.name}</a>
                          </Feed.Summary><br/>
                        </Feed.Content>
                      </Feed.Event>
                    )
                    : null}
                  {courseUpdate.length >= 0 ? //Javascript  //? คือ if else Syntax => ... ? true : false
                      courseUpdate.map(item => //Loop
                      <Feed.Event>
                        <Feed.Content>
                          <Feed.Date>{dateFormat(item.created,'longDate')}</Feed.Date>
                          <Feed.Summary>
                            <Label className='gold' horizontal>Update!</Label>
                            <a onClick={(e) => this.showDepartment(item.name,item.content.name)}>{item.content.name}</a>
                          </Feed.Summary><br/>
                        </Feed.Content>
                      </Feed.Event>
                    )
                    : null}
                </Feed>
              </Segment>
              <Header as='h2' textAlign='left'>Hot Topics</Header>
              <Segment className='feedNew'>
                <Table>
                  <Table.Body>
                    {hotTopics.length >= 0 ? //Javascript  //? คือ if else Syntax => ... ? true : false
                      hotTopics.map(item => //Loop
                      <Table.Row>
                          <Table.Cell width='12' className='hand'><a onClick={(e) => this.showTopic(item._id)}>{item.topicName}</a></Table.Cell>
                          <Table.Cell width='4' textAlign='right' className='date'>{dateFormat(item.created,'longDate')}</Table.Cell>
                      </Table.Row>
                      )
                      : null}
                    </Table.Body>
                </Table>
              </Segment>
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