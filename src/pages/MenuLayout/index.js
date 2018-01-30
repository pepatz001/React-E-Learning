import React from 'react'
import { Dropdown , Icon, Image, Menu } from "semantic-ui-react"
import { getDepartment , getUserDepartment } from '../../api'

class MenuLayout extends React.Component {
  
  state = {
    department : "",
    code: "",
    contents: [],
    topics: [],
    activeItem: '',
    active: ''
  }

  mapContent = (list) => {
    var content = [{topic:"",name:"",code:""}]
    content = list.filter(item => item.name === this.state.department).map(list => list.content)
    const topic = []
    content.forEach( v => topic.indexOf(v.topic) === -1 ? topic.push(v.topic) : null)
    // console.log(content,topic)
    this.setState({
      contents: content,
      topics: topic
    })
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

  handleClick = (e, { name }) => this.setState({ active: name })

  handleClickDepartment = (departmentName) => {
    localStorage.setItem('departmentClick', departmentName)
    this.props.history.replace('/Crpdaz') //redirect
  }

  logout = () => {
    this.props.history.replace('/login') //redirect
    localStorage.clear()
  }

  render(){
    const { topics , contents } = this.state
    const { active } = this.state
    return (
      <div>
          <Menu className='navbar' fixed='Top' borderless>
            <Menu.Item>
              <Image size="tiny" src='/assets/images/major-logo-1.png' />
            </Menu.Item>
            <Menu.Item className='navbarItem' onClick={(e) => this.props.history.replace('/')} >
              <Icon name='home'/>Home
            </Menu.Item>
            <Dropdown item text="Operation">
              <Dropdown.Menu>
                <Dropdown.Item className='dropdownColor' onClick={(e) => this.handleClickDepartment('Cinema')}>Cinema</Dropdown.Item>
                <Dropdown.Item className='dropdownColor' onClick={(e) => this.handleClickDepartment('Bowling Operation Business Unit')}>Bowling</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item className='navbarItem' key='support' name='support' active={active === 'support'} onClick={(e) => this.handleClickDepartment('Support')} />
            <Menu.Item className='navbarItem' key='web board' name='web board' active={active === 'web board'} onClick={this.handleClick} />
            {/* <Menu.Item className='navbarItem' key='quiz' name='quiz' active={active === 'quiz'} onClick={this.handleClick} /> */}
            <Menu.Menu position="right">
              <Menu.Item className='navbarItem' key='logout' name='logout' onClick={(e) => this.logout()} />
            </Menu.Menu>
          </Menu>
      </div>
    )
  }
}

export default MenuLayout
