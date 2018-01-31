import React from 'react';
import { getTopic , updateDepartment , deleteDepartment , updateContent , deleteContent , createTopic , comment , deleteComment } from '../../api'
import { Segment , List , Tab , Form , Button , Icon , Modal , Dropdown , Menu , Divider , Header , Comment } from 'semantic-ui-react'
import CKEditor from 'react-ckeditor-wrapper';
import TimeAgo from 'javascript-time-ago'

// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'

// Add locale-specific relative date/time formatting rules.
TimeAgo.locale(en)

// Create relative date/time formatter.
const timeAgo = new TimeAgo('en-US')

var dateFormat = require('dateformat')

class WebBoardAdmin extends React.Component {
    state = { 
        code: "",
        options: [],
        activeIndex: -1,
        visible: false,
        open: false,
        nameModal: "",
        errorName: false,
        allTopics: [],
        codeComment: '',
        thisId: ''
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    topicChange = (e, {value}) => this.setState({ topicName: value })

    contentChange = (e, {value}) => this.setState({ contentName: value })

    handleChangeModal = (e, { name, value }) => this.setState({ [name]: value })

    componentWillMount() { 
        getTopic()
        .then(topic => this.setState({allTopics: topic}))
        .catch(err => console.error('Something went wrong.'))
    }

    setDepartment = (data) => {
        this.setState({
            department: data,
            departmentModal: data
        })
    }

    setDeleteDepartment = (data) => {
        this.setState({
            departmentDelete: data,
            open: true
        })
    }

    deleteDepartment = (data) => {
        // console.log(data)
        deleteDepartment(data)
        .then(this.props.history.replace('/Crpdaz'))
        .catch(err => console.error('Something went wrong.'))
    }

    editDepartment = () => {
        if(this.state.departmentModal === ''){
            this.setState({ errorDepartment: true })
        } else {
            this.setState({ errorDepartment: false })
            console.log(this.state)
            const data = {
                name: this.state.departmentModal,
                oldname: this.state.department
            }
            console.log(data)
            updateDepartment(data)
            .then(this.props.history.replace('/Crpdaz'))
            .catch(err => console.error('Something went wrong.'))
        }
    }

    //updateContent CKeditor
    updateContent(value) {
        this.setState({code:value})
    }

    handleAddition = (e, { value }) => {
        this.setState({
          options: [{ text: value, value }, ...this.state.options],
        })
    }

    handleSubmitComment = event => {
        event.preventDefault() //no refresh
        const data = {
            reply: localStorage.getItem('username'),
            description: this.state.codeComment
        }
        const id = this.state.thisId
        console.log(id,data)
        comment(id,data)
        .then(this.props.history.replace('/Crpdaz'))
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
                    this.props.history.replace('/Crpdaz')
                }
            })
        }
        
    }

    setOptions = (data) => {
        this.setState({options: data})
    }

    //updateContent CKeditor
    updateContent(value) {
        this.setState({code: value})
    }

    updateContentComment(value) {
        this.setState({codeComment: value})
    }

    saveContent = (content, code,_id) => {
        if(this.state.topicName === ''){
            this.setState({ errorTopic: true })
        } else {
            this.setState({ errorTopic: false })
        }
        if(this.state.contentName === ''){
            this.setState({ errorContent: true })
        } else {
            this.setState({ errorContent: false })
        }
        if(this.state.topicName !== '' && this.state.contentName !== ''){
            const thisContent = {
                topic: this.state.topicName,
                name: this.state.contentName,
                code: code
            }
            const data = {
                id: _id,
                content: thisContent
            }
            console.log(data)
            updateContent(data)
            .then(this.props.history.replace('/Crpdaz'))
            .catch(err => console.error('Something went wrong.'))
        }
    }

    deleteContent = (_id) => {
        deleteContent(_id)
        .then(this.props.history.replace('/Crpdaz'))
        .catch(err => console.error('Something went wrong.'))
    }

    delete = (idTopic,_id,data) => {
        const offer = []
        data.forEach( v => v._id !== _id ? offer.push(v) : null)
        // console.log(offer)
        const dataNew = {
            offer: offer
        }
        deleteComment(idTopic,dataNew)
        .then(this.props.history.replace('/Crpdaz'))
        .catch(err => console.error('Something went wrong.'))
    }

    close = () => this.setState({ open: false })

    render() {
        const { activeIndex } = this.state
        const topics = this.state.allTopics
        const panes = [
            { menuItem: { content: 'All Topics' , icon: "suitcase" }, 
                pane: (
                    topics.length >= 0 ? //Javascript  //? คือ if else Syntax => ... ? true : false
                    topics.map(item => //Loop
                        <Segment>
                            <List>
                            <List.Item>
                                <List.Content>
                                    <List.Header>
                                        <Modal trigger={<a>{item.topicName}</a>} onClick={(e) => this.setState({thisId: item._id})}>
                                            <Modal.Content >
                                                <Modal.Description>
                                                <Header as='h2' textAlign='left' className='admin'>{item.topicName}</Header>
                                                <p>โดย {item.owner} | {dateFormat(item.created,'longDate')}</p>
                                                <div>
                                                    <div dangerouslySetInnerHTML={{ __html: item.description}}></div>
                                                </div>
                                                {/* {timeAgo.format(new Date())}   เช็คเวลา */}
                                                <Comment.Group>
                                                    <Header as='h3' dividing>Comments</Header>
                                                    {
                                                        item.offer.length >= 0 ? //Javascript  //? คือ if else Syntax => ... ? true : false
                                                        item.offer.map(itemOffer => //Loop
                                                            <Comment>
                                                                <Comment.Content>
                                                                    <Comment.Author as='a'>{itemOffer.offerusername}</Comment.Author>
                                                                    <Comment.Metadata>
                                                                    <div>{timeAgo.format(new Date(itemOffer.created))}</div>
                                                                    </Comment.Metadata>
                                                                    <Comment.Text>
                                                                        <div>
                                                                            <div dangerouslySetInnerHTML={{ __html: itemOffer.offerdescription}}></div>
                                                                        </div>
                                                                    </Comment.Text>
                                                                    <Comment.Actions>
                                                                        <Comment.Action onClick={(e) => this.delete(item._id,itemOffer._id,item.offer)}>Delete Comment</Comment.Action>
                                                                    </Comment.Actions>
                                                                </Comment.Content>
                                                            </Comment>
                                                        )
                                                        : null
                                                    }

                                                    <Form reply onSubmit={this.handleSubmitComment}>
                                                        <CKEditor value={this.state.codeComment} onChange={this.updateContentComment.bind(this)} config={{readOnly: false}}/><br/>
                                                        <Button content='Post' labelPosition='left' icon='edit' primary />
                                                    </Form>
                                                </Comment.Group>
                                                </Modal.Description>
                                            </Modal.Content>
                                        </Modal>
                                    </List.Header>
                                    <List.Content floated='right'>
                                        {/* <Modal size='mini' trigger={<Button content='Delete' onClick={(e) => this.setDeleteDepartment(item)}/>} open={this.state.open}>
                                            <Modal.Header>
                                                Delete this Topic
                                            </Modal.Header>
                                            <Modal.Content>
                                                <p>Are you sure you want to delete this topic</p>
                                            </Modal.Content>
                                            <Modal.Actions>
                                                <Button negative onClick={this.close}>No</Button>
                                                <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={(e) => this.deleteDepartment(this.state.departmentDelete)}/>
                                            </Modal.Actions>
                                        </Modal> */}
                                    </List.Content>
                                </List.Content>
                            </List.Item>
                            </List>
                        </Segment>
                    )
                    : null
                )},
            { menuItem: { content: 'New Topic', icon: 'plus' },
                pane: (
                    <Tab.Pane>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field required>
                                <label>Name</label>
                                <Form.Input name='nameModal' error={this.state.errorName} value={this.state.nameModal} onChange={this.handleChangeModal} placeholder='Name' />
                            </Form.Field>
                            <Form.Field>
                                <label>Descriptions</label>
                                <CKEditor value={this.state.code} onChange={this.updateContent.bind(this)} config={{readOnly: false}}/>
                            </Form.Field>
                            <Form.Button content='Submit' />
                        </Form>
                    </Tab.Pane>
              ) },
            ]
        return (
            <div>
                <Tab panes={panes} renderActiveOnly={false} />
            </div>
        );
    }
}

export default WebBoardAdmin;
