import React from 'react'
import localStorage from 'localStorage'

import { getDepartment , getUserDepartment } from '../api'

class Crpdaz extends React.Component {
  state = {
    department : "",
    code: "",
    contents: [],
    topics: [],
    activeItem: '',
  }

  mapContent = (list) => {
    var content = [{topic:"",name:"",code:""}]
    content = list.filter(item => item.name === this.state.department).map(list => list.content)
    const topic = []
    content.forEach( v => topic.indexOf(v.topic) === -1 ? topic.push(v.topic) : null)
    console.log(content,topic)
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

  render() {
    return (
      <div></div>
    )
  }
}

export default Crpdaz