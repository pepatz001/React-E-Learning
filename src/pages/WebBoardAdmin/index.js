import React from 'react';
import { getTopic , updateDepartment , deleteDepartment , updateContent , deleteContent , createTopic } from '../../api'
import { Segment , List , Tab , Form , Button , Icon , Modal , Dropdown , Menu , Divider , Header } from 'semantic-ui-react'
import CKEditor from 'react-ckeditor-wrapper';

class WebBoardAdmin extends React.Component {
    state = { 
        code: "",
        options: [],
        activeIndex: -1,
        visible: false,
        open: false,
        nameModal: "",
        errorName: false,
        allTopics: []
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

    updateContentNew(value) {
        this.setState({code: value})
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
                                        <Modal size='fullscreen' trigger={<a>{item.topicName}</a>}>
                                            <Modal.Content >
                                                <Modal.Description>
                                                <Header as='h2' textAlign='left' className='admin'>{item.topicName}</Header>
                                                <p>โดย {item.owner} | {item.created}</p>
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
