import React from 'react'
import localStorage from 'localStorage'
import Navbar from '../Navbar'

import { getUserDepartment , getTopic , createTopic } from '../../api'
import CKEditor from 'react-ckeditor-wrapper'
import { Divider , Container , Menu , Segment, Grid , Responsive , Image , Accordion , Icon , Header , Breadcrumb , Table , Label , Button , Modal , Form } from "semantic-ui-react"

var dateFormat = require('dateformat')

class WebBoard extends React.Component {

    state = {
        errorName: false,
        nameModal: '',
        code: '',
        allTopics: [],
        hotTopic: []
    }

    handleChangeModal = (e, { name, value }) => this.setState({ [name]: value })
    
    setTopic = (topic) => {
        this.setState({allTopics: topic})
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

    updateContent(value) {
        this.setState({code:value})
    }
    
    componentWillMount() { 
        getUserDepartment()
        .then(user => this.mapUser(user))
        .catch(err => console.error('Something went wrong.'))
    }

    handleSubmit = event => {
        event.preventDefault() //no refresh
        if(this.state.nameModal === ''){
            this.setState({ errorName: true })
        } else {
            this.setState({ errorName: false })
            const data = {
                topicName: this.state.nameModal,
                description: this.state.code,
                owner: localStorage.getItem('username')
            }
            console.log(data)
            createTopic(data)
            .then(data => {
                if (data.status === 200) {
                    localStorage.setItem('path','WebBoard')
                    this.props.history.replace('/Crpdaz')
                }
            })
        }
        
    }

    showTopic = (id) => {
        localStorage.setItem('idTopic',id)
        this.props.history.replace('/WebBoard/Topic')
    }
    
    render() {
        const topics = this.state.allTopics
        const hotTopics = this.state.hotTopic
        return (
        <div className='body'>
            <Navbar history={this.props.history}>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    <Segment textAlign='left' className='webboard'>
                        <Breadcrumb>
                            <Breadcrumb.Section link onClick={(e) => this.props.history.replace('/')}>Home</Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right angle' />
                            <Breadcrumb.Section active>Web Board</Breadcrumb.Section>
                        </Breadcrumb>
                        <Divider className='default'/>
                        <Menu text>
                            <Menu.Item><Header as='h2' textAlign='left'>Hot Topics</Header></Menu.Item>
                        </Menu>
                        <Segment className='topic'>
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
                        <br/>
                        <Menu text>
                            <Menu.Item><Header as='h2' textAlign='left'>All Topics</Header></Menu.Item>
                            <Menu.Item position='right'>
                                <Modal closeIcon basic className="newTopic" trigger={<Button size='mini' className='newTopic'><Icon name='plus' /> New Topic</Button>}>
                                    <Modal.Header>New Topic</Modal.Header>
                                    <Modal.Content >
                                        <Modal.Description>
                                            <Form onSubmit={this.handleSubmit}>
                                                <Form.Field required>
                                                    <label className='notAdmin'>Name</label>
                                                    <Form.Input name='nameModal' className='newTopic' error={this.state.errorName} value={this.state.nameModal} onChange={this.handleChangeModal} placeholder='Name' />
                                                </Form.Field>
                                                <Form.Field>
                                                    <label className='notAdmin'>Descriptions</label>
                                                    <CKEditor value={this.state.code} onChange={this.updateContent.bind(this)} config={{readOnly: false}}/>
                                                </Form.Field>
                                                <Form.Button className='notAdmin' content='Submit' />
                                            </Form>
                                        </Modal.Description>
                                    </Modal.Content>
                                </Modal>
                            </Menu.Item>
                        </Menu>
                        <Segment className='topic'>
                            <Table className='topicTable'>
                                <Table.Body>
                                    {topics.length >= 0 ? //Javascript  //? คือ if else Syntax => ... ? true : false
                                        topics.map(item => //Loop
                                        <Table.Row>
                                            <Table.Cell width='12' className='hand'><a onClick={(e) => this.showTopic(item._id)}>{item.topicName}</a></Table.Cell>
                                            <Table.Cell width='4' textAlign='right' className='date'>{dateFormat(item.created,'longDate')}</Table.Cell>
                                        </Table.Row>
                                        )
                                        : null}
                                </Table.Body>
                            </Table>
                        </Segment>
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
                            <Breadcrumb.Section active>Web Board</Breadcrumb.Section>
                        </Breadcrumb>
                        <Divider className='default'/>
                        <Menu text>
                            <Menu.Item><Header as='h2' textAlign='left'>Hot Topics</Header></Menu.Item>
                        </Menu>
                        <Segment className='topic'>
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
                        <br/>
                        <Menu text>
                            <Menu.Item><Header as='h2' textAlign='left'>All Topics</Header></Menu.Item>
                            <Menu.Item position='right'>
                                <Modal closeIcon basic className="newTopic" trigger={<Button size='mini' className='newTopic'><Icon name='plus' /> New Topic</Button>}>
                                    <Modal.Header>New Topic</Modal.Header>
                                    <Modal.Content >
                                        <Modal.Description>
                                            <Form onSubmit={this.handleSubmit}>
                                                <Form.Field required>
                                                    <label className='notAdmin'>Name</label>
                                                    <Form.Input name='nameModal' className='newTopic' error={this.state.errorName} value={this.state.nameModal} onChange={this.handleChangeModal} placeholder='Name' />
                                                </Form.Field>
                                                <Form.Field>
                                                    <label className='notAdmin'>Descriptions</label>
                                                    <CKEditor value={this.state.code} onChange={this.updateContent.bind(this)} config={{readOnly: false}}/>
                                                </Form.Field>
                                                <Form.Button className='notAdmin' content='Submit' />
                                            </Form>
                                        </Modal.Description>
                                    </Modal.Content>
                                </Modal>
                            </Menu.Item>
                        </Menu>
                        <Segment className='topic'>
                            <Table className='topicTable'>
                                <Table.Body>
                                    {topics.length >= 0 ? //Javascript  //? คือ if else Syntax => ... ? true : false
                                        topics.map(item => //Loop
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

export default WebBoard