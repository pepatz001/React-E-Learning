import React from 'react'
import localStorage from 'localStorage'
import Navbar from '../Navbar'

import { getUserDepartment } from '../../api'
import CKEditor from 'react-ckeditor-wrapper'
import { Divider , Container , Menu , Segment, Grid , Responsive , Image , Accordion , Icon , Header , Breadcrumb , Table , Label , Button , Modal , Form } from "semantic-ui-react"

class WebBoard extends React.Component {

    state = {
        errorName: false,
        nameModal: '',
        code: ''
    }

    handleChangeModal = (e, { name, value }) => this.setState({ [name]: value })

    mapUser = (list) => {
        const item = list.filter(item => item.username === localStorage.username).map(item => item.department)
        this.setState({department: item[0]})
        localStorage.setItem('department', this.state.department)
        if(this.state.department === 'admin'){
          this.props.history.replace('/admin')
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
    
    render() {
        return (
        <div className='body'>
            {/* <MenuLayout history={this.props.history}/>
            <MenuResponsive history={this.props.history}/> */}
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
                                    <Table.Row>
                                        <Table.Cell className='hand'><a onClick={(e) => console.log('test')}>You added Jenny Hess to your coworker group.</a></Table.Cell>
                                        <Table.Cell textAlign='right' className='date'>31 Jan 2018</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell className='hand'><a onClick={(e) => console.log('test')}>You added Jenny Hess to your coworker group.</a></Table.Cell>
                                        <Table.Cell textAlign='right' className='date'>31 Jan 2018</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Segment>
                        <br/>
                        <Menu text>
                            <Menu.Item><Header as='h2' textAlign='left'>All Topics</Header></Menu.Item>
                            <Menu.Item position='right'>
                                <Modal basic className="newTopic" trigger={<Button size='mini' className='newTopic'><Icon name='plus' /> New Topic</Button>}>
                                    <Modal.Header>New Topic</Modal.Header>
                                    <Modal.Content >
                                        <Modal.Description>
                                            <Form>
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
                                    <Table.Row>
                                        <Table.Cell className='hand'><a onClick={(e) => console.log('test')}>You added Jenny Hess to your coworker group.</a></Table.Cell>
                                        <Table.Cell textAlign='right' className='date'>31 Jan 2018</Table.Cell>
                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell className='hand'><a onClick={(e) => console.log('test')}>You added Jenny Hess to your coworker group.</a></Table.Cell>
                                        <Table.Cell textAlign='right' className='date'>31 Jan 2018</Table.Cell>
                                    </Table.Row>
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
                                    <Table.Row className='rowMobile'>
                                        <Table.Cell className='hand'><a onClick={(e) => console.log('test')}>You added Jenny Hess to your coworker group.</a></Table.Cell>
                                        <Table.Cell textAlign='right' className='date'>31 Jan 2018</Table.Cell>
                                    </Table.Row>
                                    <Table.Row className='rowMobile'>
                                        <Table.Cell className='hand'><a onClick={(e) => console.log('test')}>You added Jenny Hess to your coworker group.</a></Table.Cell>
                                        <Table.Cell textAlign='right' className='date'>31 Jan 2018</Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </Segment>
                        <br/>
                        <Menu text>
                            <Menu.Item><Header as='h2' textAlign='left'>All Topics</Header></Menu.Item>
                            <Menu.Item position='right'>
                                <Modal basic className="newTopic" trigger={<Button size='mini' className='newTopic'><Icon name='plus' /> New Topic</Button>}>
                                    <Modal.Header>New Topic</Modal.Header>
                                    <Modal.Content >
                                        <Modal.Description>
                                            <Form>
                                                <Form.Field required>
                                                    <label className='notAdmin'>First Name</label>
                                                    <Form.Input name='firstNameModal' className='newTopic' error={this.state.errorFirstName} value={this.state.firstNameModal} onChange={this.handleChangeModal} placeholder='First Name' />
                                                </Form.Field>
                                                <Form.Button content='Submit' />
                                            </Form>
                                        </Modal.Description>
                                    </Modal.Content>
                                </Modal>
                            </Menu.Item>
                        </Menu>
                        <Segment className='topic'>
                            <Table className='topicTable'>
                                <Table.Body>
                                    <Table.Row className='rowMobile'>
                                        <Table.Cell className='hand'><a onClick={(e) => console.log('test')}>You added Jenny Hess to your coworker group.</a></Table.Cell>
                                        <Table.Cell textAlign='right' className='date'>31 Jan 2018</Table.Cell>
                                    </Table.Row>
                                    <Table.Row className='rowMobile'>
                                        <Table.Cell className='hand'><a onClick={(e) => console.log('test')}>You added Jenny Hess to your coworker group.</a></Table.Cell>
                                        <Table.Cell textAlign='right' className='date'>31 Jan 2018</Table.Cell>
                                    </Table.Row>
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