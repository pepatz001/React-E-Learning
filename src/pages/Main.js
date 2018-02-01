import React from 'react'
import localStorage from 'localStorage'
import './Main.css'
import Navbar from './Navbar'

// import _ from 'lodash'
import { getTopic } from '../api'
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
    hotTopic: []
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
    console.log(myData)
  }

  componentWillMount() { 
    getTopic()
    .then(topic => this.setTopic(topic))
    .catch(err => console.error('Something went wrong.'))
  }
  showTopic = (id) => {
    localStorage.setItem('idTopic',id)
    this.props.history.replace('/WebBoard/Topic')
  }

  render() {
    const hotTopics = this.state.hotTopic
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
                      <Feed.Event>
                        <Feed.Content>
                          <Feed.Date>3 days ago</Feed.Date>
                          <Feed.Summary>
                            <Label className='gold' horizontal>Update!</Label>
                            <a onClick={(e) => console.log('test')}>You added Jenny Hess to your coworker group.</a>
                          </Feed.Summary>
                        </Feed.Content>
                      </Feed.Event>
                      <Feed.Event>
                      <Feed.Content>
                        <Feed.Date>3 days ago</Feed.Date>
                        <Feed.Summary>
                          <Label className='gold' horizontal>New!</Label>
                          <a onClick={(e) => console.log('test')}>You added Jenny Hess to your coworker group.</a>
                        </Feed.Summary>
                      </Feed.Content>
                    </Feed.Event>
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
                              <Table.Cell width='12' className='hand'><a onClick={(e) => this.showTopic(item._id)}>{item.topicName}</a></Table.Cell>
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
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Date>3 days ago</Feed.Date>
                      <Feed.Summary>
                        <Label className='gold' horizontal>Update!</Label>
                        <a onClick={(e) => console.log('test')}>You added Jenny Hess to your coworker group.</a>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Date>3 days ago</Feed.Date>
                      <Feed.Summary>
                        <Label className='gold' horizontal>New!</Label>
                        <a onClick={(e) => console.log('test')}>You added Jenny Hess to your coworker group.</a>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
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