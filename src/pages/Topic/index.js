import React from 'react'
import localStorage from 'localStorage'
import Navbar from '../Navbar'

import { comment , getOneTopic , updateTopic } from '../../api'
import CKEditor from 'react-ckeditor-wrapper'
import { Divider , Container , Image , Segment , Responsive , Header , Breadcrumb , Comment , Button , Form } from "semantic-ui-react"

import TimeAgo from 'javascript-time-ago'

// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'

// Add locale-specific relative date/time formatting rules.
TimeAgo.locale(en)

// Create relative date/time formatter.
const timeAgo = new TimeAgo('en-US')

var dateFormat = require('dateformat')

class WebBoard extends React.Component {

    state = {
        thisTopic: { offer: []},
        code: ''
    }

    updateContent(value) {
        this.setState({code:value})
    }
    
    componentWillMount() { 
        getOneTopic(localStorage.getItem('idTopic'))
        .then(topic => this.setState({thisTopic: topic}))
        .catch(err => console.error('Something went wrong.'))
    }

    handleSubmitComment = event => {
        event.preventDefault() //no refresh
        const data = {
            reply: localStorage.getItem('username'),
            description: this.state.code
        }
        const id = localStorage.getItem('idTopic')
        // console.log(id,data)
        comment(id,data)
        .then(data => {
            if (data.status === 200) {
                localStorage.setItem('path','Topic')
                this.props.history.replace('/Crpdaz')
            }
        })
    }
    
    render() {
        const { thisTopic } = this.state
        return (
        <div className='body'>
            <Navbar history={this.props.history}>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <Segment textAlign='left' className='webboard'>
                        <Breadcrumb>
                            <Breadcrumb.Section link onClick={(e) => this.props.history.replace('/')}>Home</Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right angle' />
                            <Breadcrumb.Section link onClick={(e) => this.props.history.replace('/WebBoard')}>Web Board</Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right angle' />
                            <Breadcrumb.Section active>Topic</Breadcrumb.Section>
                        </Breadcrumb>
                        <Divider className='default'/>
                        <Header as='h2' textAlign='left'>{thisTopic.topicName}</Header>
                        <p><span className='white'>โดย {thisTopic.owner}</span> | <span className='white'>{dateFormat(thisTopic.created,'longDate')}</span></p>
                        <div>
                            <div className='white' dangerouslySetInnerHTML={{ __html: thisTopic.description}}></div>
                        </div>
                        <Comment.Group>
                            <Header as='h2' textAlign='left' dividing>Comments</Header>
                            {
                                thisTopic.offer.length >= 0 ? //Javascript  //? คือ if else Syntax => ... ? true : false
                                thisTopic.offer.map(itemOffer => //Loop
                                    <Comment>
                                        <Comment.Content>
                                            <Comment.Author as='a' className='notAdmin'>{itemOffer.offerusername}</Comment.Author>
                                            <Comment.Metadata className='notAdmin'>
                                                <div>{timeAgo.format(new Date(itemOffer.created))}</div>
                                            </Comment.Metadata>
                                            <Comment.Text className='notAdmin'>
                                                <div className='commentBox'>
                                                    <div dangerouslySetInnerHTML={{ __html: itemOffer.offerdescription}}></div>
                                                </div>
                                            </Comment.Text>
                                            <Divider className='default'/>
                                        </Comment.Content>
                                    </Comment>
                                )
                                : null
                            }
                            <Form reply onSubmit={this.handleSubmitComment}>
                                <CKEditor value={this.state.code} onChange={this.updateContent.bind(this)} config={{readOnly: false}}/><br/>
                                <Button content='Post' labelPosition='left' icon='edit' primary className='notAdmin'/>
                            </Form>
                        </Comment.Group>
                        <Image src='/assets/images/partner.png' size='large' centered/>
                        <Container textAlign='center'>
                        Copyright © 2015 Major Cineplex Group Plc. All original contents of www.majorcineplex.com ("Site") <br/>
                        including text, graphics, interfaces and design thereof are all rights reserved.
                        </Container>
                    </Segment>
                </Responsive>
                <Responsive {...Responsive.onlyMobile}>
                    <Segment basic textAlign='left'>
                        <Breadcrumb>
                            <Breadcrumb.Section link onClick={(e) => this.props.history.replace('/')}>Home</Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right angle' />
                            <Breadcrumb.Section link onClick={(e) => this.props.history.replace('/WebBoard')}>Web Board</Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right angle' />
                            <Breadcrumb.Section active>Topic</Breadcrumb.Section>
                        </Breadcrumb>
                        <Divider className='default'/>
                        <Header as='h2' textAlign='left'>{thisTopic.topicName}</Header>
                        <p><span className='white'>โดย {thisTopic.owner}</span> | <span className='white'>{dateFormat(thisTopic.created,'longDate')}</span></p>
                        <div>
                            <div className='white' dangerouslySetInnerHTML={{ __html: thisTopic.description}}></div>
                        </div>
                        <Comment.Group>
                            <Header as='h2' textAlign='left' dividing>Comments</Header>
                            {
                                thisTopic.offer.length >= 0 ? //Javascript  //? คือ if else Syntax => ... ? true : false
                                thisTopic.offer.map(itemOffer => //Loop
                                    <Comment>
                                        <Comment.Content>
                                            <Comment.Author as='a' className='notAdmin'>{itemOffer.offerusername}</Comment.Author>
                                            <Comment.Metadata className='notAdmin'>
                                                <div>{timeAgo.format(new Date(itemOffer.created))}</div>
                                            </Comment.Metadata>
                                            <Comment.Text className='notAdmin'>
                                                <div className='commentBox'>
                                                    <div dangerouslySetInnerHTML={{ __html: itemOffer.offerdescription}}></div>
                                                </div>
                                            </Comment.Text>
                                            <Divider className='default'/>
                                        </Comment.Content>
                                    </Comment>
                                )
                                : null
                            }
                            <Form reply onSubmit={this.handleSubmitComment}>
                                <CKEditor value={this.state.code} onChange={this.updateContent.bind(this)} config={{readOnly: false}}/><br/>
                                <Button content='Post' labelPosition='left' icon='edit' primary className='notAdmin'/>
                            </Form>
                        </Comment.Group>
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

export default WebBoard