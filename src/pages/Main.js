import React from 'react'
import localStorage from 'localStorage'
import './Main.css'
import Navbar from './Navbar'

// import _ from 'lodash'
// import { publishPost, getAllPosts , getDepartment , getUserDepartment } from '../api'
// import CKEditor from 'react-ckeditor-wrapper'
import { Container , Image , Responsive , Segment , Feed , Grid , Divider , Header , Label } from "semantic-ui-react"
import { Carousel } from 'react-responsive-carousel'

class Main extends React.Component {
  render() {
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
                  <Header as='h2' textAlign='left'>Topic</Header>
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
                  <Header as='h2' textAlign='left'>Web Board</Header>
                  <Segment className='feedNew'>
                    <Feed>
                      <Feed.Event>
                        <Feed.Content>
                          <Feed.Date>3 days ago</Feed.Date>
                          <Feed.Summary>
                            <a onClick={(e) => console.log('test')}>You added Jenny Hess to your coworker group.</a>
                          </Feed.Summary>
                        </Feed.Content>
                      </Feed.Event>
                      <Feed.Event>
                        <Feed.Content>
                          <Feed.Date>3 days ago</Feed.Date>
                          <Feed.Summary>
                            <a onClick={(e) => console.log('test')}>You added Jenny Hess to your coworker group.</a>
                          </Feed.Summary>
                        </Feed.Content>
                      </Feed.Event>
                    </Feed>
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
              <Header as='h2' textAlign='left'>Topic</Header>
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
              <Header as='h2' textAlign='left'>Web Board</Header>
              <Segment className='feedNew'>
                <Feed>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Date>3 days ago</Feed.Date>
                      <Feed.Summary>
                        <a onClick={(e) => console.log('test')}>You added Jenny Hess to your coworker group.</a>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Date>3 days ago</Feed.Date>
                      <Feed.Summary>
                        <a onClick={(e) => console.log('test')}>You added Jenny Hess to your coworker group.</a>
                      </Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
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