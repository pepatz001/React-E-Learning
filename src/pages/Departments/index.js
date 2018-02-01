import React from 'react';
import { getDepartment , updateDepartment , deleteDepartment , createDepartment , updateContent , deleteContent , editDepartment } from '../../api'
import { Segment , List , Tab , Form , Button , Icon , Modal , Dropdown , Menu , Divider , Transition } from 'semantic-ui-react'
import CKEditor from 'react-ckeditor-wrapper';

class Departments extends React.Component {
    state = { 
        allDepartments: [],
        departmentModal: "",
        department: "",
        departmentName: "",
        topic: "",
        name: "",
        code: "<h1>Edit content here!</h1>",
        options: [],
        activeIndex: -1,
        panes: [
            { menuItem: <Menu.Item disabled><Menu.Header>Products :</Menu.Header></Menu.Item>},
            { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
            { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
            { menuItem: <Menu.Item disabled><Menu.Header>Products :</Menu.Header></Menu.Item>},
            { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
            { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
          ],
        code: "",
        visible: false,
        open: false,
        topicName: "",
        contentName: "",
        errorTopic: false,
        errorContent: false,
        errorDepartment: false,
    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    topicChange = (e, {value}) => this.setState({ topicName: value })

    contentChange = (e, {value}) => this.setState({ contentName: value })

    handleChangeModal = (e, { name, value }) => this.setState({ [name]: value })

    componentWillMount() { 
        getDepartment()
        .then(department => this.setState({allDepartments: department}))
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
            // console.log(this.state)
            const data = {
                name: this.state.departmentModal,
                oldname: this.state.department
            }
            const dataUser = {
                departmentOld: this.state.department,
                department: this.state.departmentModal
            }
            // console.log(dataUser)
            updateDepartment(data)
            .then(this.editDepartmentUser(dataUser))
        }
    }

    editDepartmentUser = (data) => {
        editDepartment(data)
        .then(this.props.history.replace('/Crpdaz'))
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
        if(this.state.departmentName === ''){
            this.setState({ errorDepartment: true })
        } else {
            this.setState({ errorDepartment: false })
        }
        if(this.state.topic === ''){
            this.setState({ errorTopic: true })
        } else {
            this.setState({ errorTopic: false })
        }
        if(this.state.name === ''){
            this.setState({ errorContent: true })
        } else {
            this.setState({ errorContent: false })
        }
        if(this.state.departmentName !== '' && this.state.topic !== '' && this.state.name !== ''){
            const data = {
                name: this.state.departmentName,
                content: {
                    topic: this.state.topic,
                    name: this.state.name,
                    code: this.state.code
                } 
            }
            // console.log(data)
            createDepartment(data)
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
        this.setState({thisCode: value})
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
            const oldId = ''
            const dataDepartment = this.state.allDepartments
            const dataUpdate = dataDepartment.filter(item => item.update === '1')
            const dataSort = dataUpdate.sort((a, b) => a.created - b.created).slice(0, 1)
            // console.log(dataSort[0]._id)
            const data = {
                id: _id,
                content: thisContent,
                oldId: dataSort[0]._id
            }
            // console.log(data)
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

    setContent = (data,department) => {
        // console.log(data,department)
        const panesContent = []
        var content = [{topic:"",name:"",code:""}]
        content = data.filter(item => item.name === department).map(list => list.content)
        const idContent = data.filter(item => item.name === department).map(list => list._id)
        const topic = []
        content.forEach( v => topic.indexOf(v.topic) === -1 ? topic.push(v.topic) : null)
        // console.log(topic)
        for(var i = 0; i < topic.length; i++){
            //console.log(topic[i])
            panesContent.push({ menuItem: <Menu.Item disabled><Menu.Header>{topic[i]} :</Menu.Header></Menu.Item> })
            for(var j = 0; j < content.length; j++){
                //console.log(content[j].code)
                const code = content[j].code
                const thisContent = content[j]
                const index = j
                const topicName = content[j].topic
                const contentName = content[j].name
                content[j].topic === topic[i] ? 
                    //console.log(content[j].code)
                    panesContent.push({ menuItem: <Menu.Item onClick={(e) => this.setState({ thisCode: code, topicName: topicName, contentName: contentName})}>{content[j].name} </Menu.Item>, render: () => 
                        <Tab.Pane> 
                            <div dangerouslySetInnerHTML= {{__html: this.state.thisCode }}></div>
                            <Divider />
                            <Button content='Edit' onClick={this.toggleVisibility} />
                            <Modal closeIcon size='mini' trigger={<Button content='Delete' onClick={(e) => this.setState({open: true})}/>} open={this.state.open}>
                                <Modal.Header>
                                    Delete Your Content
                                </Modal.Header>
                                <Modal.Content>
                                    <p>Are you sure you want to delete your content</p>
                                </Modal.Content>
                                <Modal.Actions>
                                    <Button negative onClick={this.close}>No</Button>
                                    <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={(e) => this.deleteContent(idContent[index])}/>
                                </Modal.Actions>
                            </Modal>
                            <Transition visible={this.state.visible} >
                                <Divider hidden />
                            </Transition>
                            <Form>
                            <Transition visible={this.state.visible} >
                                <label>Topic Name</label>
                            </Transition>
                            <Transition visible={this.state.visible} >
                                <Form.Input placeholder='Topic Name' error={this.state.errorTopic} value={this.state.topicName} onChange={this.topicChange}/>
                            </Transition>
                            <Transition visible={this.state.visible} >
                                <Divider hidden />
                            </Transition>
                            <Transition visible={this.state.visible} >
                                <label>Content Name</label>
                            </Transition>
                            <Transition visible={this.state.visible} >
                                <Form.Input placeholder='Content Name' error={this.state.errorContent} value={this.state.contentName} onChange={this.contentChange}/>
                            </Transition>
                            </Form>
                            <Transition visible={this.state.visible} >
                                <Divider hidden />
                            </Transition>
                            <Transition visible={this.state.visible} >
                                <label>Edit Content</label>
                            </Transition>
                            <Transition visible={this.state.visible} >
                                <CKEditor value={this.state.thisCode} onChange={this.updateContent.bind(this)} config={{readOnly: false}}/>
                            </Transition>
                            <Transition visible={this.state.visible} >
                                <Divider hidden />
                            </Transition>
                            <Transition visible={this.state.visible} >
                                <Button content='Save' onClick={(e) => this.saveContent(thisContent, this.state.thisCode,idContent[index])} />
                            </Transition>
                        </Tab.Pane> })
                : null
            }
        }
        //console.log(panesContent)
        this.setState({
            panes: panesContent
        })
    }

    render() {
        const { activeIndex } = this.state
        const departments = this.state.allDepartments
        const names = []
        const options = []
        departments.forEach( v => names.indexOf(v.name) === -1 ? names.push(v.name) : null)
        const namesSort = names.sort()
        namesSort.length >= 0 ?
        namesSort.map((item, index) => 
                options.push({
                    text: item,
                    value: item
                })
        )
        : null
        const panes = [
            { menuItem: { content: 'All Department' , icon: "suitcase" }, 
                pane: (
                    namesSort.length >= 0 ? //Javascript  //? คือ if else Syntax => ... ? true : false
                    namesSort.map(item => //Loop
                        <Segment>
                            <List>
                            <List.Item>
                                <List.Content>
                                    <List.Header>
                                        <Modal closeIcon size='fullscreen' trigger={<a onClick={(e) => this.setContent(departments,item)}>{item}</a>}>
                                            <Modal.Header>{item} Contents</Modal.Header>
                                            <Modal.Content >
                                                <Modal.Description>
                                                    <Tab menu={{ fluid: true, vertical: true, tabular: 'right' }} defaultActiveIndex={-1} panes={this.state.panes} />
                                                </Modal.Description>
                                            </Modal.Content>
                                        </Modal>
                                    </List.Header>
                                    <List.Content floated='right'>
                                        <Modal closeIcon trigger={<Button onClick={(e) => this.setDepartment(item)}><Button.Content><Icon name='write'/></Button.Content></Button>}>
                                            <Modal.Header>Edit Department</Modal.Header>
                                            <Modal.Content >
                                            <Modal.Description>
                                            <Form onSubmit={this.editDepartment}>
                                                <Form.Field required>
                                                    <label>Department Name</label>
                                                    <Form.Input name='departmentModal' error={this.state.errorDepartment} value={this.state.departmentModal} onChange={this.handleChangeModal} placeholder='Department Name' />
                                                </Form.Field>
                                                <Form.Button content='Submit' />
                                            </Form>
                                            </Modal.Description>
                                            </Modal.Content>
                                        </Modal>
                                        <Modal closeIcon size='mini' trigger={<Button content='Delete' onClick={(e) => this.setDeleteDepartment(item)}/>} open={this.state.open}>
                                            <Modal.Header>
                                                Delete Your Department
                                            </Modal.Header>
                                            <Modal.Content>
                                                <p>Are you sure you want to delete your department</p>
                                            </Modal.Content>
                                            <Modal.Actions>
                                                <Button negative onClick={this.close}>No</Button>
                                                <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={(e) => this.deleteDepartment(this.state.departmentDelete)}/>
                                            </Modal.Actions>
                                        </Modal>
                                    </List.Content>
                                </List.Content>
                            </List.Item>
                            </List>
                        </Segment>
                    )
                    : null
                )},
            { menuItem: { content: 'New Content', icon: 'plus' , onClick:(e) => this.setOptions(options) },
                pane: (
                    <Tab.Pane>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field required>
                                <label>Department Name</label>
                                <Dropdown placeholder='Select Department' error={this.state.errorDepartment} name='departmentName' onChange={this.handleChange} fluid search allowAdditions selection options={this.state.options} onAddItem={this.handleAddition.bind(this)} />
                                </Form.Field>
                            <Form.Field required>
                                <label>Topic Name</label>
                                <Form.Input error={this.state.errorTopic} name='topic' value={this.state.topic} onChange={this.handleChange} placeholder='Topic Name' />
                            </Form.Field>
                            <Form.Field required>
                                <label>Content Name</label>
                                <Form.Input error={this.state.errorContent} name='name' value={this.state.name} onChange={this.handleChange} placeholder='Content Name' />
                            </Form.Field>
                            <Form.Field>
                                <label>Editor</label>
                                <CKEditor value={this.state.code} onChange={this.updateContentNew.bind(this)} config={{readOnly: false}}/>
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

export default Departments;
