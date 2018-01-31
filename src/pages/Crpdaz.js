import React from 'react'
import localStorage from 'localStorage'
import Navbar from './Navbar'

import { getDepartment , getUserDepartment } from '../api'

class Crpdaz extends React.Component {
  state = {
    department : "",
    code: "",
    contents: [],
    topics: [],
    activeItem: '',
  }

  mapUser = (list) => {
    const item = list.filter(item => item.username === localStorage.username).map(item => item.department)
    this.setState({department: item[0]})
    localStorage.setItem('department', this.state.department)
    if(this.state.department === 'admin'){
      this.props.history.replace('/admin')
    } else if(localStorage.getItem('path') === 'WebBoard') {
      localStorage.setItem('path','')
      this.props.history.replace('/WebBoard')
    } else if(localStorage.getItem('path') === 'Topic') {
      localStorage.setItem('path','')
      this.props.history.replace('/WebBoard/Topic')
    } else {
      this.props.history.replace('/AllTopic')
    }
  }

  componentWillMount() { 
    getUserDepartment()
    .then(user => this.mapUser(user))
    .catch(err => console.error('Something went wrong.'))
  }

  render() {
    return (
      <div className='body'>
        <Navbar history={this.props.history}/>
      </div>
    )
  }
}

export default Crpdaz